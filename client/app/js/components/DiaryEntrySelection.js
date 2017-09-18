import React from 'react';
import PropTypes from 'prop-types';

import DiaryViewStateToggle from './DiaryViewStateToggle';
import DiaryEntrySelectors from './DiaryEntrySelectors';
import {getCurrentDate, getCurrentWeek} from '../util/date-functions';


export default function DiaryEntrySelection(props) {
    var {
        isInDayView,
        date,
        week,
        entries,
        changeEntry
    } = props;

    // conditions for showing next and previous indicators in day view
    var thereIsPreviousEntry = date != entries[entries.length - 1] && entries.length > 0;
    var thereIsNextEntry = date != getCurrentDate() && date != entries[0] && entries.length > 0;

    // conditions for showing next indicator in week view
    var notCurrentWeek = (week + 1) <= getCurrentWeek();

    // apply correct condition
    var canGoForward = isInDayView ? thereIsNextEntry : notCurrentWeek;
    var canGoBack = isInDayView ? thereIsPreviousEntry : true;

    return (
        <div className='diary-entry-selection'>
            <DiaryViewStateToggle
                isInDayView={isInDayView}
                toggleViewMode={props.toggleViewMode}
            />
            <DiaryEntrySelectors
                isInDayView={isInDayView}
                date={date}
                week={week}
                canGoForward={canGoForward}
                canGoBack={canGoBack}
                changeEntry={changeEntry}
            />
        </div>
    );
}

DiaryEntrySelection.propTypes = {
    date: PropTypes.string,
    week: PropTypes.number,
    entries: PropTypes.array.isRequired,
    changeEntry: PropTypes.func.isRequired
};
