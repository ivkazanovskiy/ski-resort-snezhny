const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Type extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Room }) {
      Type.hasMany(Room, { foreignKey: 'typeId' });
    }
  }
  Type.init({
    title: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
    },
    description: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    guestCount: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    weekdayCost: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    weekendCost: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
  }, {
    sequelize,
    modelName: 'Type',
  });
  return Type;
};
