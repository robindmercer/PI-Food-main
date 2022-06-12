 const { Router } = require('express');
 const recipeRoute = require('./recipe')
 const tipoRoute =  require('./tipo')
 //const tipoPlatos = require('./plato')
 const router = Router();

// Traigo Recetas
router.use('/recipes',recipeRoute);
// Traigo Tipos de Dieta 
router.use('/tipos',tipoRoute);
// Traigo Tipos de Platos 
//router.use('/platos',tipoRoute);

module.exports = router;

