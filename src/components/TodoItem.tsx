import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Todo } from '../lib/types';
import { TodoItemProps } from '../lib/types';

const TodoItem: React.FC<TodoItemProps> = ({
    todo,
    toggleComplete,
    editTodo,
    deleteTodo,
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newTodoText, setNewTodoText] = useState(todo.text);
    const inputRef = useRef<HTMLTextAreaElement>(null);

	useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEditing]);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        if (newTodoText.trim()) {
            editTodo(todo.id, newTodoText.trim());
        }
        setIsEditing(false);
    };

	const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (event.key === 'Enter') {
            handleSave();
        }
    }, [handleSave]);

    const handleCancelEdit = () => {
        if (isEditing) {	''
            setNewTodoText(todo.text);
            setIsEditing(false);
        } else {
            deleteTodo(todo.id);
        }
    };

	const handleComplete = () => {
		toggleComplete(todo.id);
	};

	const renderEditOrSaveButton = () => {
        if (isEditing) {
            return (
                <button className="text-yellow-500 mr-4" onClick={handleSave} data-testId="save-button">
                    💾
                </button>
            );
        } else {
            return (
                <button className="text-yellow-500 mr-4" onClick={handleEdit} data-testId="edit-button">
                    ✎
                </button>
            );
        }
    };

    return (
        <li className={`flex items-center justify-between mb-2 p-4 rounded ${todo.completed ? 'bg-kBg-light' : 'bg-white' }`}>
            {isEditing ? (
                <textarea
                    ref={inputRef}
                    className="fill-current flex-1 mr-4 px-1"
                    value={newTodoText}
                    onChange={(e) => setNewTodoText(e.target.value)}
                    onKeyDown={handleKeyDown}
					data-testId="edit-todo-textarea"
                />
            ) : (
                <div
                    className={`flex-1 ${todo.completed ? 'line-through text-gray-500' : ''}`}
                    onClick={handleComplete}
                >
                    <span data-testId="todo-text">{todo.text}</span>
                </div>
            )}
            <div>
                {renderEditOrSaveButton()}
                <button
                    className="text-red-500 font-bold"
                    onClick={handleCancelEdit}
                >
                    ✕
                </button>
            </div>
        </li>
    );
};

export default TodoItem;
