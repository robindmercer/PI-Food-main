require('dotenv').config();
const { APPY_KEY } = process.env;
const { Router } = require('express');
const axios = require('axios')
const { Recipe, Tipo } = require('../db');
const { Op } = require('sequelize');
const router = Router();

router.get('/', (req, res, next) => {
    let name = req.query.name;
    let recipeApi
    let recipeDb
    let url
    if (name) {
        try {
            console.log('name: ', name);
            url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${APPY_KEY}&titleMatch=${name}`
            console.log('url: ', url);
            recipeApi = axios.get(url,
            recipeDb = Recipe.findAll({
                    //include: Tipos,
                    where: {
                        title: {
                            [Op.like]: "%" + name + "%"
                        }
                    },
                    order: [
                        ['title', 'ASC']
                    ],
                })
            )
        } catch (error) {
            next(error)
        }
    } else {
        url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${APPY_KEY}`
        console.log('url: ', url);
        recipeApi = axios.get(url);
        recipeDb = Recipe.findAll({
            include: Tipo
        })
    }
    Promise.all([
        recipeApi,
        recipeDb
    ])
        .then((respuesta) => {
            const [charApi, charDb] = respuesta
            let filterRecipeApi = charApi.data.results.map((recipe) => {
                return {
                    id: recipe.id,
                    title: recipe.title,
                    image: recipe.image
                }
            })
            let allRecipes = [...filterRecipeApi, ...charDb]
            res.send(allRecipes);
        })
        .catch(error => {
            console.log('error: ', error);
        })
})

router.get('/:id', async (req, res, next) => {
    try {
        const id = req.params.id
        let recipe
        if (typeof id === 'string' && id.length > 20) {
            recipe = await Recipe.findByPk(id)
            res.send(recipe);
        } else {
            url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${APPY_KEY}`
            response = await axios.get(url);
            recipe = response.data
            res.send(recipe);
        }
    } catch (error) {
        console.log('error: ', error);

    }
})

// esto es mi para hacer pruebas 
router.post('/all', async (req, res, next) => {
    const eq = await Recipe.bulkCreate([
        { title:"Huevo Frito", resumen:"Hacer un huevo frito", puntuacion:2, nivel:3, receta:"Agarra una sarten ponele aceite y frei un huevo" },
        { title:"Huevo Hervido", resumen:"Hacer un huevo duro", puntuacion:2, nivel:3, receta:"Agarra una sarten ponele agua y hervi un huevo" }
    ]).then(() => console.log("Recetas data have been saved"));

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
    res.json("ok")
})

router.post('/', async (req, res, next) => {
    const { title, resumen, puntuacion, nivel, receta } = req.body;
    if (!title || !resumen || !puntuacion || !nivel || !receta ) {
         return res.send("Falta informacion para poder darte de alta la receta")
    }
    try {
        const newRecipe = await Recipe.create({ title, resumen, puntuacion, nivel, receta })
        res.send(newRecipe);
    } catch (error) {
        res.send(error.message);
    }
})

router.post('/:chid/episode/:epid', async (req, res, next) => {
    try {
        const { chid, epid } = req.params;
        const recipe = await Recipes.findByPk(chid)
        await recipe.addEpisodes(epid)
        res.send(recipe);
    } catch (error) {
        res.send(error.message);
    }
})


router.put('/', (req, res, next) => {
    res.send("put Recipes");
})

router.delete('/', (req, res, next) => {
    res.send("delete Recipes");
})
module.exports = router;
