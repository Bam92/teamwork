import chai from 'chai';

import app from '../src/app';

const { expect } = chai;

describe('App basic tests', () => {

  it('App should exists', () => {
    expect(app).to.be.a('function');
  });
});
