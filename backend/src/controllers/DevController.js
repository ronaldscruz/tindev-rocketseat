const axios = require("axios");

module.exports = {
    async store(request, response){
        // Usuário no JSON da requisição
        const { username } = request.body;

        // Pegando dados do GitHub
        const api_response = await axios.get(`http://api.github.com/users/${username}`)

        // Desestruturando a resposta da API do GitHub

        return response.json(api_response.data);
    }
};