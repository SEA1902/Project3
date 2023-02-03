import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import styles from './Cart.module.scss';
import * as cartService from '~/services/cartService';
import ItemCart from '~/components/ItemCart';
import Button from '~/components/Button';
import config from '~/config';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function Cart() {
    const [items, setItems] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const navigate = useNavigate()

    const user = JSON.parse(localStorage.getItem('user'));
    
    useEffect(() => {
        if(!user) navigate(config.routes.login);
        else {
            const fetchApi = async () => {
                const result = await cartService.get(user._id);
    
                setItems(result.items);
    
                let subtotal = 0;
    
                result.items.forEach((item) => {
                    subtotal += item.product.price * item.quantity;
                });
    
                setSubtotal(subtotal);
            };
            fetchApi();
        }
    }, []);

    const deleteItem = (id) => {
        setItems((preState) => {
            let tmp = [...preState];
            tmp = tmp.filter((current) => {
                return current._id !== id;
            });
            return tmp;
        });
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('item-list')}>
                {items.map((item, index) => (
                    <ItemCart
                        key={index}
                        item={item}
                        subtotal={subtotal}
                        setSubtotal={setSubtotal}
                        deleteItem={deleteItem}
                    />
                ))}
            </div>

            <div className={cx('subtotal')}>
                <div className={cx('subtotal-label')}>SubTotal</div>
                <span className={cx('subtotal-value')}>${subtotal}</span>
                <div className={cx('checkout-btn')}>
                    <Button to={config.routes.checkout} primary disabled={!items.length}>
                        Checkout
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Cart;
