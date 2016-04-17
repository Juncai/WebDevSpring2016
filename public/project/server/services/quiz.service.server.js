/**
 * Created by jonca on 3/16/2016.
 */
module.exports = function (app, quizModel, userModel, classModel) {
    app.get("/api/project/quiz/:quizId", findQuizById);
    app.delete("/api/project/quiz/:quizId", deleteQuizById);
    app.post("/api/project/quiz/user/:userId", createQuiz);
    app.put("/api/project/quiz/:quizId", updateQuiz);
    app.post("/api/project/quiz/:quizId/class/:classId", assignQuizToClass);

    function assignQuizToClass(req, res) {
        var quizId = req.params.quizId;
        var classId = req.params.classId;
        var due = req.body;
        quizModel.addClassToQuiz(quizId, classId)
            .then(
                function (quiz) {
                    classModel.createGradeForClass(classId, quiz, due)
                        .then(
                            function (usernames) {
                                return userModel.addGradeToClassForUsers(usernames, classId, quiz, due);
                            },
                            function (err) {
                                res.status(400).send(err);
                            }
                        )
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

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
        var userId = req.params.userId;
        var quizObj = req.body;
        quizModel.createQuiz(quizObj)
            .then(
                function (quiz) {
                    return userModel.createQuizForUser(userId, quiz.createdBy);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (user) {
                    res.json(user);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function updateQuiz(req, res) {
        var id = req.params.quizId;
        var quizObj = req.body;
        quizModel.updateQuiz(id, quizObj)
            .then(
                function (quiz) {
                    res.json(quiz);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }


};