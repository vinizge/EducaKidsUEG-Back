const { login } = require("./app/controllers/auth");
const { Router } = require('express');

const routes = new Router();

const usuarioController = require('./app/controllers/usuarioController');
const escolaController = require('./app/controllers/escolaController');
const professorController = require('./app/controllers/professorController');

/**
 * Login
 */
routes.post('/login', login);
routes.post('/usuarios/save', usuarioController.store);
routes.post('/usuarios/get', usuarioController.getUsuario);
routes.get('/usuarios/getAll', usuarioController.index);
routes.post('/usuarios/delete', usuarioController.deleteUsuario);

/**
 * Escolas
 */
routes.post('/escolas/save', escolaController.store);
routes.post('/escolas/get', escolaController.getEscola);
routes.get('/escolas/getAll', escolaController.index);
routes.post('/escolas/delete', escolaController.deleteEscola);

/**
 * Professores
 */
routes.post('/professores/save', professorController.store);
routes.post('/professores/get', professorController.getProfessor);
routes.get('/professores/getAll', professorController.index);
routes.post('/professores/delete', professorController.deleteProfessor);

routes.get('/', (req, res) => {
  res.json({ message: 'Olá Mundo!' });
});

module.exports = routes;