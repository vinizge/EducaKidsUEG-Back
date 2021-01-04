const Sequelize = require('sequelize');

class Turma extends Sequelize.Model {
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
    Turma.belongsTo(dados.Escola);
    Turma.belongsTo(dados.Professor);
    Turma.belongsToMany(dados.Aluno, { through: 'alunoTurma' });
    Turma.belongsToMany(dados.Disciplina, { through: 'turmaDisciplina' });
    Turma.belongsToMany(dados.Atividade, { through: 'atividadeTurma' });
  }
}

module.exports = Turma;