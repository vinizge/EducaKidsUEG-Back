const Midia = require('../models/midias');
const Professor = require('../models/professores')
/**
 * TODO: Ajustar apos
 */
class MidiaController {
  async store(req, res) {
    req.body.ProfessorId = req.user.id;
    if (req.body.nome && req.body.ProfessorId && req.body.link) {
      if (req.body.id) {
        try {
          const busca = await Midia.findByPk(req.body.id)
          if (busca) {
            await Midia.update(req.body, { where: { id: busca.id } });
            return res.json(busca);
          } else {
            return res.json({ message: "Midia não existe" });
          }
        } catch (error) {
          return res.json({ message: "Não foi possível realizar a operação" });
        }
      } else {
        const midia = await Midia.create(req.body);
        return res.json(midia);
      }
    } else {
      return res.json({ message: "Dados Incompletos" });
    }
  }

  async index(req, res) {
    const midias = await Midia.findAll();
    return res.json(midias);
  }

  async getMidia(req, res) {
    try {
      const achou = await Midia.findByPk(req.body.id, {
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
      return res.json({ message: "Midia não encontrado" });

    } catch (error) {
      return res.json({ message: "Não foi possível realizar a operação" });
    }
  }

  async deleteMidia(req, res) {
    try {
      const achou = await Midia.findByPk(req.body.id);
      if (achou) {
        await achou.destroy();
        return res.json({ message: "Midia Deletado!" });
      }
      return res.json({ message: "Midia não encontrado" });

    } catch (error) {
      return res.json({ message: "Não foi possível realizar a operação" });
    }
  }
}

module.exports = new MidiaController();