import React from 'react';

export default function SearchTypes(props) {
    var fetchMethod = props.fetchMethod;

    return (
        <div className='search-type'>
            <button className={fetchMethod == 'search' ? 'active' : ''}
                    onClick={() => props.changeFetchMethod('search')}>
                Haku
            </button>
            <button className={fetchMethod == 'favorites' ? 'active' : ''}
                    onClick={() => props.changeFetchMethod('favorites')}>
                Suosikit
            </button>
            <button className={fetchMethod == 'latest' ? 'active' : ''}
                    onClick={() => props.changeFetchMethod('latest')}>
                Viimeisimmät
            </button>
        </div>
    );
}
