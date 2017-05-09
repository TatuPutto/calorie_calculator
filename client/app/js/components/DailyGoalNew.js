function createChart(total, goal) {
    console.log(total);
    var ctx1 = document.querySelector('#energy-goal');
    var data = {
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

    var options: {
        cutoutPercentage: 80,

    };

    var myDoughnutChart = new Chart(ctx1, {
        type: 'doughnut',
        data: data,
        options: {
            cutoutPercentage: 80,
        }
    });


    var ctx2 = document.querySelector('#protein-goal');
    var data2 = {
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

    var options2: {
        cutoutPercentage: 80,
        animation: {
            animateScale: false
        }
    };

    var myDoughnutChart2 = new Chart(ctx2, {
        type: 'doughnut',
        data: data2,
        options: {
            responsive: true,
            cutoutPercentage: 80
        }
    });

    var ctx3 = document.querySelector('#carb-goal');
    var data3 = {
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

    var options3: {
        cutoutPercentage: 80,
        animation: {
            animateScale: false
        }
    };

    var myDoughnutChart3 = new Chart(ctx3, {
        type: 'doughnut',
        data: data3,
        options: {
            responsive: true,
            cutoutPercentage: 80
        }
    });


    var ctx4 = document.querySelector('#fat-goal');
    var data4 = {
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

    var myDoughnutChart4 = new Chart(ctx4, {
        type: 'doughnut',
        data: data4,
        options: {
            responsive: true,
            cutoutPercentage: 80
        }
    });
}


import React from 'react';

export default class DailyGoalNew extends React.Component {
    shouldComponentUpdate(nextProps) {
        if(this.props.totalConsumption !== nextProps.totalConsumption) {
            console.log('Re-rendering!');
            return true;
        }
        return false;
    }


    componentDidUpdate() {
        console.log(this.props.isFetchingConsumedFoods);
        console.log(this.props.isFetchingDailyGoal + '\n\n-----------------');
        if(!this.props.isFetchingConsumedFoods && !this.props.isFetchingDailyGoal) {
            window.requestAnimationFrame(() => createChart(this.props.totalConsumption, this.props.dailyGoal));
        }
    }

    render() {
        var {totalConsumption: total, dailyGoal: goal} = this.props;

        return (
            <div className='new-goals'>
                <div className='charts col-sm-10 col-sm-offset-1'>
                    <h4>Päivä tavoite</h4>
                    <i className='fa fa-cog' />

                    {!this.props.isFetchingConsumedFoods && !this.props.isFetchingDailyGoal ?

                    <div className='macronutrient-bar'>

                        <div className='row'>
                            <div style={{position: 'relative', color: 'orange', width: '25%', minWidth: '180px', float: 'left'}}>
                                <p style={{fontSize: '18px'}}>Energia</p>
                                <div style={{position: 'relative', width: '120px', margin: '0 auto'}}>
                                    <p style={{position: 'absolute', top: '39%', left: '33%', fontSize: '24px'}}>
                                        {Math.round(total.energy / goal.energy * 100)}%
                                    </p>
                                    <canvas id='energy-goal' />
                                </div>
                                <p style={{fontSize: '18px'}}>{Math.round(total.energy)} kcal / {goal.energy} kcal</p>
                            </div>


                            <div style={{position: 'relative', color: 'green', width: '25%', minWidth: '180px', float: 'left'}}>
                                <p style={{fontSize: '18px'}}>Proteiini</p>
                                <div style={{position: 'relative', width: '120px', margin: '0 auto'}}>
                                    <p style={{position: 'absolute', top: '39%', left: '33%', fontSize: '24px'}}>
                                        {Math.round(total.protein / goal.protein * 100)}%
                                    </p>
                                    <canvas id='protein-goal' />
                                </div>
                                <p style={{fontSize: '18px'}}>{Math.round(total.protein)} g / {goal.protein} g</p>
                            </div>
                            <div style={{position: 'relative', color: 'blue', width: '25%', minWidth: '180px', float: 'left'}}>
                                <p style={{fontSize: '18px'}}>Hiilihydraatit</p>
                                <div style={{position: 'relative', width: '120px', margin: '0 auto'}}>
                                    <p style={{position: 'absolute', top: '39%', left: '33%', fontSize: '24px'}}>
                                        {Math.round(total.carbs / goal.carbs * 100)}%
                                    </p>
                                    <canvas id='carb-goal' />
                                </div>
                                <p style={{fontSize: '18px'}}>{Math.round(total.carbs)} g / {goal.carbs} g</p>
                            </div>
                            <div style={{position: 'relative', color: 'red', width: '25%', minWidth: '180px', float: 'left'}}>

                                <p style={{fontSize: '18px'}}>Rasva</p>
                                <div style={{position: 'relative', width: '120px', margin: '0 auto'}}>
                                    <p style={{position: 'absolute', top: '39%', left: '33%', fontSize: '24px'}}>
                                        {Math.round(total.fat / goal.fat * 100)}%
                                    </p>
                                    <canvas id='fat-goal' />
                                </div>
                                <p style={{fontSize: '18px'}}>{Math.round(total.fat)} g / {goal.fat} g</p>
                            </div>
                        </div>
                    </div>
                :
                    <i className='fa fa-spinner fa-3x fa-spin' />
                }
                </div>
            </div>
        );
    }
}
