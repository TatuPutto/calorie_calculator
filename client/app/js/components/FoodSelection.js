import React from 'react';
import PropTypes from 'prop-types';

import SearchTypes from './SearchTypes';
import FoodList from './FoodList';
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
        matchingFoodsOutput = <p>Syötettä vastaavia elintarvikkeita ei löytynyt</p>
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
        <div className='food-selection'>
            <div className='food-selection-wrapper col-lg-10 col-md-10 col-sm-12 col-md-offset-1 col-lg-offset-1'>
                <div className='matching-foods'>
                    {fetchMethod == 'haku' &&
                        <div className='search'>
                            <input
                                type='text'
                                className='search-input'
                                placeholder='Hae ruokaa tai raaka-ainetta'
                                defaultValue={searchTerm}
                                onKeyUp={changeSearchTerm}
                            />
                            <button className='do-search' onClick={doSearch}>
                                <i className='fa fa-search' />
                            </button>
                        </div>
                    }
                    <div className='text-right' style={{marginBottom: '5px'}}>
                        {(props.offset + 1) + ' - ' + (props.offset + 10) + ' / ' + props.foods.length}
                        {(props.offset - 10) > 0 && props.foods.length > 10 &&        
                            <button className='btn btn-default' style={{padding: '7px 11px', marginLeft: '5px', border: 'none', fontSize: '10px', cursor: 'not-allowed'}}>
                                <i className='fa fa-chevron-left'  style={{color: '#d0c6c6', verticalAlign: 'middle'}} />
                            </button>
                        }
                        {(props.offset + 10) < props.foods.length && props.foods.length > 10 &&

                            <button className='btn btn-default' onClick={props.showMoreResults} style={{padding: '7px 11px', fontSize: '10px'}}>
                                <i className='fa fa-chevron-right' style={{verticalAlign: 'middle'}} />
                            </button>
                        }
                    </div>
                    {matchingFoodsOutput}
                </div>
            </div>
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
