module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Rooms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      guestCount: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      weekdayCost: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      weekendCost: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      additionId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Additions',
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Rooms');
  },
};
