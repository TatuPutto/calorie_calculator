import React from 'react';
import PropTypes from 'prop-types';

import DiaryEntrySelection from '../components/DiaryEntrySelection';
import EntryDetails from '../components/EntryDetails';
import Loading from '../components/Loading';

import {get} from '../util/fetch';
import drawMacroChart from '../util/draw-macro-chart';

export default class Diary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            diaryEntries: [],
            isFetchingdiaryEntries: true,
            diaryEntriesFetchError: null,
            entry: null,
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
        var {isFetching, entry} = this.state;

        if(!isFetching && entry && entry.nutritionValuesPerItem.length > 0) {
            window.requestAnimationFrame(() => {
                drawMacroChart(entry.nutritionValuesInTotal);
            });
        }
    }

    getEntry(entryDate) {
        document.title = entryDate.replace(/[-]/g, '.');
        this.setState({entry: null, isFetchingEntry: true});

        get(`entry/${entryDate}`)
            .then((res) => res.json())
            .then((entry) => {
                get(`daily-goal/${entryDate}`)
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
        var {isFetchingEntry, entry} = this.state;
        var entryDetails = null;

        if(isFetchingEntry) {
            entryDetails = <Loading />;
        } else if(!isFetchingEntry && entry && entry.nutritionValuesPerItem.length > 0) {
            entryDetails = (
                <EntryDetails entry={entry} viewportWidth={this.state.viewportWidth} />
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
