const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Turma = require('../models/turmas')

class Aluno extends Sequelize.Model {
  static init(sequelize) {
    super.init({
      nome: Sequelize.STRING,
      email: Sequelize.STRING,
      senha: Sequelize.STRING,
      role: Sequelize.STRING,
    }, {
      sequelize,
      freezeTableName: true
    });

    this.addHook('beforeSave', async aluno => {

      if (aluno.senha) {
        aluno.senha = await bcrypt.hash(aluno.senha, 8);
      }
    });

    this.addHook('beforeBulkUpdate', async aluno => {
      if (aluno.attributes.senha) {
        aluno.attributes.senha = await bcrypt.hash(aluno.attributes.senha, 8);
      }
    });


    return this;
  }

  //Sign JWT and return
  getSignedJwtToken = function (idAluno) {
    return jwt.sign({ id: idAluno }, process.env.JWT_SECRET);
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.senha);
  }

  static associate(dados) {
    Aluno.belongsTo(dados.Escola);
    Aluno.belongsToMany(dados.Turma, { through: 'alunoTurma' });
  }
}

module.exports = Aluno;