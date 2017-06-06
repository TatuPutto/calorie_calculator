import React from 'react';
import PropTypes from 'prop-types';

import getCurrentDate from '../../util/get-current-date';

export default function SelectDiaryEntry(props) {
    var {activeEntryDate, diaryEntries, changeEntry} = props;

    return (
        <div className='diary-entry-selection'>
            {activeEntryDate != diaryEntries[diaryEntries.length - 1] &&
                    diaryEntries.length > 0 ?
                <button onClick={()=> changeEntry('previous')}>
                    <i className='fa fa-chevron-left' />
                </button>
                :
                <button style={{opacity: '0.5', cursor: 'not-allowed'}}>
                    <i className='fa fa-chevron-left' />
                </button>
            }

            <span className='selected-entry'>
                {activeEntryDate.replace(/[-]/g, '.')}
            </span>

            {activeEntryDate != getCurrentDate() && activeEntryDate != diaryEntries[0] &&
                    diaryEntries.length > 0 ?
                <button onClick={()=> changeEntry('next')}>
                    <i className='fa fa-chevron-right' />
                </button>
                :
                <button style={{opacity: '0.5', cursor: 'not-allowed'}}>
                    <i className='fa fa-chevron-right' />
                </button>
            }
        </div>
    );
}

SelectDiaryEntry.propTypes = {
    activeEntryDate: PropTypes.string.isRequired,
    diaryEntries: PropTypes.array.isRequired,
    changeEntry: PropTypes.func.isRequired,
};
