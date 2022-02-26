const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Addition extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Room }) {
      Addition.belongsToMany(Room, { foreignKey: 'additionId' });
    }
  }
  Addition.init({
    title: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
    },
    description: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    guarantee: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    cancelCondition: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
  }, {
    sequelize,
    modelName: 'Addition',
  });
  return Addition;
};
