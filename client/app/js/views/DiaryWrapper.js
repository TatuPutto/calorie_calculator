import React from 'react';

import Diary from './Diary';

var viewportWidth = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0
);

export default function DiaryWrapper(props) {
    var activeEntryDate = null;
    if(props.location.search) {
        activeEntryDate = props.location.search.split('=')[1];
    } else {
        activeEntryDate = getCurrentDate();
    }

    return <Diary viewportWidth={viewportWidth} activeEntryDate={activeEntryDate} />;
}
