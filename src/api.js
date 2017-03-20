/**
 * Created by xiaoshilei on 2017/3/15.
 */
import Reflux from 'reflux';
import $ from 'jquery'

const IndexActions = Reflux.createActions([
    "getIndexes"
]);

const IndexStore = Reflux.createStore({
    listenables:[IndexActions],

    onGetIndexes: function(userid) {
        let url = "http://114.247.108.199/systems/menus.ashx?";
        let param = {};
        let self = this;
        param.userid = userid;
        $.ajax({
            url: url,
            type: 'GET',
            contentType: "application/json",
            dataType: "json",
            data: param,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Content-Type", "application/json;charset=utf8");
            },
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