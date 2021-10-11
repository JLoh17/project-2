const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Rating', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    EquipmentId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Ratings',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "Ratings_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
