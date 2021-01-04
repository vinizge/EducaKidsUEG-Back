'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Pergunta',
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        },
        pergunta: {
          type: Sequelize.STRING,
          allowNull: false
        },
        opcao1: {
          type: Sequelize.STRING,
          allowNull: true
        },
        opcao2: {
          type: Sequelize.STRING,
          allowNull: true
        },
        opcao3: {
          type: Sequelize.STRING,
          allowNull: true
        },
        opcao4: {
          type: Sequelize.STRING,
          allowNull: true
        },
        objetiva: {
          type: Sequelize.BOOLEAN,
          allowNull: false
        },
        gabarito: {
          type: Sequelize.STRING,
          allowNull: true
        },
        pontuacao: {
          type: Sequelize.FLOAT,
          allowNull: true
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false
        }

      });
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('perguntas');
     */
  }
};
