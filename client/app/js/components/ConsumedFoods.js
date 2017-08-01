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

    if(isFetchingConsumedFoods) {
        consumedFoodsOutput = <Loading />;
    } else if(consumedFoods.length === 0 && !isFetchingConsumedFoods) {
        consumedFoodsOutput = (
            <div style={{padding: '10px', fontSize: '14px'}}>Ei merkintöjä</div>
        );
    } else {
        consumedFoodsOutput = (
            <div>
                <div className='consumed-foods-header'>
                    <h3>Merkinnät</h3>
                </div>
                <ConsumedFoodsTable {...props} />
                {props.isModifiable &&
                    <TotalNutritionValuesTable
                        totalConsumption={props.totalConsumption}
                    />
                }
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
