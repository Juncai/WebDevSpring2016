/**
 * Created by jonca on 3/16/2016.
 */
module.exports = function (app, quizModel) {
    app.get("/api/project/quiz/:quizId/card", findCardsForQuiz);
    app.get("/api/project/quiz/:quizId/card/:cardId", findQuizCardById);
    app.delete("/api/project/quiz/:quizId/card/:cardId", deleteQuizCard);
    app.post("/api/project/quiz/:quizId/card", addCardForQuiz);
    app.put("/api/project/quiz/:quizId/card/:cardId", updateQuizCard);

    function findCardsForQuiz(req, res) {
        var quizId = req.params.quizId;
        res.json(quizModel.findCardsByQuizId(quizId));
    }

    function findQuizCardById(req, res) {
        var quizId = req.params.quizId;
        var cardId = req.params.cardId;
        res.json(quizModel.findCardById(quizId, cardId));
    }

    function deleteQuizCard(req, res) {
        var quizId = req.params.quizId;
        var cardId = req.params.cardId;
        res.json(quizModel.deleteCardById(quizId, cardId));
    }

    function addCardForQuiz(req, res) {
        var quizId = req.params.quizId;
        var card = req.body;
        res.json(quizModel.createCardForQuiz(quizId, card));
    }

    function updateQuizCard(req, res) {
        var quizId = req.params.quizId;
        var cardId = req.params.cardId;
        var card = req.body;
        res.json(quizModel.updateCardForQuiz(quizId, cardId, card));
    }
};