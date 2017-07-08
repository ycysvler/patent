/**
 * Created by VLER on 2017/3/10.
 */
import React from 'react';
import {Layout, Breadcrumb, Table, Tabs, Radio, Card, Row, Col, Popover,} from 'antd';
import {LocarnoActions, LocarnoStore} from '../locarnoapi';
import LocarnoResultCards from '../common/resultCard.js';
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
        }

        this.getResult(this.props.location.state.searchData.typeids[0], 'deep');
    }
    componentWillUnmount() {
        this.unsubscribe();
    }

    onStatusChange(type, data) {
        if (type === "getDetail") {
            this.setState({showDetailDialog: true, detailData: data});
        }

        if (type === "getResult") {
            this.setState({data: data});
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
        this.setState({patent_type: e.target.value});
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

    renderOneImage(url) {
        url = window.server_address + '/image.ashx?name=' + url;
        return <div>
            <img alt="" style={{maxWidth: 300, maxHeight: 300}} src={url}/>
        </div>
    }

    getTitle(title, index) {
        return (
            <div
                title={title}
                style={{
                    width: 280,
                    fontWeight: 'bold',
                    whiteSpace: 'nowrap',
                    wordBreak: 'keep-all',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                }}
            >{"[" + (index + 1) + "] " + title}</div>
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

                                <RadioGroup onChange={self.onFeatureChange.bind(this)} defaultValue="group">
                                    <RadioButton className="patent_type_radio" value="group">权重</RadioButton>
                                    <RadioButton className="patent_type_radio" value="deep">综合</RadioButton>
                                    <RadioButton className="patent_type_radio" value="shape">形状</RadioButton>
                                    <RadioButton className="patent_type_radio" value="color">颜色</RadioButton>
                                    <RadioButton className="patent_type_radio" value="lbp">纹理</RadioButton>
                                </RadioGroup>
                            </Header>
                            <Content className="bg_white" style={{paddingTop: 80}}>

                                {self.state.data.map(function (item, index) {
                                    return (<Card key={'deep_' + item.image}
                                                  title={self.getTitle(item.patent.ap_name, index)}
                                                  extra={
                                                      <span>{((100 - item.score.toFixed(2)) * 100) / 100 + '%'}</span>}
                                                  style={{
                                                      width: 390,
                                                      marginBottom: 20,
                                                      marginLeft: 6,
                                                      overflow: "left",
                                                      float: 'left'
                                                  }}>
                                        <div>
                                            <Row>
                                                <Col span="10" style={{
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    height: '130px',
                                                    alignItems: "center"
                                                }}>
                                                    <Popover
                                                        content={self.renderOneImage(item.image)}>
                                                        <img alt=""
                                                             style={{maxWidth: "100%", maxHeight: 90}}
                                                             src={ window.server_address + '/image.ashx?name=' + item.image}/>
                                                    </Popover>
                                                </Col>
                                                <Col span="5" style={{textAlign: "right"}}>
                                                    <div>申请号：</div>
                                                    <div>申请日：</div>
                                                    <div>公告号：</div>
                                                    <div>公告日：</div>
                                                    <div>申请人：</div>
                                                    <div>主分类号：</div>
                                                    <div>分类号：</div>
                                                </Col>
                                                <Col span="8">
                                                    <a style={{
                                                        width: 140,
                                                        whiteSpace: 'nowrap',
                                                        wordBreak: 'keep-all',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis'
                                                    }}
                                                       onClick={self.getDetail.bind(self,item.code, item.patent.main_class)}
                                                    >{item.code}</a>
                                                    <div>{item.patent.ap_date}</div>
                                                    <div title={item.patent.code} style={{
                                                        width: 140,
                                                        whiteSpace: 'nowrap',
                                                        wordBreak: 'keep-all',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis'
                                                    }}>{item.patent.pub_num} </div>
                                                    <div>{item.patent.pub_date}</div>
                                                    <div title={item.patent.pa_name} style={{
                                                        width: 140,
                                                        whiteSpace: 'nowrap',
                                                        wordBreak: 'keep-all',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis'
                                                    }}>{item.patent.pa_name} </div>


                                                    <div>{item.patent.main_class}</div>
                                                    <div title={item.patent.sub_class} style={{
                                                        width: 140,
                                                        whiteSpace: 'nowrap',
                                                        wordBreak: 'keep-all',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis'
                                                    }}>{item.patent.sub_class}</div>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Card>)
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
