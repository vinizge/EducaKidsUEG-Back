const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class Professor extends Sequelize.Model {
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

    this.addHook('beforeSave', async professor => {

      if (professor.senha) {
        professor.senha = await bcrypt.hash(professor.senha, 8);
      }
    });

    this.addHook('beforeBulkUpdate', async professor => {
      if (professor.attributes.senha) {
        professor.attributes.senha = await bcrypt.hash(professor.attributes.senha, 8);
      }
    });


    return this;
  }

  //Sign JWT and return
  getSignedJwtToken = function (idProfessor) {
    return jwt.sign({ id: idProfessor }, process.env.JWT_SECRET);
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.senha);
  }

  static associate(dados) {
    Professor.belongsTo(dados.Escola);
  }
}

module.exports = Professor;