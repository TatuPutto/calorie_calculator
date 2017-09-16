import React from 'react';
import PropTypes from 'prop-types';

import DiaryEntrySelection from '../components/DiaryEntrySelection';
import EntryDetails from '../components/EntryDetails';
import Loading from '../components/Loading';

import {checkStatus, readJson, get} from '../util/fetch';
import drawMacroChart from '../util/draw-macro-chart';

export default class Diary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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

        this.getEntry = this.getEntry.bind(this);
        this.changeEntry = this.changeEntry.bind(this);
        this.toggleDetails = this.toggleDetails.bind(this);
    }

    componentWillMount() {
        get('diary-entries')
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
        this.getEntry(nextProps.activeEntryDate);
    }

    componentDidUpdate() {
        var {isFetching, consumedFoods, totalConsumption} = this.state;

        if(!isFetching && consumedFoods.length > 0) {
            window.requestAnimationFrame(() => {
                drawMacroChart(totalConsumption);
            });
        }
    }

    getEntry(entryDate) {
        document.title = entryDate.replace(/[-]/g, '.');
        this.setState({entry: null, isFetchingEntry: true});

        get(`entry/${entryDate}`)
            .then(checkStatus)
            .then(readJson)
            .then((data) => {
                console.log(data);
                get(`daily-goal/${entryDate}`)
                    .then(checkStatus)
                    .then(readJson)
                    .then((goal) => {
                        this.setState({
                            consumedFoods: data.meals,
                            totalConsumption: data.nutritionValuesInTotal,
                            dailyGoal: goal,
                            isFetchingEntry: false,
                            entryFetchError: null,
                            detailsVisible: false
                        }, () => {
                            console.log(this.state);
                        });


                    })
                    .catch((err) => console.error(err));
            })
            .catch((err) => this.setState({
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
        var {isFetchingEntry, entry} = this.state;
        var entryDetails = null;

        if(isFetchingEntry) {
            entryDetails = <Loading />;
        } else if(!isFetchingEntry && this.state.consumedFoods.length > 0) {
            entryDetails = (
                <EntryDetails
                    totalConsumption={this.state.totalConsumption}
                    dailyGoal={this.state.dailyGoal}
                    consumedFoods={this.state.consumedFoods}
                    viewportWidth={this.state.viewportWidth}
                />
            );
        } else {
            entryDetails = (
                <div className='no-entry-found'>
                    <p>Tältä päivältä ei löytynyt merkintöjä.</p>
                </div>
            );
        }

        return (
            <div className='diary'>
                <DiaryEntrySelection
                    activeEntryDate={this.props.activeEntryDate}
                    diaryEntries={this.state.diaryEntries}
                    changeEntry={this.changeEntry}
                />
                {entryDetails}
            </div>
        );
    }
}

Diary.contextTypes = {router: PropTypes.object.isRequired};

Diary.propTypes = {
    viewportWidth: PropTypes.number.isRequired,
    activeEntryDate: PropTypes.string.isRequired
};
