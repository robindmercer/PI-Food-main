const axios = require('axios')
const {Tipo} = require('../db')

async function databaseLoad(){
    const eq2 = await Tipo.bulkCreate([
        {nombre: "main course"},
        {nombre: "side dish"},
        {nombre: "dessert"},
        {nombre: "appetizer"},
        {nombre: "salad"},
        {nombre: "bread"},
        {nombre: "breakfast"},
        {nombre: "soup"},
        {nombre: "beverage"},
        {nombre: "sauce"},
        {nombre: "marinade"},
        {nombre: "fingerfood"},
        {nombre: "snack"},
        {nombre: "drink"}
    ]).then(() => console.log("Tipo have been saved"));
}

module.exports = databaseLoad;


