const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class trainingOrder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Trainer }) {
      trainingOrder.belongsTo(User, { foreignKey: 'userId' });
      trainingOrder.belongsTo(Trainer, { foreignKey: 'trainerId' });
    }
  }
  trainingOrder.init({
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    trainerId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    start: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    duration: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
  }, {
    sequelize,
    modelName: 'trainingOrder',
  });
  return trainingOrder;
};
