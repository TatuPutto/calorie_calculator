import React from 'react';
import PropTypes from 'prop-types';

import ConsumedFoodsTable from '../components/ConsumedFoodsTable';

import getCurrentDate from '../util/get-current-date';

export default class Diary extends React.Component {
    constructor() {
        super();
        this.state = {
            diaryEntries: [],
            isFetchingdiaryEntries: true,
            diaryEntriesFetchError: null,
            entry: null,
            isFetchingEntry: false,
            entryFetchError: null,
            consumedFoodsVisible: false
        };

        this.getEntry = this.getEntry.bind(this);
        this.changeEntry = this.changeEntry.bind(this);
        this.toggleConsumedFoodsVisibility = this.toggleConsumedFoodsVisibility.bind(this);
    }

    componentWillMount() {
        fetch('diary-entries', {credentials: 'same-origin'})
            .then((res) => res.json())
            .then((diaryEntries) => {
                // get entry specified by query param
                this.getEntry(this.props.activeEntryDate);
                this.setState({
                    diaryEntries,
                    isFetchingdiaryEntries: false,
                    activeEntryDate: this.props.activeEntryDate
                });
            }).catch((err) => this.setState({
                isFetchingdiaryEntries: false,
                diaryEntriesFetchError: err
            }));
    }

    // get next entry when query params are pushed
    componentWillReceiveProps(nextProps) {
        this.getEntry(nextProps.activeEntryDate);
    }

    componentDidUpdate() {
        if(!this.state.isFetching && this.state.entry && this.state.entry.nutritionValuesPerItem.length > 0) {
            window.requestAnimationFrame(() => {
                drawChart(this.state.entry.nutritionValuesInTotal);
            });
        }
    }

    getEntry(entryDate) {
        document.title = entryDate.replace(/[-]/g, '.');

        fetch(`entry/${entryDate}`, {credentials: 'same-origin'})
            .then((res) => res.json())
            .then((entry) => {
                fetch(`daily-goal/${entryDate}`, {credentials: 'same-origin'})
                    .then((res) => res.json())
                    .then((goal) => {
                        entry['goal'] = goal;

                        this.setState({
                            entry,
                            isFetchingEntry: false,
                            entryFetchError: null,
                            consumedFoodsVisible: false
                        });

                    }).catch((err) => console.error(err));
            }).catch((err) => this.setState({
                isFetchingEntry: false,
                entryFetchError: err
            }));
    }

    changeEntry(direction) {
        var activeEntryDate = this.props.activeEntryDate;
        var diaryEntries = this.state.diaryEntries;
        var currentIndex = diaryEntries.indexOf(activeEntryDate);
        var indexOfNextEntry = (direction == 'next') ?
                currentIndex - 1 : currentIndex + 1;
        var nextEntry = diaryEntries[indexOfNextEntry];

        this.context.router.history.push(`?entry=${nextEntry}`);
    }

    toggleConsumedFoodsVisibility() {
        this.setState({consumedFoodsVisible: !this.state.consumedFoodsVisible});
    }

    render() {
        var entryElement = null;

        if(!this.state.isFetchingEntry && this.state.entry &&
                this.state.entry.nutritionValuesPerItem.length > 0) {
            var {
                energy: energyInTotal,
                protein: proteinInTotal,
                carbs: carbsInTotal,
                fat: fatInTotal
            } = this.state.entry.nutritionValuesInTotal;
            var {
                energy: energyGoal,
                protein: proteinGoal,
                carbohydrates: carbGoal,
                fat: fatGoal
            } = this.state.entry.goal;

            var energyInRelationToGoal = Math.round(energyInTotal - energyGoal);
            var proteinInRelationToGoal = Math.round(proteinInTotal - proteinGoal);
            var carbsInRelationToGoal = Math.round(carbsInTotal - carbGoal);
            var fatInRelationToGoal = Math.round(fatInTotal - fatGoal);

            entryElement = (
                <div className='entry-details col-sm-10 col-xs-12 col-sm-offset-1'>
                    <div className='macronutrient-split-chart-container'>
                        <canvas id={'macronutrient-split-chart'} />
                    </div>
                    <div className='total-container'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Makro</th>
                                    <th>Määrä</th>
                                    <th>Tavoite</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style={{color: '#0fb70f'}}>Proteiini</td>
                                    <td>
                                        {Math.round(proteinInTotal)} g
                                        {proteinInRelationToGoal >= 0 ?
                                            <span className='over-goal'>
                                                (+{proteinInRelationToGoal})
                                            </span>
                                        :
                                            <span className='under-goal'>
                                                ({proteinInRelationToGoal})
                                            </span>
                                        }
                                    </td>
                                    <td>{proteinGoal} g</td>
                                </tr>
                                <tr>
                                    <td style={{color: '#207eff'}}>Hiilihydraatit</td>
                                    <td>
                                        {Math.round(carbsInTotal)} g
                                        {carbsInRelationToGoal >= 0 ?
                                            <span className='over-goal'>
                                                (+{carbsInRelationToGoal})
                                            </span>
                                        :
                                            <span className='under-goal'>
                                                ({carbsInRelationToGoal})
                                            </span>
                                        }
                                    </td>
                                    <td>{carbGoal} g</td>
                                </tr>
                                <tr>
                                    <td style={{color: '#fa6b6b'}}>Rasva</td>
                                    <td>
                                        {Math.round(fatInTotal)} g
                                        {fatInRelationToGoal >= 0 ?
                                            <span className='over-goal'>
                                                (+{fatInRelationToGoal})
                                            </span>
                                        :
                                            <span className='under-goal'>
                                                ({fatInRelationToGoal})
                                            </span>
                                        }
                                    </td>
                                    <td>{fatGoal} g</td>
                                </tr>
                                <tr>
                                    <td style={{color: '#f6a000'}}>kcal</td>
                                    <td>
                                        {Math.round(energyInTotal)}
                                        {energyInRelationToGoal >= 0 ?
                                            <span className='over-goal'>
                                                (+{energyInRelationToGoal})
                                            </span>
                                        :
                                            <span className='under-goal'>
                                                ({energyInRelationToGoal})
                                            </span>
                                        }
                                    </td>
                                    <td>{energyGoal}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {this.state.consumedFoodsVisible ?
                        <div style={{marginBottom: '40px'}}>
                            <ConsumedFoodsTable
                                viewportWidth={this.props.viewportWidth}
                                isModifiable={false}
                                isFetchingConsumedFoods={false}
                                consumedFoods={this.state.entry.nutritionValuesPerItem}
                            />
                            <button
                                className='btn btn-default'
                                onClick={this.toggleConsumedFoodsVisibility}
                                style={{marginTop: '20px'}}
                            >
                                Piilota merkinnät
                            </button>
                        </div>
                    :
                        <button
                            className='btn btn-default'
                            onClick={this.toggleConsumedFoodsVisibility}
                        >
                            Näytä merkinnät
                        </button>
                    }
                </div>
            );
        } else if(!this.state.isFetching) {
            entryElement = <p>Tältä päivältä ei löytynyt merkintöjä.</p>;
        } else {
            entryElement = <i className='fa fa-spinner fa-spin fa-2x' />
        }


        return (
            <div className='diary'>
                <div className='diary-entry-selection'>
                    {this.props.activeEntryDate != this.state.diaryEntries[this.state.diaryEntries.length - 1] &&
                        <button onClick={()=> this.changeEntry('previous')}>
                            <i className='fa fa-chevron-left' />
                        </button>
                    }

                    <span className='selected-entry'>
                        {this.props.activeEntryDate.replace(/[-]/g, '.')}
                    </span>

                    {this.props.activeEntryDate != getCurrentDate() &&
                            this.props.activeEntryDate != this.state.diaryEntries[0] &&
                        <button onClick={()=> this.changeEntry('next')}>
                            <i className='fa fa-chevron-right' />
                        </button>
                    }
                </div>
                {entryElement}
            </div>
        );
    }
}

Diary.contextTypes = {router: PropTypes.object.isRequired};


function drawChart(entry) {
    var protein = entry.protein;
    var carbs = entry.carbs;
    var fat = entry.fat;

    var macroTotal = protein + carbs + fat;
    var proteinPercentage = Math.round(protein / macroTotal * 100);
    var carbPercentage = Math.round(carbs / macroTotal * 100);
    var fatPercentage = Math.round(fat / macroTotal * 100);

    var options =  {
        legend: {
            display: true,
            labels: {
                fontSize: 10
            }
        }
    };

    var data = {
        labels: [
            `Proteiini (${proteinPercentage}%)`,
            `Hiilihydraatit (${carbPercentage}%)`,
            `Rasva (${fatPercentage}%)`,
        ],
        datasets: [{
            data: [protein, carbs, fat],
            borderWidth: 0.5,
            backgroundColor: [
                '#60BD68',
                '#5DA5DA',
                '#F15854'
            ]
        }]
    };



    new Chart(document.getElementById(('macronutrient-split-chart')), {
        type: 'pie',
        data: data,
        options: options
    });
/*
    var lastend = 0;
    var pieColor = ["#5DA5DA","#60BD68","#F15854"];
    var pieData = [70,100,30];
    var pieTotal = 70 + 80 + 10; // done manually for demo

    var canvas = document.getElementById("macronutrient-split-chart");
    			var ctx = canvas.getContext("2d");

    			ctx.clearRect(0, 0, canvas.width, canvas.height);

    			var hwidth = ctx.canvas.width/2;
    			var hheight = ctx.canvas.height/2;


    			for (var i = 0; i < pieColor.length; i++) {
    					ctx.fillStyle = pieColor[i];
    					ctx.beginPath();
    					ctx.moveTo(hwidth,hheight);
    					ctx.arc(hwidth,hheight,hheight,lastend,lastend+
    					  (Math.PI*2*(pieData[i]/pieTotal)),false);


    					ctx.lineTo(hwidth,hheight);
    					ctx.fill();

    					var radius = hheight/2; //use suitable radius
    					var endAngle = lastend + (Math.PI*(pieData[i]/pieTotal));
    					var setX = hwidth + Math.cos(endAngle) * radius;
    					var setY = hheight + Math.sin(endAngle) * radius;
    					ctx.fillStyle = "#ffffff";
    					ctx.font = '12px sans-serif';
    					ctx.fillText(pieData[i],setX,setY);

    		//			ctx.lineTo(hwidth,hheight);
    					//ctx.fill(); //uncomment for debugging

    					lastend += Math.PI*2*(pieData[i]/pieTotal);
    		}





        /*var canvas = document.getElementById('macronutrient-split-chart-' + i);
        var ctx = canvas.getContext("2d");
        var midX = canvas.width/2;
        var midY = canvas.height/2
        var totalValue = getTotalValue(data);
*/
    // Create a pie chart
    /*var myPieChart = new Chart(ctx).Pie(data, {
        showTooltips: false,
        onAnimationProgress: drawSegmentValues
    });*/

/*    var myPieChart = new Chart(document.getElementById(('macronutrient-split-chart-' + i)), {
        type: 'pie',
        data: data,
        options: {
            showTooltips: false,
            onAnimationComplete: drawSegmentValues()
        }
    });*/
/*

    Chart.types.Pie.extend({
       name: "PieTextInside",
       showTooltip: function() {
           this.chart.ctx.save();
           Chart.types.Pie.prototype.showTooltip.apply(this, arguments);
           this.chart.ctx.restore();
       },
       draw: function() {
           Chart.types.Pie.prototype.draw.apply(this, arguments);

           var width = this.chart.width,
               height = this.chart.height;

           var fontSize = (height / 114).toFixed(2);
           this.chart.ctx.font = fontSize + "em Verdana";
           this.chart.ctx.textBaseline = "middle";

           var text = "82%",
               textX = Math.round((width - this.chart.ctx.measureText(text).width) / 2),
               textY = height / 2;

           this.chart.ctx.fillText(text, textX, textY);
       }
   });*/
   /*var id = document.getElementById('macronutrient-split-chart-' + i);
   var DoughnutTextInsideChart = new Chart(document.getElementById('macronutrient-split-chart-' + i).getContext('2d')).PieTextInside(data, {responsive: true
   });*/

/*
    var radius = myPieChart.outerRadius;
    console.log(radius);
    function drawSegmentValues()
    {
        for(var i=0; i<myPieChart.segments.length; i++)
        {
            ctx.fillStyle="white";
            var textSize = canvas.width/15;
            ctx.font= textSize+"px Verdana";
            // Get needed variables
            var value = myPieChart.segments[i].value/totalValue*100;
            if(Math.round(value) !== value)
            	value = (myPieChart.segments[i].value/totalValue*100).toFixed(1);
            value = value + '%';

            var startAngle = myPieChart.segments[i].startAngle;
            var endAngle = myPieChart.segments[i].endAngle;
            var middleAngle = startAngle + ((endAngle - startAngle)/2);

            // Compute text location
            var posX = (radius/2) * Math.cos(middleAngle) + midX;
            var posY = (radius/2) * Math.sin(middleAngle) + midY;

            // Text offside by middle
            var w_offset = ctx.measureText(value).width/2;
            var h_offset = textSize/4;

            ctx.fillText(value, posX - w_offset, posY + h_offset);
        }
    }

    function getTotalValue(arr) {
        var total = 0;
        for(var i=0; i<arr.length; i++)
            total += arr[i].value;
        return total;
    }*/
}
