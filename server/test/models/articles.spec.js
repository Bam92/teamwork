import chaiHttp from 'chai-http';
import chai from 'chai';

import app from '../../src/app';
import * as articlesModel from '../../src/models/articles';

chai.use(chaiHttp);
import { from } from 'rxjs';
const { expect } = chai;

describe('Article model', () => {
  const newArt = {
    _id: articlesModel.articles_db.length + 1,
    createdOn: new Date('2019-9-25'),
    title: 'A test article',
    article: 'Lorem Lorem from test lorem',
    authorId: 1
  };

  articlesModel.articles_db.push(newArt);

  it('should select ONE article by TITLE', (done) => {
    const articleByTtile = articlesModel.getOne('A test article')
    // console.log('type of this', err)
    // console.log(articleByTtile.length, 'length')
    expect(articleByTtile).to.be.an('object')
    // expect(articleByTtile).to.have.lengthOf(1);
    done();
  });
});
