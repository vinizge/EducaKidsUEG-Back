const Sequelize = require('sequelize');

class ResponderAtividade extends Sequelize.Model {
  static init(sequelize) {
    super.init({
      idPergunta: Sequelize.INTEGER,
      idMidia: Sequelize.INTEGER,
      resposta: Sequelize.STRING
    }, {
      sequelize,
      freezeTableName: true
    });
    return this;
  }

  static associate(dados) {
    ResponderAtividade.belongsTo(dados.Atividade);
    ResponderAtividade.belongsTo(dados.Aluno);
  }
}

module.exports = ResponderAtividade;