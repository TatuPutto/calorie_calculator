import React from 'react';
import PropTypes from 'prop-types';


// state container component for ConsumedFoodRow and ConsumedFoodRowCompactLayout
export default function EntriesFoodRowWrapper(Component) {
    return class EntriesRowHOC extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                isBeingEdited: false,
                actionsVisible: false,
                foodAmount: this.props.food.amount,
                validInput: true
            };
        }

        toggleEditing = () => {
            this.setState({
                isBeingEdited: !this.state.isBeingEdited,
                actionsVisible: this.state.isBeingEdited ? false : true
            });
        }

        showActions = () => {
            this.setState({actionsVisible: true, isBeingEdited: false});
        }

        hideActions = () => {
            this.setState({actionsVisible: false, isBeingEdited: false});
        }

        changeFoodAmount = (e) => {
            var foodAmount = e.currentTarget.value.trim();

            this.setState({
                foodAmount: foodAmount,
                validInput: (foodAmount && foodAmount > 0) ? true : false
            });
        }

        updateAmount = (consumptionId) => {console.log('täällä');
            var consumptionId = this.props.food.consumptionId;
            var foodAmount = this.state.foodAmount;

            if(foodAmount && foodAmount > 0 && foodAmount !== this.props.food.amount) {
                this.props.updateEntry(consumptionId, foodAmount);
            }

            this.toggleEditing();
        }

        render() {
            return (
                <Component
                    {...this.props}
                    isBeingEdited={this.state.isBeingEdited}
                    foodAmount={this.state.foodAmount}
                    validInput={this.state.validInput}
                    toggleEditing={this.toggleEditing}
                    changeFoodAmount={this.changeFoodAmount}
                    updateAmount={this.updateAmount}
                    actionsVisible={this.state.actionsVisible}
                    showActions={this.showActions}
                    hideActions={this.hideActions}
                />
            );
        }
    }
}

EntriesFoodRowWrapper.propTypes = {
    food: PropTypes.object.isRequired,
    shownNutritionValue: PropTypes.string,
    addEntry: PropTypes.func,
    removeEntry: PropTypes.func,
    updateEntry: PropTypes.func,
    isModifiable: PropTypes.bool.isRequired
};
