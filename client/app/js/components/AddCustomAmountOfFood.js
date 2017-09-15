import React from 'react';
import PropTypes from 'prop-types';

export default function AddCustomAmountOfFood(props) {
    var {food, selectedFoodAmount, setSelectedFoodAmount, addEntry} = props;

    return (
        <div className='add-custom-amount'>
            <form onSubmit={() => addEntry(food, selectedFoodAmount)}>
                <input
                    type='text'
                    placeholder='Annos'
                    value={selectedFoodAmount || ''}
                    onChange={setSelectedFoodAmount}
                    autoFocus
                />
                <button
                    className='btn btn-info'
                    onClick={() => addEntry(food, selectedFoodAmount)}
                    style={{
                        background: '#4692d2',
                        borderColor: '#4692d2',
                        boxShadow: '0px 1px 0px #97cfff inset'
                    }}
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
