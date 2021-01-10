const Sequelize = require('sequelize');
const { sequelize } = require('./turmas');

class Disciplina extends Sequelize.Model {
  static init(sequelize) {
    super.init({
      nome: Sequelize.STRING,
    }, {
      sequelize,
      freezeTableName: true
    });
    return this;
  }

  static associate(dados) {
    Disciplina.belongsToMany(dados.Turma, { through: 'turmaDisciplina' });
  }
}

module.exports = Disciplina;