const Sequelize = require('sequelize');

class Atividade extends Sequelize.Model {
  static init(sequelize) {
    super.init({
      nome: Sequelize.STRING,
      nota: Sequelize.FLOAT,
      prazo: Sequelize.DATE
    }, {
      sequelize,
      freezeTableName: true
    });
    return this;
  }

  static associate(dados) {
    Atividade.belongsTo(dados.Professor);
    Atividade.belongsToMany(dados.Turma, { through: 'atividadeTurma' });
    Atividade.belongsToMany(dados.Pergunta, { through: 'perguntaAtividade' });
    Atividade.belongsToMany(dados.Midia, { through: 'midiaAtividade' });
    Atividade.hasMany(dados.ResponderAtividade);
  }
}

module.exports = Atividade;