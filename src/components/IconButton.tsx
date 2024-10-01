import React from 'react';
import { IconButtonProps } from '../lib/types';

const IconButton: React.FC<IconButtonProps> = ({ className, onClick, dataTestId, children }) => {
    return (
	<button className={`font-bold flex-1 ${className}`} onClick={onClick} data-testid={dataTestId}>
            {children}
        </button>
    );
};

export default IconButton;