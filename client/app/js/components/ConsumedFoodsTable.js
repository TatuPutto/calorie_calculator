import React from 'react';
import PropTypes from 'prop-types';

import SingleConsumedFood from './SingleConsumedFood';
import SingleConsumedFoodCompactLayout from './SingleConsumedFoodCompactLayout';
import TotalConsumption from './TotalConsumption';

export default function ConsumedFoodsTable(props) {
    var consumedFoodsRows = props.consumedFoods.map((food) => {
        var row;
        if(props.viewportWidth > 768) {
            row = (
                <SingleConsumedFood
                    key={food.consumptionId}
                    food={food}
                    isModifiable={props.isModifiable}
                    removeFromDiary={props.removeFromDiary}
                />
            );
        } else {
            row = (
                <SingleConsumedFoodCompactLayout
                    key={food.consumptionId}
                    food={food}
                    isModifiable={props.isModifiable}
                    removeFromDiary={props.removeFromDiary}
                />
            );
        }

        return row;
    });
    return (
        <table className='consumed-foods-table'>
            {props.viewportWidth < 768 &&
                <thead>
                    <tr>
                        <th style={{textAlign: 'center'}}>
                            Merkinnät
                        </th>
                    </tr>
                </thead>
            }

            {/*}{props.viewportWidth > 768 && props.isModifiable ?
                <thead>
                    <tr>
                        <th></th>
                        <th>Elintarvike</th>
                        <th>Määrä</th>
                        <th>kcal</th>
                        <th>P</th>
                        <th>HH</th>
                        <th>R</th>
                    </tr>
                </thead>
                :
                <thead>
                    <tr>
                        <th>Elintarvike</th>
                        <th>Määrä</th>
                        <th>kcal</th>
                        <th>P</th>
                        <th>HH</th>
                        <th>R</th>
                    </tr>
                </thead>
            }*/}
            <tbody>
                {consumedFoodsRows}
                {props.consumedFoods.length > 1 && props.isModifiable &&
                    <TotalConsumption totalConsumption={props.totalConsumption} />
                }
            </tbody>
        </table>
    );
}

ConsumedFoodsTable.propTypes = {
    viewportWidth: PropTypes.number.isRequired,
    isModifiable: PropTypes.bool.isRequired,
    consumedFoods: PropTypes.array.isRequired
};
