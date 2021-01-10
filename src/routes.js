const { login } = require("./app/controllers/auth");
const { Router } = require('express');

const routes = new Router();

const usuarioController = require('./app/controllers/usuarioController');
const escolaController = require('./app/controllers/escolaController');
const professorController = require('./app/controllers/professorController');
const alunoController = require("./app/controllers/alunoController");
const disciplinaController = require("./app/controllers/disciplinaController");
const turmaController = require("./app/controllers/turmaController");

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

/**
 * Alunos
 */
routes.post('/alunos/save', alunoController.store);
routes.post('/alunos/get', alunoController.getAluno);
routes.get('/alunos/getAll', alunoController.index);
routes.post('/alunos/delete', alunoController.deleteAluno);

/**
 * Disciplinas
 */
routes.post('/disciplinas/save', disciplinaController.store);
routes.post('/disciplinas/get', disciplinaController.getDisciplina);
routes.get('/disciplinas/getAll', disciplinaController.index);
routes.post('/disciplinas/delete', disciplinaController.deleteDisciplina);

/**
 * Turmas
 */
routes.post('/turmas/save', turmaController.store);
routes.post('/turmas/get', turmaController.getTurma);
routes.get('/turmas/getAll', turmaController.index);
routes.post('/turmas/delete', turmaController.deleteTurma);

routes.get('/', (req, res) => {
  res.json({ message: 'Olá Mundo!' });
});

module.exports = routes;