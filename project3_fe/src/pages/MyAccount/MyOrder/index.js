import classNames from 'classnames/bind';
import styles from './MyOrder.module.scss';

const cx = classNames.bind(styles);

function MyOrder() {
    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <div className={cx('container')}>
            <label className={cx('label-page')}>My Order</label>

            <div className={cx('group-information')}>
                <label className={cx('label-group')}>Account Information</label>
                <div className={cx('group-item')}>
                    <label>Contact Information</label>
                    <div>{user.username}</div>
                    <div>{user.phone}</div>
                </div>
            </div>

            <div className={cx('group-information')}>
                <label className={cx('label-group')}>Address Book</label>
                <div className={cx('group-item')}>
                    <label>Default Address</label>
                    <div>{user.address}</div>
                </div>
            </div>
        </div>
    );
}

export default MyOrder;
