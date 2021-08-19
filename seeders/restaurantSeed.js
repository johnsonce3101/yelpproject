'use strict';
// Seeders are the values that go into the table that is in the model
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('restaurants', [{
      restaurant_name: 'Subway',
      location: '250 park ave w',
      rating: '4',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('restaurants', null, {});
  }
};