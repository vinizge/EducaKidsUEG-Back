const Turma = require('../models/turmas');
const Escola = require('../models/escolas');
const Professor = require('../models/professores');
class TurmaController {
  async store(req, res) {

    if (req.body.nome && req.body.ProfessorId && req.body.EscolaId) {
      const { ...data } = req.body;
      if (req.body.id) {
        try {
          const busca = await Turma.findByPk(data.id);
          if (busca) {
            let turma = await Turma.update(data, { where: { id: busca.id } });
            turma = await Turma.findByPk(data.id);
            return res.json(turma);
          } else {
            return res.json({ message: "Turma não existe" });
          }
        } catch (error) {
          return res.json({ message: "Não foi possível realizar a operação" });
        }
      } else {
        let turma = await Turma.create(data);
        return res.json(turma);
      }
    } else {
      return res.json({ message: "Dados Incompletos" });
    }
  }

  async index(req, res) {
    const turmas = await Turma.findAll({
      include: [
        {
          model: Escola,
        }, {
          model: Professor,
          attributes: { exclude: ["senha"] }
        }]
    });
    return res.json(turmas);
  }

  async getTurmasByProfessor(req, res) {
    let user = req.user.id
    const turmas = await Turma.findAll({
      include: {
        model: Professor,
        where: {
          id: user
        }
      }
    });
    return res.json(turmas);
  }

  async getTurma(req, res) {
    try {
      const achou = await Turma.findByPk(req.body.id, {
        include: [
          {
            model: Escola,
          }, {
            model: Professor,
            attributes: { exclude: ["senha"] }
          }]
      });
      if (achou) {
        return res.json(achou);
      }
      return res.json({ message: "Turma não encontrado" });

    } catch (error) {
      return res.json({ message: "Não foi possível realizar a operação" });
    }
  }

  async deleteTurma(req, res) {
    try {
      const achou = await Turma.findByPk(req.body.id);
      if (achou) {
        await achou.destroy();
        return res.json({ message: "Turma Deletado!" });
      }
      return res.json({ message: "Turma não encontrado" });

    } catch (error) {
      return res.json({ message: "Não foi possível realizar a operação" });
    }
  }
}

module.exports = new TurmaController();