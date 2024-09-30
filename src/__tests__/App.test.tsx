import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';

test('renders Kadince Task Manager title', () => {
    render(<App />);
    const titleElement = screen.getByText(/Kadince Task Manager/i);
    expect(titleElement).toBeInTheDocument();
});

test('renders new todo input', () => {
    render(<App />);
    const input = screen.getByTestId('new-todo-input');
    expect(input).toBeInTheDocument();
});

test('adds a new todo and edit saving with Enter', async () => {
    render(<App />);
    const input = screen.getByTestId('new-todo-input');
    const form = screen.getByTestId('new-todo-form');
    fireEvent.change(input, { target: { value: 'Do dis' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', charCode: 13 });
    fireEvent.submit(form);

    const todoList = screen.getByTestId('todo-list');
    expect(todoList).toBeInTheDocument();

    const newTodo = screen.getByTestId('todo-0');
    expect(newTodo).toHaveTextContent('Do dis');

    const editButton = screen.getByTestId('edit-todo-btn-0');
    fireEvent.click(editButton);

    const textarea = screen.getByTestId('edit-todo-textarea-0');
    fireEvent.change(textarea, { target: { value: 'Do this' } });
    fireEvent.keyDown(textarea, { key: 'Enter', code: 'Enter', charCode: 13 });

    await waitFor(() => {
        const updatedTodo = screen.getByTestId('todo-0');
        expect(updatedTodo).toHaveTextContent('Do this');
    });
});
test('adds a new todo and edit saving by clicking on the save btn', async () => {
    render(<App />);
    const input = screen.getByTestId('new-todo-input');
    const form = screen.getByTestId('new-todo-form');
    fireEvent.change(input, { target: { value: 'Do tat' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', charCode: 13 });
    fireEvent.submit(form);

    const todoList = screen.getByTestId('todo-list');
    expect(todoList).toBeInTheDocument();

    const newTodo = screen.getByTestId('todo-0');
    expect(newTodo).toHaveTextContent('Do tat');

    const editButton = screen.getByTestId('edit-todo-btn-0');
    fireEvent.click(editButton);

    const textarea = screen.getByTestId('edit-todo-textarea-0');
    fireEvent.change(textarea, { target: { value: 'Do that' } });
    const saveButton = screen.getByTestId('save-todo-btn-0');
    fireEvent.click(saveButton);

    await waitFor(() => {
        const updatedTodo = screen.getByTestId('todo-0');
        expect(updatedTodo).toHaveTextContent('Do that');
    });
});

test('deletes a todo', () => {
    render(<App />);
    const input = screen.getByTestId('new-todo-input');
    const form = screen.getByTestId('new-todo-form');
    fireEvent.change(input, { target: { value: 'To be deleted...' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', charCode: 13 });
    fireEvent.submit(form);

    const todoList = screen.getByTestId('todo-list');
    expect(todoList).toBeInTheDocument();

    const newTodo = screen.getByTestId('todo-0');
    expect(newTodo).toHaveTextContent('To be deleted...');

    const deleteBtn = screen.getByTestId('delete-todo-btn-0');
    fireEvent.click(deleteBtn);

    expect(newTodo).not.toBeInTheDocument();
});

test('toggles a todo', () => {
    render(<App />);
    const input = screen.getByTestId('new-todo-input');
    const form = screen.getByTestId('new-todo-form');
    fireEvent.change(input, { target: { value: 'To be deleted...' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', charCode: 13 });
    fireEvent.submit(form);

    const todoList = screen.getByTestId('todo-list');
    expect(todoList).toBeInTheDocument();

    const newTodo = screen.getByTestId('todo-0');
    expect(newTodo).toHaveTextContent('To be deleted...');
    expect(newTodo).not.toHaveClass('line-through');

    const completeBtn = screen.getByTestId('complete-todo-btn-0');
    fireEvent.click(completeBtn);

    const completedTodo = screen.getByTestId('complete-todo-btn-0');
    expect(completedTodo).toHaveClass('line-through');

    fireEvent.click(completeBtn);

    const uncompletedTodo = screen.getByTestId('complete-todo-btn-0');
    expect(uncompletedTodo).not.toHaveClass('line-through');
});

test('filters todos by All, Pending, and Completed', async () => {
    render(<App />);
    const input = screen.getByTestId('new-todo-input');
    const form = screen.getByTestId('new-todo-form');

    fireEvent.change(input, { target: { value: 'Pending Todo' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', charCode: 13 });
    fireEvent.submit(form);

    fireEvent.change(input, { target: { value: 'Completed Todo' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', charCode: 13 });
    fireEvent.submit(form);

    const completeBtn = screen.getByTestId('complete-todo-btn-1');
    fireEvent.click(completeBtn);

    const allFilterBtn = screen.getByTestId('All-filter');
    fireEvent.click(allFilterBtn);
    await waitFor(() => {
        const todos = screen.getAllByTestId(/todo-/);
        expect(todos.length).toBe(2);
    });

    const pendingFilterBtn = screen.getByTestId('Pending-filter');
    fireEvent.click(pendingFilterBtn);
    await waitFor(() => {
        const todos = screen.getAllByTestId(/todo-/);
        expect(todos.length).toBe(1);
        expect(todos[0]).toHaveTextContent('Pending Todo');
    });

    const completedFilterBtn = screen.getByTestId('Completed-filter');
    fireEvent.click(completedFilterBtn);
    await waitFor(() => {
        const todos = screen.getAllByTestId(/todo-/);
        expect(todos.length).toBe(1);
        expect(todos[0]).toHaveTextContent('Completed Todo');
    });
});