import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../../src/app';
import { baseUrl2 } from '../../../../config';
import { validToken, inValidToken } from '../tokens';

chai.use(chaiHttp);

const { expect } = chai;

describe('Article controller', () => {
  describe('GET articles', () => {
    it('should throw error if no valid token is provided', (done) => {
      chai.request(app)
        .get(`${baseUrl2}/feeds`)
        .set('token', inValidToken)
        .then((res) => {
          expect(res).to.have.status(401);
          done();
        });
    });

    it('should throw error if no token is provided', (done) => {
      chai.request(app)
        .get(`${baseUrl2}/feeds`)
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
  });

  describe('Publish new articles', () => {
    it('should throw error if no valid token is provided', (done) => {
      chai.request(app)
        .post(`${baseUrl2}/articles`)
        .set('token', inValidToken)
        .then((res) => {
          expect(res).to.have.status(401);
          done();
        });
    });

    it('should throw error if no token is provided', (done) => {
      chai.request(app)
        .post(`${baseUrl2}/articles`)
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });

    it('should not create an article without title field', (done) => {
      const newArt = {
        title: '',
        article: 'Just a test',
      };
      chai.request(app)
        .post(`${baseUrl2}/articles`)
        .set('token', validToken)
        .send(newArt)
        .then((res) => {
          expect(res).to.have.status(400);
          done();
        });
    });

    it('should not create an article with a empty description field', (done) => {
      const newArt = { title: 'Just a test', article: '' };

      chai.request(app)
        .post(`${baseUrl2}/articles`)
        .set('token', validToken)
        .send(newArt)
        .then((res) => {
          expect(res).to.have.status(400);
          done();
        });
    });

    it('should create an article', (done) => {
      const newArt = { title: 'Just a test', article: 'Lorem ipsum tpoasffd' };

      chai.request(app)
        .post(`${baseUrl2}/articles`)
        .set('token', validToken)
        .send(newArt)
        .then((res) => {
          expect(res).to.have.status(201);
          done();
        });
    });

    it('should create an article with category', (done) => {
      const newArt = { title: 'Test endpoint a test', article: 'Lorem ipsum tpoasffd', category: 'andela, yoyo' };

      chai.request(app)
        .post(`${baseUrl2}/articles`)
        .set('token', validToken)
        .send(newArt)
        .then((res) => {
          expect(res).to.have.status(201);
          done();
        });
    });

    it('should not create an article twice', (done) => {
      const newArt = { title: 'Just a test', article: 'Lorem ipsum tpoasffd' };

      chai.request(app)
        .post(`${baseUrl2}/articles`)
        .set('token', validToken)
        .send(newArt)
        .then((res) => {
          expect(res).to.have.status(409);
          done();
        });
    });
  });

  describe('Update articles', () => {
    it('should throw error if no valid token is provided', (done) => {
      chai.request(app)
        .patch(`${baseUrl2}/articles/:id`)
        .set('token', inValidToken)
        .then((res) => {
          expect(res).to.have.status(401);
          done();
        });
    });

    it('should throw an error if no token is provided', (done) => {
      chai.request(app)
        .patch(`${baseUrl2}/articles/:id`)
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });

    it('should check if provided id is an integer', (done) => {
      chai.request(app)
        .patch(`${baseUrl2}/articles/m`)
        .set('token', validToken)
        .then((res) => {
          expect(res).to.have.status(400);
          done();
        });
    });

    it('should update the title of an article that exists', (done) => {
      const newArt = { title: 'Test is coming', article: '' };

      chai.request(app)
        .patch(`${baseUrl2}/articles/1`)
        .set('token', validToken)
        .send(newArt)
        .then((res) => {
          expect(res).to.have.status(201);
          done();
        });
    });

    it('should update the description of an article that exists', (done) => {
      const newArt = {
        title: '',
        article: 'Test is coming',
      };

      chai.request(app)
        .patch(`${baseUrl2}/articles/1`)
        .set('token', validToken)
        .send(newArt)
        .then((res) => {
          expect(res).to.have.status(201);
          done();
        });
    });

    it('should not update a non exiting article', (done) => {
      const newArt = {
        title: 'Lord',
        article: 'Test is coming',
      };

      chai.request(app)
        .patch(`${baseUrl2}/articles/100`)
        .set('token', validToken)
        .send(newArt)
        .then((res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  });

  describe('Delete articles', () => {
    it('should throw error if no valid token is provided', (done) => {
      chai.request(app)
        .delete(`${baseUrl2}/articles/:id`)
        .set('token', inValidToken)
        .then((res) => {
          expect(res).to.have.status(401);
          done();
        });
    });

    it('should throw an error if no token is provided', (done) => {
      chai.request(app)
        .delete(`${baseUrl2}/articles/:id`)
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(400);
          done();
        });
    });

    it('should check if provided id is an integer', (done) => {
      chai.request(app)
        .delete(`${baseUrl2}/articles/m`)
        .set('token', validToken)
        .then((res) => {
          expect(res).to.have.status(400);
          done();
        });
    });

    it('should not delete an non existing article', (done) => {
      chai.request(app)
        .delete(`${baseUrl2}/articles/55`)
        .set('token', validToken)
        .then((res) => {
          expect(res).to.have.status(404);
          done();
        });
    });

    it('should delete article', (done) => {
      chai.request(app)
        .delete(`${baseUrl2}/articles/1`)
        .set('token', validToken)
        .then((res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });

  describe('Add comment on articles', () => {
    it('should throw error if no valid token is provided', (done) => {
      chai.request(app)
        .post(`${baseUrl2}/articles/:id/comments`)
        .set('token', inValidToken)
        .then((res) => {
          expect(res).to.have.status(401);
          done();
        });
    });

    it('should throw an error if no token is provided', (done) => {
      chai.request(app)
        .post(`${baseUrl2}/articles/:id/comments`)
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });

    it('should check if provided id is an integer', (done) => {
      chai.request(app)
        .post(`${baseUrl2}/articles/m/comments`)
        .set('token', validToken)
        .then((res) => {
          expect(res).to.have.status(400);
          done();
        });
    });

    it('should not post comment if no comment field is provided', (done) => {
      chai.request(app)
        .post(`${baseUrl2}/articles/2/comments`)
        .send({ comment: '' })
        .set('token', validToken)
        .then((res) => {
          expect(res).to.have.status(400);
          done();
        });
    });

    it('should not post comment if article does not exist', (done) => {
      chai.request(app)
        .post(`${baseUrl2}/articles/255/comments`)
        .send({ comment: '' })
        .set('token', validToken)
        .then((res) => {
          expect(res).to.have.status(404);
          done();
        });
    });

    it('should post a comment', (done) => {
      chai.request(app)
        .post(`${baseUrl2}/articles/4/comments`)
        .set('token', validToken)
        .send({ comment: 'Lorem ipsum' })
        .then((res) => {
          expect(res).to.have.status(201);
          done();
        });
    });
  });

  describe('Flag an article', () => {
    it('should throw error if no valid token is provided', (done) => {
      chai.request(app)
        .post(`${baseUrl2}/articles/2/flag`)
        .set('token', inValidToken)
        .then((res) => {
          expect(res).to.have.status(401);
          done();
        });
    });

    it('should throw error if no token is provided', (done) => {
      chai.request(app)
        .post(`${baseUrl2}/articles/2/flag`)
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });

    it('should flag an existing article', (done) => {
      chai.request(app)
        .post(`${baseUrl2}/articles/3/flag`)
        .set('token', validToken)
        .send({ reason: 'Not good at all' })
        .then((res) => {
          expect(res).to.have.status(201);
          done();
        });
    });

    it('should not flag an existing article with an empty reason field', (done) => {
      chai.request(app)
        .post(`${baseUrl2}/articles/2/flag`)
        .set('token', validToken)
        .send({ reason: '' })
        .then((res) => {
          expect(res).to.have.status(400);
          done();
        });
    });


    it('should throw an error if the requested article does not exist', (done) => {
      chai.request(app)
        .post(`${baseUrl2}/articles/290/flag`)
        .set('token', validToken)
        .then((res) => {
          expect(res).to.have.status(404);
          done();
        });
    });

    it('should throw an error if id in not an number', (done) => {
      chai.request(app)
        .post(`${baseUrl2}/comments/2i/flag`)
        .set('token', validToken)
        .then((res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
  });
});
