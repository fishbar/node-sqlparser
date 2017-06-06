/*!
 * node-sqlparser: test/unit/select.test.js
 * Authors  : 剪巽 <jianxun.zxl@taobao.com> (https://github.com/fishbar)
 * Create   : 2014-05-21 18:05:12
 * CopyRight 2014 (c) Alibaba Group
 */
'use strict';

var parser = require('../../lib/parse');
var stringify = require('../../lib/stringify');
var expect = require('./expect');
describe('SQL select', function () {

  describe('check selected fields', function () {
    it('should return ok when simple fields', function () {
      var sql = 'select custom(abc), def from a.tablename where custom(id) in (1.0, 2.1, 2, 3) and c = ?';
      var result = parser.parse(sql);
      var resSql = stringify(result);
      expect(result)
        .type('select')
        .columns(['sum(abc,1)', 'def']);
      resSql.toLowerCase().should.equal(sql);
    });
    it('should return ok when table without db name', function () {
      var sql = 'select custom(abc), def from tableName where custom(id) in (1,2,2,3)';
      var result = parser.parse(sql);
      expect(result)
        .type('select')
        .columns(['sum(abc,1)', 'def']);
    });
    it('should keep decimals in floats', function () {
      var sql = 'select a from b where x = 1.0';
      var result = parser.parse(sql);
      var resSql = stringify(result);
      expect(result)
        .type('select')
        .columns(['a']);
      resSql.toLowerCase().should.equal(sql);
    });
    it('should ok when limit 10', function () {
      var sql = 'select a from b limit 10';
      var result = parser.parse(sql);
      expect(result)
        .type('select')
        .limit(0, 10);
    });
    it('should ok when limit 10, 20', function () {
      var sql = 'select a from b limit 10, 20';
      var result = parser.parse(sql);
      expect(result)
        .type('select')
        .limit(10, 20);
    });
    it('`AS` is optional', function () {
      var sql = 'select a bsd from b c limit 10, 20';
      var result = parser.parse(sql);
      expect(result)
        .type('select')
        .limit(10, 20);
    });
    it('return error message when fields error', function () {
      var sql = 'select a from b c limit 10, 20.23';
      var result;
      try {
        result = parser.parse(sql);
        console.log(result.limit);
      } catch (e) {
        console.log(e);
      }
    });
  });
});
