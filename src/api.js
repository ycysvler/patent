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
    }
});

exports.IndexActions = IndexActions;
exports.IndexStore = IndexStore;