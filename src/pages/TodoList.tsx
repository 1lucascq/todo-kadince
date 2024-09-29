import React, { useState } from 'react';
import { Todo, Filter } from '../lib/types';
import TodoForm from '../components/TodoForm';

const App: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    // const [activeFilter, setActiveFilter] = useState<Filter>('All');

    const addTodo = (text: string) => {
        const newTodo: Todo = {
            id: Date.now(),
            text,
            status: 'Pending',
        };
        setTodos([newTodo, ...todos]);
    };

    return (
        <main className="container max-w-lg mx-auto p-4 dark">
            <h1 className="text-2xl font-bold mb-4 text-center">Kadince To-Do's</h1>
            <TodoForm addTodo={addTodo} />
        </main>
    );
};

export default App;
