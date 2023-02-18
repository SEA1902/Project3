import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Modal, Input, Table, Space } from 'antd';

import * as orderService from '~/services/orderService';
import * as userService from '~/services/userService';
import styles from './AccountInformation.module.scss';
import config from '~/config';

const cx = classNames.bind(styles);

function AccountInformation() {
    const user = JSON.parse(localStorage.getItem('user'));
    const [recentOrder, setRecentOrder] = useState();
    const [isModalAddress, setIsModalAddress] = useState(false);
    const [isModalEdit, setIsModalEdit] = useState(false);
    const [isModalChangePassword, setIsModalChangePassword] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchApi = async () => {
            const result = await orderService.getRecentOrder(user._id);
            setRecentOrder(result);
        };
        fetchApi();
    }, [user._id]);
    const columns = [
        {
            title: 'Date',
            dataIndex: 'createdAt',
            key: 'createAt',
        },
        {
            title: 'Ship to',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Order Total',
            dataIndex: 'total',
            key: 'total',
        },
        {
            title: 'State',
            dataIndex: 'state',
            key: 'state',
            render: (_, { state }) => (
                <Space>
                    {state === '0' && <span>Đang chờ xử lý</span>}
                    {state === '1' && <span>Đang Shipping</span>}
                    {state === '2' && <span>Hoàn thành</span>}
                </Space>
            ),
        },
    ];

    const EditForm = ({ handleEdit }) => {
        const [form] = Form.useForm();
        return (
            <Modal
                open={isModalEdit}
                title="Thay đổi thông tin"
                okText="Xác nhận"
                cancelText="Hủy"
                onCancel={() => setIsModalEdit(false)}
                onOk={() => {
                    form.validateFields()
                        .then((values) => {
                            form.resetFields();
                            handleEdit(values);
                        })
                        .catch((info) => {
                            console.log('Validate Failed:', info);
                        });
                }}
            >
                <Form
                    form={form}
                    name="edit_information"
                    layout="vertical"
                    initialValues={{
                        modifier: 'public',
                    }}
                >
                    <Form.Item
                        label="User Name"
                        name="username"
                        rules={[{ required: true, message: 'Hãy nhập username' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label="Phone" name="phone" rules={[{ required: true, message: 'Hãy nhập SĐT' }]}>
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        );
    };
    const ChangePasswordForm = ({ handleChangePassword }) => {
        const [form] = Form.useForm();
        return (
            <Modal
                title="Đổi mật khẩu"
                okText="Xác nhận"
                cancelText="Hủy"
                open={isModalChangePassword}
                onCancel={() => setIsModalChangePassword(false)}
                onOk={() => {
                    form.validateFields()
                        .then((value) => {
                            form.resetFields();
                            handleChangePassword(value);
                        })
                        .catch((info) => {
                            console.log('Validate Failed:', info);
                        });
                }}
            >
                <Form
                    form={form}
                    name="change_password"
                    layout="vertical"
                    initialValues={{
                        modifier: 'public',
                    }}
                >
                    <Form.Item
                        label="Mật khẩu cũ"
                        name="oldPassword"
                        rules={[
                            { required: true, message: 'Nhập mật khẩu cũ' },
                            {
                                validator: (_, value) =>
                                    value === user.password
                                        ? Promise.resolve()
                                        : Promise.reject(new Error('Mật khẩu không đúng')),
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Mật khẩu mới"
                        name="newPassword"
                        rules={[{ required: true, message: 'Nhập mật khẩu mới' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Nhập lại khẩu mới"
                        name="repeatPassword"
                        rules={[
                            { required: true, message: 'Nhập mật khẩu mới' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (value === getFieldValue('newPassword')) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Mật khẩu nhập lại chưa đúng'));
                                },
                            }),
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        );
    };

    const AddressForm = ({ handleAddress }) => {
        const [form] = Form.useForm();
        return (
            <Modal
                title="Đổi địa chỉ"
                okText="Xác nhận"
                cancelText="Hủy"
                open={isModalAddress}
                onCancel={() => setIsModalAddress(false)}
                onOk={() => {
                    form.validateFields()
                        .then((values) => {
                            form.resetFields();
                            handleAddress(values);
                        })
                        .catch((info) => {
                            console.log('Validate Failed:', info);
                        });
                }}
            >
                <Form
                    form={form}
                    name="address"
                    layout="vertical"
                    initialValues={{
                        modifier: 'public',
                    }}
                >
                    <Form.Item
                        label="Địa chỉ"
                        name="address"
                        rules={[{ required: true, message: 'Hãy nhập địa chỉ mới' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        );
    };

    const handleEdit = async (value) => {
        const newUser = await userService.updateInformation(user._id, value.username, value.phone);
        localStorage.removeItem('user');
        localStorage.setItem('user', JSON.stringify(newUser));
        setIsModalEdit(false);
        window.location.reload(false);
    };
    const handleChangePassword = async (value) => {
        const newUser = await userService.updatePassword(user._id, value.newPassword);
        localStorage.removeItem('user');
        localStorage.setItem('user', JSON.stringify(newUser));
        setIsModalChangePassword(false);

        navigate(config.routes.login);
    };
    const handleAddress = async (value) => {
        const newUser = await userService.updateAddress(user._id, value.address);
        localStorage.removeItem('user');
        localStorage.setItem('user', JSON.stringify(newUser));
        setIsModalAddress(false);
        window.location.reload(false);
    };
    return (
        <div className={cx('container')}>
            <label className={cx('label-page')}>Account Information</label>

            <div className={cx('group-information')}>
                <label className={cx('label-group')}>Account Information</label>
                <div className={cx('group-item')}>
                    <label>Contact Information</label>
                    <div>{user.username}</div>
                    <div>{user.phone}</div>
                </div>
                <div className={cx('group-button')}>
                    <div onClick={() => setIsModalEdit(true)}>Edit</div>
                    <EditForm handleEdit={handleEdit} />

                    <div onClick={() => setIsModalChangePassword(true)}>Change Password</div>
                    <ChangePasswordForm handleChangePassword={handleChangePassword} />
                </div>
            </div>

            <div className={cx('group-information')}>
                <label className={cx('label-group')}>Address Book</label>
                <div className={cx('group-item')}>
                    <label>Default Address</label>
                    <div>{user.address}</div>
                </div>
                <div className={cx('group-button')}>
                    <div onClick={() => setIsModalAddress(true)}>Change Address</div>
                    <AddressForm handleAddress={handleAddress} />
                </div>
            </div>

            <div className={cx('group-information')}>
                <label className={cx('label-group')}>Recent Orders</label>
                <Table dataSource={recentOrder} columns={columns} />
            </div>
        </div>
    );
}

export default AccountInformation;
