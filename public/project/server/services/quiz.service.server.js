/**
 * Created by jonca on 3/16/2016.
 */
module.exports = function (app, quizModel) {
    app.get("/api/project/quiz/:quizId", findQuizById);
    app.delete("/api/project/quiz/:quizId", deleteQuizById);
    app.post("/api/project/quiz", createQuiz);
    app.put("/api/project/quiz/:quizId", updateQuiz);
    // for cards
    app.get("/api/project/quiz/:quizId/card", findCardsByQuizId);
    app.get("/api/project/quiz/:quizId/card/:cardId", findCardById);
    app.delete("/api/project/quiz/:quizId/card/:cardId", deleteCardById);
    app.post("/api/project/quiz/:quizId/card", createCardForQuiz);
    app.put("/api/project/quiz/:quizId/card/:cardId", updateCardForQuiz);

    function findQuizById(req, res) {
        var id = req.params.quizId;
        quizModel.findQuizById(id)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteQuizById(req, res) {
        var id = req.params.quizId;
        quizModel.deleteQuizById(id)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function createQuiz(req, res) {
        var quiz = req.body;
        quizModel.createQuiz(quiz)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateQuiz(req, res) {
        var id = req.params.quizId;
        var quiz = req.body;
        quizModel.updateQuiz(id, quiz)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    // for cards
    function findCardsByQuizId(req, res) {
        var quizId = req.params.quizId;
        quizModel.findCardsByQuizId(quizId)
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
        quizModel.findCardById(quizId, cardId)
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
        quizModel.deleteCardById(quizId, cardId)
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
        quizModel.createCardForQuiz(quizId, card)
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
        quizModel.updateCardForQuiz(quizId, cardId, card)
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