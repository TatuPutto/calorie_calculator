import React from 'react';
import PropTypes from 'prop-types';

import ConsumedFoodsTable from './ConsumedFoodsTable';

export default function ConsumedFoods(props) {
    var {viewportWidth, isFetchingConsumedFoods, consumedFoods} = props;
    var consumedFoodsOutput = null;

    if(isFetchingConsumedFoods) {
        consumedFoodsOutput = <i className='fa fa-spinner fa-spin fa-3x' />
    } else if(consumedFoods.length === 0 && !isFetchingConsumedFoods) {
        consumedFoodsOutput = <p>Et ole syönyt tänään mitään</p>
    } else {
        consumedFoodsOutput = (
            <div className='consumed-foods-table-wrapper col-lg-10 col-md-10 col-sm-12'>
                <ConsumedFoodsTable {...props} />
            </div>
        );
    }

    return (
        <div className='consumed-foods'>
            {consumedFoodsOutput}
        </div>
    );
}

ConsumedFoods.propTypes = {
    viewportWidth: PropTypes.number.isRequired,
    isFetchingConsumedFoods: PropTypes.bool.isRequired,
    consumedFoods: PropTypes.array.isRequired
};
