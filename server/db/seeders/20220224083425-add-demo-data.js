const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        name: 'Katya',
        surname: 'Konovalova',
        email: 'ess18@tpu.ru',
        phone: '+79995130035',
        password: await bcrypt.hash('1Qq', 10),
        skiPass: 12345,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Vanya',
        surname: 'Kazanovskiy',
        email: 'ivan@gmail.com',
        phone: '+79312903562',
        password: await bcrypt.hash('1Qq', 10),
        skiPass: 67890,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
    await queryInterface.bulkInsert('Trainers', [
      {
        name: 'Karina',
        surname: 'Ivanova',
        aboutMe: 'Хороший человек, опытный инструктор. Научу вас кататься на лажых и получать удовольствие! :)',
        email: 'karina@mail.ru',
        phone: '+79116543897',
        password: await bcrypt.hash('1Qq', 10),
        ski: true,
        snowboard: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Petr',
        surname: 'Malinov',
        aboutMe: 'Однажды я встал на сноуборд и теперь неразлучен с ним. Обучаю катать новичков и более продвинутых ребят.',
        email: 'petr@yandex.ru',
        phone: '+79245118778',
        password: await bcrypt.hash('1Qq', 10),
        ski: false,
        snowboard: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Марина',
        surname: 'Васечкина',
        aboutMe: 'Бла-бла-бла',
        email: 'marina@mail.ru',
        phone: '+79148943897',
        password: await bcrypt.hash('1Qq', 10),
        ski: true,
        snowboard: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('Trainers', null, {});
  },
};
