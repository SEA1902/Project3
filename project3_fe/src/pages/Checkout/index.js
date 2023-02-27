import classNames from 'classnames/bind';
import { useContext, useEffect, useState } from 'react';
import styles from './Checkout.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import config from '~/config';
import * as cartService from '~/services/cartService';
import * as orderService from '~/services/orderService';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Modal, Input, message } from 'antd';
import { QuantityCart } from '~/App';

const cx = classNames.bind(styles);

function Checkout() {
    const { setQuantityCart } = useContext(QuantityCart);
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();
    if (!user) navigate(config.routes.login);

    const [items, setItems] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const [shipping, setShipping] = useState(10);
    const [orderTotal, setOrderTotal] = useState(0);
    const [address, setAddress] = useState(user.address);
    const [isModalAddress, setIsModalAddress] = useState(false);
    const [errorInputAddress, setErrorInputAddress] = useState('');

    const [formAddress] = Form.useForm();

    useEffect(() => {
        const fetchApi = async () => {
            const result = await cartService.get(user._id);
            if (!result.items.length) navigate(config.routes.home);
            setItems(result.items);

            let subtotal = 0;
            result.items.forEach((item) => {
                subtotal += Number(item.product.price * item.quantity);
            });

            setSubtotal(subtotal);
            setOrderTotal(subtotal + shipping);
        };
        fetchApi();
    }, []);

    const handleDropdown = () => {
        const nextElement = document.getElementById('list-item');
        if (nextElement.style.display === 'block') {
            nextElement.style.display = 'none';
        } else {
            nextElement.style.display = 'block';
        }
    };

    const handleChangeShipMethod = (e) => {
        setShipping(Number(e.target.value));
        setOrderTotal(subtotal + Number(e.target.value));
    };

    const handlePlaceOrder = () => {
        const deleteCart = async () => {
            await cartService.deleteCart(user._id);
        };

        deleteCart();

        const addOrder = async () => {
            let order = {
                user: user,
                items: items,
                total: orderTotal,
                state: '0',
                address: address,
            };
            await orderService.post(order);
        };
        addOrder();
        setQuantityCart(0);
        message.success('Đặt hàng thành công!');
        navigate(config.routes.home);
    };
    const handleAddAddress = async () => {
        const value = await formAddress.validateFields();
        setAddress(value.address);
        setIsModalAddress(false);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('shipping')}>
                <div className={cx('shipping-address')}>
                    <label className={cx('shipping-address-label')}>Shipping Address</label>
                    <div className={cx('group-address')}>
                        <div>
                            <div className={cx('address-item')}>
                                <label>Address Shipping:</label>
                                <div>{address}</div>
                            </div>
                            <Button onClick={() => setAddress(user.address)}>Địa chỉ mặc định</Button>
                        </div>

                        <Button className={cx('btn-add-address')} onClick={() => setIsModalAddress(true)}>
                            Đổi địa chỉ Shipping
                        </Button>
                    </div>
                    <Modal
                        title="Address Shipping"
                        open={isModalAddress}
                        onOk={handleAddAddress}
                        onCancel={() => setIsModalAddress(false)}
                    >
                        <Form
                            form={formAddress}
                            name="add_address"
                            style={{
                                maxWidth: 600,
                            }}
                        >
                            <Form.Item
                                label="Shipping Address"
                                name="address"
                                rules={[{ required: true, message: 'Please input new shipping address!' }]}
                            >
                                <Input />
                            </Form.Item>
                            {errorInputAddress && <span>{errorInputAddress}</span>}
                        </Form>
                    </Modal>
                </div>
                <div className={cx('shipping-method')}>
                    <label className={cx('shipping-method-label')}>Shipping Method</label>
                    {subtotal >= 500 ? (
                        <div className={cx('method-options')}>
                            <div className={cx('option')}>
                                <input
                                    type="radio"
                                    name="method"
                                    value="0"
                                    checked={shipping == 0}
                                    onChange={(e) => handleChangeShipMethod(e)}
                                />
                                <span>$0.00</span>
                                <label>Free Ship</label>
                            </div>
                            <div className={cx('option')}>
                                <input
                                    type="radio"
                                    name="method"
                                    value="10"
                                    checked={shipping == 10}
                                    onChange={(e) => handleChangeShipMethod(e)}
                                />
                                <span>$10</span>
                            </div>
                        </div>
                    ) : (
                        <div className={cx('method-options')}>
                            <div className={cx('option')}>
                                <input
                                    type="radio"
                                    name="method"
                                    value="10"
                                    checked={shipping == 10}
                                    onChange={(e) => handleChangeShipMethod(e)}
                                />
                                <label>$10</label>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className={cx('order-summary')}>
                <label className={cx('order-label')}>Order Summary</label>

                <div className={cx('money-group')}>
                    <span>Cart Subtotal</span>
                    <span>{subtotal}</span>
                </div>
                <div className={cx('money-group')}>
                    <span>Shipping</span>
                    <span>{shipping}</span>
                </div>
                <div className={cx('order-total')}>
                    <span>Order Total</span>
                    <span>${orderTotal}</span>
                </div>

                <div className={cx('item-dropdown')}>
                    <div className={cx('dropdown-label')} onClick={handleDropdown}>
                        {items.length} Items in Cart
                        <FontAwesomeIcon icon={faCaretDown} />
                    </div>
                    <div className={cx('list-item')} id="list-item">
                        {items.map((item, index) => (
                            <div className={cx('item')} key={index}>
                                <img src={item.product.image} alt={item.product.name}></img>
                                <div className={cx('product-info')}>
                                    <span>{item.product.name}</span>
                                    <span>Qty: {item.quantity}</span>
                                    <span>${item.product.price * item.quantity}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={cx('btn-submit')}>
                    <Button type="primary" size="large" to={config.routes.home} onClick={handlePlaceOrder}>
                        Place Order
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Checkout;
