import React from 'react';

export default function SearchTypes(props) {
    var fetchMethod = props.fetchMethod;

    return (
        <div className='search-types'>
            <button className={fetchMethod == 'haku' ? 'active' : ''}
                    onClick={() => props.changeFetchMethod('haku')}>
                Haku
            </button>
            <button className={fetchMethod == 'suosikit' ? 'active' : ''}
                    onClick={() => props.changeFetchMethod('suosikit')}>
                Suosikit
            </button>
            <button className={fetchMethod == 'viimeisimmat' ? 'active' : ''}
                    onClick={() => props.changeFetchMethod('viimeisimmat')}>
                Viimeisimmät
            </button>
        </div>
    );
}
