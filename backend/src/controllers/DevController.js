const axios = require("axios");
const Dev = require("../models/Dev");

module.exports = {
    async store(request, response){
        // Usuário no JSON da requisição
        const { username } = request.body;

        const userExists = await Dev.findOne({ user: username });

        if(userExists){
            return response.json(userExists);
        }

        // Pegando dados do GitHub
        const api_response = await axios.get(`http://api.github.com/users/${username}`)
        .catch(err => (
            response.json({msg: "Erro na API do GitHub", error: err})
        ))

        // Se o usuário não tiver nome, retornar erro (isso acontece com alguns usernames)
        if(!api_response.data.name){
            return response.status(400).json({error: "Nome de usuário inválido."});
        }

        // Desestruturando a resposta da API do GitHub (o user vem da propria requisição do usuario)
        const {
            name,
            bio,
            avatar_url: avatar
        } = api_response.data;

        // Executando a criação do Dev no banco
        const storingDev = await Dev.create({ name, user: username, bio, avatar })
        .catch(err => (
            response.json({msg: "Erro ao inserir dados no banco.", error: err, data_from_api: api_response.data})
        ));

        return response.json(storingDev);
    }
};