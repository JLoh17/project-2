const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('User', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "Users_email_key"
    },
    passwordHash: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    profileName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "Users_profileName_key"
    }
  }, {
    sequelize,
    tableName: 'Users',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "Users_email_key",
        unique: true,
        fields: [
          { name: "email" },
        ]
      },
      {
        name: "Users_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "Users_profileName_key",
        unique: true,
        fields: [
          { name: "profileName" },
        ]
      },
    ]
  });
};
