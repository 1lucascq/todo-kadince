import React, { useEffect, useState } from 'react';
import { ITodo, TFilter } from '../lib/types';
import TodoForm from '../components/TodoForm';
import TodoListItems from '../components/TodoListItems';
import FilterButtons from '../components/FilterButtons';

const App: React.FC = () => {
    const [todos, setTodos] = useState<ITodo[]>([]);
    const [activeFilter, setActiveFilter] = useState<TFilter>('All');

    useEffect(() => {
        const storedTodos = localStorage.getItem('todos');
        if (storedTodos) {
            setTodos(JSON.parse(storedTodos));
        }
    }, []);

    useEffect(() => {
        if (todos.length > 0) {
            localStorage.setItem('todos', JSON.stringify(todos));
        }
    }, [todos]);

    function toggleComplete(id: number) {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    }

    function addTodo(title: string, description: string) {
        const newTodo: ITodo = {
            id: Date.now(),
            title,
            description,
            completed: false,
        };
        setTodos([newTodo, ...todos]);
    }

    function deleteTodo(id: number) {
        setTodos(todos.filter((todo) => todo.id !== id));
    }

    function editTodo(id: number, title: string, description: string) {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, title, description } : todo
            )
        );
    }

    return (
        <main className="container max-w-2xl mx-auto p-4 dark">
            <h1
                data-testid="title"
                className="text-2xl my-5 font-bold text-center text-kGreen"
            >
                Kadince Personal Task Manager
            </h1>
            <TodoForm addTodo={addTodo} />
            <FilterButtons
                activeFilter={activeFilter}
                setActiveFilter={setActiveFilter}
            />
            <TodoListItems
                todos={todos}
                activeFilter={activeFilter}
                toggleComplete={toggleComplete}
                editTodo={editTodo}
                deleteTodo={deleteTodo}
            />
        </main>
    );
};

export default App;
