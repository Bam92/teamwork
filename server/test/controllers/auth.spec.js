import chaiHttp from 'chai-http';
import chai from 'chai';

import app from '../../src/app';
import { endpoint as baseUrl } from '../../../config'

chai.use(chaiHttp);
const { expect } = chai;

describe('Authentification controller', () => {
  describe('Login an employee', () => {
    it('should log in an existing employee successfully', (done) => {
      const user = { email: 'sarah.lif@gmail.com', password: 'S@rah123' };
      chai.request(app)
        .post(`${baseUrl}/auth/signin`)
        .send(user)
        .then((res) => {
          expect(res).to.have.status(200);
          done();
        });
    });

    it('should throw an error if email and password are not provided', (done) => {
      const user = { email: '', password: '' };
      chai.request(app)
        .post(`${baseUrl}/auth/signin`)
        .send(user)
        .then((res) => {
          expect(res).to.have.status(400);
          done();
        });
  });

  it('should not log in an employee with invalid email', (done) => {
    const user = { email: 'sarah.lifgmail.com', password: 'S@rah123' };
    chai.request(app)
      .post(`${baseUrl}/auth/signin`)
      .send(user)
      .then((res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
  });

  describe('Sign up an employee', () => {
    it('should sign up a new employee successfully', (done) => {
      const user = { firstName: 'Sarah', email: 'sarah.lif1@gmail.com', password: 'S@rah123' };
      chai.request(app)
        .post(`${baseUrl}/auth/signup`)
        .send(user)
        .then((res) => {
          expect(res).to.have.status(201);
          done();
        });
    });

    it('should throw an error if required field is missing', (done) => {
      const user = { firstName: 'Patience', email: 'sarah.lif1@gmail.com', password: '' };
      chai.request(app)
        .post(`${baseUrl}/auth/signup`)
        .send(user)
        .then((res) => {
          expect(res).to.have.status(400);
          done();
        });
  });

  it('should not sign up an employee with an existing email', (done) => {
    const user = { email: 'sarah.lifgmail.com', password: 'S@Pat123_()' };
    chai.request(app)
      .post(`${baseUrl}/auth/signup`)
      .send(user)
      .then((res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
  });
});