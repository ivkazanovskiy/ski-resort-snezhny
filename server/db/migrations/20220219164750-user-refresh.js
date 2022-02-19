module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'refreshToken', Sequelize.TEXT);
    await queryInterface.addConstraint('Users', {
      fields: ['refreshToken'],
      type: 'unique',
      name: 'custom_unique_constraint_name',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'refreshToken');
  },
};
