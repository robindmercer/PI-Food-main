 const { Router } = require('express');
 const recipeRoute = require('./recipe')
 const tipoRoute =  require('./tipo')

 const router = Router();

// Traigo Recetas
router.use('/recipes',recipeRoute);
// Traigo Tipos de Dieta 
router.use('/tipos',tipoRoute);

module.exports = router;

