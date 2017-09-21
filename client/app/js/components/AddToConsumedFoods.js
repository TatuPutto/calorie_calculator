import React from 'react';
import PropTypes from 'prop-types';

import PortionSizes from './PortionSizes';
import AddCustomAmountOfFood from './AddCustomAmountOfFood';

export default function AddToConsumedFoods(props) {
    var {
        food,
        selectedFoodId,
        selectedFoodAmount,
        setSelectedFoodAmount,
        addEntry,
        portionSizes,
        addToFavorites,
        removeFromFavorites
    } = props;
    var favoriteToggleFunction = food.isInFavorites ?
            removeFromFavorites : addToFavorites;

    return (
        <div className='add-to-consumed-foods'>
            <AddCustomAmountOfFood
                food={food}
                selectedFoodAmount={selectedFoodAmount}
                setSelectedFoodAmount={setSelectedFoodAmount}
                addEntry={addEntry}
            />
            <PortionSizes
                food={food}
                portionSizes={food.portionSizes}
                addEntry={addEntry}
            />
            {props.viewportWidth < 768 &&
                <div className='food-favorite-action-container'>
                    <span className='food-favorite-status'>
                        <button
                            className='food-add-to-favorites'
                            onClick={() => favoriteToggleFunction(food.id)}
                        >
                            <i className={food.isInFavorites ? 'fa fa-star' : 'fa fa-star-o'} />
                            {food.isInFavorites ? ' Poista suosikeista' : ' Lisää suosikkeihin'}
                        </button>
                    </span>
                </div>
            }
        </div>
    );
}

AddToConsumedFoods.propTypes = {
    food: PropTypes.object.isRequired,
    selectedFoodId: PropTypes.number,
    selectedFoodAmount: PropTypes.string,
    setSelectedFoodAmount: PropTypes.func.isRequired,
    addEntry: PropTypes.func.isRequired
};
