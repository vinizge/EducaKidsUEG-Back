const Usuario = require('../models/usuarios');

class UsuarioController {
  async store(req, res) {
    if (req.body.nome && req.body.email && req.body.senha && req.body.EscolaId) {
      if (req.body.id) {
        try {
          const user = await Usuario.findByPk(req.body.id)
          if (user.nome && user.email && user.senha) {
            await Usuario.update(req.body, { where: { id: user.id } });
            delete user.senha;
            return res.json(user);
          } else {
            return res.json({ message: "Usuário não existe" });
          }
        } catch (error) {
          return res.json({ message: "Não foi possível realizar a operação" });
        }
      } else {
        const usuario = await Usuario.create(req.body);
        return res.json(usuario);
      }
    } else {
      return res.json({ message: "Dados Incompletos" });
    }
  }

  async index(req, res) {
    const usuarios = await Usuario.findAll();
    usuarios.forEach(usuario => {
      delete usuario.dataValues.senha;
    })
    return res.json(usuarios);
  }

  async getUsuario(req, res) {
    try {
      const achou = await Usuario.findByPk(req.body.id)
      if (achou) {
        delete achou.dataValues.senha;
        return res.json(achou);
      }
      return res.json({ message: "Usuário não encontrado" });

    } catch (error) {
      return res.json({ message: "Não foi possível realizar a operação" });
    }
  }

  async deleteUsuario(req, res) {
    try {
      const achou = await Usuario.findByPk(req.body.id);
      if (achou) {
        await achou.destroy();
        return res.json({ message: "Usuário Deletado!" });
      }
      return res.json({ message: "Usuário não encontrado" });

    } catch (error) {
      return res.json({ message: "Não foi possível realizar a operação" });
    }
  }
}

module.exports = new UsuarioController();