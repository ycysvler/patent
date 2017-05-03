/**
 * Created by VLER on 2017/3/10.
 */
import React from 'react';
import {Layout, Breadcrumb} from 'antd';
import JobList from '../common/joblist';
import '../common/css.css';

const {Content} = Layout;

class AttachedFastList extends React.Component {
    constructor(props) {
        super(props);
    }

    static contextTypes = {
        router: React.PropTypes.object.isRequired,
    };

    goToCreateNewSearch() {
        this.context.router.push("/attached/fast/create");
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
                <JobList jobtype="0" />
            </Layout>
        );
    }
}

export default AttachedFastList;
