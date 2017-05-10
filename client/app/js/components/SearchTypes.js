import React from 'react';

export default function SearchTypes(props) {
    var fetchMethod = props.fetchMethod;

    return (
        <div className='search-types'>
            <button className={fetchMethod == 'haku' ? 'active' : ''}
                    onClick={() => props.changeFetchMethod('haku')}>
                <i className='fa fa-search' style={{marginRight: '6px'}} />Haku
            </button>
            <button className={fetchMethod == 'suosikit' ? 'active' : ''}
                    onClick={() => props.changeFetchMethod('suosikit')}>
                <i className='fa fa-star' style={{marginRight: '6px'}} />Suosikit
            </button>
            <button className={fetchMethod == 'viimeisimmat' ? 'active' : ''}
                    onClick={() => props.changeFetchMethod('viimeisimmat')}>
                <i className='fa fa-history' style={{marginRight: '6px'}} />Viimeisimmät
            </button>
        </div>
    );
}
