/**
 * Created by VLER on 2017/8/12.
 */
import '../system.css';
import React from 'react';
import {Layout, Form, Breadcrumb, Button, Input } from 'antd';
import {SystemActions, SystemStore} from '../sysapi';
const {Content} = Layout;
const FormItem = Form.Item;



class RoleCreate extends React.Component {
    constructor(props) {
        super(props);
        this.unsubscribe = SystemStore.listen(this.onStatusChange.bind(this));
        this.state = {};
    }

    onStatusChange = (type, data) => {
        if (type === "roleCreate") {
            this.props.router.push("/system/roles");
        }
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    /* 确定按钮提交页面 */
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                var item = {
                    "rolename":values.rolename,
                    "description":values.description
                };
                SystemActions.roleCreate(item);
                console.log('Received values of form: ', values);
            }
        });
    }

    checkRoleName = (rule, value, callback) => {
        const form = this.props.form;
        if (value === 'aaa') {
            callback('你两次输入的角色名相同!');
        } else {
            callback();
        }
    }
    checkDescription = (rule, value, callback) => {
        const form = this.props.form;
        if (value === 'aaa') {
            callback('你两次输入的描述相同!');
        } else {
            callback();
        }
    }


    render() {
        let self = this;
        const {getFieldDecorator} = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 6},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 14},
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 14,
                    offset: 6,
                },
            },
        };

        return (
            <Layout className="system">
                <div className="breadcrumb">
                    <Breadcrumb style={{margin: '11px 0'}}>
                        <Breadcrumb.Item>系统管理</Breadcrumb.Item>
                        <Breadcrumb.Item href="#/system/roles">角色列表</Breadcrumb.Item>
                        <Breadcrumb.Item>新建角色</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <Content style={{background: "#fff"}}>
                    <Form onSubmit={this.handleSubmit} className="form">
                        <FormItem {...formItemLayout} label="角色名" hasFeedback>
                            {getFieldDecorator('rolename', {
                                rules: [{required: true, message: '请输入你的角色名!'}, {
                                    validator: this.checkRoleName,
                                }],
                            })(<Input />)}
                        </FormItem>

                            <FormItem {...formItemLayout} label="描述" hasFeedback>
                                {getFieldDecorator('description', {
                                    rules: [{required: true, message: '请输入你的描述!'}, {
                                        validator: this.checkDescription,
                                    }],
                                })(<Input />)}
                            </FormItem>


                        <FormItem {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit">Register</Button>
                        </FormItem>
                    </Form>

                </Content>
            </Layout >
        );
    }
}

const RoleCreateForm = Form.create()(RoleCreate);

export default RoleCreateForm;
