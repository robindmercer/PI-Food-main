 const { Router } = require('express');
 const recipeRoute = require('./recipe')
 const tipoRoute =  require('./tipo')
 const idiomaRoute =  require('./idioma')

 const router = Router();

// Traigo Recetas
router.use('/recipes',recipeRoute);
// Traigo Tipos de Dieta 
router.use('/tipos',tipoRoute);
// Idiomas
router.use('/idiomas',idiomaRoute);
module.exports = router;

