/**
 * Created by jonca on 3/16/2016.
 */
module.exports = function (app, quizModel) {
    app.get("/api/project/card/quiz/:quizId", findCardsByQuizId);
    app.get("/api/project/card/:cardId/quiz/:quizId", findCardById);
    app.delete("/api/project/card/:cardId/quiz/:quizId", deleteCardById);
    app.post("/api/project/card/quiz/:quizId", createCardForQuiz);
    app.put("/api/project/card/:cardId/quiz/:quizId", updateCardForQuiz);

    var cardModel = require("../models/card.model.server.js")(quizModel);
    
    function findCardsByQuizId(req, res) {
        var quizId = req.params.quizId;
        cardModel.findCardsByQuizId(quizId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findCardById(req, res) {
        var quizId = req.params.quizId;
        var cardId = req.params.cardId;
        cardModel.findCardById(quizId, cardId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteCardById(req, res) {
        var quizId = req.params.quizId;
        var cardId = req.params.cardId;
        cardModel.deleteCardById(quizId, cardId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function createCardForQuiz(req, res) {
        var quizId = req.params.quizId;
        var card = req.body;
        cardModel.createCardForQuiz(quizId, card)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateCardForQuiz(req, res) {
        var quizId = req.params.quizId;
        var cardId = req.params.cardId;
        var card = req.body;
        cardModel.updateCardForQuiz(quizId, cardId, card)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }
};