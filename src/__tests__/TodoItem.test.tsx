import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TodoItem from '../components/TodoItem';
import { ITodoItemProps } from '../lib/types';
import { jest } from '@jest/globals';

const mockTodo = {
	id: 1,
	title: 'Test Todo',
	description: 'Test Description',
	completed: false,
};

const mockProps: ITodoItemProps = {
	index: 0,
	todo: mockTodo,
	toggleComplete: jest.fn(),
	editTodo: jest.fn(),
	deleteTodo: jest.fn(),
};

describe('TodoItem Component', () => {
	test('renders todo item', () => {
		render(<TodoItem {...mockProps} />);
		const todoElement = screen.getByTestId('todo-title-0');
		expect(todoElement).toBeInTheDocument();
		expect(todoElement).toHaveTextContent('Test Todo');
	});

	test('toggles complete status', () => {
		render(<TodoItem {...mockProps} />);
		const todoElement = screen.getByTestId('todo-title-0');
		fireEvent.click(todoElement);
		expect(mockProps.toggleComplete).toHaveBeenCalledWith(mockTodo.id);
	});

	test('expands and collapses description', () => {
		render(<TodoItem {...mockProps} />);
		const showMoreButton = screen.getByTestId('show-more-btn-0');
		fireEvent.click(showMoreButton);
		const descriptionElement = screen.getByText('Test Description');
		expect(descriptionElement).toBeInTheDocument();
		fireEvent.click(showMoreButton);
		expect(descriptionElement).not.toBeInTheDocument();
	});

	test('opens and closes edit modal', () => {
		render(<TodoItem {...mockProps} />);
		const editButton = screen.getByTestId('edit-todo-btn-0');
		fireEvent.click(editButton);
		const modalElement = screen.getByText('Save');
		expect(modalElement).toBeInTheDocument();
		const modalOverlay = screen.getByTestId('modal-overlay');
		fireEvent.click(modalOverlay);
		expect(modalElement).not.toBeInTheDocument();
	});

	test('opens and closes delete modal', () => {
		render(<TodoItem {...mockProps} />);
		const deleteButton = screen.getByTestId('delete-todo-btn-0');
		fireEvent.click(deleteButton);
		const deleteModalElement = screen.getByText('Are you sure that you want to delete this item?');
		expect(deleteModalElement).toBeInTheDocument();
		const cancelButton = screen.getByText('Cancel');
		fireEvent.click(cancelButton);
		expect(deleteModalElement).not.toBeInTheDocument();
	});

	test('confirms delete', () => {
		render(<TodoItem {...mockProps} />);
		const deleteButton = screen.getByTestId('delete-todo-btn-0');
		fireEvent.click(deleteButton);
		const confirmDeleteButton = screen.getByText('Delete');
		fireEvent.click(confirmDeleteButton);
		expect(mockProps.deleteTodo).toHaveBeenCalledWith(mockTodo.id);
	});

	test('saves edited todo', async () => {
		render(<TodoItem {...mockProps} />);
		const editButton = screen.getByTestId('edit-todo-btn-0');
		fireEvent.click(editButton);
		const titleInput = screen.getByLabelText('title');
		fireEvent.change(titleInput, { target: { value: 'Updated Todo' } });
		const saveButton = screen.getByText('Save');
		fireEvent.click(saveButton);
		await waitFor(() => {
			expect(mockProps.editTodo).toHaveBeenCalledWith(mockTodo.id, 'Updated Todo', 'Test Description');
		});
	});
});