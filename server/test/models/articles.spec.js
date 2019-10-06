import chaiHttp from 'chai-http';
import chai from 'chai';

import articles_db from '../../src/usingDS/data/articles'
import { getOne } from '../../src/usingDS/models/articles';

chai.use(chaiHttp);
const { expect } = chai;

describe('Article model', () => {
  const newArt = {
    _id: articles_db.length + 1,
    createdOn: new Date('2019-9-25'),
    title: 'A test article',
    article: 'Lorem Lorem from test lorem',
    authorId: 1
  };

 articles_db.push(newArt);

  it('should select ONE article by TITLE', (done) => {
    const articleByTtile = getOne('A test article')

    expect(articleByTtile).to.be.an('object')
    done();
  });
});
