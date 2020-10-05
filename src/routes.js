const { login } = require("./app/controllers/auth");
const { Router } = require('express');

const routes = new Router();

const usuarioController = require('./app/controllers/usuarioController');

routes.post('/login', login);
routes.post('/usuario/save', usuarioController.store);
routes.post('/usuario/get', usuarioController.getUsuario);
routes.get('/usuario/getAll', usuarioController.index);
routes.post('/usuario/delete', usuarioController.deleteUsuario);

routes.get('/', (req, res) => {
  res.json({ message: 'Olá Mundo!' });
});

module.exports = routes;