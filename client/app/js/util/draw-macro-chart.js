export default function drawChart(total) {
    var proteinInTotal = total.protein;
    var carbsInTotal = total.carbs;
    var fatInTotal = total.fat;
    var macrosInTotal = proteinInTotal + carbsInTotal + fatInTotal;
    var proteinPercentage = Math.round(proteinInTotal / macrosInTotal * 100);
    var carbPercentage = Math.round(carbsInTotal / macrosInTotal * 100);
    var fatPercentage = Math.round(fatInTotal / macrosInTotal * 100);

    CanvasJS.addColorSet('macros', ['#47de83', '#5da5da', '#ea5450']);

    var chart = new CanvasJS.Chart('macronutrient-split-chart-container', {
        height: 260,
        animationEnabled: true,
        animationDuration: 400,
        interactivityEnabled: false,
        colorSet: 'macros',
        backgroundColor: '#f9f9f9',
        markerBorderColor: "#fff",
    	data: [{
			type: 'pie',
            startAngle: 0,
			indexLabelFontFamily: 'Roboto',
			indexLabelFontSize: 14,
			indexLabelFontWeight: 'normal',
			indexLabelFontColor: '#fff',
			indexLabelPlacement: 'inside',
			dataPoints: [
				{y: proteinPercentage, indexLabel: `${Math.round(proteinInTotal)} g (${proteinPercentage}%)`},
				{y: carbPercentage, indexLabel: `${Math.round(carbsInTotal)} g (${carbPercentage}%)`},
				{y: fatPercentage, indexLabel: `${Math.round(fatInTotal)} g (${fatPercentage}%)`},
			]
        }]
	});

	chart.render();
}
