import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import ProductList from '~/components/ProductList';
import { useEffect, useState } from 'react';
import * as productsService from '~/services/productsService';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import 'bootstrap/dist/css/bootstrap.min.css';
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

    return (
        <div className={cx('wrapper')}>
            <nav className={cx('navbar')}>
                {listSubCategory.map((subCategory, index) => {
                    const listArticleType = listCategory
                        .filter((category) => category._id.subCategory == subCategory)
                        .map((category, idx) => category._id.articleType);
                    return (
                        <DropdownButton
                            as={ButtonGroup}
                            key={subCategory}
                            id={`dropdown-variants-${subCategory}`}
                            variant={subCategory.toLowerCase()}
                            title={subCategory}
                            className={cx('itemNav')}
                            size={'lg'}
                        >
                            {listArticleType?.map((articleType, idx) => (
                                <Dropdown.Item
                                    eventKey={articleType}
                                    onClick={() => {
                                        setArticleType(articleType);
                                        setSubCategory(subCategory);
                                    }}
                                >
                                    {articleType}
                                </Dropdown.Item>
                            ))}
                        </DropdownButton>
                    );
                })}
            </nav>
            <ProductList subCategory={subCategory} articleType={articleType} />
        </div>
    );
}

export default Home;
// return (
//     <div className={cx('itemNav')} key={index}>
//         <div>
//             {subCategory}
//             <FontAwesomeIcon icon={faAngleDown} className={cx('icon-down')} />
//         </div>
//         <div className={cx('list-item')}>
//             {listCategory.map(
//                 (category, idx) =>
//                     category._id.subCategory == subCategory && (
//                         <button
//                             className={cx('item-articleType')}
//                             onClick={() => {
//                                 setArticleType(category._id.articleType);
//                                 setSubCategory(category._id.subCategory);
//                             }}
//                             key={idx}
//                         >
//                             {category._id.articleType}
//                         </button>
//                     ),
//             )}
//         </div>
//     </div>
// );
