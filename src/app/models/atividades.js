const Sequelize = require('sequelize');

class Atividade extends Sequelize.Model {
  static init(sequelize) {
    super.init({
      nome: Sequelize.STRING,
      nota: Sequelize.FLOAT
    }, {
      sequelize,
      freezeTableName: true
    });
    return this;
  }

  static associate(dados) {
    Atividade.belongsTo(dados.Professor);
    Atividade.belongsToMany(dados.Turma, { through: 'atividadeTurma' });
  }
}

module.exports = Atividade;