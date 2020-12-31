const Sequelize = require('sequelize');

class Escola extends Sequelize.Model {
  static init(sequelize) {
    super.init({
      nome: Sequelize.STRING,
      endereco: Sequelize.STRING,
      telefone: Sequelize.STRING
    }, {
      sequelize,
      freezeTableName: true
    });
    return this;
  }

  static associate(dados) {
    Escola.hasMany(dados.Usuario, {
      onDelete: 'cascade',
      hooks: true
    });
    Escola.hasMany(dados.Professor, {
      onDelete: 'cascade',
      hooks: true
    });
    Escola.hasMany(dados.Aluno, {
      onDelete: 'cascade',
      hooks: true
    });
    Escola.hasMany(dados.Turma, {
      onDelete: 'cascade',
      hooks: true
    });
  }
}

module.exports = Escola;