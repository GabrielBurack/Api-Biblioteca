let {users, locacoes, livros} = require('../data/db');

module.exports = {

    // POST '/bib/locar' : cadastrar uma locação (id_user, id_livro, status).
    save: (req, res) => { 
        try {
            const { id_user, id_livro } = req.body;

            const userIndex = users.findIndex(us => us.id === + id_user)
            if (userIndex === -1) {
                throw new Error('Usuario não encontrado.');
            }
            const livroIndex = livros.findIndex(li => li.id === + id_livro)
            if (livroIndex === -1) {
                throw new Error('livro não encontrado.');
            }
            
            const livroLocado = locacoes.find(loc => loc.id_livro === + id_livro && loc.status === "emprestado")
            if(livroLocado){
                throw new Error('Este livro já está locado e não pode ser emprestado no momento.');
            }

            const novaLocacao = {
                id_user: id_user,
                id_livro: id_livro,
                status: "emprestado"
            }

            locacoes.push(novaLocacao)
            res.status(201).json(novaLocacao)

        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    },
    
    // GET '/bib/locar' : listar locações - Listar nome do usuário que locou, nome do livro e status da locação (formato JSON)
    show: (req, res) => {
        
        try {

            const locacoesFiltradas = locacoes.filter(loc => 
                livros.some(li => li.id === loc.id_livro)
            );

            const locacoesListadas = locacoesFiltradas.map( loc => {
                const livro = livros.find(li => li.id === loc.id_livro)
                const user = users.find(us => us.id === loc.id_user)

                let infos = {
                    usuario: user ? user.nome : "Usuário não encontrado",
                    livro: livro ? livro.titulo : "Livro não encontrado",
                    status: loc.status
                }

                return infos;
            })

            res.status(200).json(locacoesListadas)

        } catch (error) {
            res.status(500).json({ message: "Erro ao listar locações." });
        }
    }
}