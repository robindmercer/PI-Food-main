require('dotenv').config();
const axios = require('axios');
const { response } = require('express');
const { Tipo } = require('../db')
const { APPY_KEY } = process.env;

async function databaseLoad() {
    let tempdiets = ["vegetarian"]
    // let tempdishTypes = []    
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
            
            // for (var i = 0; i < recipe.dishTypes.length; i++) {
            //     var element = recipe.dishTypes[i];    
            //     tempdishTypes.push(element)
            // }
            
        })
        
        
        var unique = [...new Set(tempdiets)];
        //console.log('unique: ', unique);

        let arraytempdiets = Array.from(unique)
        Tipo.bulkCreate(arraytempdiets.map(t => ({ nombre: t })))
        
        // var uniqueD = [...new Set(tempdishTypes)];
        // //console.log('uniqueD: ', uniqueD);
        // let arraytempdishTypes = Array.from(uniqueD)
        // Plato.bulkCreate(arraytempdishTypes.map(d => ({ nombre: d })))
        console.log('Tabla de Dietas y Tipos Grabadas')
        return "ok"
    })
    .catch(error => {
        console.log('error: ', error);
    })
}

module.exports = databaseLoad;


