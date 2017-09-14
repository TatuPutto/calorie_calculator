import React from 'react';
import PropTypes from 'prop-types';

export default class AddCustomAmountOfFood extends React.Component {
    componentDidMount() {
        this.amountInput.focus();
    }

    render() {
        var {
            foodId,
            selectedFoodAmount,
            setSelectedFoodAmount,
            addEntry
        } = this.props;

        return (
            <div className='add-custom-amount'>
                <form onSubmit={() => addEntry(foodId, selectedFoodAmount)}>
                    <input
                        ref={input => this.amountInput = input}
                        type='text'
                        placeholder='Annos'
                        value={selectedFoodAmount || ''}
                        onChange={setSelectedFoodAmount}
                    />
                    <button
                        className='btn btn-info'
                        onClick={() => addEntry(foodId, selectedFoodAmount)}
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
}

AddCustomAmountOfFood.propTypes = {
    foodId: PropTypes.number.isRequired,
    selectedFoodAmount: PropTypes.string,
    setSelectedFoodAmount: PropTypes.func.isRequired,
    addEntry: PropTypes.func.isRequired
};
