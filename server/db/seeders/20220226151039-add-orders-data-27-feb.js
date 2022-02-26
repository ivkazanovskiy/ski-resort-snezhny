module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Orders', [
      {
        start: '2022-02-27',
        finish: '2022-02-28',
        roomId: 1,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        start: '2022-02-27',
        finish: '2022-02-28',
        roomId: 2,
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        start: '2022-02-27',
        finish: '2022-02-28',
        roomId: 2,
        userId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        start: '2022-02-27',
        finish: '2022-02-28',
        roomId: 3,
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        start: '2022-02-27',
        finish: '2022-02-28',
        roomId: 6,
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
