/**
 * Created by jonca on 3/16/2016.
 */
module.exports = function (app, formModel, userModel) {
    app.get("/api/assignment/user/:userId/form", findFormsForUser);
    app.get("/api/assignment/form/:formId", findFormById);
    app.delete("/api/assignment/form/:formId", deleteForm);
    app.post("/api/assignment/user/:userId/form", addFormForUser);
    app.put("/api/assignment/form/:formId", updateForm);

    function findFormsForUser(req, res) {
        var userId = req.params.userId;
        res.json(formModel.findFormsByUserId(userId));
    }

    function findFormById(req, res) {
        var formId = req.params.formId;
        res.json(formModel.findFormByID(formId));
    }

    function deleteForm(req, res) {
        var formId = req.params.formId;
        res.json(formModel.deleteForm(formId));
    }

    function addFormForUser(req, res) {
        var userId = req.params.userId;
        var form = req.body;
        form.userId = userId;

        res.json(formModel.createForm(form));
    }

    function updateForm(req, res) {
        var formId = req.params.formId;
        var form = req.body;
        res.json(formModel.updateForm(formId, form));
    }
};