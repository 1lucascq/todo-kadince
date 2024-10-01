import React from 'react';
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import App from '../App';

// Automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

describe('Filter Todos', () => {
	test('filters todos by All, Pending, and Completed', async () => {
		render(<App />);
		const input = screen.getByTestId('new-todo-input');
		const form = screen.getByTestId('new-todo-form');

		fireEvent.change(input, { target: { value: 'Completed Todo' } });
		fireEvent.submit(form);
		
		fireEvent.change(input, { target: { value: 'Pending Todo' } });
		fireEvent.submit(form);

		const completeBtn = screen.getByText('Completed Todo');
		fireEvent.click(completeBtn);

		const allFilterBtn = screen.getByTestId('All-filter');
		fireEvent.click(allFilterBtn);
		await waitFor(() => {
			const todos = screen.getAllByTestId(/todo-title/);
			expect(todos.length).toBe(2);
		});

		const completedFilterBtn = screen.getByTestId('Completed-filter');
		fireEvent.click(completedFilterBtn);

		await waitFor(() => {
			const todos = screen.getAllByTestId(/todo-title/);
			expect(todos.length).toBe(1);
			expect(todos[0]).toHaveTextContent('Completed Todo');
		});

		const pendingFilterBtn = screen.getByTestId('Pending-filter');
		fireEvent.click(pendingFilterBtn);
		await waitFor(() => {
			const todos = screen.getAllByTestId(/todo-title/);
			expect(todos.length).toBe(1);
			expect(todos[0]).toHaveTextContent('Pending Todo');
		});

	});
});

describe('App E2E Tests', () => {
	test('renders new todo input', () => {
		render(<App />);
		const input = screen.getByTestId('new-todo-input');
		expect(input).toBeInTheDocument();
	});

	test('adds a new todo, edit and save', async () => {
		render(<App />);
		const input = screen.getByTestId('new-todo-input');
		const description = screen.getByTestId('new-todo-description');
		const form = screen.getByTestId('new-todo-form');
		fireEvent.change(input, { target: { value: 'Do dis' } });
		fireEvent.change(description, { target: { value: 'im doing dis' } });
		fireEvent.submit(form);

		const todoList = screen.getByTestId('todo-list');
		expect(todoList).toBeInTheDocument();

		const newTodoTitle = screen.getByTestId('todo-title-0');
		expect(newTodoTitle).toHaveTextContent('Do dis');

		const showMoreButton = screen.getByTestId('show-more-btn-0');
		fireEvent.click(showMoreButton);

		// only available after clicking in show more button
		const newTodoDescription = screen.getByTestId('todo-description-0');
		expect(newTodoDescription).toHaveTextContent('im doing dis');

		const editButton = screen.getByTestId('edit-todo-btn-0');
		fireEvent.click(editButton);

		const editDescription = screen.getByTestId('edit-description-textarea');
		const editInput = screen.getByTestId('edit-title-input');
		expect(editDescription).toBeInTheDocument();
		expect(editInput).toBeInTheDocument();
		fireEvent.change(editInput, { target: { value: 'Do this' } });
		fireEvent.change(editDescription, {
			target: { value: "I'm doing this" },
		});

		const saveButton = screen.getByTestId('save-btn');
		fireEvent.click(saveButton);

		const updatedTodo = screen.getByTestId('todo-title-0');
		const updatedDescription = screen.getByTestId('todo-description-0');
		expect(updatedTodo).toHaveTextContent('Do this');
		expect(updatedDescription).toHaveTextContent("I'm doing this");

		const deleteBtn = screen.getByTestId('delete-todo-btn-0');
		fireEvent.click(deleteBtn);

		const confirmDelete = screen.getByTestId('confirm-delete-btn');
		expect(confirmDelete).toBeInTheDocument();

		fireEvent.click(confirmDelete);

		expect(updatedTodo).not.toBeInTheDocument();
	});

	test('deletes a todo', () => {
		render(<App />);
		const input = screen.getByTestId('new-todo-input');
		const form = screen.getByTestId('new-todo-form');
		fireEvent.change(input, { target: { value: 'To be deleted...' } });
		fireEvent.submit(form);

		const todoList = screen.getByTestId('todo-list');
		expect(todoList).toBeInTheDocument();

		const newTodo = screen.getByTestId('todo-title-0');
		expect(newTodo).toHaveTextContent('To be deleted...');

		const deleteBtn = screen.getByTestId('delete-todo-btn-0');
		fireEvent.click(deleteBtn);

		const confirmDelete = screen.getByTestId('confirm-delete-btn');
		expect(confirmDelete).toBeInTheDocument();

		fireEvent.click(confirmDelete);

		expect(newTodo).not.toBeInTheDocument();
	});
});
