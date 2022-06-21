require('dotenv').config();
const axios = require('axios');
const { response } = require('express');
const { Tipo } = require('../db')
const { APPY_KEY } = process.env;

async function databaseLoad() {
    let tempdiets = ["vegetarian"]
    url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${APPY_KEY}&number=5&addRecipeInformation=true`
    recipeApi = axios.get(url);
    Promise.all([recipeApi])
    .then((respuesta) => {
        const [charApi] = respuesta

        let filterdiets = charApi.data.results.map((recipe) => {
            for (var i = 0; i < recipe.diets.length; i++) {
                var element = recipe.diets[i];    
                tempdiets.push(element)
            }
           
        })
        
        
        var unique = [...new Set(tempdiets)];

        let arraytempdiets = Array.from(unique)
        Tipo.bulkCreate(arraytempdiets.map(t => ({ nombre: t })))
        
        console.log('Tabla de Dietas Grabadas')
        return "ok"
    })
    .catch(error => {
        console.log('error: ', error);
    })
}

module.exports = databaseLoad;


