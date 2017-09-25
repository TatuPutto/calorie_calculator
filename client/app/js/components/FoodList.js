import React from 'react';
import PropTypes from 'prop-types';

import FoodListHeader from './FoodListHeader';
import FoodItem from './FoodItem';
import FoodItemCompact from './FoodItemCompact';
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
        doSearch
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
        var Component = viewportWidth > 768 ? FoodItem : FoodItemCompact;


        foods.forEach((food, i) => {
            if(fetchMethod == 'search') {
                if(food.isInFavorites && !favoritesCategorySeparated) {
                    favoritesCategorySeparated = true;
                    foodItems.push(
                        <li key={'favorites-separator'} key='favorites' className='category-separator'>
                            <i className='fa fa-star' />Suosikit
                        </li>
                    );
                } else if(!food.isInFavorites && food.history > 0 && !latestCategorySeparated) {
                    latestCategorySeparated = true;
                    foodItems.push(
                        <li key={'latest-separator'} className='category-separator'>
                            <i className='fa fa-history' />Viimeaikaiset
                        </li>
                    );
                } else if(!food.isInFavorites && food.history === 0 &&
                          !latestCategorySeparated && !regularResultsSeparated) {
                    regularResultsSeparated = true;
                    foodItems.push(
                        <li key={'best-match-separator'} className='category-separator'>
                            <i className='fa fa-search' />Osuvimmat hakutulokset
                        </li>
                    );
                } else if(food.history === 0 && latestCategorySeparated && !regularResultsSeparated) {
                    regularResultsSeparated = true;
                    foodItems.push(
                        <li key={'best-match-separator'} className='category-separator'>
                            <i className='fa fa-search' />Osuvimmat hakutulokset
                        </li>
                    );
                }
            }

            foodItems.push(<Component key={food.id} food={food} {...props} />);
        });

        matchingFoodsOutput = <ul className='food-list'>{foodItems}</ul>;
    }

    return (
        <div className='food-list-wrapper'>
            <FoodListHeader
                viewportWidth={props.viewportWidth}
                fetchMethod={props.fetchMethod}
            />
            {matchingFoodsOutput}
        </div>
    );
}

FoodList.propTypes = {
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
