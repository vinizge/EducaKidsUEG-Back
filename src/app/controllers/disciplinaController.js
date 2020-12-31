const Disciplina = require('../models/disciplinas');

class DisciplinaController {
  async store(req, res) {
    if (req.body.nome) {
      if (req.body.id) {
        try {
          const busca = await Disciplina.findByPk(req.body.id)
          if (busca) {
            await Disciplina.update(req.body, { where: { id: busca.id } });
            return res.json(busca);
          } else {
            return res.json({ message: "Disciplina não existe" });
          }
        } catch (error) {
          return res.json({ message: "Não foi possível realizar a operação" });
        }
      } else {
        const disciplina = await Disciplina.create(req.body);
        return res.json(disciplina);
      }
    } else {
      return res.json({ message: "Dados Incompletos" });
    }
  }

  async index(req, res) {
    const disciplinas = await Disciplina.findAll();
    return res.json(disciplinas);
  }

  async getDisciplina(req, res) {
    try {
      const achou = await Disciplina.findByPk(req.body.id)
      if (achou) {
        return res.json(achou);
      }
      return res.json({ message: "Disciplina não encontrado" });

    } catch (error) {
      return res.json({ message: "Não foi possível realizar a operação" });
    }
  }

  async deleteDisciplina(req, res) {
    try {
      const achou = await Disciplina.findByPk(req.body.id);
      if (achou) {
        await achou.destroy();
        return res.json({ message: "Disciplina Deletado!" });
      }
      return res.json({ message: "Disciplina não encontrado" });

    } catch (error) {
      return res.json({ message: "Não foi possível realizar a operação" });
    }
  }
}

module.exports = new DisciplinaController();