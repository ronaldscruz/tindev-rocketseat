const Dev = require("../models/Dev");

module.exports = {
    // Mesma lógica do LikeController
    async store(request, response){
        const targetDevId = request.params.devId;
        const loggedDevId = request.headers.user_id;

        const targetDev = await Dev.findById(targetDevId);
        const loggedDev = await Dev.findById(loggedDevId);

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