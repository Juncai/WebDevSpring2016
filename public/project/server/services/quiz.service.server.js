/**
 * Created by jonca on 3/16/2016.
 */
module.exports = function (app, quizModel) {
    app.get("/api/project/quiz/:quizId", findQuizById);
    app.delete("/api/project/quiz/:quizId", deleteQuizById);
    app.post("/api/project/quiz", createQuiz);
    app.put("/api/project/quiz/:quizId", updateQuiz);

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
};