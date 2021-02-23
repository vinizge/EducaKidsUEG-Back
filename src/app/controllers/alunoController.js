const Escola = require('../models/escolas');
const Aluno = require('../models/alunos');
const Turma = require('../models/turmas');

class AlunoController {
  async store(req, res) {
    if (req.body.nome && req.body.email && req.body.EscolaId && req.body.turma) {
      req.body.role = 'aluno';
      req.body.email = req.body.email.toLowerCase();
      if (req.body.id) {
        try {
          const busca = await Aluno.findByPk(req.body.id)
          if (busca.nome && busca.email && busca.senha) {
            await Aluno.update(req.body, { where: { id: busca.id } });
            await busca.setTurmas(req.body.turma);
            delete busca.senha;
            return res.json(busca);
          } else {
            return res.json({ message: "Aluno não existe" });
          }
        } catch (error) {
          return res.json({ message: "Não foi possível realizar a operação" });
        }
      } else {
        if (req.body.senha) {
          try {
            const aluno = await Aluno.create(req.body);
            const busca = await Aluno.findByPk(aluno.dataValues.id);
            busca.setTurmas(req.body.turma)
            return res.json(aluno);
          } catch (error) {
            return res.json({ message: "Não foi possível realizar a operação" });
          }
        } else {
          return res.json({ message: "Dados Incompletos" });
        }
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
        },
        {
          model: Turma
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
      const achou = await Aluno.findByPk(req.body.id, {
        include: [
          {
            model: Escola
          },
          {
            model: Turma
          }
        ]
      })
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