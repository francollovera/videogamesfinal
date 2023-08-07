/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Videogame, conn } = require('../../src/db.js');

const agent = session(app);
const videogame = {
  name: 'Super Mario Bros',
};

describe('Videogame routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Videogame.sync({ force: true })
    .then(() => Videogame.create(videogame)));
  describe('GET /videogames', () => {
    it('should get 200', () =>
      agent.get('/videogames').expect(200)
    );
  });
});

describe('Videogames route', () => {
  it('should return an array of videogames', (done) => {
    chai.request(app)
      .get('/videogames')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array'); //espera un array
        done();
      });
  });

  it('should return a specific videogame by name', (done) => {
    const name = 'Super Mario Bros';
    chai.request(app)
      .get(`/videogames?name=${name}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        expect(res.body[0].name).to.equal(name); //que el primer nombre sea igual a mi const name
        done();
      });
  });

  it('should handle errors', (done) => {
    chai.request(app)
      .get('/videogames?name=invalid')
      .end((err, res) => {
        expect(res).to.have.status(500);
        expect(res.body).to.have.property('error');
        done();
      });
  });
});

describe('Videogames routes', () => {
  let videogameId;

  before(async () => {
    const newVideogame = {
      name: 'Test Game',
      description: 'This is a test videogame',
      platforms: ['PC'],
      image: 'https://example.com/image.jpg',
      released: '2023-01-01',
      rating: 4.5,
    };

    const response = await chai.request(app)
      .post('/videogames')
      .send(newVideogame);

    videogameId = response.body.id;
  });

  describe('GET /videogames/:id', () => {
    it('should return a specific videogame by id', (done) => {
      chai.request(app)
        .get(`/videogames/${videogameId}`) //aqui les estoy pasando el id que use en el before
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array'); //array porque es un juego solo porque el id es unico
          expect(res.body.id).to.equal(videogameId);
          done();
        });
    });

    it('should handle errors when id is invalid', (done) => {
      chai.request(app)
        .get('/videogames/invalid-id')
        .end((err, res) => {
          expect(res).to.have.status(500);
          expect(res.body).to.have.property('error');
          done();
        });
    });
  });

  describe('POST /videogames', () => {
    it('should create a new videogame', (done) => {
      const newVideogame = {
        name: 'Test Game 2',
        description: 'This is another test videogame',
        platforms: ['PS5', 'Xbox Series X'],
        image: 'https://example.com/another-image.jpg',
        released: '2023-02-01',
        rating: 3.6
      };

      chai.request(app)
        .post('/videogames')
        .send(newVideogame)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body.name).to.equal(newVideogame.name);
          expect(res.body.description).to.equal(newVideogame.description);
          expect(res.body.platforms).to.deep.equal(newVideogame.platforms);
          expect(res.body.image).to.equal(newVideogame.image);
          expect(res.body.released).to.equal(newVideogame.released);
          expect(res.body.rating).to.equal(newVideogame.rating);
          done();
        });
    });

    it('should handle errors when required fields are missing', (done) => { //faltan campos
      const invalidVideogame = {
        name: 'Invalid Game',
        description: 'This is an invalid videogame',
        platforms: ['PC']
      };

      chai.request(app)
        .post('/videogames')
        .send(invalidVideogame)
        .end((err, res) => {
          expect(res).to.have.status(500);
          expect(res.body).to.have.property('error');
          done();
        });
    });
  });
});