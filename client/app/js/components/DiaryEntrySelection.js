import React from 'react';
import PropTypes from 'prop-types';

import getCurrentDate from '../util/get-current-date';

export default function DiaryEntrySelection(props) {
    var {
        isInSingleEntryState,
        date,
        diaryEntries,
        changeEntry
    } = props;

    var now = new Date("09.24.2017");
    var start = new Date(now.getFullYear(), 0, 0);
    var diff = now - start;
    var oneDay = 1000 * 60 * 60 * 24;
    var day = Math.floor(diff / oneDay);
    var weekOfYear = Math.ceil(day / 7);

    return (
        <div className='diary-entry-selection'>
            <div style={{color: '#fff', marginBottom: '6px'}}>
                <a style={{color: '#fff'}} onClick={props.toggleViewMode}>
                    Viikkonäkymä
                </a>
                <label className='toggle-diary-view-mode'>
                    <input
                        type='checkbox'
                        checked={isInSingleEntryState}
                    />
                    <span className='slider' />
                </label>
                <a style={{color: '#fff'}} onClick={props.toggleViewMode}>
                    Päivänäkymä
                </a>
            </div>

            {date != diaryEntries[diaryEntries.length - 1] &&
             diaryEntries.length > 0 ? (
                <button onClick={()=> changeEntry('previous')}>
                    <i className='fa fa-chevron-left' />
                </button>
            ) : (
                <button style={{opacity: '0.5', cursor: 'not-allowed'}}>
                    <i className='fa fa-chevron-left' />
                </button>
            )}

            <span className='selected-entry'>
                {isInSingleEntryState ? (
                    <p>{date.replace(/[-]/g, '.')}</p>
                ) : (
                    <p>{'Viikko ' + weekOfYear}</p>
                )}
            </span>

            {date != getCurrentDate() && date != diaryEntries[0] &&
             diaryEntries.length > 0 ? (
                <button onClick={()=> changeEntry('next')}>
                    <i className='fa fa-chevron-right' />
                </button>
            ) : (
                <button style={{opacity: '0.5', cursor: 'not-allowed'}}>
                    <i className='fa fa-chevron-right' />
                </button>
            )}
        </div>
    );
}

DiaryEntrySelection.propTypes = {
    date: PropTypes.string.isRequired,
    diaryEntries: PropTypes.array.isRequired,
    changeEntry: PropTypes.func.isRequired,
};
