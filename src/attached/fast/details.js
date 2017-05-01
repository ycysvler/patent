/**
 * Created by VLER on 2017/3/10.
 */
import React from 'react';
import {Layout,  Breadcrumb,  Table,Col,Tabs} from 'antd';
import './fast.css'
import ImageList from './imageList';
import {FastActions,FastStore} from './fastApi.js';
import ResultCard from './resultCard.js';
import DetailModal from './detailModal.js';
const { Content} = Layout;
const TabPane = Tabs.TabPane;

class AttachedFastDetails extends React.Component {
    constructor(props) {
        super(props);
        this.unsubscribe = FastStore.listen(this.onStatusChange.bind(this));
        this.state = {
            searchData:this.props.location.state.searchData,
            cards:[1,2,3,4,5,6],
            showDetailDialog:false,
            detailData:{}
        }
    }
    componentDidMount() {
        FastActions.getResult(this.state.searchData.jobid,this.state.searchData.typeids[0],this.getCookie("token"));
    }
    componentWillUnmount() {
        this.unsubscribe();
    }
    onStatusChange(type,data) {
        if(type == "getResult") {
            console.log(data);
        } else if(type == "getDetail") {
            this.setState({showDetailDialog:true,detailData:data});
        }
    }
    hideDetailDialog() {
        this.setState({showDetailDialog:false});
    }
    toGetDetail(code) {
        FastActions.getDetail(code,this.getCookie("token"));
    }
    static contextTypes = {
        router: React.PropTypes.object.isRequired,
    };
    goToHistorySearch() {
        this.context.router.push("/attached/fast/list");
    }
    getCookie(name) {
        if(window.document.cookie == "") {
            this.context.router.push("/");
            return;
        }
        let cookies = window.document.cookie.split(";");
        if(name == "token") {
            let token = cookies[0].substring(6);
            if(!token || token == "") {
                this.context.router.push("/");
                return;
            } else {
                return token;
            }
        } else if(name == "user_id") {
            let user_id = cookies[1].substring(9);
            if(!user_id || user_id == "") {
                this.context.router.push("/");
                return;
            } else {
                return user_id;
            }
        } else {
            let user_name = cookies[2].substring(11);
            if(!user_name || user_name == "") {
                this.context.router.push("/");
                return;
            } else {
                return user_name;
            }
        }
    }
    columns = [{
        title:'描述',
        dataIndex:'description',
        key:'description',
        render(text,record) {
            return <span><a href="javascritp:void(0);">{record.description}</a></span>
        }
    }, {
        title:'图像',
        dataIndex:'images',
        key:'images',
        render(text,record) {
            return <ImageList key={record.jobid} imageUrls={record.images}></ImageList>
        }
    }, {
        title:'类型',
        dataIndex:'typenames',
        key:'typenames',
        render(text,record) {
            let type_name = "";
            for(let i=0;i<record.typenames.length;i++) {
                if(i < (record.typenames.length -1)) {
                    type_name += record.typenames[i]+",";
                } else if(i === (record.typenames.length -1)) {
                    type_name += record.typenames[i];
                }
            }
            return <span>{type_name}</span>
        }
    }, {
        title:'进度',
        dataIndex:'schedule',
        key:'schedule',
    }, {
        title:'创建日期',
        dataIndex:'create_time',
        key:'create_time',
    }, {
        title:'完成时间',
        dataIndex:'end_time',
        key:'end_time',
    }]
    data = []
    renderDetailModal() {
        if(this.state.showDetailDialog) {
            return <DetailModal visible={this.state.showDetailDialog}
                                detailData={this.state.detailData}
                                hide={this.hideDetailDialog.bind(this)}
            ></DetailModal>
        }
    }
    render() {
        let self = this;
        self.data = [];
        self.data.push(self.state.searchData);
        return (
            <Layout >
                {
                    self.renderDetailModal()
                }
                <div className="breadcrumb">
                    <Breadcrumb style={{margin: '11px 0'}}>
                        <Breadcrumb.Item>快速检索</Breadcrumb.Item>
                        <Breadcrumb.Item style={{cursor:"pointer"}} onClick={self.goToHistorySearch.bind(self)}>历史查询</Breadcrumb.Item>
                        <Breadcrumb.Item>查询结果</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <Layout className="content">
                    <Content style={{border:"1px solid #cccccc"}} >
                        <div style={{marginTop:"24px"}}>
                            <Col span="4" style={{"textAlign":"right","paddingTop":"5px"}}>
                                <span>查询条件：</span>
                            </Col>
                            <Col span="19">
                                <Table columns={self.columns} dataSource={self.data} bordered pagination={false}/>
                            </Col>
                        </div><br/>
                        <div style={{width:"94%",height:"1px",background:"#cccccc",marginTop:"170px",marginLeft:"3%"}}></div><br/>
                        <div style={{marginTop:"24px"}} >
                            <Col span="4" style={{"textAlign":"right","paddingTop":"5px"}}>
                                <span>查询结果：</span>
                            </Col>
                            <Col span="19">
                                <Tabs defaultActiveKey="1" type="line">
                                    <TabPane tab="HB0132" key="1">
                                        {
                                            self.state.cards.map(function(id) {
                                                return <ResultCard key={id}
                                                                    getDetail={self.toGetDetail.bind(self)}
                                                ></ResultCard>
                                            })
                                        }
                                    </TabPane>
                                    <TabPane tab="HB0133" key="2">
                                        {
                                            self.state.cards.map(function(id) {
                                                return <ResultCard key={id}
                                                ></ResultCard>
                                            })
                                        }
                                    </TabPane>
                                </Tabs>
                            </Col>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default AttachedFastDetails;
