/**
 * Created by xiao on 2017/4/5.
 */
import React from 'react';
import {Col,Modal} from 'antd';

class DetailModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible:this.props.visible,
            detailData:this.props.detailData
        }
    }
    hideSelf() {
        this.props.hide();
    }
    render() {
        let data = this.props.detailData["专利公开详情"];
        return (
            <Modal title="通信电缆用聚乙烯护套料及制备工艺"
                   visible={this.props.visible}
                   width="1000"
                   onCancel={this.hideSelf.bind(this)}
                   footer={null}
            >
                <div>
                    <span>专利公开详情</span>
                </div><br/>
                <div>
                    <span>【基本信息】</span>
                </div><br/>
                <div>
                    <Col span="4">
                        <span>申请号：</span><br/>
                        <span>申请日：</span><br/>
                        <span>公开/公告日：</span><br/>
                        <span>发明/设计人：</span><br/>
                        <span>分类号：</span><br/>
                        <span>地址：</span><br/>
                        <span>颁证日：</span><br/>
                        <span>专利代理机构：</span><br/>
                        <span>国际申请：</span><br/>
                        <span>进入国家日期：</span><br/>
                    </Col>
                    <Col span="8">
                        <span>{data["基本信息"]["申请号"]}</span><br/>
                        <span>{data["基本信息"]["申请日"]}</span><br/>
                        <span>{data["基本信息"]["公告日"]}</span><br/>
                        <span>{data["基本信息"]["设计人"]}</span><br/>
                        <span>{data["基本信息"]["分类号"]}</span><br/>
                        <span>{data["基本信息"]["地址"]}</span><br/>
                        <span>{data["基本信息"]["颁证日"]}</span><br/>
                        <span>{data["基本信息"]["专利代理机构"]}</span><br/>
                        <span>{data["基本信息"]["国际申请"]}</span><br/>
                        <span>{data["基本信息"]["进入国家日期"]}</span><br/>
                    </Col>
                    <Col span="4">
                        <span>优先权：</span><br/>
                        <span>公开/公告号：</span><br/>
                        <span>申请/专利权人：</span><br/>
                        <span>主分类号：</span><br/>
                        <span>分案申请：</span><br/>
                        <span>国省代码：</span><br/>
                        <span>范畴分类：</span><br/>
                        <span>代理人：</span><br/>
                        <span>国际公布：</span><br/>
                    </Col>
                    <Col span="8">
                        <span>{data["基本信息"]["优先权"]}</span><br/>
                        <span>{data["基本信息"]["公告号"]}</span><br/>
                        <span>{data["基本信息"]["专利权人"]}</span><br/>
                        <span>{data["基本信息"]["主分类号"]}</span><br/>
                        <span>{data["基本信息"]["分案申请"]}</span><br/>
                        <span>{data["基本信息"]["国省代码"]}</span><br/>
                        <span>{data["基本信息"]["范畴分类"]}</span><br/>
                        <span>{data["基本信息"]["代理人"]}</span><br/>
                        <span>{data["基本信息"]["国际公布"]}</span><br/>
                    </Col>
                </div><br/>
                <div style={{width:"94%",height:"1px",background:"#cccccc",marginTop:"170px",marginLeft:"3%"}}></div><br/>
                <div>
                    <Col span="12">
                        <span>【摘要】：</span>
                    </Col>
                    <Col span="12">
                        <span>【附图】：</span>
                    </Col>
                </div><br/>
                <div>
                    <Col span="12">
                        <span>{data["摘要"]}</span>
                    </Col>
                    <Col span="12">
                        <img alt="" src={window.server_address+data["附图"]} />
                    </Col>
                </div><br/>
                <div style={{width:"94%",height:"1px",background:"#cccccc",marginTop:"170px",marginLeft:"3%"}}></div><br/>
                <div>
                    <span>【主权项】：</span>
                </div><br/>
                <div>
                    <span>{data["主权项"]}</span>
                </div>
            </Modal>
        )
    }
}

export default DetailModal;