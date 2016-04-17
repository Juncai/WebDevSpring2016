/**
 * Created by jonca on 4/16/2016.
 */

module.exports = {
    findIndexById: function (id, group) {
        var res = -1;
        for (var g in group) {
            if (group[g]._id === id) {
                res = g;
            }
        }
        return res;
    },
    purgeUser: function (user) {
        var purgedUser = {};
        purgedUser._id = user._id;
        purgedUser.username = user.username;
        purgedUser.firstName = user.firstName;
        purgedUser.lastName = user.lastName;
        return purgedUser;
    },
    removeElementAt: function (collection, index) {
        collection.splice(index, 1);
    }

};
