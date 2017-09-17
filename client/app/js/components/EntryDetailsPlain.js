import React from 'react';

export default class EntryDetailsPlain extends React.Component {
    componentDidMount() {
        window.requestAnimationFrame(() => {
            createPlainMacroChart(this.props.canvasId, this.props.protein, this.props.carbs, this.props.fat);
        });
    }

    render() {
        var date = new Date(this.props.date);
        var dateNames = [
            'Sunnuntai',
            'Maanantai',
            'Tiistai',
            'Keskiviikko',
            'Torstai',
            'Perjantai',
            'Lauantai'
        ];
        var dateName = dateNames[date.getDay()];
        var dateStr = `${dateName}, ${date.getDate()}.${date.getMonth() + 1}`;


        return (
            <div className='col-xs-3 entry-plain-wrapper'>
                <div className='entry-plain'>
                    <div className='entry-plain-header'>
                        <h2>{dateStr}</h2>
                        <button
                            className='btn btn-ghost'
                            onClick={()=> this.props.showDetailedView(this.props.date)}
                        >
                            <i className='fa fa-external-link' />
                        </button>
                    </div>
                    <div className="plain-chart-container">
                        <canvas id={this.props.canvasId} />
                    </div>
                    <div className='entry-plain-content'>
                        <h3 className='entry-plain-energy'>{this.props.energy} kcal</h3>
                        <h4 className='entry-plain-protein'>{this.props.protein} g</h4>
                        <h4 className='entry-plain-carbs'>{this.props.carbs} g</h4>
                        <h4 className='entry-plain-fat'>{this.props.fat} g</h4>
                    </div>
                </div>
            </div>
        );
    }

}

function createPlainMacroChart(canvasId, protein, carbs, fat) {
    var data = {
        datasets: [
            {data: [protein, carbs, fat],
            backgroundColor: ['#47de83', '#5da5da', '#ea5450'],
            borderWidth: 1
        }]
    };


    var myPieChart = new Chart(canvasId, {
        type: 'pie',
        data: data,
        options: {animation : false}
    });


}
