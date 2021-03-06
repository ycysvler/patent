/**
 * Created by VLER on 2017/8/12.
 */
import Reflux from 'reflux';
import $ from 'jquery';

const SystemActions = Reflux.createActions([
    'users',
    'userRemove',
    'userCreate',
    'roles',
    'roleRemove',
    'roleCreate',
    'mapRoleUserCreate',
    'resource',
    'mapRoleResourceCreate',
    'maprolemenu'
]);


const SystemStore = Reflux.createStore({
    listenables: [SystemActions],

    onUsers:function () {
        let url = window.server_address + "/api/system/users";

        let self = this;
        let param = { };

        $.ajax({
            url: url,
            type: 'GET',
            dataType:"json",
            success: function (data,status) {
                self.trigger("users",data)
            },
            error: function (reason) {
                console.log(reason);
            }
        });
    },

    onUserRemove:function (ids) {
        let url = window.server_address + "/api/system/users";

        let self = this;
        let param = ids;

        $.ajax({
            url: url,
            type: 'DELETE',
            contentType:'application/json',
            data: JSON.stringify(param),
            success: function (data,status) {
                self.trigger("userRemove",data)
            },
            error: function (reason) {
                console.log(reason);
            }
        });
    },

    onUserCreate:function (item) {
        console.log('item:',item);
        let url = window.server_address + "/api/system/users";
        let self = this;
        let param = item;
        $.ajax({
            url: url,
            type: 'POST',
            contentType:'application/json',
            data: JSON.stringify(param),
            success: function (data,status) {
                self.trigger("userCreate",data)
            },
            error: function (reason) {
                console.log(reason);
            }
        });
    },

    /* jiaose */
    onRoles:function () {
        let url = window.server_address + "/api/system/roles";

        let self = this;
        let param = { };

        $.ajax({
            url: url,
            type: 'GET',
            dataType:"json",
            success: function (data,status) {
                self.trigger("roles",data)
            },
            error: function (reason) {
                console.log(reason);
            }
        });
    },

    /* DELETE jiaose */
    onRoleRemove:function (ids) {
        let url = window.server_address + "/api/system/roles";

        let self = this;
        let param = ids;

        $.ajax({
            url: url,
            type: 'DELETE',
            contentType:'application/json',
            data: JSON.stringify(param),
            success: function (data,status) {
                self.trigger("roleRemove",data)
            },
            error: function (reason) {
                console.log(reason);
            }
        });
    },


    /* create jiaose */
    onRoleCreate:function (item) {
        console.log('item:',item);
        let url = window.server_address + "/api/system/roles";
        let self = this;
        let param = item;
        $.ajax({
            url: url,
            type: 'POST',
            contentType:'application/json',
            data: JSON.stringify(param),
            success: function (data,status) {
                self.trigger("roleCreate",data)
            },
            error: function (reason) {
                console.log(reason);
            }
        });
    },

    onMapRoleUserCreate:function (items) {
        let url = window.server_address + "/api/system/maproleusers";
        let self = this;
        let param = items;
        $.ajax({
            url: url,
            type: 'POST',
            contentType:'application/json',
            data: JSON.stringify(param),
            success: function (data,status) {
                self.trigger("mapRoleUserCreate",data)
            },
            error: function (reason) {
                console.log(reason);
            }
        });
    },

    onResource:function () {
        let url = window.server_address + "/api/system/resources";

        let self = this;
        let param = { };

        $.ajax({
            url: url,
            type: 'GET',
            dataType:"json",
            success: function (data,status) {
                self.trigger("resources",data)
            },
            error: function (reason) {
                console.log(reason);
            }
        });
    },

    onMapRoleResourceCreate:function (items) {
        let url = window.server_address + "/api/system/maproleresoures";
        let self = this;
        let param = items;
        $.ajax({
            url: url,
            type: 'POST',
            contentType:'application/json',
            data: JSON.stringify(param),
            success: function (data,status) {
                self.trigger("mapRoleResourceCreate",data)
            },
            error: function (reason) {
                console.log(reason);
            }
        });
    },
    onMaprolemenu:function (id) {
        let url = window.server_address + "/api/system/maproleresoures/" + id;

        let self = this;

        $.ajax({
            url: url,
            type: 'GET',
            dataType:"json",
            success: function (data,status) {
                self.trigger("maprolemenu",data)
            },
            error: function (reason) {
                console.log(reason);
            }
        });
    },

});

exports.SystemActions =  SystemActions;
exports.SystemStore =  SystemStore;