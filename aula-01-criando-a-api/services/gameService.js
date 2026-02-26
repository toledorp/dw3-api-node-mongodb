//importando o Model
import Game from "../models/Games.js";

class gameService{
    // metodo (servio) para buscar todos os registro no banco
    async getAll(){ // funçoes asincronas são não bloqueates
        try{ // try trata o sucesso
            const games = await Game.find(); // .find é motodo do mongoose para viscar reigistro no bd
            return games;
        } catch (error) { // catch trata a falha
            console.log(error)
        }
    }
}
export default new gameService(); // exportando a classe
