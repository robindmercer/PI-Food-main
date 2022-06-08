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
        url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${APPY_KEY}&number=100&addRecipeInformation=true`
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
            //console.log('filterRecipeApi: ', filterRecipeApi);
            //console.log('charDb: ', charDb);
            let allRecipes = [...filterRecipeApi, ...charDb]
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
            instructions, image: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fmedia-cdn.tripadvisor.com%2Fmedia%2Fphoto-s%2F17%2Ff5%2F39%2Ff7%2Ffooood-at-the-food-department.jpg&imgrefurl=https%3A%2F%2Fwww.tripadvisor.com.ar%2FRestaurant_Review-g188590-d16869641-Reviews-The_Food_Department-Amsterdam_North_Holland_Province.html&tbnid=ll-VQyXmHSo60M&vet=12ahUKEwj1q8nimp74AhVdNbkGHXF8BNQQMygJegUIARDqAQ..i&docid=TGH-GZw8jj2heM&w=550&h=367&q=food&ved=2ahUKEwj1q8nimp74AhVdNbkGHXF8BNQQMygJegUIARDqAQ"
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
            recipe = await Recipe.findByPk(id)
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

// router.get('/tipos', function (_req, res, next) {
//   //! Getting all tipos from DB
//   try {
//     Tipo.findAll({ order: [['nombre', 'asc']] }).then((resp) => {
//       resp.length
//         ? res.send(resp)
//         : res.send({ message: 'Could not get tipos' })
//     })
//   } catch (error) {
//     next(error)
//   }
// })


module.exports = router