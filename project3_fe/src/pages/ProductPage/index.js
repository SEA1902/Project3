import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { message } from 'antd';

import styles from './ProductPage.module.scss';
import Button from '~/components/Button';
import * as cartService from '~/services/cartService';
import * as productsService from '~/services/productsService';
import { useLocation, useNavigate } from 'react-router-dom';
import ProductRelate from '~/components/ProductRelate';
import config from '~/config';

const cx = classNames.bind(styles);

function ProductPage() {
    const user = JSON.parse(localStorage.getItem('user'));
    const [product, setProduct] = useState([]);
    const [productRelate, setProductRelate] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();
    let location = useLocation();
    var productId = location.search.slice(1);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await productsService.getById(productId);
            const productRelate = await productsService.getProductRecommendation(productId);
            // console.log(productRelate);
            setProduct(result);

            setProductRelate(productRelate);
        };

        fetchApi();
    }, [productId]);

    const handleAddToCart = () => {
        const item = {
            product: product,
            quantity: Number(quantity),
        };
        const fetchApi = async () => {
            if (user) {
                await cartService.post(user._id, item);
                message.success(`Thêm ${product.productDisplayName} vào giỏ hàng thành công!`);
            } else {
                navigate(config.routes.login);
            }
        };
        fetchApi();
    };

    const handleQuantity = (quantity) => {
        setQuantity(quantity);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('product-info')}>
                <div className={cx('product-media')}>
                    <img className={cx('product-image')} src={product.image} alt="products"></img>
                </div>
                <div className={cx('product-info-main')}>
                    <div className={cx('product-name')}>{product.productDisplayName}</div>
                    <div className={cx('product-price')}>
                        <label>As low as </label>
                        <span>${product.price}</span>
                    </div>

                    <div className={cx('product-quantity')}>
                        <label>Số lượng:</label>
                        <input
                            type="number"
                            onChange={(e) => handleQuantity(e.target.value)}
                            value={quantity}
                            min="1"
                        />
                    </div>

                    <div className={cx('product-btn')}>
                        <Button primary large onClick={handleAddToCart}>
                            Add To Cart
                        </Button>
                    </div>
                </div>
            </div>

            <div className={cx('product-relate')}>
                <div className={cx('product-relate-label')}>Product Relate</div>
                <div className={cx('product-relate-list')}>
                    {productRelate.map((product, index) => (
                        <ProductRelate product={product} key={index} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ProductPage;
