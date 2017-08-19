/**
 * ZZY 2017/8/13.
 */
import React from 'react';
import {Link} from 'react-router';
import {Layout, Breadcrumb, Table, Icon,Button} from 'antd';
import {SystemActions, SystemStore} from '../sysapi';

const { Content} = Layout;

class RoleList extends React.Component {
    constructor(props) {
        super(props);
        this.unsubscribe = SystemStore.listen(this.onStatusChange.bind(this));
        this.state = {items: [], selectNum: 0,selectedRowKeys:[]};

        SystemActions.roles();
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    /*
     * store 触发的事件
     * */
    onStatusChange(action, data) {
        console.log(data);
        if (action === "roles") {
            this.setState({items: data});
        }
        if(action === 'roleRemove'){
            SystemActions.roles();
        }
    }

    /* 定义表格有多少列 */
    columns = [
        {title: '角色名', dataIndex: "rolename",width: 180},
        {title: '描述',  dataIndex: 'description'},
        {
            title: '用户',width: 100,
            render(text, record) {
                return (<Link to={"/system/roles/"+record.roleid+"/user"}><Button icon="team"/></Link>);
            }
        },
        {
            title: '菜单管理',width: 100,
            render(text, record) {
                return <Link to={"/system/roles/"+record.roleid+"/menu"}><Button icon="menu-unfold"  /></Link>;
            }
        }
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
        SystemActions.roleRemove(keys);
        console.log('remove : ', keys);
    }
    /* 创建新用户 */
    create=()=>{
        this.props.router.push("/system/roles/create");
    }



    render() {
        var state = {
            rowKey: "roleid",
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
                        <Breadcrumb.Item>角色管理</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <Layout >
                    <Content className="content">
                        <div>
                            <Button className="fast-delete-btn" onClick={this.remove}>删除</Button>
                            <Button className="fast-new-search-btn"
                                    onClick={this.create}>新建角色</Button>
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

export default RoleList;
