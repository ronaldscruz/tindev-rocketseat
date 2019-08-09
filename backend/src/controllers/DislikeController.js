const Dev = require("../models/Dev");

module.exports = {
    // Mesma lógica do LikeController
    async store(request, response){
        const { devId } = request.params;
        const { user_id } = request.headers;

        const targetDev = await Dev.findById(devId);
        const loggedDev = await Dev.findById(user_id);

        if(!targetDev){
            return response.status(400).json({ error: "Esse dev não existe ;/" });
        }

        if(loggedDev.likes.includes(targetDev._id)){
            return response.status(400).json({ error: "Você já deu dislike nesse dev!" });
        }

        loggedDev.likes.push(targetDev);
        await loggedDev.save();

        return response.json(loggedDev)
    } 
}