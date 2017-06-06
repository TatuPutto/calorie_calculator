import React from 'react';

import CurrentEntry from './CurrentEntry';

var viewportWidth = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0
);

export default function CurrentEntryWrapper(props) {
    var pathname = props.location.pathname;
    var search = props.location.search;
    var fetchMethod;

    // resolve fetchMethod from pathname
    if(pathname == '/current-entry') {
        fetchMethod = 'haku';
    } else {
        fetchMethod = pathname.match(/haku|suosikit|viimeisimmat/g)[0];
    }

    // set which food item is to be searched for
    // defaults to maitorahka if no query params are present
    if(!search) {
        search = 'maitorahka';
    } else {
        search = search.split('=')[1];
    }

    return (
        <CurrentEntry
            viewportWidth={viewportWidth}
            fetchMethod={fetchMethod}
            search={search}
        />
    );
}
