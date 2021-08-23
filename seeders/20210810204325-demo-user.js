'use strict';
// Seeders are the values that go into the table that is in the model
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      name: 'Giorno Giovana',
      email: 'giorno@email.com',
      userName: 'gmoney',
      password: 'postgres',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
