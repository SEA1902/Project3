import classNames from 'classnames/bind';
import styles from './ProductRelate.module.scss';
import Button from '../Button';

const cx = classNames.bind(styles);

function ProductRelate({ product }) {
    console.log(product);
    return (
        <div className={cx('wrapper')}>
            <div>
                <img className={cx('product-image')} src={product[4]} alt="products"></img>
                <div className={cx('product-name')}>{product[3]}</div>
            </div>

            <div className={cx('product-price')}>
                <label>As low as </label>
                <span>${product[5]}</span>
            </div>
            <div className={cx('product-btn')}>
                <Button primary>Add To Cart</Button>
            </div>
        </div>
    );
}

export default ProductRelate;
