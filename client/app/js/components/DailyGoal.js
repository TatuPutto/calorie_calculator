import React from 'react';

export default function DailyGoal(props) {
    var totalConsumption = props.totalConsumption;

    if(!props.isFetchingConsumedFoods) {
        var total = props.isFetchingConsumedFoods ? 0 : 180 + 250 + 80;

        var pp = 180 / total * 100;
        var cp= 250 / total * 100;
        var fp= 80 / total * 100;

        var proteinChartBarHeight = pp / 100 * 150;
        var carbChartBarHeight = cp / 100 * 150;
        var fatChartBarHeight = fp / 100 * 150;




        var proteinPercentage = props.isFetchingConsumedFoods ?
                0 : totalConsumption.protein / 180 * 100;
        var carbPercentage = props.isFetchingConsumedFoods ?
                0 : totalConsumption.carbs / 250 * 100;
        var fatPercentage = props.isFetchingConsumedFoods ?
                0 : totalConsumption.fat / 80 * 100;

        var proteinGradient = {
            height: proteinChartBarHeight,
            background: `linear-gradient(0deg, green ${proteinPercentage}%, #93f093 ${proteinPercentage}%)`
        };
        var carbGradient = {
            height: carbChartBarHeight,
            background: `linear-gradient(0deg, blue ${carbPercentage}%, #c1c1ff ${carbPercentage}%)`
        };
        var fatGradient = {
            height: fatChartBarHeight,
            background: `linear-gradient(0deg, red ${fatPercentage}%, #fcc6b4 ${fatPercentage}%)`
        };


        return (
            <div className='daily-goal'>
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
                Energia: {totalConsumption.energy} kcal / 2500 kcal
                <hr />
                Proteiinia: {totalConsumption.protein} g / 220 g
                <hr />
                Hiilihydraatteja: {totalConsumption.carbs} g / 350 g
                <hr />
                Rasvaa: {totalConsumption.fat} g / 80 g
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
