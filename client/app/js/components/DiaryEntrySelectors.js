import React from 'react';
import PropTypes from 'prop-types';


export default function DiaryEntrySelectors(props) {
    var {canGoForward, canGoBack, isInDayView, date, week, changeEntry} = props;

    return (
        <div className='change-date-selection'>
            <button onClick={()=> changeEntry('previous')} disabled={!canGoBack}>
                <i className='fa fa-chevron-left' />
            </button>
            <span className='selected-entry'>
                {isInDayView ? (
                    <h2>{date ? date.replace(/[-]/g, '.') : ''}</h2>
                ) : (
                    <h2>{'Viikko ' + week}</h2>
                )}
            </span>
            <button onClick={()=> changeEntry('next')} disabled={!canGoForward}>
                <i className='fa fa-chevron-right' />
            </button>
        </div>
    );
}

DiaryEntrySelectors.propTypes = {
    canGoForward: PropTypes.bool.isRequired,
    canGoForward: PropTypes.bool.isRequired,
    isInDayView: PropTypes.bool.isRequired,
    changeEntry: PropTypes.func.isRequired
};
