import React from 'react';

export default class ConsumedFoodMealRow extends React.Component {
    constructor() {
        super();
        this.state = {isBeingEdited: false};

        this.toggleEditing = this.toggleEditing.bind(this);
    }

    toggleEditing(e) {
        if(this.state.isBeingEdited) {
            var newName = e.currentTarget.value;
            this.props.editMealName(this.props.arrayIndex, this.props.mealName, newName);
        }

        this.setState({isBeingEdited: !this.state.isBeingEdited});
    }

    rowContent = () => {
        var {
            mealId,
            mealName,
            arrayIndex,
            activeMealId,
            isModifiable,
            removeMeal,
            changeActiveMeal
        } = this.props;
        var isActiveMeal = activeMealId == mealId;

        if(this.state.isBeingEdited && isModifiable) {
            return (
                <td colSpan={7}>
                    <input style={{color: '#000'}}
                        type='text'
                        defaultValue={mealName}
                        onBlur={this.toggleEditing}
                        autoFocus
                    />
                </td>
            );
        } else if(isModifiable) {
            return (
                <td colSpan={7}>
                    {mealName}
                    <button className='btn toggle-meal-name-editing' onClick={this.toggleEditing}>
                        <i className='fa fa-pencil' />
                    </button>
                    <button
                        className='btn'
                        onClick={() => removeMeal(mealId, mealName,arrayIndex)}
                    >
                        <i className='fa fa-remove' />
                    </button>

                    <label className='toggle-active-meal'>
                        <input
                            type='checkbox'
                            checked={isActiveMeal}
                            onChange={() => changeActiveMeal(mealId, mealName)}
                        />
                        <span className='slider' />
                    </label>
                </td>
            );
        } else {
            return <td colSpan={7}>{mealName}</td>;
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
