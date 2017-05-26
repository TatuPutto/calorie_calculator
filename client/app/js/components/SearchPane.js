import React from 'react';

export default function SearchPane(props) {
    return (
        <div className='search'>
            <input
                type='text'
                className='search-input'
                placeholder='Hae ruokaa tai raaka-ainetta'
                onKeyUp={props.changeSearchTerm}
            />
            <button className='do-search' onClick={props.doSearch}>
                <i className='fa fa-search' />
            </button>
        </div>
    );
}
