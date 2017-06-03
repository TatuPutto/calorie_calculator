import React from 'react';
import PropTypes from 'prop-types';

import FoodListHeader from './FoodListHeader';
import FoodItem from './FoodItem';
import FoodItemCompactLayout from './FoodItemCompactLayout';
import ShowMoreResultsButton from './ShowMoreResultsButton';
import Loading from './Loading';

export default function FoodList(props) {
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
    var foodItems = [];
    var matchingFoodsOutput = null;

    if(fetchError) {
        matchingFoodsOutput = <p>{fetchError}</p>;
    } else if(isFetchingMatchingFoods) {
        matchingFoodsOutput = <Loading />;
    } else if(foods.length === 0 && !isFetchingMatchingFoods && !fetchError) {
        matchingFoodsOutput = (
            <div className='no-results'>
                Syötettä vastaavia elintarvikkeita ei löytynyt.
            </div>
        );
    } else {
        if(props.viewportWidth > 768) {
            props.foods.forEach((food) => {
                foodItems.push(<FoodItem key={food.id} food={food} {...props} />);
            });
        } else {
            props.foods.slice(0, (props.offset + 10)).forEach((food) => {
                foodItems.push(
                    <FoodItemCompactLayout key={food.id} food={food} {...props} />
                );
            });
        }

        matchingFoodsOutput = (
            <ul className='food-list'>
                {foodItems}
            </ul>
        );
    }

    return (
        <div>
            <FoodListHeader
                viewportWidth={props.viewportWidth}
                fetchMethod={props.fetchMethod}
            />
            {matchingFoodsOutput}
            <ShowMoreResultsButton
                viewportWidth={viewportWidth}
                foodsAmount={props.foods.length}
                offset={offset}
                showMoreResults={showMoreResults}
            />
        </div>
    );
}

FoodList.propTypes = {
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
