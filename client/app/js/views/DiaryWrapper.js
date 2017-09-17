import React from 'react';

import Diary from './Diary';
import getCurrentDate from '../util/get-current-date';

var viewportWidth = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0
);

export default function DiaryWrapper(props) {
    var isInSingleEntryState = true;
    var date, week;

    if(props.location.search) {
        var query = props.location.search.split('=');

        if(query[0] == '?week') {
            isInSingleEntryState = false
            week = query[1];
        } else if(query[0] == '?date') {
            isInSingleEntryState = true;
            date = query[1];
        } else {
            date = getCurrentDate();
        }
    } else {
        date = getCurrentDate();
    }

    return (
        <Diary
            viewportWidth={viewportWidth}
            isInSingleEntryState={isInSingleEntryState}
            date={date}
            from={week}
        />
    );
}
