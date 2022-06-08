const { Router } = require('express');
const { Tipo } = require('../db')
const router = Router();

router.get('/', function (_req, res, next) {
    //! Getting all tipo de dieta from DB
    try {
      Tipo.findAll({ order: [['nombre', 'asc']] }).then((resp) => {
        resp.length
          ? res.send(resp)
          : res.send({ message: 'No pude acceder a dietas' })
      })
    } catch (error) {
      next(error)
    }
  })
  module.exports = router