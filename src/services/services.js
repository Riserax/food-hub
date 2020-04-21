/**
 * All API calls will be maintainted here
 */

const API_KEY = "5c4fccbf09894f23b5a22cec1c932533";
var response = "";

/**
 *
 * @param {string} query - name of dish
 * @param {number} number - defines # of returned receipes
 * @returns {Array}
 */

export async function getResultByName(query, number, size) {
    axios
        .get(
            "https://api.spoonacular.com/recipes/search?apiKey=" +
            API_KEY +
            "&query=" +
            query +
            "&number=" +
            number
        )
        .then(response => {
            this.response = response.results.map(el => {
                const type = el.image.split('.')[1];
                el.image = `https://spoonacular.com/recipeImages/${el.id}-${size}.${type}`
                return el;
            })
        });
    return response;
}

/**
 *

 * @param {string} ingredients - A comma-separated list of ingredients that the recipes should contain.
 * @returns {Array}
 */

export async function getRecipesByIngredients(ingredients, number) {
    axios
        .get(
            "https://api.spoonacular.com/recipes/findByIngredients?apiKey=" +
            API_KEY +
            "&ingredients=" +
            ingredients +
            "&number=" +
            number
        )
        .then(response => {
            this.response = response.data.results;
        });
    return response;
}

/**
 *
 * @param {string} number - The number of random recipes to be returned (between 1 and 100).
 * @returns {Array} randomly picked recipes
 */

export async function getRandomRecipes(number, size) {
    axios
        .get(
            "https://api.spoonacular.com/recipes/random?apiKey=" +
            API_KEY +
            "&number=" +
            number
        )
        .then(response => {
            this.response = response.results.map(el => {
                const type = el.image.split('.')[1];
                el.image = `https://spoonacular.com/recipeImages/${el.id}-${size}.${type}`
                return el;
            })
        });
    return response;
}
