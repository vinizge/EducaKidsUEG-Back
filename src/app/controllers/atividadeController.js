const { options } = require('../models/atividades');
const Atividade = require('../models/atividades');
const Midia = require('../models/midias');
const Pergunta = require('../models/perguntas');
const Professor = require('../models/professores');
const Turma = require('../models/turmas');
class AtividadeController {
  async store(req, res) {
    const { perguntaAtividade, midiaAtividade, TurmaId, ...data } = req.body;
    if (req.body.nome && req.body.ProfessorId) {
      if (req.body.id) {
        try {
          const busca = await Atividade.findByPk(data.id)
          if (busca) {
            let atividade = await Atividade.update(data, { where: { id: busca.id } });
            atividade = await Atividade.findByPk(data.id);
            atividade.setPergunta(perguntaAtividade);
            atividade.setMidia(midiaAtividade);
            atividade.setTurmas(TurmaId);
            return res.json(busca);
          } else {
            return res.json({ message: "Atividade não existe" });
          }
        } catch (error) {
          return res.json({ message: "Não foi possível realizar a operação" });
        }
      } else {
        let atividade = await Atividade.create(req.body);
        atividade.setPergunta(perguntaAtividade);
        atividade.setMidia(midiaAtividade);
        atividade.setTurmas(TurmaId);
        return res.json(atividade);
      }
    } else {
      return res.json({ message: "Dados Incompletos" });
    }
  }

  async index(req, res) {
    if (req.user.role == "professor") {
      const atividades = await Atividade.findAll({
        where: { ProfessorId: req.user.id }, include:
          [
            {
              model: Professor,
              attributes: { exclude: ["senha"] }
            }, {
              model: Midia
            }, {
              model: Pergunta
            }, {
              model: Turma
            }]
      });
      return res.json(atividades);
    } else if (req.user.role == "aluno") {

    }

  }

  async getAtividade(req, res) {
    try {
      const achou = await Atividade.findByPk(req.body.id, {
        include:
          [
            {
              model: Professor,
              attributes: { exclude: ["senha"] }
            }, {
              model: Midia
            }, {
              model: Pergunta
            }, {
              model: Turma
            }]
      })
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