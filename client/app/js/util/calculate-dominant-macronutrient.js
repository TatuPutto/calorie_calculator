function calculateDominantMacronutrient(protein, carbs, fat) {
    var dominantMacro;

    if(+protein > +carbs) {
        if(+protein > +fat) {
            dominantMacro = 'protein';
        } else {
            dominantMacro = 'fat';
        }
    } else {
        if(+carbs > +fat) {
            dominantMacro = 'carb';
        } else {
            dominantMacro = 'fat';
        }
    }

    return dominantMacro;
}

export default calculateDominantMacronutrient;
