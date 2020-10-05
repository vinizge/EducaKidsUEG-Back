const crypto = require('crypto');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/usuarios');

exports.login = asyncHandler(async (req, res, next) => {
  const { email, senha } = req.body;

  //Validate email & senha
  if (!email || !senha) {
    return next(new ErrorResponse('Por favor forneça um email e uma senha', 400));
  }

  //Check for user
  const user = await User.findOne({ where: { email } });
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

//Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  //Create token
  const token = user.getSignedJwtToken(user.id);

  res.status(statusCode).cookie('token', token).json({ success: true, token });

}
