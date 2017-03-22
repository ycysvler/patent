/**
 * Created by xiaoshilei on 2017/3/15.
 */
import Reflux from 'reflux';
import $ from 'jquery'

const IndexActions = Reflux.createActions([
    "getIndexes",
    "login"
]);

const IndexStore = Reflux.createStore({
    listenables:[IndexActions],

    onGetIndexes: function(userid) {
        let url = window.server_address + "/systems/menus.ashx?";
        let param = {};
        let self = this;
        param.userid = userid;
        $.ajax({
            url: url,
            type: 'GET',
            dataType: "json",
            data: param,
            beforeSend: function (xhr) {

            },
            success: function (data, status) {
                let action = 'getIndexes';
                self.trigger(action, data);
            },
            error: function (reson) {
                console.log(reson);
            }
        });
    },

    onLogin: function(username,password) {
        let self = this;
        let url = window.server_address  + "/systems/login.ashx";
        let param = {
            username: username,
            password: password
        };
        $.ajax({
            url: url,
            type: 'POST',
            data: param,
            success: function (data, status) {
                self.trigger(data);
            },
            error: function (reson) {
                console.log(reson);
            }
        });
    }
});

exports.IndexActions = IndexActions;
exports.IndexStore = IndexStore;