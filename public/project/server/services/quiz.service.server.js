/**
 * Created by jonca on 3/16/2016.
 */
module.exports = function (app, quizModel, userModel) {
    app.get("/api/project/user/:userId/quiz", findQuizsForUser);
    app.get("/api/project/quiz/:quizId", findQuizById);
    app.delete("/api/project/quiz/:quizId", deleteQuiz);
    app.post("/api/project/user/:userId/quiz", addQuizForUser);
    app.put("/api/project/quiz/:quizId", updateQuiz);

    function findQuizsForUser(req, res) {
        var userId = req.params.userId;
        res.json(quizModel.findQuizsByUserId(userId));
    }

    function findQuizById(req, res) {
        var quizId = req.params.quizId;
        res.json(quizModel.findQuizByID(quizId));
    }

    function deleteQuiz(req, res) {
        var quizId = req.params.quizId;
        res.json(quizModel.deleteQuiz(quizId));
    }

    function addQuizForUser(req, res) {
        var userId = req.params.userId;
        var quiz = req.body;
        quiz.userId = userId;

        res.json(quizModel.createQuiz(quiz));
    }

    function updateQuiz(req, res) {
        var quizId = req.params.quizId;
        var quiz = req.body;
        res.json(quizModel.updateQuiz(quizId, quiz));
    }
};