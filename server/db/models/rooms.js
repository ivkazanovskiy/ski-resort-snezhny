const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Addition, Image }) {
      Room.hasOne(Addition, { foreignKey: 'additionId' });
      Room.hasMany(Image, { foreignKey: 'roomId' });
    }
  }
  Room.init({
    title: {
      allowNull: false,
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
    cost: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    additionId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Additions',
        key: 'id',
      },
    },
  }, {
    sequelize,
    modelName: 'Room',
  });
  return Room;
};
