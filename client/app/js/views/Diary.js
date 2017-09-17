import React from 'react';
import PropTypes from 'prop-types';

import DiaryEntrySelection from '../components/DiaryEntrySelection';
import EntryDetails from '../components/EntryDetails';
import EntryDetailsPlain from '../components/EntryDetailsPlain';
import Loading from '../components/Loading';

import {checkStatus, readJson, get} from '../util/fetch';
import drawMacroChart from '../util/draw-macro-chart';
import getCurrentDate from '../util/get-current-date';


export default class Diary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isInSingleEntryState: this.props.isInSingleEntryState,
            nutritionDetailsForMultipleEntries: [],

            diaryEntries: [],
            isFetchingdiaryEntries: true,
            diaryEntriesFetchError: null,
            consumedFoods: [],
            totalConsumption: {},
            dailyGoal: {},
            isFetchingEntry: false,
            entryFetchError: null,
            detailsVisible: false,
            viewportWidth: this.props.viewportWidth
        };

        this.getEntryFromDate = this.getEntryFromDate.bind(this);
        this.getEntriesFromDateRange = this.getEntriesFromDateRange.bind(this);
        this.changeEntry = this.changeEntry.bind(this);
        this.toggleDetails = this.toggleDetails.bind(this);
    }

    componentWillMount() {
        get('diary-entries')
            .then((res) => res.json())
            .then((diaryEntries) => {
                // get entry specified by query param
                if(this.state.isInSingleEntryState) {
                    this.getEntryFromDate(this.props.activeEntryDate);
                } else {
                    this.getEntriesFromDateRange(this.props.from, this.props.to);
                }

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
        if(nextProps.isInSingleEntryState) {
            this.getEntryFromDate(nextProps.date);
        } else {
            this.getEntriesFromDateRange(nextProps.from, nextProps.to);
        }
    }

    componentDidUpdate() {
        var {
            isFetching,
            consumedFoods,
            totalConsumption,
            isInSingleEntryState
        } = this.state;

        if(!isFetching && consumedFoods.length > 0 && isInSingleEntryState) {
            window.requestAnimationFrame(() => {
                drawMacroChart(totalConsumption);
            });
        }
    }

    getEntryFromDate(entryDate) {
        document.title = entryDate.replace(/[-]/g, '.');
        this.setState({entry: null, isFetchingEntry: true});

        // fetch entry details and goal from date X
        Promise.all([
            get(`entry/single/${entryDate}`),
            get(`daily-goal/${entryDate}`)
        ])
        .then((responses) => Promise.all(responses.map(readJson)))
        .then((data) => {
            this.setState({
                isInSingleEntryState: true,
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
                    isInSingleEntryState: false,
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
        var date = this.props.date;
        var diaryEntries = this.state.diaryEntries;
        var currentIndex = diaryEntries.indexOf(date);
        var indexOfNextEntry = (direction == 'next') ?
                currentIndex - 1 : currentIndex + 1;
        var nextEntry = diaryEntries[indexOfNextEntry];

        this.context.router.history.push(`?date=${nextEntry}`);
    }

    toggleDetails() {
        this.setState({detailsVisible: !this.state.detailsVisible});
    }

    showDetailedView = (date) => {
        date = new Date(date);
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        var dateStr =`${day}-${month}-${year}`;

        this.context.router.history.push(`?date=${dateStr}`);
    }

    toggleViewMode = () => {
        console.log(this.state.isInSingleEntryState);
        if(this.state.isInSingleEntryState) {
            var now = new Date();
            var start = new Date(now.getFullYear(), 0, 0);
            var diff = now - start;
            var oneDay = 1000 * 60 * 60 * 24;
            var day = Math.floor(diff / oneDay);
            console.log('täällä');
            this.context.router.history.push(`?week=${Math.round(day / 7)}`);
        } else {
            this.context.router.history.push(`?date=${getCurrentDate()}`);
        }
    }

    render() {
        var {isFetchingEntry, entry} = this.state;
        var entryDetails = null;
        var hasEntries = false;

        if(this.state.isInSingleEntryState) {
            for(var food of this.state.consumedFoods) {
                if(food.mealCourses.length > 0) hasEntries = true;
            }
        }

        if(isFetchingEntry) {
            entryDetails = <Loading />;
        } else if(!isFetchingEntry && this.state.consumedFoods.length > 0 &&
                  hasEntries && this.state.isInSingleEntryState) {
            entryDetails = (
                <EntryDetails
                    totalConsumption={this.state.totalConsumption}
                    dailyGoal={this.state.dailyGoal}
                    consumedFoods={this.state.consumedFoods}
                    viewportWidth={this.state.viewportWidth}
                />
            );
        } else if(!isFetchingEntry && this.state.nutritionDetailsForMultipleEntries.length > 0 &&
                  !this.state.isInSingleEntryState) {
            entryDetails = (
                <div className='row entries-container'>
                    {this.state.nutritionDetailsForMultipleEntries.map((details, i) => {
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
                    })}
                </div>
            );
        } else {
            entryDetails = (
                <div className='no-entry-found'>
                    {this.state.isInSingleEntryState ? (
                        <p>Tältä päivältä ei löytynyt merkintöjä.</p>
                    ) : (
                        <p>Tältä viikolta ei löytynyt merkintöjä.</p>
                    )}
                </div>
            );
        }

        return (
            <div className='diary'>
                <DiaryEntrySelection
                    isInSingleEntryState={this.state.isInSingleEntryState}
                    date={this.props.date || 'Viikko X'}
                    diaryEntries={this.state.diaryEntries}
                    changeEntry={this.changeEntry}
                    toggleViewMode={this.toggleViewMode}
                />
                {entryDetails}
            </div>
        );
    }
}

Diary.contextTypes = {router: PropTypes.object.isRequired};

Diary.propTypes = {
    viewportWidth: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired
};
