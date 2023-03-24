const cardModel = require("../models/card.model");
const listModel = require("../models/list.model");

const createCard = async (req, res, next) => {
    try {
        const { listId, text } = req.body;
        const user = req.user;
        let myCard = await cardModel
            .create({ text: text })
            .then(async (data) => {
                await listModel.findByIdAndUpdate(listId, {
                    $push: { cards: data },
                });
            });

        return res.status(200).json({
            success: true,
            message: "card added",
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
            success: false,
        });
    }
};

const deleteCard = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = req.user;

        await cardModel.findOneAndDelete({ _id: id });
        return res.status(200).json({
            success: true,
            message: "card deleted",
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
            success: false,
        });
    }
};

module.exports = { createCard, deleteCard };
