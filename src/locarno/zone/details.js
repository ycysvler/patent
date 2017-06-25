/**
 * Created by VLER on 2017/3/10.
 */
import React from 'react';
import {Layout, Breadcrumb, Table, Tabs} from 'antd';
import ImageList from '../../attached/common/imagelist';
import {LocarnoActions, LocarnoStore} from '../locarnoapi';
import LocarnoResultCards from '../common/resultCard.js';
import DetailModal from '../../attached/fast/detailModal.js';

import '../../attached/common/css.css';

const {Content} = Layout;
const TabPane = Tabs.TabPane;

class LocarnoZoneDetails extends React.Component {
    constructor(props) {
        super(props);
        this.unsubscribe = LocarnoStore.listen(this.onStatusChange.bind(this));
        this.state = {
            searchData: this.props.location.state.searchData,
            showDetailDialog: false,
            detailData: {}
        }

    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    onStatusChange(type, data) {
        if (type === "getDetail") {
            this.setState({showDetailDialog: true, detailData: data});
        }
    }

    hideDetailDialog() {
        this.setState({showDetailDialog: false});
    }

    toGetDetail(code,main_class) {
        LocarnoActions.getDetail(code,main_class, this.getCookie("token"));
    }

    static contextTypes = {
        router: React.PropTypes.object.isRequired,
    };

    goToHistorySearch() {
        this.context.router.push("/locarno/zone/list");
    }

    getCookie(name) {
        if (window.document.cookie === "") {
            this.context.router.push("/");
            return;
        }
        let cookies = window.document.cookie.split(";");
        if (name === "token") {
            let token = cookies[0].substring(6);
            if (!token || token === "") {
                this.context.router.push("/");
                return;
            } else {
                return token;
            }
        } else if (name === "user_id") {
            let user_id = cookies[1].substring(9);
            if (!user_id || user_id === "") {
                this.context.router.push("/");
                return;
            } else {
                return user_id;
            }
        } else {
            let user_name = cookies[2].substring(11);
            if (!user_name || user_name === "") {
                this.context.router.push("/");
                return;
            } else {
                return user_name;
            }
        }
    }

    columns = [
        {title: '描述', dataIndex: "jobname"},
        {
            title: '图像', dataIndex: 'images',
            render(text, record) {
                return <ImageList key={record.jobid} imageUrls={record.images}></ImageList>
            }
        },
        {
            title: '类型', width: 100, dataIndex: 'typenames',
            render(text, record) {
                let type_name = "";
                for (let i = 0; i < record.typenames.length; i++) {
                    if (i < (record.typenames.length - 1)) {
                        type_name += record.typenames[i] + ",";
                    } else if (i === (record.typenames.length - 1)) {
                        type_name += record.typenames[i];
                    }
                }
                return <span>{type_name}</span>
            }
        },
        {
            title: '进度', width: 100, dataIndex: 'progress',
            render(text, record) {
                return <span>{text + '%'}</span>
            }
        },
        {title: '创建日期', width: 180, dataIndex: 'create_time'},
        {title: '完成时间', width: 180, dataIndex: 'end_time'}
    ];

    data = [];

    renderDetailModal() {
        if (this.state.showDetailDialog) {
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
                        <Breadcrumb.Item>局部查询</Breadcrumb.Item>
                        <Breadcrumb.Item style={{cursor: "pointer"}}
                                         onClick={self.goToHistorySearch.bind(self)}>历史查询</Breadcrumb.Item>
                        <Breadcrumb.Item>查询结果</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <Layout >
                    <Content className="content">
                    <Table columns={self.columns} dataSource={self.data} bordered pagination={false}/>

                    <Tabs defaultActiveKey={this.state.searchData.typeids[0]} type="line" style={{marginTop:12}}>
                        {
                            this.state.searchData.typeids.map(function(typeid){
                                return <TabPane tab={typeid} key={typeid}>
                                    <LocarnoResultCards  jobid={self.state.searchData.jobid} typeid={typeid}
                                                 getDetail={self.toGetDetail.bind(self)}
                                    ></LocarnoResultCards>

                                </TabPane>

                            })
                        }
                    </Tabs>
                    </Content>

                </Layout>
            </Layout>
        );
    }
}

export default LocarnoZoneDetails;
