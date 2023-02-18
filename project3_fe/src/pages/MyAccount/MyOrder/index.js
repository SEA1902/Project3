import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Button, Space, Table, Modal } from 'antd';

import * as orderService from '~/services/orderService';
import styles from './MyOrder.module.scss';

const cx = classNames.bind(styles);

function MyOrder() {
    const user = JSON.parse(localStorage.getItem('user'));
    const [orders, setOrders] = useState([]);
    const [orderView, setOrderView] = useState({});
    const [isViewOrder, setIsViewOrder] = useState(false);
    const [isModalDeleteOrder, setIsModalDeleteOrder] = useState(false);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await orderService.getAllOrders(user._id);
            setOrders(result);
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
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="primary" onClick={() => handleViewOrder(record)}>
                        View Order
                    </Button>
                    {record.state === '0' && (
                        <Button
                            type="primary"
                            danger
                            onClick={() => {
                                setIsModalDeleteOrder(true);
                                setOrderView(record);
                            }}
                        >
                            Delete
                        </Button>
                    )}
                    {record.state !== '0' && (
                        <Button disabled type="primary" danger>
                            Delete
                        </Button>
                    )}
                </Space>
            ),
        },
    ];

    const columnsOrderItem = [
        {
            title: 'Product Name',
            key: 'name',
            render: (_, record) => <span>{record.product.productDisplayName}</span>,
        },
        {
            title: 'Price',
            key: 'price',
            render: (_, record) => <span>{record.product.price}$</span>,
        },
        {
            title: 'Qty',
            dataIndex: 'quantity',
            key: 'quantity',
        },
    ];
    const ViewOrder = () => (
        <div>
            <Button
                size="small"
                onClick={() => setIsViewOrder(false)}
                style={{
                    position: 'absolute',
                    right: 40,
                }}
            >
                Close
            </Button>
            <div className={cx('group-orderView')}>
                <label>Ngày đặt:</label>
                <div>{orderView.createdAt}</div>
            </div>
            <div className={cx('group-orderView')}>
                <label>Địa chỉ shipping:</label>
                <div>{orderView.address}</div>
            </div>
            <div className={cx('group-orderView')}>
                <label>Trạng thái:</label>
                {orderView.state === '0' && <div>Đang chờ xử lý</div>}
                {orderView.state === '1' && <div>Đang Shipping</div>}
                {orderView.state === '2' && <div>Hoàn thành</div>}
            </div>

            <div className={cx('table-product')}>
                <Table dataSource={orderView.items} columns={columnsOrderItem} pagination={false} />
                <div className={cx('orderView-total')}>
                    <label>Total:</label>
                    <span>{orderView.total}$</span>
                </div>
            </div>
        </div>
    );
    const handleViewOrder = (record) => {
        setOrderView(record);
        setIsViewOrder(true);
    };
    const handleDeleteOrder = async () => {
        await orderService.deleteOrder(orderView._id);
        setIsModalDeleteOrder(false);
        window.location.reload(false);
    };
    return (
        <div className={cx('container')}>
            <label className={cx('label-page')}>My Order</label>

            {isViewOrder ? (
                <ViewOrder />
            ) : (
                <div className={cx('group-information')}>
                    <Table dataSource={orders} columns={columns} />
                    <Modal
                        open={isModalDeleteOrder}
                        title="Bạn có chắc chắn muốn hủy đơn hàng?"
                        okText="Có"
                        cancelText="Không"
                        onCancel={() => setIsModalDeleteOrder(false)}
                        onOk={() => handleDeleteOrder()}
                    ></Modal>
                </div>
            )}
        </div>
    );
}

export default MyOrder;
