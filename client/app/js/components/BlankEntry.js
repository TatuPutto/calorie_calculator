import React from 'react';

import drawMacroChart from '../util/draw-macro-chart';

export default function BlankEntry(props) {
    var date = new Date(props.date);
    var dateNames = [
        'Sunnuntai',
        'Maanantai',
        'Tiistai',
        'Keskiviikko',
        'Torstai',
        'Perjantai',
        'Lauantai'
    ];
    var dateName = dateNames[date.getDay()];
    var dateStr = `${dateName}, ${date.getDate()}.${date.getMonth() + 1}`;

    return (
        <div className='col-xs-10 col-sm-5 col-md-3 entry-plain-wrapper'>
            <div className='blank-entry'>
                <div className='blank-entry-header'>
                    <h2>{dateStr}</h2>
                </div>
                <div className='blank-entry-content'>
                    <h3>Ei merkintöjä</h3>
                </div>
            </div>
        </div>
    );
}
