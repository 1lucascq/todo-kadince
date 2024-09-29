import React from 'react';
import TodoList from './pages/TodoList';
import Header from './components/Header';

const App: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <div className="flex-grow">
                <TodoList />
            </div>
        </div>
    );
};

export default App;
