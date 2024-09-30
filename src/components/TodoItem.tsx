import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ITodoItemProps } from '../lib/types';

const TodoItem: React.FC<ITodoItemProps> = ({
    index,
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
                <button className="text-yellow-500 mr-4" onClick={handleSave} data-testid={`save-todo-btn-${index}`}>
                    💾
                </button>
            );
        } else {
            return (
                <button className="text-yellow-500 mr-4" onClick={handleEdit} data-testid={`edit-todo-btn-${index}`}>
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
					data-testid={`edit-todo-textarea-${index}`}
				/>
            ) : (
                <div
                    className={`flex-1 cursor-pointer ${todo.completed ? 'line-through text-gray-500' : ''}`}
                    onClick={handleComplete}
					data-testid={`complete-todo-btn-${index}`}
                >
                    <span data-testid={`todo-${index}`}>{todo.text}</span>
                </div>
            )}
            <div>
                {renderEditOrSaveButton()}
                <button
                    className="text-red-500 font-bold"
                    onClick={handleCancelEdit}
					data-testid={`delete-todo-btn-${index}`}
                >
                    ✕
                </button>
            </div>
        </li>
    );
};

export default TodoItem;
