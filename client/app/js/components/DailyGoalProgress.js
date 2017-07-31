import React from 'react';

export default function DailyGoalProgress({total, goal}) {
    var energyConsumed = Math.round(total.energy / goal.energy * 100) + '%';
    var proteinConsumed = Math.round(total.protein / goal.protein * 100) + '%';
    var carbsConsumed = Math.round(total.carbs / goal.carbohydrates * 100) + '%';
    var fatConsumed = Math.round(total.fat / goal.fat * 100) + '%';

    return (
        <div className='goal-progress'>
            <div className='energy-goal'>
                <p className='macro-title'>kcal</p>
                <div className='chart-container'>
                    <p className='macro-total-percentage'>{energyConsumed}</p>
                    <canvas id='energy-chart' />
                </div>
                <p className='macro-total'>
                    {Math.round(total.energy)} / {goal.energy}
                </p>
            </div>
            <div className='protein-goal'>
                <p className='macro-title'>proteiini</p>
                <div className='chart-container'>
                    <p className='macro-total-percentage'>{proteinConsumed}</p>
                    <canvas id='protein-chart' />
                </div>
                <p className='macro-total'>
                    {Math.round(total.protein)} g / {goal.protein} g
                </p>
            </div>
            <div className='carb-goal'>
                <p className='macro-title'>hiilihydraatit</p>
                <div className='chart-container'>
                    <p className='macro-total-percentage'>{carbsConsumed}</p>
                    <canvas id='carb-chart' />
                </div>
                <p className='macro-total'>
                    {Math.round(total.carbs)} g / {goal.carbohydrates} g
                </p>
            </div>
            <div className='fat-goal'>
                <p className='macro-title'>rasva</p>
                <div className='chart-container'>
                    <p className='macro-total-percentage'>{fatConsumed}</p>
                    <canvas id='fat-chart' />
                </div>
                <p className='macro-total'>
                    {Math.round(total.fat)} g / {goal.fat} g
                </p>
            </div>
        </div>
    );
}
