import React from 'react';
import PropTypes from 'prop-types';


export default class ConsumedFoodMealRow extends React.Component {
    constructor() {
        super();
        this.state = {isBeingEdited: false};
    }

    toggleEditing = (e) => {
        if(this.state.isBeingEdited) {
            var newName = e.currentTarget.value;
            this.props.editMealName(this.props.arrayIndex, this.props.mealName, newName);
        }

        this.setState({isBeingEdited: !this.state.isBeingEdited});
    }

    rowContent = () => {
        var {
            id,
            name,
            mealNumber,
            activeMealId,
            changeActiveMeal,
            removeMeal,
            isModifiable
        } = this.props;
        var isActiveMeal = activeMealId == id;


        if(this.state.isBeingEdited && isModifiable) {
            return (
                <td colSpan={7}>
                    <input style={{color: '#000'}}
                        type='text'
                        defaultValue={name}
                        onBlur={this.toggleEditing}
                        autoFocus
                    />
                </td>
            );
        } else if(isModifiable) {
            return (
                <td colSpan={7}>
                    {name}
                    <button className='btn toggle-meal-name-editing' onClick={this.toggleEditing}>
                        <i className='fa fa-pencil' />
                    </button>
                    <button
                        className='btn'
                        onClick={() => removeMeal(id, name, mealNumber)}
                    >
                        <i className='fa fa-remove' />
                    </button>

                    <label className='toggle-active-meal'>
                        <input
                            type='checkbox'
                            checked={isActiveMeal}
                            onChange={() => changeActiveMeal(id, name)}
                        />
                        <span className='slider' />
                    </label>
                </td>
            );
        } else {
            return <td colSpan={7}>{name}</td>;
        }
    }

    render() {
        return (
            <tr className='consumed-foods-meal'>
                {this.rowContent()}
            </tr>
        );
    }
}

ConsumedFoodMealRow.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    mealNumber: PropTypes.number.isRequired,
    activeMealId: PropTypes.number.isRequired,
    changeActiveMeal: PropTypes.func,
    removeMeal: PropTypes.func,
    isModifiable: PropTypes.bool.isRequired,
};
