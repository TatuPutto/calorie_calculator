import React from 'react';

export default function DailyGoal(props) {
    if(!props.isFetchingDailyGoal && !props.isFetchingConsumedFoods) {
        var dailyGoal = props.dailyGoal;
        var totalConsumption = props.totalConsumption;
        var protein = +dailyGoal.protein;
        var carbs = +dailyGoal.carbs;
        var fat = +dailyGoal.fat;

        var total = protein + carbs + fat;
        var pp = protein / total * 100;
        var cp = carbs / total * 100;
        var fp = fat / total * 100;

        var proteinChartBarHeight = pp / 100 * 150;
        var carbChartBarHeight = cp / 100 * 150;
        var fatChartBarHeight = fp / 100 * 150;

        var proteinPercentage = totalConsumption.protein / protein * 100;
        var carbPercentage = totalConsumption.carbs / carbs * 100;
        var fatPercentage = totalConsumption.fat / fat * 100;

        var proteinGradient = {
            height: proteinChartBarHeight,
            background: `linear-gradient(0deg, green ${proteinPercentage}%, ` +
                    `#93f093 ${proteinPercentage}%)`
        };
        var carbGradient = {
            height: carbChartBarHeight,
            background: `linear-gradient(0deg, blue ${carbPercentage}%, ` +
                    `#c1c1ff ${carbPercentage}%)`
        };
        var fatGradient = {
            height: fatChartBarHeight,
            marginRight: '0px',
            background: `linear-gradient(0deg, red ${fatPercentage}%, ` +
                    `#fcc6b4 ${fatPercentage}%)`
        };


        return (
            <div className='daily-goal col-lg-2 col-sm-12'>
                <h4>Päivä tavoite</h4>
                <button className='configure-daily-goals'>
                    <i className='fa fa-cog' />
                </button>
                <hr />

                <div className='macronutrient-progress'>
                    <span className='chart-bar-protein' style={proteinGradient}>
                    </span>
                    <span className='chart-bar-carbs' style={carbGradient}>
                    </span>
                    <span className='chart-bar-fat' style={fatGradient}>
                    </span>
                </div>

                <hr />
                <p style={{color: 'green'}}>
                    {totalConsumption.protein} g / {dailyGoal.protein} g
                </p>
                <hr />
                <p  style={{color: 'blue'}}>
                    {totalConsumption.carbs} g / {dailyGoal.carbs} g
                </p>
                <hr />
                <p style={{color: 'red'}}>
                    {totalConsumption.fat} g / {dailyGoal.fat} g
                </p>
                <hr />
                <p>
                    {totalConsumption.energy} kcal / {dailyGoal.energy} kcal
                </p>
            </div>
        );

    } else {
        return (
            <div className='daily-goal'>
                <i className='fa fa-refresh fa-3x fa-spin' />
            </div>
        );
    }

}
