import React from 'react';
import PropTypes from 'prop-types';

import SingleFood from './SingleFood';

export default function FoodList(props) {
    var foods = [];
    if(props.viewportWidth < 768) {
        foods = props.foods.slice(0, (props.offset + 10));
    } else {
        foods = props.foods;
    }

    return (
        <ul className='food-list'>
            <li style={{color: 'white', background: '#2894e2', fontSize: '13px', height: '24px'}}>
                <span style={{width: '66%', textAlign: 'center', verticalAlign: 'top', lineHeight: '23px'}}>
                    Ravintoaine <i className='fa fa-caret-down' style={{color: '#fff', fontSize: '15px', verticalAlign: 'middle'}}/>
                </span>

                <span style={{width: '10%', textAlign: 'center', verticalAlign: 'top', lineHeight: '23px', borderLeft: '1px solid #fff'}}>
                    kcal / 100 g
                </span>
                <span style={{width: '8%', textAlign: 'center', verticalAlign: 'top', lineHeight: '23px', borderLeft: '1px solid #fff'}}>
                    P / 100 g
                </span>
                <span style={{width: '8%', textAlign: 'center', verticalAlign: 'top', lineHeight: '23px', borderLeft: '1px solid #fff'}}>
                    HH / 100 g
                </span>
                <span style={{width: '8%', textAlign: 'center', verticalAlign: 'top', lineHeight: '23px'}}>
                    R / 100 g
                </span>
            </li>

            {foods.map(function (food) {
                return (
                    <SingleFood
                        key={food.id}
                        viewportWidth={props.viewportWidth}
                        food={food}
                        selectFood={props.selectFood}
                        setSelectedFoodAmount={props.setSelectedFoodAmount}
                        selectedFoodId={props.selectedFoodId}
                        selectedFoodAmount={props.selectedFoodAmount}
                        addToDiary={props.addToDiary}
                        addToFavorites={props.addToFavorites}
                        removeFromFavorites={props.removeFromFavorites}
                    />
                );
            })}
        </ul>
    );
}

FoodList.propTypes = {
    viewportWidth: PropTypes.number.isRequired,
    foods: PropTypes.array.isRequired,
    addToDiary: PropTypes.func.isRequired,
    addToFavorites: PropTypes.func.isRequired,
    removeFromFavorites: PropTypes.func.isRequired,
    selectFood: PropTypes.func.isRequired,
    setSelectedFoodAmount: PropTypes.func.isRequired,
    selectedFoodId: PropTypes.string,
    selectedFoodAmount: PropTypes.string
};
