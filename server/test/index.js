import chai from 'chai';

import app from '../src/app';

const { expect } = chai;

const PORT = 4000;

// Helper functions to start/stop app before/after tests

let server = null;
const startApp = () => app.listen(PORT);
const tearDown = () => server.close();

describe('App basic tests', () => {

  it('App should exists', () => {
    expect(app).to.be.a('function');
  });
});
