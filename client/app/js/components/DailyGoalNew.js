import React from 'react';

export default class DailyGoalNew extends React.Component {
    shouldComponentUpdate(nextProps) {
        if(this.props.totalConsumption !== nextProps.totalConsumption) {
            return true;
        }
        return false;
    }


    componentDidUpdate() {
        if(!this.props.isFetchingConsumedFoods && !this.props.isFetchingDailyGoal) {
            window.requestAnimationFrame(() => createChart(this.props.totalConsumption, this.props.dailyGoal));
        }
    }

    render() {
        var {totalConsumption: total, dailyGoal: goal} = this.props;
        var dailyGoalOutput;


        if(!this.props.isFetchingConsumedFoods && !this.props.isFetchingDailyGoal) {
            var energyConsumed = Math.round(total.energy / goal.energy * 100) + '%';
            var proteinConsumed = Math.round(total.protein / goal.protein * 100) + '%';
            var carbsConsumed = Math.round(total.carbs / goal.carbs * 100) + '%';
            var fatConsumed = Math.round(total.fat / goal.fat * 100) + '%';

            dailyGoalOutput = (
                <div className='macronutrient-bar'>
                    <div className='row'>
                        <div className='energy-chart-container col-md-3 col-sm-4 col-xs-6 col-md-offset-0 col-sm-offset-2'>
                            <p style={{position: 'relative', top: '35px'}}>Energia</p>
                            <div style={{position: 'relative', width: '100px', margin: '0 auto 10px auto'}}>
                                <p style={{position: 'relative', top: '72px', fontSize: '24px'}}>
                                    {energyConsumed}
                                </p>
                                <canvas id='energy-goal' />
                            </div>
                            <p>{Math.round(total.energy)} kcal / {goal.energy} kcal</p>
                        </div>
                        <div className='protein-chart-container col-md-3 col-sm-4 col-xs-6'>
                            <p style={{position: 'relative', top: '35px'}}>Proteiini</p>
                            <div style={{position: 'relative', width: '100px', margin: '0 auto 10px auto'}}>
                                <p style={{position: 'relative', top: '72px', fontSize: '24px'}}>
                                    {proteinConsumed}
                                </p>
                                <canvas id='protein-goal' />
                            </div>
                            <p>{Math.round(total.protein)} g / {goal.protein} g</p>
                        </div>
                        <div className='carb-chart-container col-md-3 col-sm-4 col-xs-6 col-md-offset-0 col-sm-offset-2'>
                            <p style={{position: 'relative', top: '35px'}}>Hiilihydraatit</p>
                            <div style={{position: 'relative', width: '100px', margin: '0 auto 10px auto'}}>
                                <p style={{position: 'relative', top: '72px', fontSize: '24px'}}>
                                    {carbsConsumed}
                                </p>
                                <canvas id='carb-goal' />
                            </div>
                            <p>{Math.round(total.carbs)} g / {goal.carbs} g</p>
                        </div>
                        <div className='fat-chart-container col-md-3 col-sm-4 col-xs-6'>
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
                </div>
            );
        } else if(!this.props.isFetchingDailyGoal) {
            dailyGoalOutput = <a>Aseta päivä tavoite.</a>;
        } else {
            dailyGoalOutput = <i className='fa fa-spinner fa-3x fa-spin' />;
        }

        return (
            <div className='daily-goal'>
                <div className='charts col-md-10 col-md-offset-1'>
                    <h3>Päivä tavoite</h3>
                    <i className='configure-daily-goals fa fa-cog' data-toggle="modal" data-target="#myModal"/>


                    <div className="modal fade" id="myModal" role="dialog">
                        <div className="modal-dialog">
                            <form action='/daily-goal' method='POST' encType='application/x-www-form-urlencoded'>

                                <div className="modal-content">
                                    <div className="modal-header">
                                        <button className="close" data-dismiss="modal">&times;</button>
                                        <h4 className="modal-title">Määritä päivä tavoite</h4>
                                    </div>
                                    <div className="modal-body">
                                        <label>Energia</label>
                                        <input type='text' name='energy' /><br />
                                        <label>Proteiini</label>
                                        <input type='text' name='protein' /><br />
                                        <label>Hiilihydraatit</label>
                                        <input type='text' name='carbs' /><br />
                                        <label>Rasva</label>
                                        <input type='text' name='fat' />
                                    </div>
                                    <div className="modal-footer">
                                        <button type="submit" className="btn btn-primary">Aseta</button>
                                        <button type="button" className="btn btn-default" data-dismiss="modal">Sulje</button>
                                    </div>
                                </div>
                            </form>

                        </div>
                    </div>
                    {dailyGoalOutput}
                </div>
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

    var energyChartData = {
        datasets: [{
            data: [total.energy, (goal.energy - total.energy)],
            borderWidth: 0,
            backgroundColor: [
                "orange",
                "#ffdab7"
            ],
            hoverBackgroundColor: [
                "orange",
                "#ffdab7"
            ]
        }]
    };

    new Chart(document.getElementById('energy-goal'), {
        type: 'doughnut',
        data: energyChartData,
        options: options
    });


    var proteinChartData = {
        datasets: [{
            data: [total.protein, (goal.protein - total.protein)],
            borderWidth: 0,
            backgroundColor: [
                "green",
                "#93f093"
            ],
            hoverBackgroundColor: [
                "green",
                "#93f093"
            ]
        }]
    };

    new Chart(document.getElementById('protein-goal'), {
        type: 'doughnut',
        data: proteinChartData,
        options: options
    });

    var carbChartData = {
        datasets: [{
            data: [total.carbs, (goal.carbs - total.carbs)],
            borderWidth: 0,
            backgroundColor: [
                "blue",
                "#c5d4ed"
            ],
            hoverBackgroundColor: [
                "blue",
                "#c5d4ed"
            ]
        }]
    };

    new Chart(document.getElementById('carb-goal'), {
        type: 'doughnut',
        data: carbChartData,
        options: options
    });


    var fatChartData = {
        datasets: [{
            data: [total.fat, (goal.fat - total.fat)],
            borderWidth: 0,
            backgroundColor: [
                "red",
                "#fcc6b4"
            ],
            hoverBackgroundColor: [
                "red",
                "#fcc6b4"
            ]
        }]
    };

    new Chart(document.getElementById('fat-goal'), {
        type: 'doughnut',
        data: fatChartData,
        options: options
    });
}
