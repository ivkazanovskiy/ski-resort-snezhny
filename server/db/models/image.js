const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Room }) {
      Image.belongsTo(Room, { foreignKey: 'roomId' });
    }
  }
  Image.init({
    roomId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Rooms',
        key: 'id',
      },
    },
    name: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'Image',
  });
  return Image;
};
