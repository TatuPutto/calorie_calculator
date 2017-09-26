import React from 'react';
import PropTypes from 'prop-types';


export default class EntriesMealRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isBeingEdited: false, name: this.props.name};
    }

    toggleEditing = (e) => {
        e.preventDefault();

        if(this.state.isBeingEdited) {
            var oldName = this.props.name;
            var newName = this.amountInput.value;

            this.props.editMealName(this.props.mealNumber, oldName, newName);
        }

        this.setState({isBeingEdited: !this.state.isBeingEdited}, () => {
            if(this.state.isBeingEdited) {
                this.amountInput.setSelectionRange(0, this.amountInput.value.length);
            }
        });
    }

    rowContent = () => {
        var {
            id,
            name,
            mealNumber,
            activeMealId,
            changeActiveMeal,
            removeMeal,
            isModifiable,
            viewportWidth
        } = this.props;
        var isActiveMeal = activeMealId == id;
        var colSpan = viewportWidth <= 768 ? 2 : 7;

        if(this.state.isBeingEdited && isModifiable) {
            return (
                <td className='entries__edit-meal-name' colSpan={colSpan}>
                    <form onSubmit={this.toggleEditing}>
                        <input
                            type='text'
                            ref={(input) => this.amountInput = input}
                            defaultValue={this.state.name}
                            onBlur={this.toggleEditing}
                            autoFocus
                        />
                    </form>
                </td>
            );
        } else if(isModifiable) {
            return (
                <td colSpan={colSpan}>
                    {name}
                    <button className='btn btn--transparent btn--inline-actions'
                            onClick={this.toggleEditing}>
                        <i className='fa fa-pencil' />
                    </button>
                    <button className='btn btn--transparent btn--inline-actions'
                            onClick={() => removeMeal(id, name, mealNumber)}>
                        <i className='fa fa-remove' />
                    </button>
                    <span className='entries__select-active-meal'>
                        <span className='switch' onClick={() => changeActiveMeal(id, name)}>
                            <input type='checkbox'checked={isActiveMeal} readOnly />
                            <span className='slider' />
                        </span>
                    </span>
                </td>
            );
        } else {
            return <td colSpan={colSpan}>{name}</td>;
        }
    }

    render() {
        return (
            <tr className='entries__meal'>
                {this.rowContent()}
            </tr>
        );
    }
}

EntriesMealRow.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    mealNumber: PropTypes.number.isRequired,
    activeMealId: PropTypes.number,
    changeActiveMeal: PropTypes.func,
    removeMeal: PropTypes.func,
    isModifiable: PropTypes.bool.isRequired,
};
