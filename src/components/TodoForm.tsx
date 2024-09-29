import React, { useState } from 'react';

interface TodoFormProps {
    addTodo: (text: string) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ addTodo }) => {
    const [text, setText] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (text.trim()) {
            addTodo(text.trim());
            setText('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <input
                type="text"
                className="border rounded w-full py-4 px-5 placeholder:italic"
                placeholder="I need to do..."
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
        </form>
    );
};

export default TodoForm;
