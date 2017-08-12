/**
 * Created by VLER on 2017/8/12.
 */
import Reflux from 'reflux';
import $ from 'jquery';

const SystemActions = Reflux.createActions([
    'users',
    'userRemove',
    'userCreate'

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
    }
});

exports.SystemActions =  SystemActions;
exports.SystemStore =  SystemStore;