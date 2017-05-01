/**
 * Created by xiao on 2017/4/4.
 */
import React from 'react';
import {Card,Col,Popover } from 'antd';

class ResultCard extends React.Component {

    renderOneImage(url) {
        return <div>
            <img alt="" src={url} />
        </div>
    }
    getDetail() {
        this.props.getDetail("00100247");
    }
    render() {
        return (
            <Card title="微型耕整机" extra={<span>99%</span>} style={{ width: 500,marginBottom:20,marginLeft:2,overflow:"left" }}>
                <dv>
                    <Col span="8" style={{marginTop:-20}}>
                        <Popover content={this.renderOneImage("http://114.247.108.199/upload/admin/2f6628a612da4f8aa183a5b5629af81e.jpg")}>
                            <img alt="" style={{width:"150px",height:"150px"}} src="http://114.247.108.199/upload/admin/2f6628a612da4f8aa183a5b5629af81e.jpg" />
                        </Popover>
                    </Col>
                    <Col span="4" style={{textAlign:"right"}}>
                        <span>专利号：</span><br/>
                        <span>申请人：</span><br/>
                        <span>申请日：</span><br/>
                        <span>主分类号：</span><br/>
                        <span>分类号：</span>
                    </Col>
                    <Col span="8">
                        <a onClick={this.getDetail.bind(this)}>CN200920080260.9</a><br/>
                        <span>白建林</span><br/>
                        <span>2009-04-17</span><br/>
                        <span>2015-09-09</span><br/>
                        <span>A01B15/14 ; A01B33/12 ; A01B33/14</span>
                    </Col>
                </dv>
            </Card>
        )
    }
}

export default ResultCard;