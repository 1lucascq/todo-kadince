import React from 'react';
import KadinceLogo from './KadinceLogo';

const Header: React.FC = () => {
    return (
        <header className="flex items-center px-4 pt-2 bg-fade-bg text-kGreen" data-testid="header">
            <KadinceLogo />
        </header>
    );
};

export default Header;
