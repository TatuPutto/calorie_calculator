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
        if(this.props.goal) {
            window.requestAnimationFrame(() => {
                createCharts(this.props.total, this.props.goal)
            });
        }
    }

    componentDidUpdate() {
        window.requestAnimationFrame(() => {
            createCharts(this.props.total, this.props.goal);
        });
    }

    render() {
        var {
            total,
            goal,
            isFetchingDailyGoal,
            dailyGoalFetchError
        } = this.props;
        var dailyGoalOutput;

        if(goal && !dailyGoalFetchError) {
            dailyGoalOutput = (
                <div className='daily-goal-wrapper'>
                    <div className='daily-goal-header'>
                        <h3>Päivätavoite</h3>
                        <button className='configure-daily-goals'
                            data-toggle='modal'
                            data-target='#set-daily-goal'
                            data-tooltip-text='Muokkaa päivätavoitetta'
                        >
                            <i className='fa fa-cog' />
                        </button>
                    </div>
                    <DailyGoalProgress total={total} goal={goal} />
                </div>
            );
        } else if(dailyGoalFetchError) {
            dailyGoalOutput = <p>{dailyGoalFetchError}</p>;
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
    for(var macro in total) {
        var macroAmountColor = getMacroChartColor(macro);
        var data = createChartData(goal[macro], total[macro], macroAmountColor);
        addChartToDOM(macro, data);
    }
}

function getMacroChartColor(macro) {
    var macroAmountColor;

    switch(macro) {
        case 'energy':
            macroAmountColor = '#ffa600';
            break;
        case 'protein':
            macroAmountColor = '#639e63';
            break;
        case 'carbs':
            macroAmountColor = '#207eff';
            break;
        case 'fat':
            macroAmountColor = '#fa6b6b';
            break;
    }

    return macroAmountColor;
}

function createChartData(macroGoal, macroTotal, macroAmountColor) {
    var data, overByPercentage;
    var overConsumptionColor = '#000';
    var chartBackgroundColor = '#dcdcdc';

    if((macroGoal - macroTotal) < 0) {
        overByPercentage = macroTotal - macroGoal;

        data = {
            datasets: [{
                data: [overByPercentage, macroGoal],
                borderWidth: 0,
                backgroundColor: [overConsumptionColor, macroAmountColor]
            }]
        };
    } else {
        data = {
            datasets: [{
                data: [macroTotal, (macroGoal - macroTotal)],
                borderWidth: 0,
                backgroundColor: [macroAmountColor, chartBackgroundColor]
            }]
        };
    }

    return data;
}

function addChartToDOM(macro, data) {
    var options = {
        cutoutPercentage: 88,
        rotation: 1 * Math.PI,
        circumference: 1 * Math.PI,
        tooltips: {enabled: false}
    };

    return new Chart(document.getElementById(macro + '-chart'), {
        type: 'doughnut',
        data,
        options
    });
}
