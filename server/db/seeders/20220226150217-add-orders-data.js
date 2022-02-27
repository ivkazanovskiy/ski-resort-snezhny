module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Orders', [
      {
        start: '2022-02-27',
        finish: '2022-02-29',
        roomId: 1,
        userId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        start: '2022-02-28',
        finish: '2022-02-29',
        roomId: 2,
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        start: '2022-03-01',
        finish: '2022-03-04',
        roomId: 4,
        userId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        start: '2022-02-27',
        finish: '2022-02-28',
        roomId: 46,
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        start: '2022-02-28',
        finish: '2022-03-01',
        roomId: 16,
        userId: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        start: '2022-02-27',
        finish: '2022-02-28',
        roomId: 10,
        userId: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        start: '2022-02-27',
        finish: '2022-02-28',
        roomId: 22,
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        start: '2022-02-27',
        finish: '2022-02-28',
        roomId: 23,
        userId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        start: '2022-02-27',
        finish: '2022-02-28',
        roomId: 37,
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        start: '2022-02-27',
        finish: '2022-02-28',
        roomId: 26,
        userId: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        start: '2022-03-03',
        finish: '2022-03-04',
        roomId: 6,
        userId: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Orders', null, {});
  },
};
