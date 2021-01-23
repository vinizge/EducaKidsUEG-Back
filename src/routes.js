const { login, getMe } = require("./app/controllers/auth");
const { Router } = require('express');
const { protect } = require('./app/middleware/auth');

const routes = new Router();

const usuarioController = require('./app/controllers/usuarioController');
const escolaController = require('./app/controllers/escolaController');
const professorController = require('./app/controllers/professorController');
const alunoController = require("./app/controllers/alunoController");
const disciplinaController = require("./app/controllers/disciplinaController");
const turmaController = require("./app/controllers/turmaController");
const perguntaController = require("./app/controllers/perguntaController");
const midiaController = require("./app/controllers/midiaController");
const atividadeController = require("./app/controllers/atividadeController");

/**
 * Login
 */
routes.post('/login', login);
routes.use(protect);
routes.get('/login/getMe', getMe)

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

/**
 * Perguntas
 */
routes.post('/perguntas/save', perguntaController.store);
routes.post('/perguntas/get', perguntaController.getPergunta);
routes.get('/perguntas/getAll', perguntaController.index);
routes.post('/perguntas/delete', perguntaController.deletePergunta);

/**
 * Midias
 */
routes.post('/midias/save', midiaController.store);
routes.post('/midias/get', midiaController.getMidia);
routes.get('/midias/getAll', midiaController.index);
routes.post('/midias/delete', midiaController.deleteMidia);

/**
 * Midias
 */
routes.post('/atividades/save', atividadeController.store);
routes.post('/atividades/get', atividadeController.getAtividade);
routes.get('/atividades/getAll', atividadeController.index);
routes.post('/atividades/delete', atividadeController.deleteAtividade);

module.exports = routes;