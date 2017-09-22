import React from 'react';
import PropTypes from 'prop-types';

import ConsumedFoodsHeader from './ConsumedFoodsHeader';
import ConsumedFoodsTable from './ConsumedFoodsTable';
import Loading from './Loading';


export default function ConsumedFoods(props) {
    var {
        isFetchingEntries,
        entriesFetchError,
        consumedFoods,
        viewportWidth
    } = props;
    var consumedFoodsOutput = null;
    var consumedFoodsClass = 'consumed-foods ' +
            (props.isModifiable ? 'col-md-10 col-md-offset-2' : '');
    var hasEntries = false;

    // check if consumedfoods contains any valid entries
    for(var i = 0; i < consumedFoods.length; i++) {
        if(consumedFoods[i].foods.length > 0 && consumedFoods[i].foods[0].id !== 99999) {
            hasEntries = true;
        }
    }

    if(isFetchingEntries) {
        consumedFoodsOutput = <Loading />;
    } else if(!isFetchingEntries && entriesFetchError) {
        consumedFoodsOutput = (
            <div className='failed-to-fetch'>
                {entriesFetchError}
            </div>
        );
    } else if(!isFetchingEntries && !hasEntries) {
        consumedFoodsOutput = (
            <div className='no-entries'>
                Ei merkintöjä
            </div>
        );
    } else {
        consumedFoodsOutput = (
            <div>
                <ConsumedFoodsHeader
                    isModifiable={props.isModifiable}
                    viewportWidth={props.viewportWidth}
                    shownNutritionValue={props.shownNutritionValue}
                    changeShownNutritionValue={props.changeShownNutritionValue}
                    addMeal={props.addMeal}
                />
                <ConsumedFoodsTable {...props} />
            </div>
        );
    }

    return (
        <div className={consumedFoodsClass}>
            <div className='consumed-foods-wrapper'>
                {consumedFoodsOutput}
            </div>
        </div>
    );
}

ConsumedFoods.propTypes = {
    viewportWidth: PropTypes.number.isRequired,
    isModifiable: PropTypes.bool.isRequired,
    isFetchingEntries: PropTypes.bool.isRequired,
    consumedFoods: PropTypes.array.isRequired
};
