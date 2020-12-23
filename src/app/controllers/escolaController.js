const Escola = require('../models/escolas');

class EscolaController {
  async store(req, res) {
    if (req.body.nome && req.body.endereco && req.body.telefone) {
      if (req.body.id) {
        try {
          const user = await Escola.findByPk(req.body.id)
          if (user.nome && user.email && user.senha) {
            await Escola.update(req.body, { where: { id: user.id } });
            delete user.senha;
            return res.json(user);
          } else {
            return res.json({ message: "Escola não existe" });
          }
        } catch (error) {
          return res.json({ message: "Não foi possível realizar a operação" });
        }
      } else {
        const escola = await Escola.create(req.body);
        return res.json(escola);
      }
    } else {
      return res.json({ message: "Dados Incompletos" });
    }
  }

  async index(req, res) {
    const escolas = await Escola.findAll();
    escolas.forEach(escola => {
      delete escola.dataValues.senha;
    })
    return res.json(escolas);
  }

  async getEscola(req, res) {
    console.log(req.body)
    try {
      const achou = await Escola.findByPk(req.body.id)
      if (achou) {
        delete achou.dataValues.senha;
        console.log(achou)
        return res.json(achou);
      }
      return res.json({ message: "Escola não encontrado" });

    } catch (error) {
      return res.json({ message: "Não foi possível realizar a operação" });
    }
  }

  async deleteEscola(req, res) {
    console.log(req.body)
    try {
      const achou = await Escola.findByPk(req.body.id);
      console.log(achou)
      if (achou) {
        await achou.destroy();
        return res.json({ message: "Escola Deletado!" });
      }
      return res.json({ message: "Escola não encontrado" });

    } catch (error) {
      return res.json({ message: "Não foi possível realizar a operação" });
    }
  }
}

module.exports = new EscolaController();