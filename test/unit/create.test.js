'use strict';

var parser = require('../../lib/parse');
var stringify = require('../../lib/stringify');
var expect = require('./expect');
describe('SQL create', function () {
  describe('create table simple', function () {
    it.skip('should work fine when create table', function () {
      var sql = `
        create table xxxx if not exists (
          a string comment 'xxx'
        );
      `;
      var result = parser.parse(sql);
      var resSql = stringify(result);
      expect(result)
        .type('create')
        .columns(['sum(abc,1)', 'def']);
      resSql.toLowerCase().should.equal(sql);
    });
  });
});
