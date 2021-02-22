const Pergunta = require('../models/perguntas');
const Professor = require('../models/professores');
/**
 * TODO: Ajustar apos
 */
class PerguntaController {
  async store(req, res) {
    req.body.ProfessorId = req.user.id;
    if (req.body.pergunta && req.body.ProfessorId && 'objetiva' in req.body && req.user && req.user.role == "professor") {
      if (req.body.objetiva && (!req.body.opcao1 || !req.body.opcao2 || !req.body.opcao3 || !req.body.opcao4 || !req.body.gabarito)) {
        return res.json({ message: "Dados Incompletos, pergunta objetiva sem alternativas ou gabarito" });
      } else {
        if (req.body.id) {
          try {
            const busca = await Pergunta.findByPk(req.body.id)
            if (busca) {
              await Pergunta.update(req.body, { where: { id: busca.id } });
              const pergunta = await Pergunta.findByPk(busca.id);
              return res.json(pergunta);
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
      }
    } else {
      return res.json({ message: "Dados Incompletos" });
    }
  }

  async index(req, res) {
    const perguntas = await Pergunta.findAll({ where: { ProfessorId: req.user.id } });
    return res.json(perguntas);
  }

  async getPergunta(req, res) {
    try {
      const achou = await Pergunta.findByPk(req.body.id, {
        include: {
          model: Professor,
          attributes: { exclude: ["senha"] }
        }, attributes: {
          exclude: ["ProfessorId"]
        }
      })
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

  async salvarImagem(req, res) {
    // const pergunta = await Pergunta.findByPk(req.params.id);


    console.log(req.files)
    console.log(req.body)
    return res.json({ message: "Topper" });
  }

}

module.exports = new PerguntaController();