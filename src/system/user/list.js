/**
 * Created by VLER on 2017/3/10.
 */
import React from 'react';
import {Layout, Breadcrumb, Table, Icon,Button} from 'antd';
import {SystemActions, SystemStore} from '../sysapi';

const {Content} = Layout;

class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.unsubscribe = SystemStore.listen(this.onStatusChange.bind(this));
        this.state = {items: [], selectNum: 0,selectedRowKeys:[]};

        SystemActions.users();
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    /*
     * store 触发的事件
     * */
    onStatusChange(action, data) {
        console.log(data);
        if (action === "users") {
            this.setState({items: data});
        }
        if(action === 'userRemove'){
            SystemActions.users();
        }
    }

    /* 定义表格有多少列 */
    columns = [
        {
            title: '头像', dataIndex: 'icon',width: 60,
            render(text, record) {
                return <img alt="" style={{width:40}} src={window.server_address +  record.icon}/>;
            }
        },
        {title: '用户名', dataIndex: "username",width: 180},
        {title: '中文名',  dataIndex: 'cname'}


    ];
    /* 表格选择行的操作 */
    rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            this.setState({selectNum: selectedRowKeys.length});
            this.setState({"selectedRowKeys": selectedRowKeys});
        }
    }
    /* 删除选中行 */
    remove=()=>{
        var keys = this.state.selectedRowKeys;
        SystemActions.userRemove(keys);
        console.log('remove : ', keys);
    }
    /* 创建新用户 */
    create=()=>{
        this.props.router.push("/system/users/create");
    }

    render() {
        var state = {
            rowKey: "userid",
            bordered: true,
            loading: true,
            pagination: false,
            rowSelection: this.rowSelection,
            columns: this.columns,
            dataSource: this.state.items
        };
        // 如果有数据了，就取消loading状态
        if(this.state.items.length > 0){ state.loading=false;}

        return (
            <Layout >
                <div className="breadcrumb">
                    <Breadcrumb style={{margin: '11px 0'}}>
                        <Breadcrumb.Item>系统管理</Breadcrumb.Item>
                        <Breadcrumb.Item>用户管理</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <Layout >
                    <Content className="content">
                        <div>
                            <Button className="fast-delete-btn" onClick={this.remove}>删除</Button>
                            <Button className="fast-new-search-btn"
                                    onClick={this.create}>新建用户</Button>
                            <span className="fast-check-num"><Icon style={{"marginRight": "6px", "color": "blue"}}
                                                                   type="info-circle"/>已选择{this.state.selectNum}项数据</span>

                        </div>

                        <Table  {...state} style={{marginTop: "20px"}}/>
                    </Content>
                </Layout>

            </Layout>


        );
    }
}

export default UserList;
