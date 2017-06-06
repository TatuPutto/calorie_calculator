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
                createChart(this.props.totalConsumption, this.props.dailyGoal)
            });
        }
    }

    componentDidUpdate() {
        window.requestAnimationFrame(() => {
            createChart(this.props.totalConsumption, this.props.dailyGoal)
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
                <div className='charts'>
                    <h3>Päivätavoite</h3>
                    <i className='configure-daily-goals fa fa-cog'
                            data-toggle='modal' data-target='#set-daily-goal' />
                    <DailyGoalProgress total={total} goal={goal} />
                </div>
            );
        } else {
            dailyGoalOutput = (
                <div className='set-daily-goal'>
                    <a data-toggle='modal' data-target='#set-daily-goal'>
                        Aseta päivätavoite
                    </a>
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

function createChart(total, goal) {
    var options = {
        cutoutPercentage: 85,
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
                    'orange',
                    '#ffdab7'
                ],
                hoverBackgroundColor: [
                    'orange',
                    '#ffdab7'
                ]
            }]
        };
    }

    new Chart(document.getElementById('energy-goal'), {
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
                    'green'
                ],
                hoverBackgroundColor: [
                    'black',
                    'green'
                ]
            }]
        };

    } else {
        proteinChartData = {
            datasets: [{
                data: [total.protein, (goal.protein - total.protein)],
                borderWidth: 0,
                backgroundColor: [
                    'green',
                    '#93f093'
                ],
                hoverBackgroundColor: [
                    'green',
                    '#93f093'
                ]
            }]
        };
    }

    new Chart(document.getElementById('protein-goal'), {
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
                    'blue'
                ],
                hoverBackgroundColor: [
                    'black',
                    'blue'
                ]
            }]
        };
    } else {
        carbChartData = {
            datasets: [{
                data: [total.carbs, (goal.carbohydrates - total.carbs)],
                borderWidth: 0,
                backgroundColor: [
                    'blue',
                    '#c5d4ed'
                ],
                hoverBackgroundColor: [
                    'blue',
                    '#c5d4ed'
                ]
            }]
        };
    }

    new Chart(document.getElementById('carb-goal'), {
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
                    'red'
                ],
                hoverBackgroundColor: [
                    'black',
                    'red'
                ]
            }]
        };

    } else {
        fatChartData  = {
            datasets: [{
                data: [total.fat, (goal.fat - total.fat)],
                borderWidth: 0,
                backgroundColor: [
                    'red',
                    '#fcc6b4'
                ],
                hoverBackgroundColor: [
                    'red',
                    '#fcc6b4'
                ]
            }]
        };
    }


    new Chart(document.getElementById('fat-goal'), {
        type: 'doughnut',
        data: fatChartData,
        options: options
    });
}
