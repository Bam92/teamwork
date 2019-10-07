import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../../src/app';
import { baseUrl2 } from '../../../../config';

chai.use(chaiHttp);

const { expect } = chai;

describe('Category controller', () => {
  const inValidToken = 'eyJhiOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Im03dmtxaW5tNCIsImlhdCI6MTU2NTMyODI5M30.MV80v4kB25rub0RVV4EE0eEn7pX1QMnwN1pTfZKfMwA';
  const validToken = 'eyJhbGciOiJIUzI1NiJ9.c2FyYWgubGlmQGdtYWlsLmNvbQ.Y6hhZG0k3RbBA1Lm_Vjh5fDoxxNZHyVrW-_pVsQNBHY';

  describe('GET articles by category', () => {
    it('should throw error if no valid token is provided', (done) => {
      chai.request(app)
        .get(`${baseUrl2}/articles/categories/2`)
        .set('token', inValidToken)
        .then((res) => {
          expect(res).to.have.status(401);
          done();
        });
    });

    it('should throw error if no token is provided', (done) => {
      chai.request(app)
        .get(`${baseUrl2}/articles/categories/2`)
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });

    it('should send list of all articles that match the requested category', (done) => {
      chai.request(app)
        .get(`${baseUrl2}/articles/categories/2`)
        .set('token', validToken)
        .then((res) => {
          expect(res).to.have.status(200);
          done();
        });
    });


    it('should throw an error if the requested category does not exist', (done) => {
      chai.request(app)
        .get(`${baseUrl2}/articles/categories/25`)
        .set('token', validToken)
        .then((res) => {
          expect(res).to.have.status(404);
          done();
        });
    });


    it('should throw an error if id in not an number', (done) => {
      chai.request(app)
        .get(`${baseUrl2}/articles/categories/j2`)
        .set('token', validToken)
        .then((res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
  });
});
