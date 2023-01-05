import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import ProductList from '~/components/ProductList';
import { useState } from 'react';

const cx = classNames.bind(styles);

function Home() {
    const [articleType, setArticleType] = useState('Shirts');

    return (
        <div className={cx('wrapper')}>
            <nav className={cx('navbar')}>
                <button className={articleType === 'Shirts' ? cx('active') : cx('')} onClick={() => setArticleType('Shirts')}>
                    Shirts
                </button>
                <button className={articleType === 'Jeans' ? cx('active') : cx('')} onClick={() => setArticleType('Jeans')}>
                    Jeans
                </button>
            </nav>
            <ProductList articleType={articleType} />
        </div>
    );
}

export default Home;
