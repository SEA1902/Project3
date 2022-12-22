// import { useEffect, useRef, useState } from 'react';
// import { Link } from 'react-router-dom';
// import classNames from 'classnames/bind';
// import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import Tippy from '@tippyjs/react/headless'

// import { SearchIcon } from '~/components/Icons';
// import { useDebounce } from '~/hooks';
// import { Wrapper as PopperWrapper } from '~/components/Popper';
// import styles from './Search.module.scss';
// import * as searchServices from '~/services/searchService';
// import config from '~/config'

// const cx = classNames.bind(styles);

// function Search() {
//     const [searchValue, setSearchValue] = useState('');
//     const [searchResult, setSearchResult] = useState([]);
//     const [showResult, setShowResult] = useState(false);
//     const [loading, setLoading] = useState(false);

//     const debouncedValue = useDebounce(searchValue, 500)
//     const inputRef = useRef();

//     useEffect(() => {
//         if (!debouncedValue.trim()) {
//             setSearchResult([]);
//             return;
//         }

//         const fetchApi = async () => {
//             setLoading(true);

//             const result = await searchServices.search(debouncedValue);
//             setSearchResult(result);
//             setLoading(false);
//         };

//         fetchApi();
//     }, [debouncedValue])
//     const handleClear = () => {
//         setSearchValue('');
//         setSearchResult([]);
//         inputRef.current.focus();
//     };

//     const handleHideResult = () => {
//         setShowResult(false);
//     };

//     const handleChange = (e) => {
//         const searchValue = e.target.value;
//         if (!searchValue.startsWith(' ')) {
//             setSearchValue(searchValue);
//         }
//     };

//     return (
//             <Tippy
//                 interactive
//                 visible={showResult && searchResult.length > 0}
//                 render={(attrs) => (
//                     <div className={cx('search-result')} tabIndex="-1" {...attrs}>
//                         <PopperWrapper>
//                             <h4 className={cx('search-title')}>Products</h4>
//                             {
//                                 searchResult.map((result, index) => (
//                                     <Link 
//                                         to={{
//                                         pathname: config.routes.productpage,
//                                         search: `${result._id}`,
//                                         }} 
//                                         className={cx('search-item')} 
//                                         key={index}
//                                     >
//                                         <img src={result.image} alt={result.name}></img>
//                                         <div className={cx('search-product-info')}>
//                                             <span>{result.name}</span>
//                                             <span>${result.price}</span>
//                                         </div>
//                                     </Link>
//                                 ))
//                             }
//                         </PopperWrapper>
//                     </div>
//                 )}
//                 onClickOutside={handleHideResult}
//             >

//             <div className={cx('search')}>
//                 <input
//                     ref={inputRef}
//                     value={searchValue}
//                     placeholder="Search Products"
//                     spellCheck={false}
//                     onChange={handleChange}
//                     onFocus={() => setShowResult(true)}
//                 />
//                 {searchValue && !loading && (
//                     <button className={cx('clear')} onClick={handleClear}>
//                         <FontAwesomeIcon icon={faCircleXmark} />
//                     </button>
//                 )
//                 }
//                 {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner}/>}
//                 <button className={cx('search-btn')} onMouseDown={(e) => e.preventDefault()}>
//                     <SearchIcon />
//                 </button>
//             </div>
//             </Tippy>
        
//     );
// }

// export default Search;
