const express = require("express");
const mongoose = require("mongoose");

const routes = require("./routes");

const server = express();
mongoose.connect("mongodb+srv://levoid:mawchine17@newsapi-ngu16.mongodb.net/omnistack-week?retryWrites=true&w=majority", 
{
    useNewUrlParser: true
})

server.use(express.json())
server.use(routes);

server.listen(3333);