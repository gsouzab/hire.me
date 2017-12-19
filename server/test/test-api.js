const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();

const Url = require('../models/url');

chai.use(chaiHttp);

describe('Shorten API', () => {
  Url.collection.drop();
  
  beforeEach(function(done){
    var newUrl = new Url({
      original_url: 'http://globo.com.br',
      custom_alias: 'globo'
    });
    newUrl.save(function(err) {
      done();
    });
  });
  
  afterEach(function(done){
    Url.collection.drop();
    done();
  });

  it('GET /top/5 should list TOP 5 urls', function(done) {
    chai.request(server)
      .get('/top/5')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        done();
      });
  });

  it('PUT /create should create a new short url', function(done) {
    chai.request(server)
      .put('/create?url=http://google.com')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('_id');
        res.body.should.have.property('access_count');
        res.body.should.have.property('original_url');
        res.body.should.have.property('alias');
        done();
      });
  });

  it('PUT /create should return error with existing CUSTOM_ALIAS', function(done) {
    chai.request(server)
      .put('/create?url=http://globo.com&CUSTOM_ALIAS=globo')
      .end(function(err, res){
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.to.deep.equal({ ERR_CODE: '001', Description: 'CUSTOM ALIAS ALREADY EXISTS' });
        done();
      });
  });

  it('PUT /create should create new short url with CUSTOM_ALIAS', function(done) {
    chai.request(server)
      .put('/create?url=http://globo.com&CUSTOM_ALIAS=custom')
      .end(function(err, res){
        res.should.have.status(200);
        res.body.should.have.property('_id');
        res.body.should.have.property('access_count');
        res.body.should.have.property('original_url');
        res.body.should.have.property('alias');
        res.body.alias.should.be.equal('custom');
        done();
      });
  });
});