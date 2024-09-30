import React, { useState, useEffect } from 'react';
import { TodoFormProps } from '../lib/types';

const TodoForm: React.FC<TodoFormProps> = ({ addTodo, initialTitle = '', initialDescription = '' }) => {
    const [title, setTitle] = useState(initialTitle);
    const [description, setDescription] = useState(initialDescription);
	const isEditing = initialTitle ? true : false;

    useEffect(() => {
        setTitle(initialTitle);
        setDescription(initialDescription);
    }, [initialTitle, initialDescription]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (title.trim()) {
            addTodo(title.trim(), description.trim());
            setTitle('');
            setDescription('');
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="mb-5 flex flex-col gap-2"
            data-testid="new-todo-form"
        >
            <input
                type="text"
                className="border rounded w-full py-3 pl-5 placeholder:italic"
                placeholder="Title*"
                value={title}
                data-testid="new-todo-input"
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                className="border rounded w-full py-4 pl-4 placeholder:italic"
                placeholder="Description"
                value={description}
                data-testid="new-todo-description"
                onChange={(e) => setDescription(e.target.value)}
				maxLength={200}
            />
            <button
                type="submit"
                className="border rounded w-full py-3 bg-kGreen text-kBlack text-xl hover:bg-kDarkGreen"
            >
                {isEditing ? 'Save' : 'Create'}
            </button>
        </form>
    );
};

export default TodoForm;