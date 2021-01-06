const Escola = require('../models/escolas');

class EscolaController {
  async store(req, res) {
    if (req.body.nome && req.body.endereco && req.body.telefone) {
      if (req.body.id) {
        try {
          const escola = await Escola.findByPk(req.body.id)
          if (escola.nome && escola.endereco && escola.telefone) {
            await Escola.update(req.body, { where: { id: escola.id } });
            return res.json(escola);
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
    return res.json(escolas);
  }

  async getEscola(req, res) {
    try {
      const achou = await Escola.findByPk(req.body.id)
      if (achou) {
        return res.json(achou);
      }
      return res.json({ message: "Escola não encontrada" });

    } catch (error) {
      return res.json({ message: "Não foi possível realizar a operação" });
    }
  }

  async deleteEscola(req, res) {
    try {
      const achou = await Escola.findByPk(req.body.id);
      if (achou) {
        await achou.destroy();
        return res.json({ message: "Escola Deletada!" });
      }
      return res.json({ message: "Escola não encontrada" });

    } catch (error) {
      return res.json({ message: "Não foi possível realizar a operação" });
    }
  }
}

module.exports = new EscolaController();