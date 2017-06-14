import React from 'react';

export default function DailyGoalProgress(props) {
    var {total, goal} = props;
    var energyConsumed = Math.round(total.energy / goal.energy * 100) + '%';
    var proteinConsumed = Math.round(total.protein / goal.protein * 100) + '%';
    var carbsConsumed = Math.round(total.carbs / goal.carbohydrates * 100) + '%';
    var fatConsumed = Math.round(total.fat / goal.fat * 100) + '%';

    return (
        <div className='goal-progress'>
            <div className='energy-chart-container'>
            <p style={{position: 'relative', top: '38px', color: '#929292'}}>kcal</p>
                <div style={{position: 'relative', width: '80px', margin: '0 auto'}}>
                    <p style={{position: 'relative', top: '66px', fontSize: '16px'}}>
                        {energyConsumed}
                    </p>
                    <canvas id='energy-goal' />
                </div>

                <p>{Math.round(total.energy)} / {goal.energy}</p>
            </div>
            <div className='protein-chart-container'>
                <p style={{position: 'relative', top: '38px', color: '#929292'}}>proteiini</p>
                <div style={{position: 'relative', width: '80px', margin: '0 auto'}}>
                    <p style={{position: 'relative', top: '66px', fontSize: '16px'}}>
                        {proteinConsumed}
                    </p>
                    <canvas id='protein-goal' />
                </div>
                <p>{Math.round(total.protein)} g / {goal.protein} g</p>
            </div>
            <div className='carb-chart-container'>
                <p style={{position: 'relative', top: '38px', color: '#929292'}}>hiilihydraatit</p>
                <div style={{position: 'relative', width: '80px', margin: '0 auto'}}>
                    <p style={{position: 'relative', top: '66px', fontSize: '16px'}}>
                        {carbsConsumed}
                    </p>
                    <canvas id='carb-goal' />
                </div>
                <p>{Math.round(total.carbs)} g / {goal.carbohydrates} g</p>
            </div>
            <div className='fat-chart-container'>
                <p style={{position: 'relative', top: '38px', color: '#929292'}}>rasva</p>
                <div style={{position: 'relative', width: '80px', margin: '0 auto'}}>
                    <p style={{position: 'relative', top: '66px', fontSize: '16px'}}>
                        {fatConsumed}
                    </p>
                    <canvas id='fat-goal' />
                </div>
                <p>{Math.round(total.fat)} g / {goal.fat} g</p>
            </div>
        </div>
    );
}
