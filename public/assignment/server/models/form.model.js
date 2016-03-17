/**
 * Created by jonca on 3/16/2016.
 */
var mock = require("./form.mock.json");
module.exports = function() {
    var api = {
        findFormByID: findFormByID,
        createForm: createForm,
        updateForm: updateForm,
        deleteForm: deleteForm,
        findFormByTitle: findFormByTitle
    };
    return api;

    function createForm(form) {
        form = {
            _id: "ID_" + (new Date()).getTime(),
            imdbID: form.imdbID,
            poster: form.Poster,
            title: form.Title
        };
        mock.push(form);
        return form;
    }

    function updateForm(form) {

    }

    function deleteForm(form) {

    }

    function findFormByID(formID) {
        for(var m in mock) {
            if(mock[m]._id === formID) {
                return mock[m];
            }
        }
        return null;
    }
        function findFormByTitle(title) {
        for(var m in mock) {
            if(mock[m].title === title) {
                return mock[m];
            }
        }
        return null;
    }
};