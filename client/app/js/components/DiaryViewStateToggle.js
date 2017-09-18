import React from 'react';
import PropTypes from 'prop-types';

export default function DiaryViewStateToggle(props) {
    return (
        <div className='diary-view-mode-toggle-container'>
            <a onClick={() => props.toggleViewMode('weekView')}>
                Viikkonäkymä
            </a>
            <label className='toggle-diary-view-mode'>
                <input type='checkbox' checked={props.isInDayView} readOnly={true} />
                <span className='slider' />
            </label>
            <a onClick={() => props.toggleViewMode('dayView')}>
                Päivänäkymä
            </a>
        </div>
    );
}

DiaryViewStateToggle.propTypes = {
    isInDayView: PropTypes.bool.isRequired,
    toggleViewMode: PropTypes.func.isRequired,
};
