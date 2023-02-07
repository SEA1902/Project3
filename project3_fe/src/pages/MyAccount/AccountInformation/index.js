import classNames from 'classnames/bind';
import { Table } from 'antd';
import { useEffect, useState } from 'react';
import { Button, Form, Modal, Input } from 'antd';

import * as orderService from '~/services/orderService';
import * as userService from '~/services/userService';
import styles from './AccountInformation.module.scss';

const cx = classNames.bind(styles);

function AccountInformation() {
    const user = JSON.parse(localStorage.getItem('user'));
    const [recentOrder, setRecentOrder] = useState([]);
    const [uername, setUserName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [isModalAddress, setIsModalAddress] = useState(false);
    const [isModalEdit, setIsModalEdit] = useState(false);
    const [isModalChangePassword, setIsModalChangePassword] = useState(false);

    const [formAddress] = Form.useForm();
    const [formEdit] = Form.useForm();
    const [formChangePassword] = Form.useForm();

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
    ];

    const handleEdit = async () => {
        const value = await formAddress.validateFields();
        const result = await userService.updateInformation(value.username, value.phone);
    };
    const handleChangePassword = async () => {
        const value = await formAddress.validateFields();
    };
    const handleAddress = async () => {
        const value = await formAddress.validateFields();
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
                    <Modal
                        title="Thay đổi thông tin"
                        open={isModalEdit}
                        onOk={handleEdit}
                        onCancel={() => setIsModalEdit(false)}
                    >
                        <Form
                            form={formEdit}
                            name="edit_information"
                            style={{
                                maxWidth: 600,
                            }}
                        >
                            <Form.Item
                                label="User Name"
                                name="username"
                                rules={[{ required: true, message: 'Please input username' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Phone"
                                name="phone"
                                rules={[{ required: true, message: 'Please input phone' }]}
                            >
                                <Input />
                            </Form.Item>
                            {/* {errorInputAddress && <span>{errorInputAddress}</span>} */}
                        </Form>
                    </Modal>

                    <div onClick={() => setIsModalChangePassword(true)}>Change Password</div>
                    <Modal
                        title="Đổi mật khẩu"
                        open={isModalChangePassword}
                        onOk={handleChangePassword}
                        onCancel={() => setIsModalChangePassword(false)}
                    >
                        <Form
                            form={formChangePassword}
                            name="change_password"
                            style={{
                                maxWidth: 600,
                            }}
                        >
                            <Form.Item
                                label="Mật khẩu cũ"
                                name="old_password"
                                rules={[{ required: true, message: 'Please input old password' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Mật khẩu mới"
                                name="new_password"
                                rules={[{ required: true, message: 'Please input old new password' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Form>
                    </Modal>
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
                    <Modal
                        title="Đổi địa chỉ"
                        open={isModalAddress}
                        onOk={handleAddress}
                        onCancel={() => setIsModalAddress(false)}
                    >
                        <Form
                            form={formAddress}
                            name="address"
                            style={{
                                maxWidth: 600,
                            }}
                        >
                            <Form.Item
                                label="Địa chỉ"
                                name="address"
                                rules={[{ required: true, message: 'Please input address!' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Form>
                    </Modal>
                </div>
            </div>

            <div className={cx('group-information')}>
                <label className={cx('label-group')}>Recent Orders</label>
                <Table dataSource={recentOrder} columns={columns} />;
            </div>
        </div>
    );
}

export default AccountInformation;
