import React, { useState } from 'react';
import { Todo, Filter } from '../lib/types';
import TodoForm from '../components/TodoForm';

const App: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [activeFilter, setActiveFilter] = useState<Filter>('All');

    function toggleComplete(id: number) {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    }

    function addTodo(text: string) {
        const newTodo: Todo = {
            id: Date.now(),
            text,
            completed: false,
        };
        setTodos([newTodo, ...todos]);
    }

    return (
        <main className="container max-w-xl mx-auto p-4 dark">
            <h1 className="text-2xl my-5 font-bold text-center text-kGreen">
            	To-Dos
            </h1>
            <TodoForm addTodo={addTodo} />
        </main>
    );
};

export default App;
