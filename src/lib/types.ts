import { FILTERS } from './helpers';

export type Filter = typeof FILTERS[number];

export interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

export interface TodoListProps {
    todos: Todo[];
    activeFilter: Filter;
	toggleComplete: (id: number) => void;
	editTodo: (id: number, newText: string) => void;
	deleteTodo: (id: number) => void;
}

export interface TodoItemProps {
    todo: Todo;
	toggleComplete: (id: number) => void;
	editTodo: (id: number, newText: string) => void;
	deleteTodo: (id: number) => void;
}

export interface FilterButtonsProps {
    activeFilter: Filter;
    setActiveFilter: (filter: Filter) => void;
}