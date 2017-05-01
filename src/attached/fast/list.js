/**
 * Created by VLER on 2017/3/10.
 */
import React from 'react';
import {Layout,  Breadcrumb, Icon, Button,Input,Table } from 'antd';
import {FastActions,FastStore} from './fastApi.js';
import ImageList from './imageList';
import './fast.css'

const { Content } = Layout;

class AttachedFastList extends React.Component {
    constructor(props) {
        super(props);
        this.unsubscribe = FastStore.listen(this.onStatusChange.bind(this));
        this.state = {
            selectNum:0,
            jobsData:[]
        }
    }
    componentDidMount() {
        FastActions.getJobs(this.getCookie("user_id"),this.getCookie("token"));
    }
    componentWillUnmount() {
        this.unsubscribe();
    }
    onStatusChange(type,data) {
        if(type === "getJobs") {
            console.log(data);
            this.formatJobData(data);
            this.setState({jobsData:data});
        }
    }
    formatJobData(jobData) {
        let self = this;
        self.data = [];
        for(let i=0;i<jobData.length;i++) {
            let item = {};
            item.jobid = jobData[i].jobid;
            item.description = jobData[i].description;
            item.typeids = jobData[i].typeids;
            item.images = jobData[i].images;
            item.typenames = jobData[i].typenames;
            item.schedule = "100%";
            item.create_time = jobData[i].create_time;
            item.end_time = jobData[i].end_time;
            self.data.push(item);
        }
    }
    getCookie(name) {
        console.log(window.document.cookie);
        if(window.document.cookie === "") {
            this.context.router.push("/");
            return;
        }
        let cookies = window.document.cookie.split(";");
        if(name === "token") {
            let token = cookies[0].substring(6);
            if(!token || token === "") {
                this.context.router.push("/");
                return;
            } else {
                return token;
            }
        } else if(name === "user_id") {
            let user_id = cookies[1].substring(9);
            if(!user_id || user_id === "") {
                this.context.router.push("/");
                return;
            } else {
                return user_id;
            }
        } else {
            let user_name = cookies[2].substring(11);
            if(!user_name || user_name === "") {
                this.context.router.push("/");
                return;
            } else {
                return user_name;
            }
        }
    }
    static contextTypes = {
        router: React.PropTypes.object.isRequired,
    };
    goToCreateNewSearch() {
        this.context.router.push("/attached/fast/create");
    }
    columns = [{
        title:'描述',
        dataIndex:'description',
        render(text,record) {
            return <span><a href="javascritp:void(0);">{record.description}</a></span>
        }
    }, {
        title:'图像',
        dataIndex:'images',
        render(text,record) {
            return <ImageList key={record.jobid} imageUrls={record.images}></ImageList>
        }
    }, {
        title:'类型',
        dataIndex:'typenames',
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
        dataIndex:'schedule'
    }, {
        title:'创建日期',
        dataIndex:'create_time'
    }, {
        title:'完成时间',
        dataIndex:'end_time'
    }]

    data = []

    rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            this.setState({selectNum:selectedRowKeys.length});
        }
    }
    rowClick(record,index) {
        console.log(record,index);
        record.key = record.jobid;
        this.context.router.push({pathname:'/attached/fast/details',state:{searchData:record}});
    }
    render() {
        return (
            <Layout >
                <div className="breadcrumb">
                    <Breadcrumb style={{margin: '11px 0'}}>
                        <Breadcrumb.Item>快速检索</Breadcrumb.Item>
                        <Breadcrumb.Item>历史查询</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <Layout className="content">
                    <Content >
                        <div>
                            <Button className="fast-delete-btn" >删除</Button>
                            <Button className="fast-new-search-btn" onClick={this.goToCreateNewSearch.bind(this)} >新建查询</Button>
                            <span className="fast-check-num"><Icon style={{"marginRight":"6px","color":"blue"}} type="info-circle" />已选择{this.state.selectNum}项数据</span>
                            <Button className="fast-search-btn" >搜索</Button>
                            <Input style={{"width":"20%","position":"relative","float":"right","marginRight":"5px"}}  placeholder="请输入描述关键词" />
                        </div>
                        <Table style={{marginTop:"20px"}} onRowClick={this.rowClick.bind(this)} rowSelection={this.rowSelection} columns={this.columns} dataSource={this.data} bordered />
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default AttachedFastList;
