const Sequelize = require('sequelize');

class Midia extends Sequelize.Model {
  static init(sequelize) {
    super.init({
      nome: Sequelize.STRING,
      link: Sequelize.STRING
    }, {
      sequelize,
      freezeTableName: true
    });
    return this;
  }

  static associate(dados) {
    Midia.belongsTo(dados.Professor);
    Midia.belongsToMany(dados.Atividade, { through: 'midiaAtividade' });
  }
}

module.exports = Midia;