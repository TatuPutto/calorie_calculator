import React from 'react';

export default function ConsumedFoodsList(props) {
    var total = props.totalConsumption;

    return (
        <div className='consumed-foods'>
        <div className='food-list'>
            {props.isFetchingConsumedFoods &&
                <i className='fa fa-refresh fa-spin fa-3x' />
            }
            {props.consumedFoods.length === 0 &&
                <p>Et ole syönyt tänään mitään</p>
            }
            {props.consumedFoods.length > 0 &&
                <div>
                    <table className='food-table-headings'>
                        <tr>
                            <th>Ravintoaine</th>
                            <th>Määrä</th>
                            <th>Energia</th>
                            <th>P</th>
                            <th>R</th>
                            <th>HH</th>
                        </tr>
                    </table>
                    <div className='food-table-content-wrapper'>
                        <table className='food-table'>
                            {props.consumedFoods.map((food) => {
                                return (
                                    <tr key={food.id + new Date().getTime()}>
                                        <td>{food.name}</td>
                                        <td>{food.amount} g</td>
                                        <td>{food.energy} kcal</td>
                                        <td>{food.protein} g</td>
                                        <td>{food.fat} g</td>
                                        <td>{food.carbs} g</td>
                                    </tr>
                                );
                            })}
                            <tr>
                                <td>Yhteensä</td>
                                <td>-</td>
                                <td>{total.energy}</td>
                                <td>{total.protein}</td>
                                <td>{total.fat}</td>
                                <td>{total.carbs}</td>
                            </tr>
                        </table>
                    </div>
                </div>
            }
        </div>

        </div>
    );
}
