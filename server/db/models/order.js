const {
  Model,
} = require('sequelize');

module.exports = (DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Room, User }) {
      Order.belongsTo(Room, { foreignKey: 'roomId' });
      Order.belongsTo(User, { foreignKey: 'userId' });
    }
  }
  Order.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    start: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    finish: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    roomId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Rooms',
        key: 'id',
      },
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
  }, {
    DataTypes,
    modelName: 'Order',
  });
  return Order;
};
