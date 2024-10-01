import React, { useState } from 'react';
import { ITodoItemProps } from '../lib/types';
import Modal from './Modal';
import TodoForm from './TodoForm';
import IconButton from './IconButton';

const TodoItem: React.FC<ITodoItemProps> = ({
    index,
    todo,
    toggleComplete,
    editTodo,
    deleteTodo,
}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const handleEdit = () => {
        setIsModalOpen(true);
    };

    const handleSave = (title: string, description: string) => {
        if (title.trim()) {
            editTodo(todo.id, title.trim(), description.trim());
        }
        setIsModalOpen(false);
    };

    const handleCancelEdit = () => {
        setIsModalOpen(false);
    };

    const handleComplete = () => {
        toggleComplete(todo.id);
    };

    const showMore = () => {
        setIsExpanded(!isExpanded);
    };

    const confirmDelete = () => {
        deleteTodo(todo.id);
        setIsDeleteModalOpen(false);
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
    };

    const handleDelete = () => {
        setIsDeleteModalOpen(true);
    };

    return (
        <>
			<li
				className={`rounded transition-all duration-300 ${todo.completed ? 'bg-kBg-light' : 'bg-white'}`}
			>
				<div className="flex justify-around min-h-[44px]">
					<IconButton
						className="text-green-600 bg-green-200"
						onClick={handleComplete}
						dataTestId={`check-todo-btn-${index}`}
					>
						✔
					</IconButton>

					<IconButton
						className={`text-red-600 ${todo.description ? 'bg-blue-200' : 'bg-gray-200'}`}
						onClick={showMore}
						disabled={!todo.description}
						dataTestId={`show-more-btn-${index}`}
					>
						{todo.description ? (isExpanded ? '➖' : '➕') : '🚫'}
					</IconButton>

					<IconButton
						className="text-yellow-600 bg-yellow-200"
						onClick={handleEdit}
						dataTestId={`edit-todo-btn-${index}`}
					>
						✎
					</IconButton>

					<IconButton
						className="text-red-600 bg-red-200"
						onClick={handleDelete}
						dataTestId={`delete-todo-btn-${index}`}
					>
						✕
					</IconButton>
				</div>
				<div className="px-4 py-6 min-h-[44px]">
					<p
						className={`
							w-full
							font-bold
							text-kBlack
							${todo.completed ? 'line-through text-gray-500' : ''}
							${isExpanded ? 'break-words' : 'truncate'}
						`}
						data-testid={`todo-title-${index}`}
					>
						{todo.title}
					</p>
					{isExpanded && (
						<p
							className={`pt-5 text-justify break-words ${todo.completed ? 'line-through text-gray-500' : ''}`}
							data-testid={`todo-description-${index}`}
						>
							{todo.description}
						</p>
					)}
				</div>
			</li>

            <Modal isOpen={isModalOpen} onClose={handleCancelEdit}>
                <div className="container w-[330px] p-2 dark md:w-[450px]">
                    <TodoForm
                        addTodo={handleSave}
                        initialTitle={todo.title}
                        initialDescription={todo.description}
                    />
                </div>
            </Modal>

            <Modal isOpen={isDeleteModalOpen} onClose={closeDeleteModal}>
                <div className="p-4 bg-white rounded ">
                    <p className="text-lg font-semibold mb-4">
                        Are you sure that you want to delete this item?
                    </p>
                    <div className="flex justify-center space-x-4">
                        <button
                            className="bg-red-500 font-semibold text-white px-4 py-2 rounded"
                            onClick={confirmDelete}
                            data-testid={'confirm-delete-btn'}
                        >
                            Delete
                        </button>
                        <button
                            className="bg-gray-500 font-semibold text-white px-4 py-2 rounded"
                            onClick={closeDeleteModal}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default TodoItem;
