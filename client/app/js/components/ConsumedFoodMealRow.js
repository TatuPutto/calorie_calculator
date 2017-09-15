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

    render() {
        var isActiveMeal = this.props.activeMealId == this.props.mealId;

        return (
            <tr className='consumed-foods-meal'>
                {!this.state.isBeingEdited ? (
                    <td colSpan={7}>
                        {this.props.isModifiable &&
                            <label className='toggle-active-meal'>
                                <input
                                    type='checkbox'
                                    checked={isActiveMeal}
                                    onChange={() => this.props.changeActiveMeal(
                                        this.props.mealId,
                                        this.props.mealName
                                    )}
                                />
                                <span className='slider' />
                            </label>
                        }

                        {this.props.mealName}

                        {this.props.isModifiable &&
                            <button className='btn' onClick={this.toggleEditing}>
                                <i className='fa fa-pencil' />
                            </button>
                        }
                        {this.props.isModifiable &&
                            <button className='btn' onClick={() => this.props.removeMeal(this.props.mealId, this.props.mealName, this.props.arrayIndex)} style={{right: '2%'}}>
                                <i className='fa fa-ellipsis-v' />
                            </button>
                        }
                    </td>
                ) : (
                    <td colSpan={7}>
                        <input style={{color: '#000'}}
                            type='text'
                            defaultValue={this.props.mealName}
                            onBlur={this.toggleEditing}
                            autoFocus
                        />
                    </td>
                )}
            </tr>
        );
    }
}
