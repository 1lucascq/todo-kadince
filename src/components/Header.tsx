import React from 'react';
import KadinceLogo from './KadinceLogo';

const Header: React.FC = () => {
    return (
		<header className="container max-w-2xl mx-auto p-4 bg-fade-bg text-kGreen" data-testid="header">
			<KadinceLogo />
		</header>
    );
};

export default Header;
