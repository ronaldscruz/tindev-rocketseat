module.exports = {
    store(request, response){
        const {username} = request.body;
        return response.json({"username": username});
    }
}