import React from 'react';

import CurrentEntry from './CurrentEntry';

var viewportWidth = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0
);

export default function CurrentEntryWrapper(props) {
    document.title = 'Ruokapäiväkirja';
    var search = props.location.search;
    var fetchMethod;
    var searchTerm = '';

    if(!search) {
        location.href = '/current-entry?sort=search&q=';
    } else {
        fetchMethod = search.split('&')[0].match(/search|favorites|latest/g)[0];
    }

    if(fetchMethod == 'search') {
        searchTerm = search.split('&')[1].split('=')[1] || ' ';
    }

    return (
        <CurrentEntry
            viewportWidth={viewportWidth}
            fetchMethod={fetchMethod}
            searchTerm={searchTerm}
        />
    );
}
