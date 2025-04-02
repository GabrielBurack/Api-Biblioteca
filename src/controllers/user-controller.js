let {users, locacoes} = require('../data/db');

module.exports = {
    // POST '/bib/user' : cadastrar um usuário (id_user, nome, cpf, email, senha).
    save: (req, res) => {
        try {
            const { nome, cpf, email, senha } = req.body;

            if (typeof nome !== 'string') {
                throw new Error('nome precisa ser uma string.');
            }
            if (typeof cpf !== 'string') {
                throw new Error('cpf precisa ser uma string.');
            }
            if (typeof email !== 'string') {
                throw new Error('email precisa ser uma string.');
            }
            if (typeof senha !== 'string') {
                throw new Error('senha precisa ser uma string.');
            }

            const novoUser = {
                id: Math.floor(Math.random() * 9999),
                nome,
                cpf,
                email,
                senha
            };

            users.push(novoUser);
            res.status(201).json(novoUser);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    // GET '/bib/user' : listar usuários (formato JSON)
    show: (req, res) => {
        res.status(200).json(users)
    },
    
    showById: (req, res) => {
        const { id } = req.params

        try {
            const user = users.find(us => us.id === + id)

            if (!user) {
                throw new Error('Usuario não encontrado.');
            }

            res.status(200).json(user)

        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    // PUT '/bib/user/:id' : alterar um usuário dado um id.
    update: (req, res) => {
        const {id} = req.params
        const { nome, cpf, email, senha } = req.body

        try {
            const userIndex = users.findIndex(us => us.id === + id)

            if (userIndex === -1) {
                throw new Error('Usuario não encontrado.');
            }
            if (typeof nome === 'string') {
                users[userIndex].nome = nome
            }
            if (typeof cpf === 'string') {
                users[userIndex].cpf = cpf
            }
            if (typeof email === 'string') {
                users[userIndex].email = email
            }
            if (typeof senha === 'string') {
                users[userIndex].senha = senha
            }

            res.status(201).json(users[userIndex])

        } catch (error) {
            res.status(400).json({ message: error.message });
        }

    },

    // DELETE '/bib/user/:id' : remover um usuário dado um id (e todas as locações associadas).
    delete: (req, res) => {
        const {id} = req.params;

        try {
            const userIndex = users.findIndex(li => li.id === + id)
            if (userIndex === -1) {
                throw new Error('usuario não encontrado.');
            }

            locacoes = locacoes.filter(loc => loc.id_user !== +id);

            users.splice(userIndex, 1)

            res.status(200).json({ message: "usuario e locações associadas removidos com sucesso." });

        } catch (error) {
              res.status(400).json({ message: error.message });
        }
    }
}