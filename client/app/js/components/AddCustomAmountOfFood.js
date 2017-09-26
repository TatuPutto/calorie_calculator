import React from 'react';
import PropTypes from 'prop-types';


export default function AddCustomAmountOfFood(props) {
    var {food, selectedFoodAmount, setSelectedFoodAmount, addEntry} = props;
    var cn = 'add-custom-amount' + (food.portionSizes ? '' : ' no-portion-sizes');

    return (
        <div className={cn}>
            <form onSubmit={() => addEntry(food, selectedFoodAmount)}>
                <input
                    type='number'
                    placeholder='Annos'
                    value={selectedFoodAmount || ''}
                    onChange={setSelectedFoodAmount}
                />
                <button
                    type='submit'
                    className='btn btn-info'
                    style={{bacground: '#3cb1d4'}}
                >
                    Lisää
                </button>
            </form>
        </div>
    );
}

AddCustomAmountOfFood.propTypes = {
    food: PropTypes.object.isRequired,
    selectedFoodAmount: PropTypes.string,
    setSelectedFoodAmount: PropTypes.func.isRequired,
    addEntry: PropTypes.func.isRequired
};
