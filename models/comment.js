'use strict';
const { Model } = require('sequelize');
const CommentSchema = require('./schema/comment')
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      Comments.User = this.belongsTo(models.User)
      Comments.Equipment = this.belongsTo(models.Equipment)
    }
  };

  const { tableAttributes } = UserSchema(sequelize, DataTypes)
  Comment.init(tableAttributes, {
    sequelize,
    modelName: 'comment',
  })
  return Comment
};
