/**
 * Created by jonca on 3/16/2016.
 */
var mock = require("./form.mock.json");
module.exports = function () {
    var api = {
        findFormByID: findFormByID,
        findFormsByUserId: findFormsByUserId,
        createForm: createForm,
        updateForm: updateForm,
        deleteForm: deleteForm,
        findFormByTitle: findFormByTitle,
        findFieldsByFormId: findFieldsByFormId,
        findFieldById: findFieldById,
        deleteFieldById: deleteFieldById,
        createFieldForForm: createFieldForForm,
        updateFieldForForm: updateFieldForForm
    };
    return api;

    function createForm(form) {
        form._id = uuid.v1();
        mock.push(form);
        return mock;
    }

    function updateForm(id, form) {
        var i = findIndexById(mock, id);
        if (i > -1) {
            for (var p in form) {
                mock[i][p] = form[p];
            }
            //return mock[u];
        }
        return mock;
    }

    function deleteForm(id) {
        var indexToRemove = findIndexById(mock, id);
        if (indexToRemove > -1) {
            mock.splice(indexToRemove, 1);
        }
        return mock;
    }

    function findIndexById(collection, id) {
        for (var i in collection) {
            if (collection[i]._id == id) {
                return i;
            }
        }
        return -1;
    }

    function findFormByID(formID) {
        for (var m in mock) {
            if (mock[m]._id === formID) {
                return mock[m];
            }
        }
        return null;
    }

    function findFormByTitle(title) {
        for (var m in mock) {
            if (mock[m].title === title) {
                return mock[m];
            }
        }
        return null;
    }

    function findFormsByUserId(userId) {
        var userForms = [];
        for (var m in mock) {
            if (mock[m].userId === userId) {
                userForms.push(mock[m]);
            }
        }
        return userForms;
    }


    // for fields
    function findFieldsByFormId(formId) {
        var form = findFormByID(formId);
        if (form) {
            return form.fields;
        }
        return [];
    }

    function findFieldById(formId, fieldId) {
        var form = findFormByID(formId);
        for (var f in form.fields) {
            if (form.fields[f]._id === fieldId) {
                return form.fields[f];
            }
        }
    }

    function deleteFieldById(formId, fieldId) {
        var form = findFormByID(formId);
        var indexToRemove = findIndexById(form.fields, fieldId);
        if (indexToRemove > -1) {
            form.fields.splice(indexToRemove, 1);
            var indForm = findIndexById(mock, form._id);
            mock[indForm] = form;
        }
        return form;
    }

    function createFieldForForm(formId, field) {
        var form = findFormByID(formId);
        field._id = uuid.v1();
        form.fields.push(field);
        var indForm = findIndexById(mock, form._id);
        mock[indForm] = form;
        return form;
    }

    function updateFieldForForm(formId, fieldId, field) {
        var form = findFormByID(formId);
        var indField = findIndexById(form.fields, fieldId);
        for (var p in field) {
            form.fields[indField][p] = field[p];
        }
        var indForm = findIndexById(mock, form._id);
        mock[indForm] = form;
        return form;
    }
};