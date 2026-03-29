//importando o model de usuários
import User from "../models/Users.js";

class userService {
    // método para cadastrar um usuário
    async Create(name, email, password) {
        const user = new User({ name, email, password });
        try {
            const newUser = new User({
                name,
                email,
                password
            });
            // .save() método do Mongose para cadastar no BD
            await newUser.save(); // .save()metodo do Mongose para cadastar no BD
        } catch (error) {
            console.log(error);
        }
    
    }
}
export default new userService();