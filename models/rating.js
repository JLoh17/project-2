'use strict';
const { Model } = require('sequelize');
const RatingSchema = require('./schema/rating')
module.exports = (sequelize, DataTypes) => {
  class Rating extends Model {
    static associate(models) {
      Rating.User = this.belongsTo(models.User)
      Rating.Equipment = this.belongsTo(models.Equipment)
    }
  };

  const { tableAttributes } = RatingSchema(sequelize, DataTypes)
  Rating.init(tableAttributes, {
    sequelize,
    modelName: 'Rating',
  })
  return Rating
};
