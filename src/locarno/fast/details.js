/**
 * Created by VLER on 2017/3/10.
 */
import React from 'react';
import {Layout, Breadcrumb, Table, Tabs, Radio, Card, Row, Col, Popover,} from 'antd';
import {LocarnoActions, LocarnoStore} from '../locarnoapi';
import PatentCards from '../common/patentcard.js';
import GroupCards from '../common/groupcard.js';
import DetailModal from '../../attached/fast/detailModal.js';
import JobBar from '../common/jobbar'

import '../../attached/common/css.css';
import '../common/css.css';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const {Content, Sider, Header} = Layout;
const TabPane = Tabs.TabPane;

class LocarnoFastDetails extends React.Component {
    constructor(props) {
        super(props);
        this.unsubscribe = LocarnoStore.listen(this.onStatusChange.bind(this));
        this.state = {
            data: [],
            searchData: this.props.location.state.searchData,
            showDetailDialog: false,
            detailData: {},
            patent_type: this.props.location.state.searchData.typeids[0],
            feature_type: 'deep',
            page: 0
        };

        this.getResult(this.props.location.state.searchData.typeids[0], 'deep');
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    onStatusChange(type, data,patent_type, feature_type) {
        if (type === "getDetail") {
            this.setState({showDetailDialog: true, detailData: data});
        }

        if (type === "getResult") {
            this.setState({data: data,feature_type:feature_type});
        }
    }

    hideDetailDialog() {
        this.setState({showDetailDialog: false});
    }

    getDetail(code, main_class) {
        LocarnoActions.getDetail(code, main_class);
    }

    static contextTypes = {
        router: React.PropTypes.object.isRequired,
    };

    goToHistorySearch() {
        this.context.router.push("/locarno/fast/list");
    }

    renderDetailModal() {
        if (this.state.showDetailDialog) {
            return <DetailModal visible={this.state.showDetailDialog}
                                detailData={this.state.detailData}
                                hide={this.hideDetailDialog.bind(this)}
            ></DetailModal>
        }
    }

    onPatentChange(e) {
        this.getResult(e.target.value, this.state.feature_type);
    }

    onFeatureChange(e) {
        this.getResult(this.state.patent_type, e.target.value);
    }

    getResult(patent_type, feature_type) {
        LocarnoActions.getResult(
            this.props.location.state.searchData.jobid,
            patent_type,
            feature_type,
            this.state.page
        );
    }

    render() {
        let self = this;

        return (
            <Layout >
                {
                    self.renderDetailModal()
                }
                <div className="breadcrumb">
                    <Breadcrumb className="bg_white" style={{margin: '11px 0'}}>
                        <Breadcrumb.Item>快速查询</Breadcrumb.Item>
                        <Breadcrumb.Item style={{cursor: "pointer"}}
                                         onClick={self.goToHistorySearch.bind(self)}>历史查询</Breadcrumb.Item>
                        <Breadcrumb.Item>查询结果</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <Layout>
                    <Content>
                        <Layout>
                            <Header className="bg_white bottom_line"
                                    style={{position: 'fixed', zIndex: 5, width: '100%'}}>
                                类别：
                                <RadioGroup onChange={self.onPatentChange.bind(this)}
                                            defaultValue={self.state.searchData.typeids[0]}
                                            style={{marginRight: 24}}>
                                    {
                                        self.state.searchData.typeids.map(function (item) {
                                            return <RadioButton key={item} value={item}>{item}</RadioButton>
                                        })
                                    }
                                </RadioGroup>
                                特征：

                                <RadioGroup onChange={self.onFeatureChange.bind(this)} defaultValue="deep">
                                    <RadioButton className="patent_type_radio" value="group">权重</RadioButton>
                                    <RadioButton className="patent_type_radio" value="deep">综合</RadioButton>
                                    <RadioButton className="patent_type_radio" value="shape">形状</RadioButton>
                                    <RadioButton className="patent_type_radio" value="color">颜色</RadioButton>
                                    <RadioButton className="patent_type_radio" value="lbp">纹理</RadioButton>
                                </RadioGroup>
                            </Header>
                            <Content className="bg_white" style={{paddingTop: 80}}>
                                {self.state.data.map(function (item, index) {
                                    return (self.state.feature_type === 'group' ?
                                            <GroupCards getdetail={self.getDetail.bind(self)} key={index} index={index}
                                                        item={item}/> :
                                            <PatentCards getdetail={self.getDetail.bind(self)} key={index} index={index}
                                                         item={item}/>
                                    )
                                })}
                            </Content>
                        </Layout>
                    </Content>
                    <Sider style={{background: '#404040', zIndex: 6}} width="250">
                        <JobBar job={this.props.location.state.searchData}></JobBar>
                    </Sider>
                </Layout>
            </Layout>
        );
    }
}

export default LocarnoFastDetails;
