import React from 'react';
import PropTypes from 'prop-types';

import SelectDiaryEntry from '../components/SelectDiaryEntry';
import ConsumedFoodsTable from '../components/ConsumedFoodsTable';

import drawMacroChart from '../util/draw-macro-chart';


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
            detailsVisible: false
        };

        this.getEntry = this.getEntry.bind(this);
        this.changeEntry = this.changeEntry.bind(this);
        this.toggleDetails = this.toggleDetails.bind(this);
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
        var {isFetching, entry} = this.state;

        if(!isFetching && entry && entry.nutritionValuesPerItem.length > 0) {
            window.requestAnimationFrame(() => {
                drawMacroChart(entry.nutritionValuesInTotal);
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
                            detailsVisible: false
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

    toggleDetails() {
        this.setState({detailsVisible: !this.state.detailsVisible});
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
            var carbsInRelationToGoal = Math.round(400 - carbGoal);
            var fatInRelationToGoal = Math.round(fatInTotal - fatGoal);

            entryElement = (
                <div className='entry-details col-lg-10 col-md-12 col-xs-12 col-lg-offset-1'>
                    <div className='row'>
                        <div className='macronutrient-split-chart-container col-sm-4'>
                            <div className='macronutrient-split-chart-container-header'>
                                Makrojakauma
                            </div>
                            <canvas id={'macronutrient-split-chart'} />
                        </div>
                        <div className='total-container col-sm-8'>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Makro</th>
                                        <th>Määrä</th>
                                        <th>Tavoite</th>
                                        <th>Jäljellä</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td style={{color: '#0fb70f'}}>Proteiini</td>
                                        <td>
                                            {Math.round(proteinInTotal)}
                                        </td>
                                        <td>{proteinGoal}</td>
                                        <td>
                                        {proteinInRelationToGoal >= 0 ?
                                            <span className='over-goal'>
                                                +{proteinInRelationToGoal} g
                                            </span>
                                        :
                                            <span className='under-goal'>
                                                {Math.abs(proteinInRelationToGoal)} g
                                            </span>
                                        }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{color: '#207eff'}}>Hiilihydraatit</td>
                                        <td>
                                            {Math.round(carbsInTotal)}
                                        </td>
                                        <td>{carbGoal}</td>
                                        <td>
                                            {carbsInRelationToGoal >= 0 ?
                                                <span className='over-goal'>
                                                    -{carbsInRelationToGoal} g
                                                </span>
                                            :
                                                <span className='under-goal'>
                                                    {Math.abs(carbsInRelationToGoal)} g
                                                </span>
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{color: '#fa6b6b'}}>Rasva</td>
                                        <td>
                                            {Math.round(fatInTotal)}
                                        </td>
                                        <td>{fatGoal}</td>
                                        <td>
                                            {fatInRelationToGoal >= 0 ?
                                                <span className='over-goal'>
                                                    -{fatInRelationToGoal} g
                                                </span>
                                            :
                                                <span className='under-goal'>
                                                    {Math.abs(fatInRelationToGoal)} g
                                                </span>
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{color: '#f6a000'}}>kcal</td>
                                        <td>
                                            {Math.round(energyInTotal)}
                                        </td>
                                        <td>{energyGoal}</td>
                                        <td>
                                        {energyInRelationToGoal >= 0 ?
                                            <span className='over-goal'>
                                                -{energyInRelationToGoal} kcal
                                            </span>
                                        :
                                            <span className='under-goal'>
                                                {Math.abs(energyInRelationToGoal)} kcal
                                            </span>
                                        }
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <button className='btn btn-default'
                                    onClick={this.toggleDetails}>
                                {this.state.detailsVisible ?
                                    <span>Piilota merkinnät</span>
                                    :
                                    <span>Näytä merkinnät</span>
                                }
                            </button>
                        </div>
                    </div>
                    {this.state.detailsVisible &&
                        <ConsumedFoodsTable
                            viewportWidth={this.props.viewportWidth}
                            isModifiable={false}
                            isFetchingConsumedFoods={false}
                            consumedFoods={this.state.entry.nutritionValuesPerItem}
                        />
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
                <SelectDiaryEntry
                    activeEntryDate={this.props.activeEntryDate}
                    diaryEntries={this.state.diaryEntries}
                    changeEntry={this.changeEntry}
                />
                {entryElement}
            </div>
        );
    }
}

Diary.contextTypes = {router: PropTypes.object.isRequired};

Diary.propTypes = {
    viewportWidth: PropTypes.number.isRequired,
    activeEntryDate: PropTypes.string.isRequired
};
