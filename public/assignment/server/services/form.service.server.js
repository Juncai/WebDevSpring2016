"use strict";

module.exports = function (app, formModel, userModel) {
    app.get("/api/assignment/user/:userId/form", findFormsForUser);
    app.get("/api/assignment/form/:formId", findFormById);
    app.delete("/api/assignment/form/:formId", deleteForm);
    app.post("/api/assignment/user/:userId/form", addFormForUser);
    app.put("/api/assignment/form/:formId", updateForm);

    function findFormsForUser(req, res) {
        var userId = req.params.userId;
        formModel.findFormsByUserId(userId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findFormById(req, res) {
        var formId = req.params.formId;
        formModel.findFormById(formId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteForm(req, res) {
        var formId = req.params.formId;
        formModel.deleteForm(formId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function addFormForUser(req, res) {
        var userId = req.params.userId;
        var form = req.body;
        form.userId = userId;
        formModel.createForm(form)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function updateForm(req, res) {
        var formId = req.params.formId;
        var form = req.body;
        formModel.updateForm(formId, form)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
    }
};