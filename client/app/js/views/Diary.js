import React from 'react';
import PropTypes from 'prop-types';

import DiaryEntrySelection from '../components/DiaryEntrySelection';
import EntryDetails from '../components/EntryDetails';
import EntryDetailsPlain from '../components/EntryDetailsPlain';
import BlankEntry from '../components/BlankEntry';
import Loading from '../components/Loading';

import {checkStatus, readJson, get} from '../util/fetch';
import drawMacroChart from '../util/draw-macro-chart';
import {getCurrentDate, formatDate, getCurrentWeek} from '../util/date-functions';


export default class Diary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isInDayView: this.props.isInDayView,
            nutritionDetailsForMultipleEntries: [],
            entryDates: [],
            fetchError: null,
            isFetchingdiaryEntries: true,
            consumedFoods: [],
            total: null,
            dailyGoal: null,
            isFetchingEntry: false,
            entryFetchError: null,
            detailsVisible: false,
            shownNutritionValue: 'energy',
            viewportWidth: this.props.viewportWidth
        };
    }

    componentWillMount() {
        get('entries/dates-containing-entries')
            .then(checkStatus)
            .then(readJson)
            .then((entryDates) => {
                if(this.state.isInDayView) {
                    this.getEntriesFromDate(this.props.date);
                } else {
                    this.getEntriesFromDateRange(this.props.week);
                }

                this.setState({
                    entryDates,
                    isFetchingdiaryEntries: false,
                    date: this.props.date
                }, () => this.state.entryDates);
            })
            .catch((err) => this.setState({
                isFetchingdiaryEntries: false,
                entryDatesFetchError: 'Merkintöjä ei onnistuttu hakemaan.'
            }));
    }

    componentDidMount() {
        var resizeTimeout = null;
        window.addEventListener('resize', (e) => {
            if(!resizeTimeout) clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                var viewportWidth = Math.max(
                    document.documentElement.clientWidth,
                    window.innerWidth || 0
                );
                this.setState({viewportWidth});
            }, 200);
        });
    }

    // get next entry when query params are pushed
    componentWillReceiveProps(nextProps) {
        if(nextProps.isInDayView) {
            this.getEntriesFromDate(nextProps.date);
        } else {
            this.getEntriesFromDateRange(nextProps.week);
        }
    }

    componentDidUpdate() {
        var {
            isFetchingEntry,
            consumedFoods,
            total,
            isInDayView
        } = this.state;

        if(!isFetchingEntry && consumedFoods.length > 0 && isInDayView) {
            window.requestAnimationFrame(() => {
                drawMacroChart(
                    'macronutrient-split-chart-container',
                    total,
                    isInDayView
                );
            });
        }
    }

    getEntriesFromDate = (date) => {
        document.title = date.replace(/[-]/g, '.');
        this.setState({entry: null, isFetchingEntry: true});

        // fetch entry details and goal from date X
        Promise.all([
            get(`entries/day/${date}`),
            get(`daily-goal/${date}`)
        ])
        .then((responses) => Promise.all(responses.map(checkStatus)))
        .then((responses) => Promise.all(responses.map(readJson)))
        .then((data) => {
            this.setState({
                isInDayView: true,
                consumedFoods: data[0].entries,
                total: data[0].total,
                dailyGoal: data[1],
                isFetchingEntry: false,
                entryFetchError: null,
                detailsVisible: false
            });
        })
        .catch((err) => {
            this.setState({
                isFetchingEntry: false,
                fetchError: 'Merkintöjä ei onnistuttu hakemaan.'
            });
        });
    }

    getEntriesFromDateRange = (week) => {
        document.title = 'Viikko ' + week;
        this.setState({entry: null, isFetchingEntry: true});

        get(`entries/week/${week}`)
            .then(checkStatus)
            .then(readJson)
            .then((data) => {
                this.setState({
                    isInDayView: false,
                    nutritionDetailsForMultipleEntries: data,
                    isFetchingEntry: false,
                    entryFetchError: null,
                    detailsVisible: false
                });
            })
            .catch((err) => {
                this.setState({
                    isFetchingEntry: false,
                    fetchError: 'Merkintöjä ei onnistuttu hakemaan.'
                })
            });
    }

    changeEntry = (direction) => {
        if(this.state.isInDayView) {
            var date = this.props.date;
            var entryDates = this.state.entryDates;
            var currentIndex = entryDates.indexOf(date);
            var indexOfNextEntry = (direction == 'next') ?
                    currentIndex - 1 : currentIndex + 1;
            var nextEntry = entryDates[indexOfNextEntry];

            this.context.router.history.push(`?date=${nextEntry}`);
        } else {
            var week = this.props.week;
            var goToWeek = (direction == 'next') ? week + 1 : week - 1;
            this.context.router.history.push(`?week=${goToWeek}`);
        }
    }

    showDetailedView = (date) => {
        this.context.router.history.push(`?date=${formatDate(date)}`);
    }

    toggleViewMode = (viewMode) => {
        if(viewMode == 'weekView' && this.state.isInDayView) {
            this.context.router.history.push(`?week=${getCurrentWeek()}`);
        } else if(viewMode == 'dayView' && !this.state.isInDayView) {
            this.context.router.history.push(`?date=${getCurrentDate()}`);
        }
    }

    changeShownNutritionValue = (e) => {
        var nutritionValue;

        switch(e.currentTarget.value) {
            case 'kcal':
                nutritionValue = 'energy';
                break;
            case 'Proteiini':
                nutritionValue = 'protein';
                break;
            case 'Hiilihydraatti':
                nutritionValue = 'carbs';
                break;
            case 'Rasva':
                nutritionValue = 'fat';
                break;

        }

        this.setState({shownNutritionValue: nutritionValue});
    }


    render() {
        var {
            isFetchingEntry,
            nutritionDetailsForMultipleEntries,
            consumedFoods,
            total,
            dailyGoal,
            isInDayView,
            fetchError,
            viewportWidth
        } = this.state;

        var output = null;
        var hasEntries = false;

        if(isInDayView) {
            for(var food of consumedFoods) {
                if(food.foods.length > 0) hasEntries = true;
            }
        }

        // day view output
        if(!isFetchingEntry && consumedFoods.length > 0 && hasEntries && isInDayView) {
            output = (
                <EntryDetails
                    total={total}
                    dailyGoal={dailyGoal}
                    consumedFoods={consumedFoods}
                    viewportWidth={viewportWidth}
                    shownNutritionValue={this.state.shownNutritionValue}
                    changeShownNutritionValue={this.changeShownNutritionValue}
                />
            );
        // week view output
        } else if(!isFetchingEntry && !isInDayView && nutritionDetailsForMultipleEntries.length > 0) {
            output = (
                <div className='row entries-container'>
                    {nutritionDetailsForMultipleEntries.map((details, i) => {
                        if(details.hasOwnProperty('energy')) {
                            return (
                                <EntryDetailsPlain
                                    key={i.toString()}
                                    canvasId={i.toString()}
                                    date={details.date}
                                    energy={details.energy}
                                    protein={details.protein}
                                    carbs={details.carbs}
                                    fat={details.fat}
                                    showDetailedView={this.showDetailedView}
                                />
                            );
                        } else {
                            return <BlankEntry date={details.date} />;
                        }
                    })}
                </div>
            );
        } else if(isFetchingEntry) {
            output = <Loading />;
        } else if(fetchError) {
            output = (
                <div className='failed-to-fetch'>
                    <p>Merkintöjä ei onnistuttu hakemaan.</p>
                </div>
            );
        } else {
            output = (
                <div className='no-entries'>
                    {isInDayView ?
                        <p>Tältä päivältä ei löytynyt merkintöjä.</p>
                        :
                        <p>Tältä viikolta ei löytynyt merkintöjä.</p>
                    }
                </div>
            );
        }

        return (
            <div className='diary'>
                <DiaryEntrySelection
                    isInDayView={isInDayView}
                    date={this.props.date}
                    week={this.props.week}
                    entryDates={this.state.entryDates}
                    changeEntry={this.changeEntry}
                    toggleViewMode={this.toggleViewMode}
                />
                {output}
            </div>
        );
    }
}

Diary.contextTypes = {router: PropTypes.object.isRequired};

Diary.propTypes = {
    viewportWidth: PropTypes.number.isRequired,
    date: PropTypes.string,
    week: PropTypes.number
};
