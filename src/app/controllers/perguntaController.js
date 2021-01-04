const Pergunta = require('../models/perguntas');
/**
 * TODO: Ajustar apos
 */
class PerguntaController {
  async store(req, res) {
    if (req.body.nome, req.body.ProfessorId) {
      if (req.body.id) {
        try {
          const busca = await Pergunta.findByPk(req.body.id)
          if (busca) {
            await Pergunta.update(req.body, { where: { id: busca.id } });
            return res.json(busca);
          } else {
            return res.json({ message: "Pergunta não existe" });
          }
        } catch (error) {
          return res.json({ message: "Não foi possível realizar a operação" });
        }
      } else {
        const pergunta = await Pergunta.create(req.body);
        return res.json(pergunta);
      }
    } else {
      return res.json({ message: "Dados Incompletos" });
    }
  }

  async index(req, res) {
    const perguntas = await Pergunta.findAll();
    return res.json(perguntas);
  }

  async getPergunta(req, res) {
    try {
      const achou = await Pergunta.findByPk(req.body.id)
      if (achou) {
        return res.json(achou);
      }
      return res.json({ message: "Pergunta não encontrado" });

    } catch (error) {
      return res.json({ message: "Não foi possível realizar a operação" });
    }
  }

  async deletePergunta(req, res) {
    try {
      const achou = await Pergunta.findByPk(req.body.id);
      if (achou) {
        await achou.destroy();
        return res.json({ message: "Pergunta Deletado!" });
      }
      return res.json({ message: "Pergunta não encontrado" });

    } catch (error) {
      return res.json({ message: "Não foi possível realizar a operação" });
    }
  }
}

module.exports = new PerguntaController();