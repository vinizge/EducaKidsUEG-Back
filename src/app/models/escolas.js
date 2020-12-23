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
    Escola.hasMany(dados.Usuario);
  }
}

module.exports = Escola;