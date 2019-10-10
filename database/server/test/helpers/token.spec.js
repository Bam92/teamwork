import chaiHttp from 'chai-http';
import chai from 'chai';
import jwt from 'jsonwebtoken';

import tokenGenerator from '../../src/helpers/getToken';
import { privateKey } from '../../../../config';

chai.use(chaiHttp);
const { expect } = chai;

const email = 'sarah.lif@gmail.com';
const token = tokenGenerator(email);
const verify = jwt.verify(token, privateKey);


describe('Generate token', () => {
  it('should generate a valid token', () => {
    expect(verify).to.be.eq(email);
  });
});
