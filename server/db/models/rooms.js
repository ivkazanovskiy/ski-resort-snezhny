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
    static associate({ Type, Image }) {
      Room.hasOne(Type, { foreignKey: 'typeId' });
      Room.hasMany(Image, { foreignKey: 'roomId' });
    }
  }
  Room.init({
    typeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Types',
        key: 'id',
      },
    },
  }, {
    sequelize,
    modelName: 'Room',
  });
  return Room;
};
