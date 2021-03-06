import React from 'react';
import {Layout, Breadcrumb, Table, Icon, Button} from 'antd';
import {SystemActions, SystemStore} from '../sysapi';

const {Content} = Layout;

class MapRoleUser extends React.Component {
    constructor(props) {
        super(props);
        this.unsubscribe = SystemStore.listen(this.onStatusChange.bind(this));
        this.state = {
            roleid: this.props.params.id,
            items: [], selectNum: 0, selectedRowKeys: []
        };

        SystemActions.users();
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    /*
     * store 触发的事件
     * */
    onStatusChange(action, data) {
        if (action === "users") {
            var selectkeys =[];
            for(var index in data){
                let item = data[index];
                if(item.roleid === this.state.roleid){
                    selectkeys.push(item.userid);
                }
            }
            this.setState({items: data,selectedRowKeys:selectkeys, selectNum:selectkeys.length});

        }
        if(action === 'mapRoleUserCreate'){
            SystemActions.users();
        }

    }

    /* 定义表格有多少列 */
    columns = [
        {
            title: '头像', dataIndex: 'icon', width: 60,
            render(text, record) {
                return <img alt="" style={{width: 40}} src={window.server_address + record.icon}/>;
            }
        },
        {title: '用户名', dataIndex: "username", width: 180},
        {title: '中文名', dataIndex: 'cname'},
        {title: '角色名', dataIndex: 'rolename'}

    ];
    /* 表格选择行的操作 */
    rowSelection = {

        "selectedRowKeys":[],
        onChange: (selectedRowKeys, selectedRows) => {
            this.setState({"selectedRowKeys": selectedRowKeys,selectNum: selectedRowKeys.length});
        },
        getCheckboxProps: record => ({
            disabled: record.roleid != this.state.roleid && record.roleid != undefined
        }),
    };

    create = () => {
        var keys = this.state.selectedRowKeys;
        let array = [];

        for (var key in keys) {
            let userid = keys[key];
            array.push( {
                roleid: this.state.roleid,
                userid: userid
            });
        }

        SystemActions.mapRoleUserCreate(array );

    }

    render() {
        this.rowSelection.selectedRowKeys = this.state.selectedRowKeys;

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
        if (this.state.items.length > 0) {
            state.loading = false;
        }

        return (
            <Layout>
                <div className="breadcrumb">
                    <Breadcrumb style={{margin: '11px 0'}}>
                        <Breadcrumb.Item>系统管理</Breadcrumb.Item>
                        <Breadcrumb.Item href="#/system/roles">角色管理</Breadcrumb.Item>
                        <Breadcrumb.Item>分配角色</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <Layout>
                    <Content className="content">
                        <div>
                            <Button onClick={this.create} className="fast-delete-btn">确认</Button>
                            <span className="fast-check-num"><Icon style={{"marginRight": "6px", "color": "blue"}}
                                                                   type="info-circle"/>已选择{this.state.selectNum}用户</span>
                        </div>

                        <Table  {...state} style={{marginTop: "20px"}}/>
                    </Content>
                </Layout>

            </Layout>
        );
    }
}

export default MapRoleUser;
