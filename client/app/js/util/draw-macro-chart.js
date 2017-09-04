export default function drawChart(entry) {
    var protein = entry.protein;
    var carbs = entry.carbs;
    var fat = entry.fat;
    var macroTotal = protein + carbs + fat;
    var proteinPercentage = Math.round(protein / macroTotal * 100);
    var carbPercentage = Math.round(carbs / macroTotal * 100);
    var fatPercentage = Math.round(fat / macroTotal * 100);

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
			indexLabelFontFamily: 'Roboto',
			indexLabelFontSize: 16,
			indexLabelFontWeight: 'normal',
			startAngle: 0,
			indexLabelFontColor: '#fff',
			indexLabelPlacement: 'inside',
			indexLabel: '#percent%',
			dataPoints: [
				{y: proteinPercentage},
				{y: carbPercentage},
				{y: fatPercentage}
			]
        }]
	});

	chart.render();
}
