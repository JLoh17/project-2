var DataTypes = require("sequelize").DataTypes;
var _Comment = require("./comment");
var _Equipment = require("./equipment");
var _Rating = require("./rating");
var _SequelizeMetum = require("./sequelize_metum");
var _User = require("./user");

function initModels(sequelize) {
  var Comment = _Comment(sequelize, DataTypes);
  var Equipment = _Equipment(sequelize, DataTypes);
  var Rating = _Rating(sequelize, DataTypes);
  var SequelizeMetum = _SequelizeMetum(sequelize, DataTypes);
  var User = _User(sequelize, DataTypes);


  return {
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
