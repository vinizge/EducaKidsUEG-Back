const Sequelize = require('sequelize');

class ResponderAtividade extends Sequelize.Model {
  static init(sequelize) {
    super.init({
      idPergunta: Sequelize.INTEGER,
      idMidia: Sequelize.INTEGER,
      nota: Sequelize.FLOAT,
      correcao: Sequelize.BOOLEAN,
      resposta: Sequelize.STRING,
      arquivo: Sequelize.STRING
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