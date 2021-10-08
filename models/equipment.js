'use strict';
const { Model } = require('sequelize');
const EquipmentSchema = require('./schema/equipment')
module.exports = (sequelize, DataTypes) => {
  class equipment extends Model {
    static associate(models) {
      Equipment.Users = this.belongsToMany(models.User, {through:'Rating'})
      Equipment.Ratings = this.hasMany(models.Rating)

      Equipment.CommentedUsers = this.belongsToMany(models.User, {through: 'Comment'})
      Equipment.Comments = this.hasMany(models.Comment)
    }
  };
  const { tableAttributes } = EquipmentSchema(sequelize, DataTypes)
  equipment.init(tableAttributes, {
    sequelize,
    modelName: 'equipment',
  });
  return equipment;
};
