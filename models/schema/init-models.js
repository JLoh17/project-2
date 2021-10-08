var DataTypes = require("sequelize").DataTypes;
var _SequelizeMetum = require("./sequelize_metum");
var _User = require("./user");
var _comment = require("./comment");
var _equipment = require("./equipment");
var _rating = require("./rating");

function initModels(sequelize) {
  var SequelizeMetum = _SequelizeMetum(sequelize, DataTypes);
  var User = _User(sequelize, DataTypes);
  var comment = _comment(sequelize, DataTypes);
  var equipment = _equipment(sequelize, DataTypes);
  var rating = _rating(sequelize, DataTypes);


  return {
    SequelizeMetum,
    User,
    comment,
    equipment,
    rating,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
