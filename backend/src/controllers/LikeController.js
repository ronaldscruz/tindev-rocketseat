const Dev = require("../models/Dev");

module.exports = {
    async store(request, response){
        const { devId } = request.params;
        const { user_id } = request.headers;

        return response.json({log: `${user_id} liked ${devId}`});
    }
};