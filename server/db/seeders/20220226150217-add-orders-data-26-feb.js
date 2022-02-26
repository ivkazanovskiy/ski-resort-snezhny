module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Orders', [
      {
        start: '2022-02-26',
        finish: '2022-02-27',
        roomId: 1,
        userId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        start: '2022-02-26',
        finish: '2022-02-27',
        roomId: 2,
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        start: '2022-02-26',
        finish: '2022-02-27',
        roomId: 2,
        userId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        start: '2022-02-26',
        finish: '2022-02-27',
        roomId: 4,
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        start: '2022-02-26',
        finish: '2022-02-27',
        roomId: 5,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Orders', null, {});
  },
};
