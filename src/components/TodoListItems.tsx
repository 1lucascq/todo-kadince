import React from 'react';
import { Todo } from '../lib/types';
import TodoItem from './TodoItem';
import { TodoListProps } from '../lib/types';

const TodoList: React.FC<TodoListProps> = ({
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
        <ul>
            {filteredTodos.map((todo) => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
					toggleComplete={toggleComplete}
					editTodo={editTodo}
					deleteTodo={deleteTodo}
                />
            ))}
        </ul>
    );
};

export default TodoList;
