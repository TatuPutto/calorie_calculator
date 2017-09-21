import React from 'react';

export default function SearchPane({searchTerm, changeSearchTerm, doSearch}) {
    return (
        <div className='search'>
                <input
                    type='text'
                    className='search-input'
                    placeholder='Hae ruokaa tai raaka-ainetta'
                    value={searchTerm || ''}
                    onChange={changeSearchTerm}
                    autoFocus
                />
                {/*<button className='do-search' onClick={doSearch}>
                    <i className='fa fa-search' />
                </button>*/}

        </div>
    );
}
