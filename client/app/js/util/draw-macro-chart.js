export default function drawChart(entry) {
    var protein = entry.protein;
    var carbs = entry.carbs;
    var fat = entry.fat;

    var macroTotal = protein + carbs + fat;
    var proteinPercentage = Math.round(protein / macroTotal * 100);
    var carbPercentage = Math.round(carbs / macroTotal * 100);
    var fatPercentage = Math.round(fat / macroTotal * 100);

    /*var options =  {
        legend: {
            display: false,
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
    };*/

    CanvasJS.addColorSet('macros', ['#47de83', '#5da5da', '#ea5450']);

    var chart = new CanvasJS.Chart('macronutrient-split-chart-container', {
        height: 260,
        width: 260,
        colorSet: 'macros',
        animationEnabled: true, markerBorderColor: "#fff",
        animationDuration: 400,
        interactivityEnabled: false,
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

/*
    new Chart(document.getElementById(('macronutrient-split-chart')), {
        type: 'pie',
        data: data,
        options: options
    });
*/
/*    var canvas = document.getElementById('macronutrient-split-chart');
    canvas.width  = 250;
    canvas.height = 250;

    var ctx = canvas.getContext('2d');
    var radius = ctx.canvas.width / 2;
    var lastSegmentEnd = 0;
    var segmentColors = ['#47de83', '#5DA5DA', '#ea5450'];
    var pieData = [protein, carbs, fat];
    var pieTotal = protein + carbs + fat;

    // draw clear rectangle for text fills
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // draw segments
    for(var i = 0; i < segmentColors.length; i++) {
        // draw segment starting line
        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#fff';
        ctx.moveTo(radius, radius);

        // draw segment arc
        ctx.fillStyle = segmentColors[i];
        ctx.arc(radius, radius, radius, lastSegmentEnd, lastSegmentEnd +
                (Math.PI * 2 * (pieData[i] / pieTotal)), false);

        // draw segment ending line
        ctx.lineTo(radius, radius);
        ctx.stroke();
        ctx.fill();

        // draw text fill for segment
        var textFillRadius = radius / 1.7;
        var endAngle = lastSegmentEnd + (Math.PI * (pieData[i] / pieTotal));
        var setX = radius + Math.cos(endAngle) * textFillRadius;
        var setY = radius + Math.sin(endAngle) * textFillRadius;
        ctx.fillStyle = '#fff';
        ctx.font = '16px Roboto';
        ctx.fillText((pieData[i] / pieTotal * 100).toFixed(1) + '%', setX, setY);

        lastSegmentEnd += Math.PI * 2 * (pieData[i] / pieTotal);
    }*/
}
