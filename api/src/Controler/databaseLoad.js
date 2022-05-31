require('dotenv').config();
const axios = require('axios');
const { response } = require('express');
const { Tipo } = require('../db')
const { APPY_KEY } = process.env;

async function databaseLoad() {
    let temp = []
    url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${APPY_KEY}&number=100&addRecipeInformation=true`
    recipeApi = axios.get(url);
    Promise.all([recipeApi])
    .then((respuesta) => {
        const [charApi] = respuesta
        let filterRecipeApi = charApi.data.results.map((recipe) => {
            for (var i = 0; i < recipe.dishTypes.length; i++) {
                var element = recipe.dishTypes[i];    
                temp.push(element)
            }
        }
        )
        var unique = [...new Set(temp)];
        console.log('unique: ', unique);
        let arrayTemp = Array.from(unique)
        Tipo.bulkCreate(arrayTemp.map(t => ({ nombre: t })))
        return "ok"
    })
    .catch(error => {
        console.log('error: ', error);
    })
}

module.exports = databaseLoad;


