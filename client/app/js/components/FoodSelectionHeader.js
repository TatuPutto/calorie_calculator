import React from 'react';
import PropTypes from 'prop-types';

import SearchTypes from './SearchTypes';
import SearchPane from './SearchPane';

export default function FoodSelectionHeader(props) {
    return (
        <div className='food-selection-header'>
            <SearchTypes
                fetchMethod={props.fetchMethod}
                changeFetchMethod={props.changeFetchMethod}
            />
            {props.fetchMethod == 'haku' &&
                <SearchPane
                    searchTerm={props.searchTerm}
                    changeSearchTerm={props.changeSearchTerm}
                    doSearch={props.doSearch}
                />
            }
        </div>
    );
}

FoodSelectionHeader.propTypes = {
    fetchMethod: PropTypes.string.isRequired,
    changeFetchMethod: PropTypes.func.isRequired,
    searchTerm: PropTypes.string,
    doSearch: PropTypes.func.isRequired,
    changeSearchTerm: PropTypes.func.isRequired
};
