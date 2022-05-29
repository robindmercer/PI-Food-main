const { Router } = require('express');
const recipeRoute = require('./recipe')
const { axios } = require('axios')
const router = Router();


router.use('/recipe',recipeRoute);


module.exports = router;
