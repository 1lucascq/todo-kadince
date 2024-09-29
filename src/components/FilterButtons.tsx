import React from 'react';
import { FilterButtonsProps } from '../lib/types';
import { FILTERS } from '../lib/helpers';

const FilterButtons: React.FC<FilterButtonsProps> = ({ activeFilter, setActiveFilter }) => {;
    return (
        <div className="mb-4">
            {FILTERS.map(filter => (
                <button
                    key={filter}
                    onClick={() =>
                        setActiveFilter(filter)
                    }
                    className={`px-4 py-2 mr-2 rounded ${
                        activeFilter === filter ? 'bg-kGreen text-kBlack' : 'bg-gray-200 text-kDrakGreen'
                    }`}
                >
                    {filter}
                </button>
            ))}
        </div>
    );
};

export default FilterButtons;
