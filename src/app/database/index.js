const Sequelize = require('sequelize');

const Usuario = require('../models/usuarios');
const Escola = require('../models/escolas');
const Professor = require('../models/professores');
const Aluno = require('../models/alunos');
const Turma = require('../models/turmas');
const Atividade = require('../models/atividades');
const Pergunta = require('../models/perguntas');
const Midia = require('../models/midias');
const ResponderAtividade = require('../models/responderAtividades');

const databaseConfig = require('../../config/database');




const models = [Usuario, Escola, Professor, Aluno, Turma, Atividade, Pergunta, Midia, ResponderAtividade];

class Database {
  constructor() {
    this.init();
  }

  init() {

    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate(this.connection.models))

    this.connection.sync()

  }
}

module.exports = new Database();