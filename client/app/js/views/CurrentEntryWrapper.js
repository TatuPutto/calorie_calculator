import React from 'react';

import CurrentEntry from './CurrentEntry';

var viewportWidth = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0
);

export default function CurrentEntryWrapper(props) {
    document.title = 'Ruokapäiväkirja';
    var search = props.location.search;
    var fetchMethod = 'search';
    var searchTerm = '';

    if(search) {
        fetchMethod = search.split('&')[0].match(/search|favorites|latest/g);
        if(fetchMethod) {
            fetchMethod = fetchMethod[0];
        } else {
            fetchMethod = 'search';
        }
    }

    if(fetchMethod == 'search' && search) {
        searchTerm = search.split('&')[1].split('=')[1];
    }

    return (
        <CurrentEntry
            viewportWidth={viewportWidth}
            fetchMethod={fetchMethod}
            searchTerm={searchTerm}
        />
    );
}
