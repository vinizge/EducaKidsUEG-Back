const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class Usuario extends Sequelize.Model {
  static init(sequelize) {
    super.init({
      nome: Sequelize.STRING,
      email: Sequelize.STRING,
      senha: Sequelize.STRING
    }, {
      sequelize,
      freezeTableName: true
    });

    this.addHook('beforeSave', async user => {

      if (user.senha) {
        user.senha = await bcrypt.hash(user.senha, 8);
      }
    });

    this.addHook('beforeBulkUpdate', async user => {
      if (user.attributes.senha) {
        user.attributes.senha = await bcrypt.hash(user.attributes.senha, 8);
      }
    });


    return this;
  }

  //Sign JWT and return
  getSignedJwtToken = function (idUser) {
    return jwt.sign({ id: idUser }, process.env.JWT_SECRET);
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.senha);
  }

  static associate(dados) {
    Usuario.belongsTo(dados.Escola);
  }
}

module.exports = Usuario;