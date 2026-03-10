//importando o service
import { ObjectId } from "mongodb";
import gameService from "../services/gameService.js";

//Funçao para tratar a requisiçao de listar os jogos
const getAllGames = async (req, res) =>{
    try{
        const games = await gameService.getAll()
        res.status(200).json({games : games}) // cod.200 : Requisição feita com sucesso
    }catch(error){
        console.log(error)
        res.status(500).json({error : 'Erro interno do servidor'})
    }
}

// função para tratar a requiasição de CADASTRAR um jogo
const createGame = async(req, res) => {
    try{
        //Desestruturação
        // coletadno os dados do corpo da requisição
        const {title, platform, year, price} = req.body
        await gameService.Create(title, platform, year, price)
        //res.sendStatus(201) - usado para enviar apenas o status
        res.status(201).json({message: 'O jogo foi cadastrado com sucesso!'})
        // cod. 201 - CREATE - Um novo recurso foi criado no servidor
    }catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Erro interno do servidor. Não foi possivel cadastrar o jogo'})
    }
}

// função para tratar a requisição de ATUALIZAR um jogo
const updateGame = async (req, res) => {
    try{
        const {id} = req.params.id
        if(ObjectId.isValid){
            const {title, platform, year, price } = req.body
            const game = await gameService.update(id, title, platform, year, price)
            res.status(200).json({message: 'Jogo atualizado com sucesso', game : game})
        } else{
            res.status(400).json({error: 'Ocorreu um erro na validação da ID.'})
        }
    }catch(error){
        console.log(error)
        res.status(500).json({error: 'Erro interno do servidor'})
    }
}

// função para tratar a requisição de DELETAR um jogo
const deleteGame = async (req, res) => {
    try{
        const {id} = req.params
        const deletedGame = await gameService.delete(id)
        if(deletedGame){
            res.status(200).json({message: 'Jogo deletado com sucesso!', game: deletedGame})
        }else{
            res.status(404).json({message: 'Jogo não encontrado'})
        }
    }catch(error){
        console.log(error)
        res.status(500).json({error: 'Erro interno do servidor. Não foi possível deletar o jogo'})
    }
}

//função para listar um unico jogo
const getOneGame = async (req, res) =>{
    try{
        const id = req.params.id
        if(ObjectId.isValid(id)){
            const game = await gameService.getOneGame(id)
            //verificando se o jogo foi encontrado
            if(!game){
                res.status(404).json({message: 'Jogo buscado não foi encontrado'})
            }else{
                res.status(200).json({ game })
            }
        }else{ // se a id for invalida
            res.status(400).json({error:'A ID é inválida'})
            // COD 400 - BAD Request (requisição mal formada
        }
    }catch (error){
        console.log(error)
        res.status(500).json({error: 'Erro interno do servidor. Não foi possível consultar o jogo'})
    }
}

export default { getAllGames, createGame, updateGame, deleteGame, getOneGame }