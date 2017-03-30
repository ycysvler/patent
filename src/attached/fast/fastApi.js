/**
 * Created by xiao on 2017/3/30.
 */
import Reflux from 'reflux';
import $ from 'jquery'

const FastActions = Reflux.createActions([
    'uploadImage'
]);

const FastStore = Reflux.createStore({
    listenables:[FastActions],

    onUploadImage:function(url,data,file) {
        let self = this;
        $.ajax({
            url: url,
            type: 'POST',
            data: data,
            cache: false,
            contentType: false,        //不可缺参数
            processData: false,        //不可缺参数
            success: function (result) {
                console.log(result);
                console.log("上传成功:" + file.name);
                self.trigger("uploadImage",eval('(' + result + ')'));
            },
            error: function (msg) {
                console.log(msg);
                console.log("上传失败！");
            }
        });
    }
});

exports.FastActions = FastActions;
exports.FastStore = FastStore;