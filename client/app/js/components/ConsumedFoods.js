import React from 'react';
import PropTypes from 'prop-types';

import ConsumedFoodsTable from './ConsumedFoodsTable';
import TotalNutritionValuesTable from './TotalNutritionValuesTable';
import Loading from './Loading';

export default function ConsumedFoods(props) {
    var {viewportWidth, isFetchingConsumedFoods, consumedFoods} = props;
    var consumedFoodsOutput = null;
    var consumedFoodsClass = 'consumed-foods ' +
            (props.isModifiable ? 'col-md-10 col-md-offset-2' : '');
    var hasEntries = false;

    // does consumedfoods contains any entries
    for(var i = 0; i < consumedFoods.length; i++) {
        if(consumedFoods[i].mealCourses.length > 0) hasEntries = true;
    }

    if(isFetchingConsumedFoods) {
        consumedFoodsOutput = <Loading />;
    } else if(!hasEntries && !isFetchingConsumedFoods) {
        consumedFoodsOutput = <div className='no-entries'>Ei merkintöjä</div>;
    } else {
        consumedFoodsOutput = (
            <div>
                <div className='consumed-foods-header'>
                    <h3>Merkinnät</h3>
                </div>
                <ConsumedFoodsTable {...props} />
                {/*}{props.isModifiable &&
                    <TotalNutritionValuesTable
                        totalConsumption={props.totalConsumption}
                    />
                }*/}
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
    isFetchingConsumedFoods: PropTypes.bool.isRequired,
    consumedFoods: PropTypes.array.isRequired
};
