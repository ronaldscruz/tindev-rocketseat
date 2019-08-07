const express = require("express");
const DevController = require("./controllers/DevController");

const routes = express.Router();

routes.post("/add/dev", DevController.store)

module.exports = routes