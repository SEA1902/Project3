import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import ProductList from '~/components/ProductList';
import { useEffect, useState } from 'react';
import * as productsService from '~/services/productsService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { Menu } from 'antd';
const cx = classNames.bind(styles);

function Home() {
    const [articleType, setArticleType] = useState('Shirts');
    const [subCategory, setSubCategory] = useState('Topwear');
    const [listSubCategory, setListSubCategory] = useState([]);
    const [listCategory, setListCategory] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await productsService.getSubCategory();
            setListSubCategory(result);

            const data = await productsService.getCategory();
            setListCategory(data);
        };

        fetchApi();
    }, []);
    const items = listSubCategory.map((subCategory) => {
        return {
            label: subCategory,
            key: 'subCategory-' + subCategory,
            icon: <FontAwesomeIcon icon={faAngleDown} />,
            children: listCategory
                .filter((category) => category._id.subCategory === subCategory)
                .map((category) => {
                    return {
                        label: <span>{category._id.articleType}</span>,
                        key: 'articleType-' + category._id.articleType,
                        onClick: () => {
                            setArticleType(category._id.articleType);
                            setSubCategory(subCategory);
                        },
                    };
                }),
        };
    });
    return (
        <div className={cx('wrapper')}>
            <nav className={cx('navbar')}>
                {/* {listSubCategory.map((subCategory, index) => {
                    const items = listCategory
                        .filter((category) => category._id.subCategory == subCategory)
                        .map((category, idx) => {
                            return {
                                label: (
                                    <span
                                        onClick={() => {
                                            setArticleType(category._id.articleType);
                                            setSubCategory(subCategory);
                                        }}
                                    >
                                        {category._id.articleType}
                                    </span>
                                ),
                                key: idx,
                            };
                        });

                    return (
                        <Dropdown
                            menu={{
                                items,
                            }}
                            key={index}
                            trigger={['click']}
                        >
                            <div onClick={(e) => {}} className={isActive ? cx('itemNav') : cx('itemNav')}>
                                <span>{subCategory}</span>
                                <FontAwesomeIcon icon={faAngleDown} />
                            </div>
                        </Dropdown>
                    );
                })} */}

                <Menu className={cx('menu')} mode="horizontal" items={items} />
            </nav>
            <ProductList subCategory={subCategory} articleType={articleType} />
        </div>
    );
}

export default Home;
