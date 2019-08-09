const Dev = require("../models/Dev");

module.exports = {
    async store(request, response){
        const { devId } = request.params;
        const { user_id } = request.headers;

        const loggedDev = await Dev.findById(user_id);
        const targetDev = await Dev.findById(devId);

        return response.json({log: `${loggedDev.name} liked ${targetDev.name}`});
    }
};