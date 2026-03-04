//importando o Model
import Game from "../models/Games.js";

class gameService {
  // metodo (servio) para buscar todos os registro no banco
  // funções assincronas são nao bloqueantes
  async getAll() {
    // funçoes asincronas são não bloqueates
    try {
      // try trata o sucesso
      const games = await Game.find(); // .find é motodo do mongoose para viscar reigistro no bd
      return games;
    } catch (error) {
      // catch trata a falha
      console.log(error);
    }
  }

  // método para cadastrar um game
  async Create(title, platform, year, price) {
    try {
      const newGame = new Game({
        //tecnica de desestruturação (destruction = forma sinplificada de escrever title: title)
        title,
        platform,
        year,
        price,
      });
      await newGame.save(); // .save()metodo do Mongose para cadastar no BD
    } catch (error) {
      console.log(error);
    }
  }

  // metodo para atualizar um game (update)
  async update(id, title, platform, year, price) {
    try {
      const updatedGame = await Game.findByIdAndUpdate(
        id,
        { title, platform, year, price },
        { new: true, runValidators: true } // opção para retornar o documento atualizado e validar os dados
      );
      return updatedGame; // retorna o game atualizado
    } catch (error) {
      console.log(error);
      return null; // retorna null em caso de erro
    }
  }

  // método para deletar um game (delete)
  async delete(id) {
    try {
      const deletedGame = await Game.findByIdAndDelete(id);
      return deletedGame; // retorna o game deletado
    } catch (error) {
      console.log(error);
      return null; // retorna null em caso de erro
    }
  }

}
export default new gameService(); // exportando a classe
