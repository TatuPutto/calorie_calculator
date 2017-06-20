import React from 'react';
import PropTypes from 'prop-types';

import FoodListHeader from './FoodListHeader';
import FoodItem from './FoodItem';
import FoodItemCompactLayout from './FoodItemCompactLayout';
import ShowMoreResults from './ShowMoreResults';
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
        var favoritesCategorySeparated = false;
        var latestCategorySeparated = false;
        var regularResultsSeparated = false;

        if(props.viewportWidth > 768) {
            props.foods.forEach((food, i) => {
                if(fetchMethod == 'search') {
                    if(food.favorite && !favoritesCategorySeparated) {
                        favoritesCategorySeparated = true;
                        foodItems.push(
                            <li className='category-separator'>
                                <i className='fa fa-star' />Suosikit
                            </li>
                        );
                    } else if(!food.favorite && food.latelyConsumed && !latestCategorySeparated) {
                        latestCategorySeparated = true;
                        foodItems.push(
                            <li className='category-separator'>
                                <i className='fa fa-history' />Viimeaikaiset
                            </li>
                        );
                    } else if (!food.latelyConsumed && latestCategorySeparated && !regularResultsSeparated) {
                        regularResultsSeparated = true;
                        foodItems.push(
                            <li className='category-separator'>
                                <i className='fa fa-search' />Hakutulokset
                            </li>
                        );
                    }
                }

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
        <div className='food-list-wrapper'>
            <FoodListHeader
                viewportWidth={props.viewportWidth}
                fetchMethod={props.fetchMethod}
            />
            {matchingFoodsOutput}
            <ShowMoreResults
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
