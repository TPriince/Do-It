const express = require("express");
const verifyToken = require("../middlewares/auth.middleware");
const { createCard, deleteCard } = require("../controllers/card.controller");

const cardRouter = express.Router();

cardRouter.post("/", verifyToken, createCard);
cardRouter.delete("/:id", verifyToken, deleteCard);

module.exports = cardRouter;
