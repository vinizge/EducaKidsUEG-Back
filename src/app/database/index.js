const Sequelize = require('sequelize');

const Usuario = require('../models/usuarios');

const databaseConfig = require('../../config/database');
const Escola = require('../models/escolas');

const models = [Usuario, Escola];

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