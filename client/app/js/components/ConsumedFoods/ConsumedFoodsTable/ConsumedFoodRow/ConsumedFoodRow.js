import React from 'react';
import PropTypes from 'prop-types';

import calcDominantMacro from '../../../../util/calculate-dominant-macronutrient';

export default class ConsumedFoodRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isBeingEdited: false,
            foodAmount: this.props.food.amount,
            validInput: true
        };
        this.toggleEditing = this.toggleEditing.bind(this);
        this.changeFoodAmount = this.changeFoodAmount.bind(this);
        this.update = this.update.bind(this);
    }

    toggleEditing() {
        this.setState({isBeingEdited: !this.state.isBeingEdited});
    }

    changeFoodAmount(event) {
        var foodAmount = event.currentTarget.value.trim();

        this.setState({
            foodAmount: foodAmount,
            validInput: (foodAmount && foodAmount > 0) ? true : false
        });
    }

    update(consumptionId) {
        var foodAmount = this.state.foodAmount.trim();

        if(foodAmount && foodAmount > 0) {
            this.props.updateDiaryEntry(this.props.food.consumptionId, foodAmount)
        }
    }

    render() {
        var {
            food,
            isModifiable,
            addToDiary,
            removeFromDiary,
            updateDiaryEntry
        } = this.props;
        var dominantMacro = calcDominantMacro(food.protein, food.carbs, food.fat);

        return (
            <tr key={food.consumptionId}>
                {isModifiable &&
                    <td className='remove-consumed-food'
                            onClick={() => removeFromDiary(food.consumptionId)}>
                        <i className='fa fa-trash' />
                    </td>
                }
                <td className={'food-name ' + dominantMacro}>{food.name}</td>
                {!isModifiable &&
                    <td className='food-amount'>{food.amount} g</td>
                }

                {isModifiable && this.state.isBeingEdited &&
                    <td className='food-amount'>
                        <input type='text'
                            value={this.state.foodAmount}
                            onChange={this.changeFoodAmount}
                            style={!this.state.validInput ?
                                {borderColor: 'red', boxShadow: '0px 0px 5px red'} : {}
                            }
                        />
                        <button className='do-edit btn btn-default'
                                onClick={this.update}>
                            <i className='fa fa-check' />
                        </button>
                        <button className='cancel-edit btn btn-default'
                                onClick={this.toggleEditing}>
                            <i className='fa fa-close' />
                        </button>
                    </td>
                }

                {isModifiable && !this.state.isBeingEdited &&
                    <td className='food-amount'>
                        <a onClick={() => addToDiary(food.id, food.amount)}>
                            {food.amount} g
                        </a>
                        <br />
                        <a onClick={this.toggleEditing}>
                            Muokkaa
                        </a>
                    </td>
                }

                <td className='energy-amount'>{food.energy} kcal</td>
                <td className='protein-amount'>{food.protein} g</td>
                <td className='carb-amount'>{food.carbs} g</td>
                <td className='fat-amount'>{food.fat} g</td>
            </tr>
        );
    }
}

ConsumedFoodRow.propTypes = {
    food: PropTypes.object.isRequired,
    addToDiary: PropTypes.func,
    removeFromDiary: PropTypes.func,
    updateDiaryEntry: PropTypes.func
};
