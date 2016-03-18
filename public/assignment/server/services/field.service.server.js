/**
 * Created by jonca on 3/16/2016.
 */
module.exports = function (app, formModel) {
    app.get("/api/assignment/form/:formId/field", findFieldsForForm);
    app.get("/api/assignment/form/:formId/field/:fieldId", findFormFieldById);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFormField);
    app.post("/api/assignment/form/:formId/field", addFieldForForm);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFormField);

    function findFieldsForForm(req, res) {
        var formId = req.params.formId;
        res.json(formModel.findFieldsByFormId(formId));
    }

    function findFormFieldById(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        res.json(formModel.findFieldById(formId, fieldId));
    }

    function deleteFormField(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        res.json(formModel.deleteFieldById(formId, fieldId));
    }

    function addFieldForForm(req, res) {
        var formId = req.params.formId;
        var field = req.body;
        res.json(formModel.createFieldForForm(formId, field));
    }

    function updateFormField(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = req.body;
        res.json(formModel.updateFieldForForm(formId, fieldId, field));
    }
};