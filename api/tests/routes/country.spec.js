/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Recipe, conn } = require('../../src/db.js');

const agent = session(app);
const recipe = {
  title: 'Milanea a la napolitana',
  likes: 5, 
  summary: 'sadasdad', 
  healthScore: 25, 
  instruction: 'cocina', 
  tipo:['diary']
};

describe('Recipe routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Recipe.sync({ force: true })
    .then(() => Recipe.create(recipe)));
  describe('GET /recipes', () => {
    it('should get 200', () =>
      agent.get('/recipes').expect(200)
    );
  });
});

describe('Recipe Routes Get', function () {
  describe('/recipe/detail/:id', function () {
    it('GET /recipe/detail/:id should return detail', function () {
      agent.get('/recipe/detail/632244')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          expect(res.body.Title).to.be.equal('Alouette Chicken Paprika');
        })
    })
  })
})