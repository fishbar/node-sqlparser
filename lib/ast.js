/**
 * @class  AST Helper
 */
var parse = require('./parse').parse;
var stringify = require('./stringify');

function AST(ast) {
  this.ast = ast;
}

AST.prototype = {
  /**
   * parse sql string to ast object
   * @param  {String} sql
   */
  parse: function (sql) {
    this.ast = parse(sql);
  },
  /**
   * stringify ast object to sql
   * @return {String} sql
   */
  stringify: function () {
    return stringify(this.ast);
  },
  /**
   * 获取 sql 中依赖的table 列表
   * @return {[type]} [description]
   */
  getTables: function () {

  },
  /**
   * 获取 sql 中命中的字段, select中的
   *
   * @return {[type]} [description]
   */
  getSelectedColumns: function () {

  }
};

module.exports = AST;
