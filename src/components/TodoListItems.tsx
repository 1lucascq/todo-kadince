import React from 'react';
import TodoItem from './TodoItem';
import { ITodoListProps } from '../lib/types';

const TodoListItems: React.FC<ITodoListProps> = ({
    todos,
    activeFilter,
	toggleComplete,
	editTodo,
	deleteTodo
}) => {
    const filteredTodos = todos.filter((todo) => {
        if (activeFilter === 'All') return true;
        if (activeFilter === 'Pending') return !todo.completed;
        if (activeFilter === 'Completed') return todo.completed;
        return true;
    });

    return (
        <ul data-testid="todo-list" className='flex flex-col gap-5'>
            {filteredTodos.map((todo, index) => (
                <TodoItem
                    key={todo.id}
                    index={index}
                    todo={todo}
					toggleComplete={toggleComplete}
					editTodo={editTodo}
					deleteTodo={deleteTodo}
                />
            ))}
        </ul>
    );
};

export default TodoListItems;
