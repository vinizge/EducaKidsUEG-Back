const { login, getMe } = require("./app/controllers/auth");
const { Router } = require('express');
const { protect } = require('./app/middleware/auth');

const routes = new Router();

const usuarioController = require('./app/controllers/usuarioController');
const escolaController = require('./app/controllers/escolaController');
const professorController = require('./app/controllers/professorController');
const alunoController = require("./app/controllers/alunoController");
const turmaController = require("./app/controllers/turmaController");
const perguntaController = require("./app/controllers/perguntaController");
const midiaController = require("./app/controllers/midiaController");
const atividadeController = require("./app/controllers/atividadeController");
const responderAtividadeController = require("./app/controllers/responderAtividadeController");

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
routes.get('/escolas/getEscolaByProfessor', escolaController.getEscolaByProfessor);
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
 * Turmas
 */
routes.post('/turmas/save', turmaController.store);
routes.post('/turmas/get', turmaController.getTurma);
routes.get('/turmas/getAll', turmaController.index);
routes.post('/turmas/delete', turmaController.deleteTurma);
routes.get('/turmas/getAllByProfessor', turmaController.getTurmasByProfessor);

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
 * Atividades
 */
routes.post('/atividades/save', atividadeController.store);
routes.post('/atividades/get', atividadeController.getAtividade);
routes.get('/atividades/getAll', atividadeController.index);
routes.post('/atividades/delete', atividadeController.deleteAtividade);

/**
 * Responder atividades
 */
routes.post('/responderAtividades/save', responderAtividadeController.store);
routes.post('/responderAtividades/get', responderAtividadeController.getResponderAtividade);
routes.post('/responderAtividades/getAllbyAtividade', responderAtividadeController.getAllByAtividade);
routes.get('/responderAtividades/getAll', responderAtividadeController.index);
routes.post('/responderAtividades/delete', responderAtividadeController.deleteResponderAtividade);

module.exports = routes;