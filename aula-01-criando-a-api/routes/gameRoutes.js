import express from 'express';
import gameController from '../controllers/gameController.js'
const gameRoutes = express.Router()

// na camada de route é armazenado os endppits (url) da API
// Endpoit para lista todos os games
gameRoutes.get("/games", gameController.getAllGames)

export default gameRoutes;

