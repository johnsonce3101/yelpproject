'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('restaurants',   
    "createdAt", {
      
      type: Sequelize.DATE
    }),
    await queryInterface.addColumn('restaurants',  
    "updatedAt", {
     
      type: Sequelize.DATE
     }),
     await queryInterface.addColumn('reviews',   
    "createdAt", {
      
      type: Sequelize.DATE
    }),
    await queryInterface.addColumn('reviews',  
    "updatedAt", {
      
      type: Sequelize.DATE
     })
    
},

down: async (queryInterface, Sequelize) => {
   await queryInterface.removeColumn('restaurants',"createdAt"),
   await queryInterface.removeColumn('reviews',"updatedAt"),
   await queryInterface.removeColumn('restaurants',"updatedAt"),
   await queryInterface.removeColumn('reviews',"createdAt")
}
};
