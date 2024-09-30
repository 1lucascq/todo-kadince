import React, { useState } from 'react';
import { TodoFormProps } from '../lib/types';

const TodoForm: React.FC<TodoFormProps> = ({ addTodo }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

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
            className="mb-4"
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
            />
			<button
				type="submit"
				className="border rounded w-full py-3 bg-kGreen text-kBlack text-xl hover:bg-kDarkGreen"
			>
				Create
			</button>
        </form>
    );
};

export default TodoForm;
