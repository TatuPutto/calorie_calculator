function calculateDominantMacronutrient(protein, carbs, fat) {
    var dominantMacro;

    if(+protein > +carbs) {
        if(+protein > +fat) {
            dominantMacro = 'protein-dominant';
        } else {
            dominantMacro = 'fat-dominant';
        }
    } else {
        if(+carbs > +fat) {
            dominantMacro = 'carb-dominant';
        } else {
            dominantMacro = 'fat-dominant';
        }
    }

    return dominantMacro;
}

export default calculateDominantMacronutrient;
