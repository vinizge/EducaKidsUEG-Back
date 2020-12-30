const Escola = require('../models/escolas');
const Aluno = require('../models/alunos');

class AlunoController {
  async store(req, res) {
    if (req.body.nome && req.body.email && req.body.senha && req.body.EscolaId) {
      req.body.role = 'aluno';
      req.body.email = req.body.email.toLowerCase();
      if (req.body.id) {
        try {
          const busca = await Aluno.findByPk(req.body.id)
          if (busca.nome && busca.email && busca.senha) {
            await Aluno.update(req.body, { where: { id: busca.id } });
            delete busca.senha;
            return res.json(busca);
          } else {
            return res.json({ message: "Aluno não existe" });
          }
        } catch (error) {
          return res.json({ message: "Não foi possível realizar a operação" });
        }
      } else {
        const aluno = await Aluno.create(req.body);
        return res.json(aluno);
      }
    } else {
      return res.json({ message: "Dados Incompletos" });
    }
  }

  async index(req, res) {
    const alunos = await Aluno.findAll({
      include: [
        {
          model: Escola
        }
      ]
    });
    alunos.forEach(aluno => {
      delete aluno.dataValues.senha;
    })
    return res.json(alunos);
  }

  async getAluno(req, res) {
    try {
      const achou = await Aluno.findByPk(req.body.id)
      if (achou) {
        delete achou.dataValues.senha;
        return res.json(achou);
      }
      return res.json({ message: "Aluno não encontrado" });

    } catch (error) {
      return res.json({ message: "Não foi possível realizar a operação" });
    }
  }

  async deleteAluno(req, res) {
    try {
      const achou = await Aluno.findByPk(req.body.id);
      if (achou) {
        await achou.destroy();
        return res.json({ message: "Aluno Deletado!" });
      }
      return res.json({ message: "Aluno não encontrado" });

    } catch (error) {
      return res.json({ message: "Não foi possível realizar a operação" });
    }
  }
}

module.exports = new AlunoController();