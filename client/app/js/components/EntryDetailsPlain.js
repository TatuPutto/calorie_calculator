import React from 'react';

import drawMacroChart from '../util/draw-macro-chart';

export default class EntryDetailsPlain extends React.Component {
    componentDidMount() {
        //window.requestAnimationFrame(() => {
            drawMacroChart(this.props.canvasId, {
                protein: this.props.protein,
                carbs: this.props.carbs,
                fat: this.props.fat
            });
        //});
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
            <div className='col-xs-10 col-sm-5 col-md-3 entry-plain-wrapper'>
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
                    <div id={this.props.canvasId} className='plain-chart-container'>
                        {/*}<canvas id={this.props.canvasId} />*/}
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
