import chai from 'chai';

import verifyToken from '../../src/middlewares/verifyToken';

const { expect } = chai;

describe('verifyToken should exist', () => {
  it('App should exists', () => {
    expect(verifyToken).to.be.a('function');
  });
});
