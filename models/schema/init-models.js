var DataTypes = require("sequelize").DataTypes;
var _AuthenticityToken = require("./authenticity_token");
var _Comment = require("./comment");
var _Equipment = require("./equipment");
var _Rating = require("./rating");
var _SequelizeMetum = require("./sequelize_metum");
var _User = require("./user");

function initModels(sequelize) {
  var AuthenticityToken = _AuthenticityToken(sequelize, DataTypes);
  var Comment = _Comment(sequelize, DataTypes);
  var Equipment = _Equipment(sequelize, DataTypes);
  var Rating = _Rating(sequelize, DataTypes);
  var SequelizeMetum = _SequelizeMetum(sequelize, DataTypes);
  var User = _User(sequelize, DataTypes);


  return {
    AuthenticityToken,
    Comment,
    Equipment,
    Rating,
    SequelizeMetum,
    User,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
