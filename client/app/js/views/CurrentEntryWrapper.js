import React from 'react';

import CurrentEntry from './CurrentEntry';

var viewportWidth = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0
);

export default function CurrentEntryWrapper(props) {
    document.title = 'Ruokapäiväkirja';
    var pathname = props.location.pathname;
    var search = props.location.search.split('=')[1] || ' ';
    var fetchMethod;

    // resolve fetchMethod from pathname
    if(pathname == '/current-entry') {
        fetchMethod = 'search';
    } else {
        fetchMethod = pathname.match(/search|favorites|latest/g)[0];
    }

    return (
        <CurrentEntry
            viewportWidth={viewportWidth}
            fetchMethod={fetchMethod}
            search={search}
        />
    );
}
