import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';

import styles from './Header.module.scss';
import config from '~/config';
import images from '~/assets/images';
import Search from '../Search';
import { CartIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

function Header() {
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate(config.routes.login);
    };
    const MenuInfo = () => {
        return (
            <div className={cx('user-dropdown')}>
                <Link to={config.routes.myAccount}>
                    <div>My Account</div>
                </Link>
                <div onClick={handleLogout}>Log out</div>
            </div>
        );
    };
    return (
        <header className={cx('wrapper')}>
            <div className={cx('navbar')}>
                {user ? (
                    <Tippy content={<MenuInfo />} interactive={true} theme="light">
                        <button className={cx('user-name')}>{user.username}</button>
                    </Tippy>
                ) : (
                    <div className={cx('navbar-links')}>
                        <Link to={config.routes.register} className={cx('navbar-link')}>
                            Register
                        </Link>
                        <div className={cx('navbar-separator')}></div>
                        <Link to={config.routes.login} className={cx('navbar-link')}>
                            Login
                        </Link>
                    </div>
                )}
            </div>
            <div className={cx('inner')}>
                <Link to={config.routes.home} className={cx('logo')}>
                    <img src={images.logo} alt="Shopify" />
                    <i>Project3</i>
                </Link>

                <Search />

                <Link to={config.routes.cart} className={cx('cart-btn')}>
                    <CartIcon />
                </Link>
            </div>
        </header>
    );
}

export default Header;
