import React from 'react';

import Diary from './Diary';
import {getCurrentDate, getCurrentWeek, padDate} from '../util/date-functions';

var viewportWidth = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0
);

export default function DiaryWrapper(props) {
    var isInDayView = true;
    var date = null
    var week = null;

    if(props.location.search) {
        var query = props.location.search.split('=');

        if(query[0] == '?week') {
            isInDayView = false;
            week = +query[1];

            if(week < 1 || week > 52) {
                week = getCurrentWeek();
            }
        } else if(query[0] == '?date') {
            isInDayView = true;
            date = query[1];

            if(date.length < 10) {
                date = padDate(date, '-');
            }
        } else {
            date = getCurrentDate();
        }
    } else {
        date = getCurrentDate();
    }

    return (
        <Diary
            viewportWidth={viewportWidth}
            isInDayView={isInDayView}
            date={date}
            week={week}
        />
    );
}
