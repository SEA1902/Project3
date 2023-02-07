import classNames from 'classnames/bind';
import { useState } from 'react';
import styles from './MyAccount.module.scss';
import { Menu } from 'antd';
import AccountInformation from './AccountInformation';
import MyOrder from './MyOrder';

const cx = classNames.bind(styles);

function MyAccount() {
    const [keyMenu, setKeyMenu] = useState('1');
    // const user = JSON.parse(localStorage.getItem('user'));
    const itemSideBar = [
        {
            label: 'Account Information',
            key: '1',
        },
        {
            label: 'My Order',
            key: '2',
        },
    ];
    return (
        <div className={cx('wrapper')}>
            <Menu
                className={cx('sidebar')}
                items={itemSideBar}
                defaultSelectedKeys={['1']}
                onClick={(key) => setKeyMenu(key.key)}
            />
            {keyMenu === '1' && <AccountInformation />}
            {keyMenu === '2' && <MyOrder />}
        </div>
    );
}

export default MyAccount;
