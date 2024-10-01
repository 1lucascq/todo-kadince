import { FILTERS } from './helpers';

export type TFilter = typeof FILTERS[number];

export interface ITodo {
    id: number;
    title: string;
	description: string;
    completed: boolean;
}

interface IManageTodosFunctions {
	toggleComplete: (id: number) => void;
	editTodo: (id: number, title: string, description: string) => void;
	deleteTodo: (id: number) => void;
}

export interface ITodoListProps extends IManageTodosFunctions {
    todos: ITodo[];
    activeFilter: TFilter;
}

export interface ITodoItemProps extends IManageTodosFunctions {
	index: number;
    todo: ITodo;
}

export interface IFilterButtonsProps {
    activeFilter: TFilter;
    setActiveFilter: (filter: TFilter) => void;
}

export interface TodoFormProps {
    addTodo: (title: string, description: string) => void;
	initialTitle?: string;
	initialDescription?: string;
}

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export interface IconButtonProps {
    className: string;
    onClick: () => void;
    dataTestId: string;
    children: React.ReactNode;
}