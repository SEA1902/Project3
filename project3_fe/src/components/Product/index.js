import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Product.module.scss';
import Button from '../Button';
import * as cartService from '~/services/cartService';
import config from '~/config';
import { useContext } from 'react';
import { QuantityCart } from '~/App';
import { message } from 'antd';

const cx = classNames.bind(styles);

function Product({ product }) {
    const { setQuantityCart } = useContext(QuantityCart);
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();

    const handleAddToCart = (product) => {
        const item = {
            product: product,
            quantity: 1,
        };
        const fetchApi = async () => {
            if (user) {
                const result = await cartService.post(user._id, item);
                setQuantityCart(result.items.length);
                message.success(`Thêm ${product.productDisplayName} vào giỏ hàng thành công!`);
            } else {
                navigate(config.routes.login);
            }
        };
        fetchApi();
    };
    return (
        <div className={cx('wrapper')}>
            <Link
                to={{
                    pathname: config.routes.productpage,
                    search: `${product._id}`,
                }}
            >
                <img className={cx('product-image')} src={product.image} alt="products"></img>
                <div className={cx('product-name')}>{product.productDisplayName}</div>
            </Link>

            <div className={cx('product-price')}>
                <label>As low as </label>
                <span>${product.price}</span>
            </div>
            <div className={cx('product-btn')}>
                <Button primary onClick={() => handleAddToCart(product)}>
                    Add To Cart
                </Button>
            </div>
        </div>
    );
}

export default Product;
