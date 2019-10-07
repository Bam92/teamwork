import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../../src/app';
import { baseUrl2 } from '../../../../config';

chai.use(chaiHttp);

const { expect } = chai;

describe('Flag a comment', () => {
  const inValidToken = 'eyJhiOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Im03dmtxaW5tNCIsImlhdCI6MTU2NTMyODI5M30.MV80v4kB25rub0RVV4EE0eEn7pX1QMnwN1pTfZKfMwA';
  const validToken = 'eyJhbGciOiJIUzI1NiJ9.c2FyYWgubGlmQGdtYWlsLmNvbQ.Y6hhZG0k3RbBA1Lm_Vjh5fDoxxNZHyVrW-_pVsQNBHY';

  describe('Flag a comment', () => {
    it('should throw error if no valid token is provided', (done) => {
      chai.request(app)
        .post(`${baseUrl2}/comments/2/flag`)
        .set('token', inValidToken)
        .then((res) => {
          expect(res).to.have.status(401);
          done();
        });
    });

    it('should throw error if no token is provided', (done) => {
      chai.request(app)
        .post(`${baseUrl2}/comments/2/flag`)
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });

    it('should flag an existing comment', (done) => {
      chai.request(app)
        .post(`${baseUrl2}/comments/2/flag`)
        .set('token', validToken)
        .send({ reason: 'Not good at all' })
        .then((res) => {
          expect(res).to.have.status(201);
          done();
        });
    });

    it('should not flag an existing comment with an empty reason field', (done) => {
      chai.request(app)
        .post(`${baseUrl2}/comments/1/flag`)
        .set('token', validToken)
        .send({ reason: '' })
        .then((res) => {
          expect(res).to.have.status(400);
          done();
        });
    });


    it('should throw an error if the requested comment does not exist', (done) => {
      chai.request(app)
        .post(`${baseUrl2}/comments/290/flag`)
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
