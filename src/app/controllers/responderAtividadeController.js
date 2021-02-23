const ResponderAtividade = require('../models/responderAtividades');
const Atividade = require('../models/atividades');
const Pergunta = require('../models/perguntas');
/**
 * TODO: Ajustar apos
 */
class ResponderAtividadeController {
  async store(req, res) {
    if (req.body.AtividadeId && req.body.AlunoId && (req.body.Midia.length || req.body.Pergunta.length)) {
      if (req.body.id) {
        try {
          for (const pergunta of req.body.Pergunta) {
            const busca = await ResponderAtividade.findByPk(pergunta.id)
            if (busca) {
              await ResponderAtividade.update(pergunta, { where: { id: busca.id } });
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
          if (atividade.dataValues.prazo != null && atividade.dataValues.prazo < new Date().now()) {
            return res.json({ message: "Fora do prazo" });
          }
          for (const pergunta of req.body.Pergunta) {
            const busca = await Pergunta.findByPk(pergunta.idPergunta);
            if (busca.dataValues.objetiva && (busca.dataValues.gabarito == pergunta.resposta)) {
              pergunta.nota = busca.dataValues.pontuacao;
            }
            await ResponderAtividade.create(pergunta);
          }
          return res.json({ message: "Perguntas respondidas com sucesso!" });
        } catch (error) {
          return res.json({ message: "Não foi possível realizar a operação" });
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