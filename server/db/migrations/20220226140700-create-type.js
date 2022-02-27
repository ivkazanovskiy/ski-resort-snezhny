module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Types', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        allowNull: false,
        unique: true,
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
    await queryInterface.dropTable('Types');
  },
};
