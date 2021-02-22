const crypto = require('crypto');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/usuarios');
const Professor = require('../models/professores');
const Aluno = require('../models/alunos');

exports.login = asyncHandler(async (req, res, next) => {
  const { email, senha } = req.body;

  //Validate email & senha
  if (!email || !senha) {
    return next(new ErrorResponse('Por favor forneça um email e uma senha', 400));
  }

  //Check for user
  let user = await Aluno.findOne({ where: { email } });
  if (!user) {
    user = await Professor.findOne({ where: { email } });
  }
  if (!user) {
    return next(new ErrorResponse('Dados inválidos', 401));
  }

  //Check if password matches
  const isMatch = await user.checkPassword(senha);

  if (!isMatch) {
    return next(new ErrorResponse('Dados inválidos', 401));
  }

  sendTokenResponse(user, 200, res);
});

exports.getMe = asyncHandler(async (req, res, next) => {
  let user = await Aluno.findByPk(req.user.id, {
    attributes: { exclude: ["senha"] }
  });
  if (!user) {
    user = await Professor.findByPk(req.user.id, {
      attributes: { exclude: ["senha"] }
    });
  }
  res.status(200).json({ success: true, data: user });
});

//Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  //Create token
  const token = user.getSignedJwtToken(user.id);

  const options = {
    httpOnly: true,
  };

  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    role: user.role, token
  });

}
