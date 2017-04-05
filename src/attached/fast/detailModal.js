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
                        <span>CN00100247.3</span><br/>
                        <span>20000111</span><br/>
                        <span>20000712</span><br/>
                        <span>杨卫国,胡建春,孔灵华</span><br/>
                        <span>C08K3/04,H01B3/44</span><br/>
                        <span>311100浙江省余杭经济开发区2号富天集团胡建春</span><br/>
                        <span>暂无信息</span><br/>
                        <span>合肥市长远专利代理事务所(普通合伙)34119</span><br/>
                        <span>暂无信息</span><br/>
                        <span>暂无信息</span><br/>
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
                        <span>暂无信息</span><br/>
                        <span>CN1259541</span><br/>
                        <span>杨卫国</span><br/>
                        <span>C08L23/06</span><br/>
                        <span>暂无信息</span><br/>
                        <span>暂无信息</span><br/>
                        <span>暂无信息</span><br/>
                        <span>程笃庆 ; 黄乐瑜</span><br/>
                        <span>暂无信息</span><br/>
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
                        <span>本发明涉及一种通信电缆用聚乙烯护套料及制备工艺,它由线型低密度聚乙烯树脂、高密度聚乙烯树脂1、高密度聚乙烯树脂2、碳黑母粒、抗氧化剂和加工助剂组成,经称量、混合、挤出、切粒、干燥、包装而成。它与原有的(LDOE)低密度聚乙烯护套料相比,有良好的韧性、拉伸度、电气性能的同时,还具有优异的耐环境应力开裂性和热性能。成为在各种恶劣气候敷设优先选用的护套材料。其各项性能均符合GB15065—1994标准要求。</span>
                    </Col>
                    <Col span="12">
                        <img src="http://114.247.108.199/C/C08/C08L/C08L23_00/C08L23_06/00100247.jpg" />
                    </Col>
                </div><br/>
                <div style={{width:"94%",height:"1px",background:"#cccccc",marginTop:"170px",marginLeft:"3%"}}></div><br/>
                <div>
                    <span>【主权项】：</span>
                </div><br/>
                <div>
                    <span>太长不粘了。。。。。。。。。</span>
                </div>
            </Modal>
        )
    }
}

export default DetailModal;