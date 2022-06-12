require('dotenv').config();
const { APPY_KEY } = process.env;
const axios = require('axios')
const { Recipe, Tipo } = require('../db')
const { Op } = require('sequelize')
const { Router } = require('express');
const router = Router();

router.get('/', function (req, res, next) {
    let name = req.query.name;
    let recipeApi
    let recipeDb
    let url
    let filterRecipeDb
    if (name) {
        try {
            url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${APPY_KEY}&titleMatch=${name}&addRecipeInformation=true`
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
        url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${APPY_KEY}&number=5&addRecipeInformation=true`
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
                    image: recipe.image,
                    diets: recipe.diets
                }
            })
            if (charDb){
                filterRecipeDb = charDb.map((recipe) => {
                    var newDiets =[]
                    let getDiets = recipe.tipos.map((data)=>{
                        newDiets.push(data.nombre)
                    })
                    console.log('newDiets: ', newDiets);
                    return {
                        id: recipe.id,
                        title: recipe.title,
                        image: recipe.image,
                        diets: newDiets
                    }
                })
            }
            let allRecipes = [...filterRecipeApi, ...filterRecipeDb]

            res.send(allRecipes);
        })
        .catch(error => {
            console.log('error: ', error);
        })
})


router.post('/', async function (req, res, next) {
    const { title,likes,summary,healthScore,instructions,tipo } = req.body;
    if (!title || !likes || !summary || !healthScore || !instructions) {
        return res.send("Falta información para poder darte de alta la receta")
    }
    try {
        const newRecipe = await Recipe.create({ 
            title,
            likes,
            summary,
            healthScore,
            instructions, 
            image: "https://www.freeiconspng.com/uploads/no-image-icon-4.png"
        })
        const newTipo = await newRecipe.setTipos(tipo)
        res.send("Receta Creada");
    } catch (error) {
        console.log('Error', req.body)
        next(error)
    }
})

router.get('/detail/:id', async (req, res, next) => {
    //console.log('detail: ');
    try {
        const id = req.params.id
        let recipe
        if (typeof id === 'string' && id.length > 20) {
            recipe = await Recipe.findByPk(id, { include: Tipo })
            res.send(recipe);
        } else {
            url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${APPY_KEY}`
            //console.log('url: ', url);
            response = await axios.get(url);
            recipe = response.data
            console.log('recipe: ', recipe);
            res.send(recipe);
        }
    } catch (error) {
        next(error)
    }
})

module.exports = router