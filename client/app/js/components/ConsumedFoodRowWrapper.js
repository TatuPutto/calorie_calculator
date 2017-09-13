import React from 'react';
import PropTypes from 'prop-types';

// state container component for ConsumedFoodRow and ConsumedFoodRowCompactLayout
export default function ConsumedFoodRowWrapper(Component) {
    return class ConsumedFoodRowHOC extends React.Component {
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
            var consumptionId = this.props.food.consumptionId;
            var foodAmount = this.state.foodAmount.trim();

            if(foodAmount && foodAmount > 0) {
                this.props.updateEntry(consumptionId, foodAmount);
            }
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
                    update={this.update}
                />
            );
        }
    }
}
