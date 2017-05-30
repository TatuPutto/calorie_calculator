import React from 'react';
import PropTypes from 'prop-types';

import SearchTypes from './SearchTypes';
import FoodList from './FoodList';
import SearchPane from './SearchPane';
import ShowMoreResultsButton from './ShowMoreResultsButton';

export default function FoodSelection(props) {
    var {
        viewportWidth,
        fetchMethod,
        fetchError,
        isFetchingMatchingFoods,
        foods,
        searchTerm,
        changeSearchTerm,
        doSearch,
        offset,
        showMoreResults
    } = props;
    var matchingFoodsOutput = null;

    if(fetchError) {
        matchingFoodsOutput = <p>{fetchError}</p>;
    } else if(isFetchingMatchingFoods) {
        matchingFoodsOutput = <i className='fa fa-spinner fa-3x fa-spin' />;
    } else if(foods.length === 0 && !isFetchingMatchingFoods && !fetchError) {
        matchingFoodsOutput = (
            <div className='no-results'>
                Syötettä vastaavia elintarvikkeita ei löytynyt
            </div>
        );
    } else {
        matchingFoodsOutput = (
            <div>
                <FoodList {...props} />
                <ShowMoreResultsButton
                    viewportWidth={viewportWidth}
                    foodsAmount={foods.length}
                    offset={offset}
                    showMoreResults={showMoreResults}
                />
            </div>
        );
    }

    return (
        <div className='food-selection col-md-10 col-sm-12'>
                <div className='food-selection-header'>
                    <SearchTypes
                        fetchMethod={props.fetchMethod}
                        changeFetchMethod={props.changeFetchMethod}
                    />
                    {fetchMethod == 'haku' &&
                        <SearchPane
                            searchTerm={props.searchTerm}
                            changeSearchTerm={props.changeSearchTerm}
                            doSearch={props.doSearch}
                        />
                    }
                </div>
                {matchingFoodsOutput}
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
