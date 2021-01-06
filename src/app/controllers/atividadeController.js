const Atividade = require('../models/atividades');
/**
 * TODO: Ajustar apos
 */
class AtividadeController {
  async store(req, res) {
    if (req.body.nome && req.body.ProfessorId) {
      if (req.body.id) {
        try {
          const busca = await Atividade.findByPk(req.body.id)
          if (busca) {
            await Atividade.update(req.body, { where: { id: busca.id } });
            return res.json(busca);
          } else {
            return res.json({ message: "Atividade não existe" });
          }
        } catch (error) {
          return res.json({ message: "Não foi possível realizar a operação" });
        }
      } else {
        const atividade = await Atividade.create(req.body);
        return res.json(atividade);
      }
    } else {
      return res.json({ message: "Dados Incompletos" });
    }
  }

  async index(req, res) {
    const atividades = await Atividade.findAll();
    return res.json(atividades);
  }

  async getAtividade(req, res) {
    try {
      const achou = await Atividade.findByPk(req.body.id)
      if (achou) {
        return res.json(achou);
      }
      return res.json({ message: "Atividade não encontrado" });

    } catch (error) {
      return res.json({ message: "Não foi possível realizar a operação" });
    }
  }

  async deleteAtividade(req, res) {
    try {
      const achou = await Atividade.findByPk(req.body.id);
      if (achou) {
        await achou.destroy();
        return res.json({ message: "Atividade Deletado!" });
      }
      return res.json({ message: "Atividade não encontrado" });

    } catch (error) {
      return res.json({ message: "Não foi possível realizar a operação" });
    }
  }
}

module.exports = new AtividadeController();