import React, { useState, useEffect } from 'react';
import { TodoFormProps } from '../lib/types';

const TodoForm: React.FC<TodoFormProps> = ({
    addTodo,
    initialTitle = '',
    initialDescription = '',
}) => {
    const [title, setTitle] = useState(initialTitle);
    const [description, setDescription] = useState(initialDescription);
    const isEditing = initialTitle.length > 0 ? true : false;

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
            data-testid={isEditing ? 'edit-form' : 'new-todo-form' }
        >
            <input
                type="text"
                className="border rounded w-full p-2 placeholder:italic"
                placeholder="Title*"
                value={title}
                data-testid={isEditing ? 'edit-title-input' : 'new-todo-input' }
                onChange={(e) => setTitle(e.target.value)}
				aria-label='title'
				maxLength={50}
            />
            <textarea
                className={`border rounded w-full p-2 placeholder:italic text-justify ${isEditing ? 'h-[150px]' : ''}`}
                placeholder="Description"
                value={description}
                data-testid={isEditing ? 'edit-description-textarea' : 'new-todo-description'}
                onChange={(e) => setDescription(e.target.value)}
                maxLength={200}
				aria-label='description'
            />
            <button
                type="submit"
                className={`border rounded w-full py-3 bg-kGreen text-kBlack text-xl hover:bg-kDarkGreen ${isEditing ? 'mt-5' : ''}`}
				aria-label='submit-button'
                data-testid={isEditing ? 'save-btn' : 'add-todo-btn'}
            >
                {isEditing ? 'Save' : 'Add'}
            </button>
        </form>
    );
};

export default TodoForm;
