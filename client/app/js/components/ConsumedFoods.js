import React from 'react';

export default function ConsumedFoods(props) {
    var total = props.totalConsumption;

    return (
        <div className='consumed-foods'>
            {props.isFetchingConsumedFoods &&
                <i className='fa fa-refresh fa-spin fa-3x' />
            }
            {props.consumedFoods.length === 0 &&
                <p>Et ole syönyt tänään mitään</p>
            }
            {props.consumedFoods.length > 0 &&
                <div className='consumed-foods-table-wrapper col-lg-10 col-md-10 col-sm-12'>
                    <table className='consumed-foods-table'>
                        {/*}<thead>
                            <tr>
                                <th>Poista</th>
                                <th>Ravintoaine</th>
                                <th>Määrä</th>
                                <th>Energia</th>
                                <th style={{background: 'white'}}>P</th>
                                <th style={{background: 'white'}}>H</th>
                                <th style={{background: 'white'}}>R</th>
                            </tr>
                        </thead>*/}
                        <tbody>
                            {props.consumedFoods.map((food, i) => {
                                return (
                                    <tr key={food.timeOfConsumption}>
                                        <td>
                                            <button
                                                className='remove-food btn btn-default'
                                                onClick={() => props.removeFromDiary(food.consumptionId)}
                                            >
                                                <i className='fa fa-remove' />
                                            </button>
                                        </td>
                                        <td>{food.name}</td>
                                        <td>{food.amount} g</td>
                                        <td>{food.energy} kcal</td>
                                        <td>{food.protein} g</td>
                                        <td>{food.carbs} g</td>
                                        <td>{food.fat} g</td>
                                    </tr>
                                );
                            })}
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>{total.energy} kcal</td>
                                <td style={{background: 'white', paddingLeft: '10px'}}>
                                    {total.protein} g
                                </td>
                                <td style={{background: 'white', paddingLeft: '10px'}}>
                                    {total.carbs} g
                                </td>
                                <td style={{background: 'white', paddingLeft: '10px'}}>
                                    {total.fat} g
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            }
        </div>
    );
}
