import React from 'react';

import SetDailyGoal from './SetDailyGoal';
import DailyGoalProgress from './DailyGoalProgress';

export default class DailyGoal extends React.Component {
    // only redraw charts if total consumption has actually changed
    shouldComponentUpdate(nextProps) {
        if(this.props.totalConsumption !== nextProps.totalConsumption) {
            return true;
        }
        return false;
    }

    componentDidMount() {
        if(this.props.dailyGoal) {
            window.requestAnimationFrame(() => {
                createCharts(this.props.totalConsumption, this.props.dailyGoal)
            });
        }
    }

    componentDidUpdate() {
        window.requestAnimationFrame(() => {
            createCharts(this.props.totalConsumption, this.props.dailyGoal);
        });
    }

    render() {
        var {
            isFetchingConsumedFoods,
            isFetchingDailyGoal,
            totalConsumption: total,
            dailyGoal: goal
        } = this.props;
        var dailyGoalOutput;

        if(goal) {
            dailyGoalOutput = (
                <div className='daily-goal-wrapper'>
                    <div className='daily-goal-header'>
                        <h3>Päivätavoite</h3>
                        <i
                            className='configure-daily-goals fa fa-cog'
                            data-toggle='modal'
                            data-target='#set-daily-goal'
                        />
                    </div>
                    <DailyGoalProgress total={total} goal={goal} />
                </div>
            );
        } else {
            dailyGoalOutput = (
                <div className='daily-goal-wrapper'>
                    <div className='set-daily-goal'>
                        <a data-toggle='modal' data-target='#set-daily-goal'>
                            Aseta päivätavoite
                        </a>
                    </div>
                </div>
            );
        }

        return (
            <div className='daily-goal col-md-2'>
                <SetDailyGoal />
                {dailyGoalOutput}
            </div>
        );
    }
}


function createCharts(total, goal) {
    var options = {
        cutoutPercentage: 88,
        rotation: 1 * Math.PI,
        circumference: 1 * Math.PI,
        tooltips: {
            enabled: false
        }
    };

    var energyChartData;
    if((goal.energy - total.energy) < 0) {
        var overByPercent = total.energy - goal.energy;

        energyChartData  = {
            datasets: [{
                data: [overByPercent, goal.energy],
                borderWidth: 0,
                backgroundColor: [
                    'black',
                    'orange'
                ],
                hoverBackgroundColor: [
                    'black',
                    'orange'
                ]
            }]
        };

    } else {
        energyChartData = {
            datasets: [{
                data: [total.energy, (goal.energy - total.energy)],
                borderWidth: 0,
                backgroundColor: [
                    '#f9a200',
                    '#ebebeb'
                    //'#ffdab7'
                ],
                hoverBackgroundColor: [
                    'orange',
                    '#ffdab7'
                ]
            }]
        };
    }

    new Chart(document.getElementById('energy-chart'), {
        type: 'doughnut',
        data: energyChartData,
        options: options
    });

    var proteinChartData;
    if((goal.protein - total.protein) < 0) {
        var overByPercent = total.protein - goal.protein;

        proteinChartData  = {
            datasets: [{
                data: [overByPercent, goal.protein],
                borderWidth: 0,
                backgroundColor: [
                    'black',
                    '#639e63'
                ],
                hoverBackgroundColor: [
                    'black',
                    '#639e63'
                ]
            }]
        };

    } else {
        proteinChartData = {
            datasets: [{
                data: [total.protein, (goal.protein - total.protein)],
                borderWidth: 0,
                backgroundColor: [
                    '#639e63',
                    '#ebebeb'
                ],
                hoverBackgroundColor: [
                    '#639e63',
                    '#ebebeb'
                ]
            }]
        };
    }

    new Chart(document.getElementById('protein-chart'), {
        type: 'doughnut',
        data: proteinChartData,
        options: options
    });

    var carbChartData;
    if((goal.carbohydrates - total.carbs) < 0) {
        var overByPercent = total.carbs - goal.carbohydrates;

        carbChartData  = {
            datasets: [{
                data: [overByPercent, goal.carbohydrates],
                borderWidth: 0,
                backgroundColor: [
                    'black',
                    '#207eff'
                ],
                hoverBackgroundColor: [
                    'black',
                    '#207eff'
                ]
            }]
        };
    } else {
        carbChartData = {
            datasets: [{
                data: [total.carbs, (goal.carbohydrates - total.carbs)],
                borderWidth: 0,
                backgroundColor: [
                    '#207eff',
                    '#ebebeb'
                ],
                hoverBackgroundColor: [
                    '#207eff',
                    '#ebebeb'
                ]
            }]
        };
    }

    new Chart(document.getElementById('carb-chart'), {
        type: 'doughnut',
        data: carbChartData,
        options: options
    });

    var fatChartData;
    if((goal.fat - total.fat) < 0) {
        var overByPercent = total.fat - goal.fat;

        fatChartData  = {
            datasets: [{
                data: [overByPercent, goal.fat],
                borderWidth: 0,
                backgroundColor: [
                    'black',
                    '#fa6b6b'
                ],
                hoverBackgroundColor: [
                    'black',
                    '#fa6b6b'
                ]
            }]
        };

    } else {
        fatChartData  = {
            datasets: [{
                data: [total.fat, (goal.fat - total.fat)],
                borderWidth: 0,
                backgroundColor: [
                    '#fa6b6b',
                    '#ebebeb'
                ],
                hoverBackgroundColor: [
                    '#fa6b6b',
                    '#ebebeb'
                ]
            }]
        };
    }

    new Chart(document.getElementById('fat-chart'), {
        type: 'doughnut',
        data: fatChartData,
        options: options
    });
}
