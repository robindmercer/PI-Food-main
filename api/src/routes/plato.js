const { Router } = require('express');
const { Plato } = require('../db')
const router = Router();

router.get('/', function (_req, res, next) {
    //! Getting all tipo de Platos from DB
    try {
      Plato.findAll({ order: [['nombre', 'asc']] }).then((resp) => {
        resp.length
          ? res.send(resp)
          : res.send({ message: 'No pude acceder a dietas' })
      })
    } catch (error) {
      next(error)
    }
  })
  module.exports = router