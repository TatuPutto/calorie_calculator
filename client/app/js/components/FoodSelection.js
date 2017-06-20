import React from 'react';
import PropTypes from 'prop-types';

import FoodSelectionHeader from './FoodSelectionHeader';
import FoodList from './FoodList';

export default function FoodSelection(props) {
    return (
        <div className='food-selection col-md-9 col-sm-12 col-md-offset-1'>
            <FoodSelectionHeader
                fetchMethod={props.fetchMethod}
                changeFetchMethod={props.changeFetchMethod}
                searchTerm={props.searchTerm}
                changeSearchTerm={props.changeSearchTerm}
                doSearch={props.doSearch}
            />
            <FoodList {...props} />
        </div>
    );
}

FoodSelection.propTypes = {
    viewportWidth: PropTypes.number.isRequired,
    fetchMethod: PropTypes.string.isRequired,
    fetchError: PropTypes.string,
    isFetchingMatchingFoods: PropTypes.bool.isRequired,
    foods: PropTypes.array.isRequired,
    offset: PropTypes.number.isRequired,
    searchTerm: PropTypes.string,
    changeSearchTerm: PropTypes.func.isRequired,
    doSearch: PropTypes.func.isRequired,
    showMoreResults: PropTypes.func.isRequired,
    addToDiary: PropTypes.func.isRequired,
    addToFavorites: PropTypes.func.isRequired,
    removeFromFavorites: PropTypes.func.isRequired,
    selectFood: PropTypes.func.isRequired,
    setSelectedFoodAmount: PropTypes.func.isRequired,
    selectedFoodId: PropTypes.string,
    selectedFoodAmount: PropTypes.string
};
