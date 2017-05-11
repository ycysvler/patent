/**
 * Created by VLER on 2017/3/10.
 */
import React from 'react';
import {Layout, Breadcrumb, Icon} from 'antd';
import LocarnoJobList from '../common/joblist';
import '../../attached/common/css.css';


class LocarnoFastList extends React.Component {
    constructor(props) {
        super(props);
    }
    static contextTypes = {
        router: React.PropTypes.object.isRequired,
    };



    goToCreateNewSearch() {
        this.context.router.push("/locarno/fast/create");
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
                <LocarnoJobList jobType="0" jobTypeText="fast" />
            </Layout>
        );
    }
}


export default LocarnoFastList;
