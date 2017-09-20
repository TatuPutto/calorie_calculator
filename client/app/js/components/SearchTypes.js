import React from 'react';

export default function SearchTypes(props) {
    var {
        viewportWidth,
        toggleFoodSelection,
        fetchMethod,
        changeFetchMethod,
    } = props;

    return (
        <div className='search-types'>
            {viewportWidth < 767 &&
                <button className='close-food-selection' onClick={toggleFoodSelection}>
                    <i className='fa fa-arrow-left' />
                </button>
            }
            <button className={fetchMethod == 'search' ? 'active' : ''}
                    onClick={() => changeFetchMethod('search')}>
                <i className='fa fa-search' />Haku
            </button>
            <button className={fetchMethod == 'favorites' ? 'active' : ''}
                    onClick={() => changeFetchMethod('favorites')}>
                <i className='fa fa-star' />Suosikit
            </button>
            <button className={fetchMethod == 'latest' ? 'active' : ''}
                    onClick={() => changeFetchMethod('latest')}>
                <i className='fa fa-history' />Viimeisimmät
            </button>
        </div>
    );
}
