let { livros, locacoes } = require('../data/db');


module.exports = {

    //     POST '/bib/livro' : cadastrar um livro (id_livro, título, isbn, edição, ano).
    save: (req, res) => {
        try {
            const { titulo, isbn, edicao, ano } = req.body;

            if (typeof titulo !== 'string') {
                throw new Error('titulo precisa ser uma string.');
            }
            if (typeof isbn !== 'string') {
                throw new Error('isbn precisa ser uma string.');
            }
            if (typeof edicao !== 'string') {
                throw new Error('edicao precisa ser uma string.');
            }
            if (typeof ano !== 'number') {
                throw new Error('O ano precisa ser um número.');
            }

            const novoLivro = {
                id: Math.floor(Math.random() * 9999),
                titulo,
                isbn,
                edicao,
                ano
            };

            livros.push(novoLivro);
            res.status(201).json(novoLivro);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    //     GET '/bib/livro' : listar livros (formato JSON)
    show: (req, res) => {
        res.status(200).json(livros)
    },

    //     GET '/bib/livro/:id' : listar um livro dado um id (formato JSON)
    showById: (req, res) => {
        const { id } = req.params

        try {
            const livro = livros.find(li => li.id === + id)

            if (!livro) {
                throw new Error('Livro não encontrado.');
            }

            res.status(200).json(livro)

        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    //     PUT '/bib/livro/:id' : alterar um livro dado um id.
    update: (req, res) => {
        const { id, } = req.params
        const { titulo, isbn, edicao, ano } = req.body

        try {
            const livroIndex = livros.findIndex(li => li.id === + id)

            if (livroIndex === -1) {
                throw new Error('Livro não encontrado.');
            }
            if (typeof titulo === 'string') {
                livros[livroIndex].titulo = titulo
            }
            if (typeof isbn === 'string') {
                livros[livroIndex].isbn = isbn
            }
            if (typeof edicao === 'string') {
                livros[livroIndex].edicao = edicao
            }
            if (typeof ano === 'string') {
                livros[livroIndex].ano = ano
            }

            res.status(201).json(livros[livroIndex])

        } catch (error) {
            res.status(400).json({ message: error.message });
        }

    },

    //     DELETE '/bib/livro/:id' : remover um livro dado um id (e todas as locações associadas).
    delete: (req, res) => {
        const {id} = req.params;

        try {
            const livroIndex = livros.findIndex(li => li.id === + id)
            if (livroIndex === -1) {
                throw new Error('Livro não encontrado.');
            }

            locacoes = locacoes.filter(loc => loc.id_livro !== +id);

            livros.splice(livroIndex, 1)

            res.status(200).json({ message: "Livro e locações associadas removidos com sucesso." });

        } catch (error) {
              res.status(400).json({ message: error.message });
        }
    }
}