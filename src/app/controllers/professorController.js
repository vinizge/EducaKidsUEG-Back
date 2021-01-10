const Escola = require('../models/escolas');
const Professor = require('../models/professores');

class ProfessorController {
  async store(req, res) {
    if (req.body.nome && req.body.email && req.body.EscolaId) {
      req.body.role = 'professor';
      req.body.email = req.body.email.toLowerCase();
      if (req.body.id) {
        try {
          const busca = await Professor.findByPk(req.body.id)
          if (busca.nome && busca.email && busca.senha) {
            await Professor.update(req.body, { where: { id: busca.id } });
            delete busca.senha;
            return res.json(busca);
          } else {
            return res.json({ message: "Professor não existe" });
          }
        } catch (error) {
          return res.json({ message: "Não foi possível realizar a operação" });
        }
      } else {
        if (req.body.senha) {
          const professor = await Professor.create(req.body);
          return res.json(professor);
        } else {
          return res.json({ message: "Dados Incompletos" });
        }
      }
    } else {
      return res.json({ message: "Dados Incompletos" });
    }
  }

  async index(req, res) {
    const professores = await Professor.findAll({
      include: [
        {
          model: Escola
        }
      ]
    });
    professores.forEach(professor => {
      delete professor.dataValues.senha;
    })
    return res.json(professores);
  }

  async getProfessor(req, res) {
    try {
      const achou = await Professor.findByPk(req.body.id);
      if (achou) {
        delete achou.dataValues.senha;
        return res.json(achou);
      }
      return res.json({ message: "Professor não encontrado" });

    } catch (error) {
      return res.json({ message: "Não foi possível realizar a operação" });
    }
  }

  async deleteProfessor(req, res) {
    try {
      const achou = await Professor.findByPk(req.body.id);
      if (achou) {
        await achou.destroy();
        return res.json({ message: "Professor Deletado!" });
      }
      return res.json({ message: "Professor não encontrado" });

    } catch (error) {
      return res.json({ message: "Não foi possível realizar a operação" });
    }
  }
}

module.exports = new ProfessorController();