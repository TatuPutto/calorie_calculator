import React from 'react';

export default function ConsumedFoods(props) {
    var total = props.totalConsumption;



    var tableRows = props.consumedFoods.map((food, i) => {
        var row;

        if(500 < 768) {
            row = <tr key={food.timeOfConsumption}>
                <td className='food-amount'>{food.amount} g</td>
                <td className='energy-amount'>{food.energy} kcal</td>
                <td className='protein-amount'>{food.protein} g</td>
                <td className='carb-amount'>{food.carbs} g</td>
                <td className='fat-amount'>{food.fat} g</td>
                <td className='food-name'>{food.name}</td>
                <td className='remove-button-container'>
                    <button
                        className='remove-food btn btn-default'
                        onClick={() => props.removeFromDiary(food.consumptionId)}
                    >
                        <i className='fa fa-remove' />
                    </button>
                </td>
            </tr>
        } else {
            row = <tr key={food.timeOfConsumption}>
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
        }



        return row;
    });










    return (
        <div className='consumed-foods text-center'>
            {props.isFetchingConsumedFoods &&
                <i className='fa fa-spinner fa-spin fa-3x' />
            }
            {props.consumedFoods.length === 0 && !props.isFetchingConsumedFoods &&
                <p>Et ole syönyt tänään mitään</p>
            }
            {props.consumedFoods.length > 0 && !props.isFetchingConsumedFoods &&
                <div className='consumed-foods-table-wrapper col-lg-10 col-md-10 col-sm-12'>
                    <table className='consumed-foods-table'>
                        <tbody>

                            {tableRows}
                            {/*}{props.consumedFoods.map((food, i) => {
                                return (
                                    {500 < 768 &&
                                        <tr key={food.timeOfConsumption}>
                                            <td>{food.amount} g</td>
                                            <td>{food.energy} kcal</td>
                                            <td>{food.protein} g</td>
                                            <td>{food.carbs} g</td>
                                            <td>{food.fat} g</td>
                                            <td>
                                                <button
                                                    className='remove-food btn btn-default'
                                                    onClick={() => props.removeFromDiary(food.consumptionId)}
                                                >
                                                    <i className='fa fa-remove' />
                                                </button>
                                            </td>
                                            <td>{food.name}</td>
                                        </tr>
                                    }

                                    {500 < 768 &&
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
                                    }
                                );
                            }
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
                            </tr>*/}
                        </tbody>
                    </table>
                </div>
            }
        </div>
    );
}
