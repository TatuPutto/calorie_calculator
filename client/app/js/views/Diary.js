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
            isFetchingdiaryEntries: true,
            diaryEntriesFetchError: null,
            consumedFoods: [],
            totalConsumption: {},
            dailyGoal: {},
            isFetchingEntry: false,
            entryFetchError: null,
            detailsVisible: false,
            shownNutritionValue: 'energy',
            viewportWidth: this.props.viewportWidth
        };

        this.getEntryFromDate = this.getEntryFromDate.bind(this);
        this.getEntriesFromDateRange = this.getEntriesFromDateRange.bind(this);
        this.changeEntry = this.changeEntry.bind(this);
        this.showDetailedView = this.showDetailedView.bind(this);
        this.toggleViewMode = this.toggleViewMode.bind(this);
    }

    componentWillMount() {
        get('diary-entries')
            .then((res) => res.json())
            .then((entryDates) => {
                // get entry specified by query param
                if(this.state.isInDayView) {
                    this.getEntryFromDate(this.props.date);
                } else {
                    this.getEntriesFromDateRange(this.props.week);
                }

                this.setState({
                    entryDates,
                    isFetchingdiaryEntries: false,
                    date: this.props.date
                });
            }).catch((err) => this.setState({
                isFetchingdiaryEntries: false,
                diaryEntriesFetchError: err
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
            this.getEntryFromDate(nextProps.date);
        } else {
            this.getEntriesFromDateRange(nextProps.week);
        }
    }

    componentDidUpdate() {
        var {
            isFetchingEntry,
            consumedFoods,
            totalConsumption,
            isInDayView
        } = this.state;

        if(!isFetchingEntry && consumedFoods.length > 0 && isInDayView) {
            window.requestAnimationFrame(() => {
                drawMacroChart(
                    'macronutrient-split-chart-container',
                    totalConsumption,
                    isInDayView
                );
            });
        }
    }

    getEntryFromDate(date) {
        document.title = date.replace(/[-]/g, '.');
        this.setState({entry: null, isFetchingEntry: true});

        // fetch entry details and goal from date X
        Promise.all([
            get(`entry/single/${date}`),
            get(`daily-goal/${date}`)
        ])
        .then((responses) => Promise.all(responses.map(readJson)))
        .then((data) => {
            this.setState({
                isInDayView: true,
                consumedFoods: data[0].meals,
                totalConsumption: data[0].nutritionValuesInTotal,
                dailyGoal: data[1],
                isFetchingEntry: false,
                entryFetchError: null,
                detailsVisible: false
            });
        })
        .catch((err) => this.setState({isFetchingEntry: false, entryFetchError: err}))
    }

    getEntriesFromDateRange(week) {
        document.title = 'Viikko ' + week;
        this.setState({entry: null, isFetchingEntry: true});

        get(`entry/multiple/${week}`)
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
            .catch((err) => this.setState({
                isFetchingEntry: false,
                entryFetchError: err
            }));
    }

    changeEntry(direction) {
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

    showDetailedView(date) {
        this.context.router.history.push(`?date=${formatDate(date)}`);
    }

    toggleViewMode(viewMode) {
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
            totalConsumption,
            dailyGoal,
            isInDayView,
            viewportWidth
        } = this.state;

        var output = null;
        var hasEntries = false;

        if(isInDayView) {
            for(var food of consumedFoods) {
                if(food.mealCourses.length > 0) hasEntries = true;
            }
        }

        if(isFetchingEntry) {
            output = <Loading />;
        } else if(!isFetchingEntry && consumedFoods.length > 0 && hasEntries && isInDayView) {
            output = (
                <EntryDetails
                    totalConsumption={totalConsumption}
                    dailyGoal={dailyGoal}
                    consumedFoods={consumedFoods}
                    viewportWidth={viewportWidth}
                    shownNutritionValue={this.state.shownNutritionValue}
                    changeShownNutritionValue={this.changeShownNutritionValue}
                />
            );
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
        } else {
            output = (
                <div className='no-entry-found'>
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
