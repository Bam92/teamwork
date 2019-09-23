import chaiHttp from 'chai-http';
import chai from 'chai';

import app from '../../src/app';
import { endpoint as baseUrl } from '../../../config'

chai.use(chaiHttp);
const { expect } = chai;

const PORT = 4000;

// Helper functions to start/stop app before/after tests

let server = null;
const startApp = () => app.listen(PORT);
const tearDown = () => server.close();
// const baseUrl = '/api/v1';

describe('Article controller', () => {
  // before(startApp);
  // after(tearDown);

  describe('GET articles', () => {
    it('should throw error if no valid token is provided', (done) => {
      const inValidToken = 'eyJhiOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Im03dmtxaW5tNCIsImlhdCI6MTU2NTMyODI5M30.MV80v4kB25rub0RVV4EE0eEn7pX1QMnwN1pTfZKfMwA';

      chai.request(app)
        .get(`${baseUrl}/feeds`)
        .set('token', inValidToken)
        .then((res) => {
          expect(res).to.have.status(400);
          done();
        });
    });

    it('should throw error if no token is provided', (done) => {
      chai.request(app)
        .get(`${baseUrl}/feeds`)
        .end((err, res) => {
          // expect(err).to.be.true;
          expect(res).to.have.status(401);
          done();
        });
  });

    it('should send list of all articles', (done) => {
      const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhcmFoLmxpZkBnbWFpbC5jb20iLCJpYXQiOjE1NjkxNTkyMjN9.OL2R4at5Bb-9j_XPCselh4bUOgB9-SYjJK-Z95G7jFE';

      chai.request(app)
        .get(`${baseUrl}/feeds`)
        .set('token', validToken)
        .then((res) => {
          // expect(err).to.eq(null);
          // expect(res).to.be.an('array');
          expect(res).to.have.status(200);
          done();
        });
  });
  });

  describe('Publish new articles', () => {
    it('should throw error if no valid token is provided', (done) => {
      const inValidToken = 'eyJhiOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Im03dmtxaW5tNCIsImlhdCI6MTU2NTMyODI5M30.MV80v4kB25rub0RVV4EE0eEn7pX1QMnwN1pTfZKfMwA';

      chai.request(app)
        .post(`${baseUrl}/articles`)
        .set('token', inValidToken)
        .then((res) => {
          expect(res).to.have.status(400);
          done();
        });
    });

    it('should throw error if no token is provided', (done) => {
      chai.request(app)
        .post(`${baseUrl}/articles`)
        .end((err, res) => {
          // expect(err).to.be.true;
          expect(res).to.have.status(401);
          done();
        });
    });

    it('should not create an article without title field', (done) => {
      const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhcmFoLmxpZkBnbWFpbC5jb20iLCJpYXQiOjE1NjgzNzkzNTF9.8GT2Pr6S7y_fXBs2Ovtx4VQD2ccPjD7j7OtIuesoXCA';
      const newArt = {
        'title': '',
        'article': 'Just a test'
      }
      chai.request(app)
        .post(`${baseUrl}/articles`)
        .set('token', validToken)
        .send(newArt)
        .then((res) => {
          // expect(err).to.eq(null);
          // expect(res).to.be.an('array');
          expect(res).to.have.status(400);
          done();
        });
    });

    it('should not create an article with a empty description field', (done) => {
      const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhcmFoLmxpZkBnbWFpbC5jb20iLCJpYXQiOjE1NjgzNzkzNTF9.8GT2Pr6S7y_fXBs2Ovtx4VQD2ccPjD7j7OtIuesoXCA';
      const newArt = {
        'title': 'Just a test',
        'article': ''
      }
      chai.request(app)
        .post(`${baseUrl}/articles`)
        .set('token', validToken)
        .send(newArt)
        .then((res) => {
          // expect(err).to.eq(null);
          // expect(res).to.be.an('array');
          expect(res).to.have.status(400);
          done();
        });
    });

    it('should create an article', (done) => {
      const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhcmFoLmxpZkBnbWFpbC5jb20iLCJpYXQiOjE1NjkxNTkyMjN9.OL2R4at5Bb-9j_XPCselh4bUOgB9-SYjJK-Z95G7jFE';
      const newArt = {
        'title': 'Just a test',
        'article': 'Lorem ipsum tpoasffd'
      }
      chai.request(app)
        .post(`${baseUrl}/articles`)
        .set('token', validToken)
        .send(newArt)
        .then((res) => {
          // expect(err).to.eq(null);
          // expect(res).to.be.an('array');
          expect(res).to.have.status(201);
          done();
        });
    });

    it('should not create an article twice', (done) => {
      const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhcmFoLmxpZkBnbWFpbC5jb20iLCJpYXQiOjE1NjkxNTkyMjN9.OL2R4at5Bb-9j_XPCselh4bUOgB9-SYjJK-Z95G7jFE';
      const newArt = {
        'title': 'Just a test',
        'article': 'Lorem ipsum tpoasffd'
      }
      chai.request(app)
        .post(`${baseUrl}/articles`)
        .set('token', validToken)
        .send(newArt)
        .then((res) => {
          // expect(err).to.eq(null);
          // expect(res).to.be.an('array');
          expect(res).to.have.status(409);
          done();
        });
    });
  });

  describe('Update articles', () => {
    it('should throw error if no valid token is provided', (done) => {
      const inValidToken = 'eyJhiOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Im03dmtxaW5tNCIsImlhdCI6MTU2NTMyODI5M30.MV80v4kB25rub0RVV4EE0eEn7pX1QMnwN1pTfZKfMwA';

      chai.request(app)
        .patch(`${baseUrl}/articles/:id`)
        .set('token', inValidToken)
        .then((res) => {
          expect(res).to.have.status(400);
          done();
        });
    });

    it('should throw an error if no token is provided', (done) => {
      chai.request(app)
        .patch(`${baseUrl}/articles/:id`)
        .end((err, res) => {
          // expect(err).to.be.true;
          expect(res).to.have.status(401);
          done();
        });
    });

    it('should check if provided id is an integer', (done) => {
      const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhcmFoLmxpZkBnbWFpbC5jb20iLCJpYXQiOjE1NjkxNTkyMjN9.OL2R4at5Bb-9j_XPCselh4bUOgB9-SYjJK-Z95G7jFE';
      chai.request(app)
        .patch(`${baseUrl}/articles/m`)
        .set('token', validToken)
        .then((res) => {
          // expect(err).to.eq(null);
          // expect(res).to.be.an('array');
          expect(res).to.have.status(400);
          done();
        });
    });

    it('should update the title of an article that exists', (done) => {
      const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhcmFoLmxpZkBnbWFpbC5jb20iLCJpYXQiOjE1NjkxNTkyMjN9.OL2R4at5Bb-9j_XPCselh4bUOgB9-SYjJK-Z95G7jFE';
      const newArt = {
        'title': 'Test is coming',
        'article': ''
      }

      chai.request(app)
        .patch(`${baseUrl}/articles/1`)
        .set('token', validToken)
        .send(newArt)
        .then((res) => {
          // expect(err).to.eq(null);
          // expect(res).to.be.an('array');
          expect(res).to.have.status(201);
          done();
        });
    });

    it('should update the description of an article that exists', (done) => {
      const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhcmFoLmxpZkBnbWFpbC5jb20iLCJpYXQiOjE1NjkxNTkyMjN9.OL2R4at5Bb-9j_XPCselh4bUOgB9-SYjJK-Z95G7jFE';
      const newArt = {
        'title': '',
        'article': 'Test is coming'
      }

      chai.request(app)
        .patch(`${baseUrl}/articles/1`)
        .set('token', validToken)
        .send(newArt)
        .then((res) => {
          // expect(err).to.eq(null);
          // expect(res).to.be.an('array');
          expect(res).to.have.status(201);
          done();
        });
    });
  });

  describe('Delete articles', () => {
    it('should throw error if no valid token is provided', (done) => {
      const inValidToken = 'eyJhiOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Im03dmtxaW5tNCIsImlhdCI6MTU2NTMyODI5M30.MV80v4kB25rub0RVV4EE0eEn7pX1QMnwN1pTfZKfMwA';

      chai.request(app)
        .delete(`${baseUrl}/articles/:id`)
        .set('token', inValidToken)
        .then((res) => {
          expect(res).to.have.status(400);
          done();
        });
    });

    it('should throw an error if no token is provided', (done) => {
      chai.request(app)
        .delete(`${baseUrl}/articles/:id`)
        .end((err, res) => {
          // expect(err).to.be.true;
          if (err) done(err)
          expect(res).to.have.status(401);
          done();
        });
    });

    it('should check if provided id is an integer', (done) => {
      const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhcmFoLmxpZkBnbWFpbC5jb20iLCJpYXQiOjE1NjkxNTkyMjN9.OL2R4at5Bb-9j_XPCselh4bUOgB9-SYjJK-Z95G7jFE';
      chai.request(app)
        .delete(`${baseUrl}/articles/m`)
        .set('token', validToken)
        .then((res) => {
          // expect(err).to.eq(null);
          // expect(res).to.be.an('array');
          expect(res).to.have.status(400);
          done();
        });
    });

    it('should delete article', (done) => {
      const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhcmFoLmxpZkBnbWFpbC5jb20iLCJpYXQiOjE1NjkxNTkyMjN9.OL2R4at5Bb-9j_XPCselh4bUOgB9-SYjJK-Z95G7jFE';

      chai.request(app)
        .delete(`${baseUrl}/articles/1`)
        .set('token', validToken)
        .then((res) => {
          // expect(err).to.eq(null);
          // expect(res).to.be.an('array');
          expect(res).to.have.status(200);
          done();
        });
    });
  });

  describe('Add comment on articles', () => {
    it('should throw error if no valid token is provided', (done) => {
      const inValidToken = 'eyJhiOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Im03dmtxaW5tNCIsImlhdCI6MTU2NTMyODI5M30.MV80v4kB25rub0RVV4EE0eEn7pX1QMnwN1pTfZKfMwA';

      chai.request(app)
        .post(`${baseUrl}/articles/:id/comments`)
        .set('token', inValidToken)
        .then((res) => {
          expect(res).to.have.status(400);
          done();
        });
    });

    it('should throw an error if no token is provided', (done) => {
      chai.request(app)
        .post(`${baseUrl}/articles/:id/comments`)
        .end((err, res) => {
          // expect(err).to.be.true;
          expect(res).to.have.status(401);
          done();
        });
    });

    it('should check if provided id is an integer', (done) => {
      const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhcmFoLmxpZkBnbWFpbC5jb20iLCJpYXQiOjE1NjkxNTkyMjN9.OL2R4at5Bb-9j_XPCselh4bUOgB9-SYjJK-Z95G7jFE';
      chai.request(app)
        .post(`${baseUrl}/articles/m/comments`)
        .set('token', validToken)
        .then((res) => {
          // expect(err).to.eq(null);
          // expect(res).to.be.an('array');
          expect(res).to.have.status(400);
          done();
        });
    });

    // it('should add a comment on an article', (done) => {
    //   const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhcmFoLmxpZkBnbWFpbC5jb20iLCJpYXQiOjE1NjgzNzkzNTF9.8GT2Pr6S7y_fXBs2Ovtx4VQD2ccPjD7j7OtIuesoXCA';
    //   const newComment = { 'comment': 'Blakkdjkljkljdksjkljd sdsjhjkhk ' }
    //   chai.request(app)
    //     .post(`${baseUrl}/articles/2/comments`)
    //     .set('token', validToken)
    //     .send(newComment)
    //     .then((err,res) => {
    //       console.log('Error :', err.message)
    //       // expect(err).to.eq(null);
    //       // expect(res).to.be.an('array');
    //       expect(res).to.have.status(200);
    //       done();
    //     });
    // });

    // it('should not add a comment without comment field', (done) => {
    //   const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhcmFoLmxpZkBnbWFpbC5jb20iLCJpYXQiOjE1NjgzNzkzNTF9.8GT2Pr6S7y_fXBs2Ovtx4VQD2ccPjD7j7OtIuesoXCA';
    //   const newComment = { }
    //   chai.request(app)
    //     .post(`${baseUrl}/articles/2/comments`)
    //     .set('token', validToken)
    //     .send(newComment)
    //     .then((err,res) => {
    //       console.log('Error :', err)
    //       // expect(err).to.eq(null);
    //       // expect(res).to.be.an('array');
    //       expect(res).to.have.status(200);
    //       done();
    //     });
    // });

    // it('should not add a comment with comment field empty', (done) => {
    //   const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhcmFoLmxpZkBnbWFpbC5jb20iLCJpYXQiOjE1NjgzNzkzNTF9.8GT2Pr6S7y_fXBs2Ovtx4VQD2ccPjD7j7OtIuesoXCA';
    //   const newComment = { 'comment': '' }
    //   chai.request(app)
    //     .post(`${baseUrl}/articles/2/comments`)
    //     .set('token', validToken)
    //     .send(newComment)
    //     .then((err,res) => {
    //       console.log('Error :', err)
    //       // expect(err).to.eq(null);
    //       // expect(res).to.be.an('array');
    //       expect(res).to.have.status(400);
    //       done();
    //     });
    // });
  });
});
