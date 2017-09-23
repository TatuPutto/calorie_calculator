import React from 'react';
import PropTypes from 'prop-types';

import FoodSelectionHeader from './FoodSelectionHeader';
import FoodList from './FoodList';

export default function FoodSelection(props) {
    return (
        <div
            className='food-selection col-md-10 col-sm-12'
            style={{display: props.foodSelectionVisible ? 'initial' : 'none'}}
        >
            <div className='food-selection-wrapper'>
                <FoodSelectionHeader
                    fetchMethod={props.fetchMethod}
                    changeFetchMethod={props.changeFetchMethod}
                    searchTerm={props.searchTerm}
                    changeSearchTerm={props.changeSearchTerm}
                    doSearch={props.doSearch}
                    toggleFoodSelection={props.toggleFoodSelection}
                    viewportWidth={props.viewportWidth}
                />
                <FoodList {...props} />
            </div>
        </div>
    );
}

FoodSelection.propTypes = {
    foods: PropTypes.array.isRequired,
    fetchMethod: PropTypes.string.isRequired,
    fetchError: PropTypes.string,
    isFetchingMatchingFoods: PropTypes.bool.isRequired,
    searchTerm: PropTypes.string,
    changeSearchTerm: PropTypes.func.isRequired,
    doSearch: PropTypes.func.isRequired,
    addEntry: PropTypes.func.isRequired,
    addToFavorites: PropTypes.func.isRequired,
    removeFromFavorites: PropTypes.func.isRequired,
    selectFood: PropTypes.func.isRequired,
    setSelectedFoodAmount: PropTypes.func.isRequired,
    selectedFoodId: PropTypes.number,
    selectedFoodAmount: PropTypes.string,
    viewportWidth: PropTypes.number.isRequired
};
