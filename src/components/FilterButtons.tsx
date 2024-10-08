import React from 'react';
import { IFilterButtonsProps } from '../lib/types';
import { FILTERS } from '../lib/helpers';

const FilterButtons: React.FC<IFilterButtonsProps> = ({
    activeFilter,
    setActiveFilter,
}) => {
    return (
        <div className="mb-5 flex justify-center gap-3">
            {FILTERS.map((filter) => (
                <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-4 py-2 rounded ${
                        activeFilter === filter
                            ? 'bg-kGreen text-kBlack'
                            : 'bg-gray-200 text-kDarkGreen'
                    }`}
                    data-testid={`${filter}-filter`}
                >
                    {filter}
                </button>
            ))}
        </div>
    );
};

export default FilterButtons;
