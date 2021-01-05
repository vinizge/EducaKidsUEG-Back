const ResponderAtividade = require('../models/responderAtividades');
/**
 * TODO: Ajustar apos
 */
class ResponderAtividadeController {
  async store(req, res) {
    if (req.body.nome, req.body.ProfessorId) {
      if (req.body.id) {
        try {
          const busca = await ResponderAtividade.findByPk(req.body.id)
          if (busca) {
            await ResponderAtividade.update(req.body, { where: { id: busca.id } });
            return res.json(busca);
          } else {
            return res.json({ message: "ResponderAtividade não existe" });
          }
        } catch (error) {
          return res.json({ message: "Não foi possível realizar a operação" });
        }
      } else {
        const responderAtividade = await ResponderAtividade.create(req.body);
        return res.json(responderAtividade);
      }
    } else {
      return res.json({ message: "Dados Incompletos" });
    }
  }

  async index(req, res) {
    const responderAtividades = await ResponderAtividade.findAll();
    return res.json(responderAtividades);
  }

  async getResponderAtividade(req, res) {
    try {
      const achou = await ResponderAtividade.findByPk(req.body.id)
      if (achou) {
        return res.json(achou);
      }
      return res.json({ message: "ResponderAtividade não encontrado" });

    } catch (error) {
      return res.json({ message: "Não foi possível realizar a operação" });
    }
  }

  async deleteResponderAtividade(req, res) {
    try {
      const achou = await ResponderAtividade.findByPk(req.body.id);
      if (achou) {
        await achou.destroy();
        return res.json({ message: "ResponderAtividade Deletado!" });
      }
      return res.json({ message: "ResponderAtividade não encontrado" });

    } catch (error) {
      return res.json({ message: "Não foi possível realizar a operação" });
    }
  }
}

module.exports = new ResponderAtividadeController();