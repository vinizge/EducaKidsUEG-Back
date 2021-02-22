const Sequelize = require('sequelize');

class Pergunta extends Sequelize.Model {
  static init(sequelize) {
    super.init({
      pergunta: Sequelize.STRING,
      opcao1: Sequelize.STRING,
      opcao2: Sequelize.STRING,
      opcao3: Sequelize.STRING,
      opcao4: Sequelize.STRING,
      objetiva: Sequelize.BOOLEAN,
      gabarito: Sequelize.STRING,
      pontuacao: Sequelize.FLOAT,
      arquivo: Sequelize.STRING
    }, {
      sequelize,
      freezeTableName: true
    });
    return this;
  }

  static associate(dados) {
    Pergunta.belongsTo(dados.Professor);
    Pergunta.belongsToMany(dados.Atividade, { through: 'perguntaAtividade' });
  }
}

module.exports = Pergunta;