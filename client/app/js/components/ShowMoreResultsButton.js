import React from 'react';
import PropTypes from 'prop-types';

export default function ShowMoreResultsButton(props) {
    var {viewportWidth, foodsAmount, offset, showMoreResults} = props;
    var amountOfVisibleResults = offset + 10;
    var buttonText = `Näytä lisää tuloksia (${amountOfVisibleResults} / ${props.foodsAmount})`;
    var showMoreResultsButton = null;

    if(foodsAmount > 10 && foodsAmount > amountOfVisibleResults && viewportWidth < 768) {
        showMoreResultsButton = (
            <button className='show-more-results btn btn-default' onClick={showMoreResults}>
                {buttonText}
            </button>
        );
    }

    return showMoreResultsButton;
}

ShowMoreResultsButton.propTypes = {
    viewportWidth: PropTypes.number.isRequired,
    foodsAmount: PropTypes.number.isRequired,
    offset: PropTypes.number.isRequired,
    showMoreResults: PropTypes.func.isRequired
};
