'use strict';
const { Model } = require('sequelize');
const UserSchema = require('./schema/user')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.Equipments = this.belongsToMany(models.Equipment, {through:'Rating'})
      User.Ratings = this.hasMany(models.Rating)

      User.CommentedEquipments = this.belongsToMany(models.Equipment, {through:'Comment'})
      User.Comments = this.hasMany(models.Comment)
    }
  };

  const { tableAttributes } = UserSchema(sequelize, DataTypes)
  User.init(tableAttributes, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
