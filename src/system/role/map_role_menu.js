/**
 * Created by VLER on 2017/3/10.
 */
import React from 'react';
import {Layout, Breadcrumb, Table, Icon,Button} from 'antd';
import {SystemActions, SystemStore} from '../sysapi';

const { Content} = Layout;

class MapRoleMenu extends React.Component {
    constructor(props) {
        super(props);
        this.unsubscribe = SystemStore.listen(this.onStatusChange.bind(this));
        this.state = {
            roleid: this.props.params.id,
            items: [], selectNum: 0, selectedRowKeys: []
        };

        SystemActions.resource();
        SystemActions.maprolemenu(this.props.params.id);
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    onStatusChange(action, data) {
        if(action === "maprolemenu"){
            var selectkeys =[];
            for(var index in data){
                let item = data[index];
                if(item.roleid === this.state.roleid){
                    selectkeys.push(item.rid);
                }
            }

            console.log('rids:', selectkeys);
            this.setState({selectedRowKeys:selectkeys, selectNum:selectkeys.length});

        }
        if (action === "resources") {
            this.setState({items: data});

        }
        if(action === 'mapRoleResourceCreate'){
            SystemActions.resource();
        }

    }

    /* 定义表格有多少列 */
    columns = [
        {title: '菜单名', dataIndex: 'rname'},
        {title: 'URL', dataIndex: 'url'},
        {title: 'ParentID', dataIndex: 'parentid'},
        {title: 'Order', dataIndex: 'order'},
    ];
    /* 表格选择行的操作 */
    rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            this.setState({selectNum: selectedRowKeys.length});
            this.setState({"selectedRowKeys": selectedRowKeys});
        }
    };
    create = () => {
        var keys = this.state.selectedRowKeys;
        let array = [];

        for (var key in keys) {
            let rid = keys[key];
            array.push( {
                roleid: this.state.roleid,
                rid: rid
            });
        }

        SystemActions.mapRoleResourceCreate(array );

    };
    render() {
        this.rowSelection.selectedRowKeys = this.state.selectedRowKeys;
        var state = {
            bordered: true,
            loading: true,
            pagination: false
        };
        // 如果有数据了，就取消loading状态
        if (this.state.items.length > 0) {
            state.loading = false;
        }
        return (
            <Layout >
                <div className="breadcrumb">
                    <Breadcrumb style={{margin: '11px 0'}}>
                        <Breadcrumb.Item>系统管理</Breadcrumb.Item>
                        <Breadcrumb.Item href="#/system/roles">角色管理</Breadcrumb.Item>
                        <Breadcrumb.Item>菜单管理</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <Layout >
                    <Content className="content">
                        <div>
                            <Button onClick={this.create} className="fast-delete-btn">确认</Button>
                            <span className="fast-check-num"><Icon style={{"marginRight": "6px", "color": "blue"}}
                                                                   type="info-circle"/>已选择{this.state.selectNum}项数据</span>
                        </div>
                        <Table columns={this.columns}
                               dataSource={this.state.items}
                               rowKey="rid"
                               rowSelection = {this.rowSelection}
                               {...state}
                               style={{marginTop: "20px"}}/>
                    </Content>
                </Layout>

            </Layout>

        );
    }
}

export default MapRoleMenu;
