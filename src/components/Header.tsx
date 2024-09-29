import React from 'react';
import { ReactComponent as Kadince } from '../lib/kadince.svg';

const Header: React.FC = () => {
    return (
        <header className="flex items-center px-4 pt-2 bg-fade-bg text-kGreen">
            <Kadince />
        </header>
    );
};

export default Header;
