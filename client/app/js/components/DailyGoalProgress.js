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
                <p style={{position: 'relative', top: '35px'}}>Energia</p>
                <div style={{position: 'relative', width: '100px', margin: '0 auto 10px auto'}}>
                    <p style={{position: 'relative', top: '72px', fontSize: '24px'}}>
                        {energyConsumed}
                    </p>
                    <canvas id='energy-goal' />
                </div>
                <p>{Math.round(total.energy)} kcal / {goal.energy} kcal</p>
            </div>
            <div className='protein-chart-container'>
                <p style={{position: 'relative', top: '35px'}}>Proteiini</p>
                <div style={{position: 'relative', width: '100px', margin: '0 auto 10px auto'}}>
                    <p style={{position: 'relative', top: '72px', fontSize: '24px'}}>
                        {proteinConsumed}
                    </p>
                    <canvas id='protein-goal' />
                </div>
                <p>{Math.round(total.protein)} g / {goal.protein} g</p>
            </div>
            <div className='carb-chart-container'>
                <p style={{position: 'relative', top: '35px'}}>Hiilihydraatit</p>
                <div style={{position: 'relative', width: '100px', margin: '0 auto 10px auto'}}>
                    <p style={{position: 'relative', top: '72px', fontSize: '24px'}}>
                        {carbsConsumed}
                    </p>
                    <canvas id='carb-goal' />
                </div>
                <p>{Math.round(total.carbs)} g / {goal.carbohydrates} g</p>
            </div>
            <div className='fat-chart-container'>
                <p style={{position: 'relative', top: '35px'}}>Rasva</p>
                <div style={{position: 'relative', width: '100px', margin: '0 auto 10px auto'}}>
                    <p style={{position: 'relative', top: '72px', fontSize: '24px'}}>
                        {fatConsumed}
                    </p>
                    <canvas id='fat-goal' />
                </div>
                <p>{Math.round(total.fat)} g / {goal.fat} g</p>
            </div>
        </div>
    );
}
