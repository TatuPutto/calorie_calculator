import React from 'react';

export default function SearchPane({changeSearchTerm, doSearch}) {
    return (
        <div className='search'>
            <form onSubmit={doSearch}>
                <input
                    type='text'
                    className='search-input'
                    placeholder='Hae ruokaa tai raaka-ainetta'
                    onChange={changeSearchTerm}
                />
                <button className='do-search' onClick={doSearch}>
                    <i className='fa fa-search' />
                </button>
            </form>
        </div>
    );
}
