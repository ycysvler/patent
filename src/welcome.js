/**
 * Created by VLER on 2017/3/13.
 */
import React from 'react';
import {Layout,  Button} from 'antd';
import Jquery from 'jquery';


class Welcome extends React.Component {
    onTest=function(){
        var data = {
            userid: "4dd3562851d641b09f78e074d672a221",
            jobname: "aaasdaw",
            typeids: [
                "323234-23423",
                "322222-23423"
            ],
            typenames: [
                "nha",
                "hb01"
            ],
            images: [
                "/upload/admin/ses.jpg",
                "/upload/admin/aaa.jpg"
            ]
        };


        var promise = Jquery.post("http://114.247.108.199/attached/fast/create.ashx",JSON.stringify(data));
        promise.done(function(data, status){
            //let o = JSON.parse(data);
        });
    }
    render() {
        return (
            <Layout >
                Welcome
                <Button onClick={this.onTest}>test</Button>
            </Layout>
        );
    }
}

export default Welcome;
