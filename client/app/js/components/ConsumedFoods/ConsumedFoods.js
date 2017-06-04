import React from 'react';
import PropTypes from 'prop-types';

import ConsumedFoodsTable from './ConsumedFoodsTable/ConsumedFoodsTable';
import TotalNutritionValuesTable from './TotalNutritionValuesTable/TotalNutritionValuesTable';
import Loading from '../Loading/Loading';

export default function ConsumedFoods(props) {
    var {viewportWidth, isFetchingConsumedFoods, consumedFoods} = props;
    var consumedFoodsOutput = null;

    if(isFetchingConsumedFoods) {
        consumedFoodsOutput = <Loading />;
    } else if(consumedFoods.length === 0 && !isFetchingConsumedFoods) {
        consumedFoodsOutput = null;
    } else {
        consumedFoodsOutput = (
            <div>
                <ConsumedFoodsTable {...props} />
                <TotalNutritionValuesTable
                        totalConsumption={props.totalConsumption} />
            </div>
        );
    }

    return (
        <div className='consumed-foods col-md-10 col-md-offset-2'>
            {consumedFoodsOutput}
        </div>
    );
}

ConsumedFoods.propTypes = {
    viewportWidth: PropTypes.number.isRequired,
    isModifiable: PropTypes.bool.isRequired,
    isFetchingConsumedFoods: PropTypes.bool.isRequired,
    consumedFoods: PropTypes.array.isRequired
};
