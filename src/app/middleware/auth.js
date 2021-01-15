const jwt = require('jsonwebtoken');
const asyncHandler = require('./async');
const ErrorResponse = require('../utils/errorResponse');
const Professor = require('../models/professores');
const Aluno = require('../models/alunos');

//Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    //Set token from Bearer token in header
    token = req.headers.authorization.split(' ')[1];
  }

  //Set token from cookie
  if (req.cookies.token) {
    token = req.cookies.token;
  }

  //Make sure token exist
  if (!token) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }

  try {
    //Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await Aluno.findByPk(decoded.id);
    if (!req.user) {
      req.user = await Professor.findByPk(decoded.id);
    }
    let user = {
      id: req.user.id,
      nome: req.user.nome,
      email: req.user.email,
      role: req.user.role
    }
    req.user = user;
    next();

  } catch (err) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }
});

//Grant access to specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new ErrorResponse(`User role ${req.user.role} is not authorized to access this route`, 403));
    }
    next();
  }
}