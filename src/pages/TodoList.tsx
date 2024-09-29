import React, { useEffect, useState } from 'react';
import { Todo, Filter } from '../lib/types';
import TodoForm from '../components/TodoForm';
import TodoListItems from '../components/TodoListItems';
import FilterButtons from '../components/FilterButtons';

const App: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [activeFilter, setActiveFilter] = useState<Filter>('All');

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
	}, [todos])

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

    function deleteTodo(id: number) {
        setTodos(todos.filter((todo) => todo.id !== id));
    }

    function editTodo(id: number, newText: string) {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, text: newText } : todo
            )
        );
    }

    return (
        <main className="container max-w-xl mx-auto p-4 dark">
            <h1 className="text-2xl my-5 font-bold text-center text-kGreen">
                Kadince Task Manager
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
