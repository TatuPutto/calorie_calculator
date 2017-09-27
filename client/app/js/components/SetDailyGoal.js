import React from 'react';

import {post} from '../util/fetch';

export default class SetDailyGoal extends React.Component {
    constructor() {
        super();

        this.defaults = {
            proteinPercentage: 30,
            carbPercentage: 50,
            fatPercentage: 20,
            energy: 2500,
            protein: Math.round(0.3 * 2500 / 4),
            carbs:  Math.round(0.5 * 2500 / 4),
            fat:  Math.round(0.2 * 2500 / 9)
        };

        this.state = {
            energyGoal: this.defaults.energy,
            proteinGoal: this.defaults.protein,
            carbGoal: this.defaults.carbs,
            fatGoal: this.defaults.fat,
            proteinPercentage: this.defaults.proteinPercentage,
            carbPercentage: this.defaults.carbPercentage,
            fatPercentage: this.defaults.fatPercentage,
            percentagesAddTo100: true
        }
    }

    changeEnergy = (e) => {
        var energy = e.target.value;
        this.calcMacronutrientSplit(energy);
    }

    calcMacronutrientSplit = (energy = this.state.energyGoal) => {
        this.setState({
            energyGoal: energy,
            proteinGoal: Math.round(this.state.proteinPercentage / 100 * energy / 4),
            carbGoal: Math.round(this.state.carbPercentage / 100 * energy / 4),
            fatGoal: Math.round(this.state.fatPercentage / 100 * energy / 9)
        });
    }

    changeMacronutrientPercentage = (e) => {
        var macro = e.target.id;
        var macroPercentage = +e.target.value;
        var proteinPercentage = (macro == 'protein') ? macroPercentage : this.state.proteinPercentage;
        var carbPercentage = (macro == 'carb') ? macroPercentage : this.state.carbPercentage;
        var fatPercentage = (macro == 'fat') ? macroPercentage : this.state.fatPercentage;
        var macroTotalAfterChange = proteinPercentage + carbPercentage + fatPercentage;

        if(macroTotalAfterChange > 100) {
            this.setState({percentagesAddTo100: false});
        } else {
            this.setState({
                proteinPercentage,
                carbPercentage,
                fatPercentage,
                percentagesAddTo100: macroTotalAfterChange === 100 ? true : false
            }, this.calcMacronutrientSplit);
        }
    }

    createSelect = (macro, from, to) => {
        var macroPercentage = eval('this.state.' + macro + 'Percentage');
        var amountOfOptions = (to - from) / 5;
        var options = [];

        // create options, increment value by 5% after each iteration
        // (e.g 15%, 20%, ..., 65%) until @from i = @from
        for(var i = 0; i <= amountOfOptions; i++) {
            var value = i * 5 + from;
            options.push(
                <option value={value} selected={macroPercentage === value ? true : false}>
                    {value} %
                </option>
            );
        }

        return (
            <select id={macro} onChange={this.changeMacronutrientPercentage}>
                {options}
            </select>
        );
    }

    handleSubmit = (e) => {
        e.preventDefault();

        if(this.state.percentagesAddTo100) {
            var goal = {
                energy: this.state.energyGoal,
                protein: this.state.proteinGoal,
                carbs: this.state.carbGoal,
                fat: this.state.fatGoal
            }

            post('/daily-goal', goal)
                .then(() => {
                    $('#set-daily-goal').modal('hide');
                    this.props.setDailyGoal(goal);
                })
                .catch(() => {
                    alert('Päivätavoitteen asettaminen ei onnistunut.')
                    $('#set-daily-goal').modal('hide');
                })
        } else {
            alert('Makrojakauman summan täytyy olla 100.');
        }
    }

    render() {
        return (
            <div className='modal fade' id='set-daily-goal' role='dialog'>
                <div className='modal-dialog'>
                    <form onSubmit={this.handleSubmit}>
                        <div className='modal-content'>
                            <div className='modal-header'>
                                <button className='close' data-dismiss='modal'>&times;</button>
                                <h4 className='modal-title'>Aseta päivätavoite</h4>
                            </div>
                            <div className='modal-body'>
                                <label>Energia (kcal)</label><br />
                                <input type='text' className='amount energy' value={this.state.energyGoal} onChange={this.changeEnergy} required />
                                <div className={'set-macros ' + (!this.state.percentagesAddTo100 ? 'invalid-values' : '')}>
                                    <div className='row'>
                                        <div className='col-sm-4'>
                                            <label>Proteiini</label><br />
                                            {this.createSelect('protein', 15, 65)}<br />
                                            <input type='text' className='amount protein' value={Math.round(this.state.proteinGoal) + ' g'} required readOnly />
                                        </div>
                                        <div className='col-sm-4'>
                                            <label>Hiilihydraatit</label><br />
                                            {this.createSelect('carb', 15, 65)}<br />
                                            <input type='text' className='amount carbs' value={Math.round(this.state.carbGoal) + ' g'} required readOnly />
                                        </div>
                                        <div className='col-sm-4'>
                                            <label>Rasva</label><br />
                                            {this.createSelect('fat', 15, 50)}<br />
                                            <input type='text' className='amount fat' value={Math.round(this.state.fatGoal) + ' g'} required readOnly />
                                        </div>
                                    </div>
                                    {!this.state.percentagesAddTo100 &&
                                        <div className='error-message'><i className='fa fa-warning' /> Makrojakauman summan täytyy olla 100.</div>
                                    }
                                </div>
                            </div>
                            <div className='modal-footer'>
                                <button className='btn btn-primary' onClick={this.handleSubmit} disabled={this.state.percentagesAddTo100 ? false : true}>
                                    Aseta
                                </button>
                                <button type='button' className='btn btn-default' data-dismiss='modal'>
                                    Sulje
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
