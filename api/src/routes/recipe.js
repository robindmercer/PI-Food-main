require('dotenv').config();
const { APPY_KEY } = process.env;
const { Router } = require('express');
const axios = require('axios')
const { Recipe, Tipos } = require('../db');
const { Op } = require('sequelize');
const router = Router();

router.get('/', (req, res, next) => {
    let name = req.query.name;
    let recipeApi
    let recipeDb
    let url
    if (name) {
        url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${APPY_KEY}`
        console.log('url: ', url);
        recipeApi = axios.get(url);
        recipeDb = Recepies.findAll({
            include: Episodes,
            where: {
                name: {
                    [Op.like]: "%" + name + "%"
                }
            },
            order: [
                ['name', 'ASC']
            ],
        })
    } else {
        url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${APPY_KEY}`
        console.log('url: ', url);
        recipeApi = axios.get(url);
        recipeDb = Recipe.findAll({
            include: Tipos
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
            let allRecepies = [...filterRecipeApi, ...charDb]
            res.send(allRecepies);
        })
        .catch(error => {
            console.log('error: ', error);
        })
})
// router.get('/', async (req, res, next) => {
//     const char = await Recepies.findAll({
//         include: Episodes
//     });
//     res.send(char);
// })
router.get('/:id', async (req, res, next) => {
    try {
        const id = req.params.id
        let recipe
        if (typeof id === 'string' && id.length > 8 ) {
            recipe = await Recipe.findByPk(id)
            res.send(recipe);
        } else {
            response = await axios.get(`https://rickandmortyapi.com/api/recipe/` + id);
            recipe = response.data
            res.send(recipe);
        }
    } catch (error) {
        console.log('error: ', error);

    }
})



// esto es mi para hacer pruebas 
router.post('/all', async (req, res, next) => {
    const eq = await Recepies.bulkCreate([
        { name: 'Robin', image: 'https://media.istockphoto.com/vectors/vector-illustration-of-red-house-icon-vector-id155666671?k=6&m=155666671&s=612x612&w=0&h=AgPLdg1qAIL4wP2FWSBTgaEK-pUS-6kU_w9a-GsxR2g=' },
        { name: 'Lisa', image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' },
        { name: 'Matias', image: 'https://img1.picmix.com/output/stamp/normal/6/8/5/4/1494586_fa231.png' },
        { name: 'Martina', image: 'https://media.istockphoto.com/photos/3d-rendering-brick-house-isolation-on-a-white-3d-illustration-picture-id1337434489?b=1&k=20&m=1337434489&s=170667a&w=0&h=Be7c31gM3b-sDHIRqCXPNcqamruzf9RUhVrdL3Wrs60=' }
    ]).then(() => console.log("equipo data have been saved"));
    res.json("ok")
})

router.post('/', async (req, res, next) => {
    const { name, image } = req.body;
    try {
        const newRecipe = await Recepies.create({ name, image })
        res.send(newRecipe);
    } catch (error) {
        res.send(error.message);
    }
})

router.post('/:chid/episode/:epid', async (req, res, next) => {
    try {
        const { chid, epid } = req.params;
        const recipe = await Recepies.findByPk(chid)
        await recipe.addEpisodes(epid)
        res.send(recipe);
    } catch (error) {
        res.send(error.message);
    }
})


router.put('/', (req, res, next) => {
    res.send("put Recepies");
})

router.delete('/', (req, res, next) => {
    res.send("delete Recepies");
})
module.exports = router;
