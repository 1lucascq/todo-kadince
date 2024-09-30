import { FILTERS } from './helpers';

export type TFilter = typeof FILTERS[number];

export interface ITodo {
    id: number;
    text: string;
    completed: boolean;
}

export interface ITodoListProps {
    todos: ITodo[];
    activeFilter: TFilter;
	toggleComplete: (id: number) => void;
	editTodo: (id: number, newText: string) => void;
	deleteTodo: (id: number) => void;
}

export interface ITodoItemProps {
	index: number;
    todo: ITodo;
	toggleComplete: (id: number) => void;
	editTodo: (id: number, newText: string) => void;
	deleteTodo: (id: number) => void;
}

export interface IFilterButtonsProps {
    activeFilter: TFilter;
    setActiveFilter: (filter: TFilter) => void;
}