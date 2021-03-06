const ResponderAtividade = require('../models/responderAtividades');
const Atividade = require('../models/atividades');
const Pergunta = require('../models/perguntas');
const Aluno = require('../models/alunos');
const Midia = require('../models/midias');
/**
 * TODO: Ajustar apos
 */
class ResponderAtividadeController {
  async store(req, res) {
    if (req.body.AtividadeId && req.body.AlunoId && (req.body.Midia.length || req.body.Pergunta.length)) {
      if (req.body.id) {
        try {
          for (const pergunta of req.body.Pergunta) {
            if (!pergunta.pergunta.objetiva) {
              if (pergunta.correcao) {
                pergunta.nota = pergunta.pergunta.pontuacao;
              } else {
                pergunta.nota = 0;
              }
            }
            const busca = await ResponderAtividade.findByPk(pergunta.id)
            if (busca) {
              await ResponderAtividade.update(pergunta, { where: { id: busca.dataValues.id } });
            } else {
              return res.json({ message: "ResponderAtividade não existe" });
            }
          }
          return res.json({ message: "Perguntas respondidas com sucesso!" });
        } catch (error) {
          return res.json({ message: "Não foi possível realizar a operação" });
        }
      } else {
        try {
          const atividade = await Atividade.findByPk(req.body.AtividadeId);
          let perguntas = req.body.Pergunta;
          for (let i = 0; i < perguntas.length; i++) {
            const busca = await Pergunta.findByPk(perguntas[i].idPergunta);
            if (busca.dataValues.objetiva && (busca.dataValues.gabarito == perguntas[i].resposta)) {
              perguntas[i].nota = busca.dataValues.pontuacao;
            } else {
              perguntas[i].nota = 0;
            }
            let salvando = await ResponderAtividade.create(perguntas[i]);
          }
          return res.json({ message: "Perguntas respondidas com sucesso!" });
        } catch (error) {
          return res.json({ error, message: "Não foi possível realizar a operação" });
        }
      }
    } else {
      return res.json({ message: "Dados Incompletos" });
    }
  }

  async index(req, res) {
    const responderAtividades = await ResponderAtividade.findAll();
    return res.json(responderAtividades);
  }

  async getAllByAtividade(req, res) {
    let id = req.body.atividadeId
    const responderAtividades = await ResponderAtividade.findAll({
      where: {
        atividade_id: id
      }, include: [
        {
          model: Aluno,
          attributes: ["id", 'nome']
        }
      ]
    });

    for (let i = 0; i < responderAtividades.length; i++) {
      if (responderAtividades[i].dataValues.idPergunta) {
        let pergunta = await Pergunta.findByPk(responderAtividades[i].idPergunta);
        responderAtividades[i].dataValues.pergunta = pergunta;
      } else if (responderAtividades[i].dataValues.idMidia) {
        let midia = await Midia.findByPk(responderAtividades[i].idMidia);
        responderAtividades[i].dataValues.midia = midia;
      }

    }
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