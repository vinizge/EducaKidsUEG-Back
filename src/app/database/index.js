const Sequelize = require('sequelize');

const Usuario = require('../models/usuarios');

const databaseConfig = require('../../config/database');

const models = [Usuario];

class Database {
  constructor() {
    this.init();
  }

  init() {

    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models))
  }
}

module.exports = new Database();