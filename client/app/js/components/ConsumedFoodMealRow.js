import React from 'react';

export default class ConsumedFoodMealRow extends React.Component {
    constructor() {
        super();
        this.state = {isBeingEdited: false};
    }

    componentDidUpdate() {
        if(this.state.isBeingEdited) {
            this.textInput.focus();
        }
    }

    toggleEditing = (e) => {
        if(this.state.isBeingEdited) {
            var newName = e.currentTarget.value;
            this.props.editMealName(this.props.arrayIndex, this.props.mealName, newName);
        }

        this.setState({isBeingEdited: !this.state.isBeingEdited});
    }

    render() {
        var isActiveMeal = this.props.activeMealId == this.props.mealId;

        return (
            <tr key={this.props.mealId} className='consumed-foods-meal'>
                {!this.state.isBeingEdited ? (
                    <td colSpan={7}>
                        <label className='toggle-active-meal'>
                            <input
                                type='checkbox'
                                checked={isActiveMeal}
                                onChange={() => this.props.changeActiveMeal(this.props.mealId, this.props.mealName)}
                            />
                            <span className='slider round'></span>
                        </label>
                        {/*}{isActiveMeal ?
                            <i className='fa fa-unlock' style={{float: 'left', color: '#fff', width: '4%', position: 'absolute', left: '15px', fontSize: '18px'}} />
                            :
                            <i onClick={() => this.props.changeActiveMeal(this.props.meal)} className='fa fa-lock' style={{float: 'left', color: '#fff', width: '4%', position: 'absolute', left: '15px', fontSize: '18px'}} />
                        }*/}
                        {this.props.mealName}
                        <button className='btn btn-ghost' style={{color: '#fff', position: 'absolute', padding: '0 10px'}}>
                            <i className='fa fa-pencil' onClick={this.toggleEditing} />
                        </button>
                    </td>
                ) : (
                    <td colSpan={7}>
                        <input style={{color: '#000'}}
                            type='text'
                            ref={(input) => this.textInput = input}
                            onBlur={this.toggleEditing}


                        />
                        {/*}<button className='btn btn-save'>
                            <i className='fa fa-check' onClick={this.toggleEditing} />
                        </button>*/}
                    </td>
                )}
            </tr>
        );
    }
}
