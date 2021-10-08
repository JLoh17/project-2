'use strict';
const { Model } = require('sequelize')
const CommentSchema = require('./schema/comment')
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      Comment.User = this.belongsTo(models.User)
      Comment.Equipment = this.belongsTo(models.Equipment)
    }
  };

  const { tableAttributes } = CommentSchema(sequelize, DataTypes)
  Comment.init(tableAttributes, {
    sequelize,
    modelName: 'Comment',
  })
  return Comment
};
