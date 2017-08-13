/**
 * Created by VLER on 2017/8/12.
 */
import '../system.css';
import React from 'react';
import {Layout, Form, Breadcrumb, Button, Input} from 'antd';
import {SystemActions, SystemStore} from '../sysapi';
const {Content} = Layout;
const FormItem = Form.Item;

class UserCreate extends React.Component {
    constructor(props) {
        super(props);
        this.unsubscribe = SystemStore.listen(this.onStatusChange.bind(this));
        this.state = {};
    }

    onStatusChange = (type, data) => {
        if (type === "userCreate") {
            this.props.router.push("/system/users");
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
                    "username": values.username,
                    "password": values.password,
                    "cname": values.cname,
                    "icon": "/upload/default/icon.jpg"
                };
                SystemActions.userCreate(item);
                console.log('Received values of form: ', values);
            }
        });
    }

    checkUserName = (rule, value, callback) => {
        const form = this.props.form;
        if (value === 'aaa') {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }
    checkPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }
    checkConfirm = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], {force: true});
        }
        callback();
    }

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({confirmDirty: this.state.confirmDirty || !!value});
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
                        <Breadcrumb.Item href="#/system/users">用户列表</Breadcrumb.Item>
                        <Breadcrumb.Item>新建用户</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <Content style={{background: "#fff"}}>
                    <Form onSubmit={this.handleSubmit} className="form">
                        <FormItem {...formItemLayout} label="用户名" hasFeedback>
                            {getFieldDecorator('username', {
                                rules: [{required: true, message: 'Please input your username!'}, {
                                    validator: this.checkUserName,
                                }],
                            })(<Input />)}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="密码"
                            hasFeedback
                        >
                            {getFieldDecorator('password', {
                                rules: [{
                                    required: true, message: 'Please input your password!',
                                }, {
                                    validator: this.checkConfirm,
                                }],
                            })(
                                <Input type="password"/>
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="确认密码"
                            hasFeedback
                        >
                            {getFieldDecorator('confirm', {
                                rules: [{
                                    required: true, message: 'Please confirm your password!',
                                }, {
                                    validator: this.checkPassword,
                                }],
                            })(
                                <Input type="password" onBlur={this.handleConfirmBlur}/>
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="昵称"
                            hasFeedback
                        >
                            {getFieldDecorator('cname', {
                                rules: [{required: true, message: 'Please input your cname!',max:3, whitespace: true}],
                            })(
                                <Input />
                            )}
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

const UserCreateForm = Form.create()(UserCreate);

export default UserCreateForm;
