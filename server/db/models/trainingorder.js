const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class TrainingOrder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Trainer }) {
      TrainingOrder.belongsTo(User, { foreignKey: 'userId' });
      TrainingOrder.belongsTo(Trainer, { foreignKey: 'trainerId' });
    }
  }
  TrainingOrder.init({
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
    sport: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'TrainingOrder',
  });
  return TrainingOrder;
};
