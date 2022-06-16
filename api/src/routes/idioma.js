const { Router } = require('express');
const { Idioma } = require('../db')
const router = Router();

router.get('/', function (req, res, next) {
    // Getting all tipo de dieta from DB
    try {
      const { lang, page } = req.query;
      const condition = {};
      const where = {};
      if (page) where.page = page;
      if (lang) where.lang = lang;
      if (where) condition.where = where;
      Idioma.findAll(condition)
      .then((resp) => {
        resp.length
          ? res.send(resp)
          : res.send({ message: 'No pude acceder a dietas' })
      })
    } catch (error) {
      next(error)
    }
  })
  module.exports = router