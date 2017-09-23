import React from 'react';
import PropTypes from 'prop-types';

import EntriesHeader from './EntriesHeader';
import EntriesTable from './EntriesTable';
import Loading from './Loading';


export default function Entries(props) {
    var {
        isFetchingEntries,
        entriesFetchError,
        entries,
        viewportWidth,
        isModifiable
    } = props;
    var output = null;
    var hasEntries = false;

    // check if meals contains any valid entries
    for(var i = 0; i < entries.length; i++) {
        if(entries[i].foods.length > 0 && entries[i].foods[0].id !== 99999) {
            hasEntries = true;
        }
    }

    if(isFetchingEntries) {
        output = <Loading />;
    } else if(!isFetchingEntries && entriesFetchError) {
        output = (
            <div className='failed-to-fetch'>
                {entriesFetchError}
            </div>
        );
    } else if(!isFetchingEntries && !hasEntries) {
        output = (
            <div className='no-entries'>
                Ei merkintöjä
            </div>
        );
    } else {
        output = (
            <div>
                <EntriesHeader
                    shownNutritionValue={props.shownNutritionValue}
                    changeShownNutritionValue={props.changeShownNutritionValue}
                    addMeal={props.addMeal}
                    isModifiable={props.isModifiable}
                    viewportWidth={props.viewportWidth}
                />
                <EntriesTable {...props} />
            </div>
        );
    }

    return (
        <div className={'entries ' + (isModifiable ? 'col-md-10 col-md-offset-2' : '')}>
            <div className='entries__content-wrapper'>
                {output}
            </div>
        </div>
    );
}

Entries.propTypes = {
    entries: PropTypes.array.isRequired,
    total: PropTypes.object,
    isFetchingEntries: PropTypes.bool.isRequired,
    entriesFetchError: PropTypes.string,
    activeMeal: PropTypes.object,
    addMeal: PropTypes.func,
    removeMeal: PropTypes.func,
    shownNutritionValue: PropTypes.string,
    changeShownNutritionValue: PropTypes.func,
    addEntry: PropTypes.func,
    removeEntry: PropTypes.func,
    updateEntry: PropTypes.func,
    changeActiveMeal: PropTypes.func,
    editMealName: PropTypes.func,
    viewportWidth: PropTypes.number.isRequired,
    isModifiable: PropTypes.bool.isRequired,
};
