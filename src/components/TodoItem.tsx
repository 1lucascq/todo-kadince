import React, { useState } from 'react';
import { ITodoItemProps } from '../lib/types';
import Modal from './Modal';
import TodoForm from './TodoForm';

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
                className={`grid grid-cols-10 rounded transition-all duration-300 ${todo.completed ? 'bg-kBg-light' : 'bg-white'} ${isExpanded ? 'max-h-96' : 'max-h-20'}`}
            >
                <div className="col-span-6 md:col-span-7">
                    <p
                        className={`
							p-4 cursor-pointer w-full
							${todo.completed ? 'line-through text-gray-500' : ''}
							${isExpanded ? 'break-words' : 'truncate'}
						`}
                        onClick={handleComplete}
                        data-testid={`todo-title-${index}`}
                    >
                        {todo.title}
                    </p>
                    {isExpanded && (
                        <p
                            className={`p-4 text-justify break-words ${todo.completed ? 'line-through text-gray-500' : ''}`}
							onClick={handleComplete}
							data-testid={`todo-description-${index}`}
                        >
                            {todo.description}
                        </p>
                    )}
                </div>
                <div className="col-span-4 md:col-span-3 flex justify-around">
                    <button
                        className="text-red-500 font-bold flex-1 bg-blue-300"
                        onClick={showMore}
                        data-testid={`show-more-btn-${index}`}
                    >
                        {isExpanded ? '➖' : '➕'}
                    </button>

                    <button
                        className="text-yellow-500 font-bold flex-1 bg-yellow-300"
                        onClick={handleEdit}
                        data-testid={`edit-todo-btn-${index}`}
                    >
                        ✎
                    </button>
                    <button
                        className="text-red-500 font-bold flex-1 bg-red-300"
                        onClick={handleDelete}
                        data-testid={`delete-todo-btn-${index}`}
                    >
                        ✕
                    </button>
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
