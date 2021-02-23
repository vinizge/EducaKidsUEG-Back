const Aluno = require('../models/alunos');
const { options } = require('../models/atividades');
const Atividade = require('../models/atividades');
const Midia = require('../models/midias');
const Pergunta = require('../models/perguntas');
const Professor = require('../models/professores');
const ResponderAtividade = require('../models/responderAtividades');
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
      const aluno = await Aluno.findByPk(req.user.id, {
        include: {
          model: Turma
        }
      });
      let turmaId = aluno.getDataValue("Turmas")[0].dataValues.id;
      const atividades = await Atividade.findAll({
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
      });
      let lista = new Array();
      for (const atividade of atividades) {
        if (atividade.Turmas[0].id == turmaId) {
          lista.push(atividade);
        }
      }
      const respondidas = await ResponderAtividade.findAll();
      let listaFinal = lista;
      for (let i = 0; i < lista.length; i++) {
        for (let j = 0; j < respondidas.length; j++) {
          if (lista[i].id == respondidas[j].dataValues.AtividadeId) {
            listaFinal.splice([i, 1]);
          }
        }
      }
      return res.json(listaFinal);
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