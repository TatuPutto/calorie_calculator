export default function drawChart(ctx, total, isInDayView) {
    var proteinInTotal = total.protein;
    var carbsInTotal = total.carbs;
    var fatInTotal = total.fat;
    var macrosInTotal = proteinInTotal + carbsInTotal + fatInTotal;
    var proteinPercentage = Math.round(proteinInTotal / macrosInTotal * 100);
    var carbPercentage = Math.round(carbsInTotal / macrosInTotal * 100);
    var fatPercentage = Math.round(fatInTotal / macrosInTotal * 100);

    CanvasJS.addColorSet('macros', ['#47de83', '#5da5da', '#ea5450']);

    var chart = new CanvasJS.Chart(ctx, {
        height: isInDayView ? 260 : 150,
        animationEnabled: false,
        animationDuration: 400,
        interactivityEnabled: false,
        colorSet: 'macros',
        backgroundColor: isInDayView ? '#f9f9f9' : '#fff',
    	data: [{
			type: 'pie',
            startAngle: 0,
			indexLabelFontFamily: 'arial',
			indexLabelFontSize: isInDayView ? 13 : 12,
			indexLabelFontWeight: 'normal',
			indexLabelFontColor: '#fff',
			indexLabelPlacement: 'inside',
            indexLabel: '#percent%',
			dataPoints: isInDayView ? [
				{y: proteinPercentage, indexLabel: `${Math.round(proteinInTotal)} g (${proteinPercentage}%)`},
				{y: carbPercentage, indexLabel: `${Math.round(carbsInTotal)} g (${carbPercentage}%)`},
				{y: fatPercentage, indexLabel: `${Math.round(fatInTotal)} g (${fatPercentage}%)`},
            ] : [
                {y: proteinPercentage},
				{y: carbPercentage},
				{y: fatPercentage},
            ]
        }]
	});

	chart.render();
}
