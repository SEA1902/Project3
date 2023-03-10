import classNames from 'classnames/bind';
import { useState } from 'react';
import { message } from 'antd';

import styles from './Register.module.scss';
import * as userService from '~/services/userService';
import { Link, useNavigate } from 'react-router-dom';
import config from '~/config';

const cx = classNames.bind(styles);

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    const navigate = useNavigate();

    const handleRegister = () => {
        const fetchApi = async () => {
            await userService.register(username, password, phone, address);
        };

        fetchApi();
        message.success('Đăng ký thành công!');
        navigate(config.routes.login);
    };
    return (
        <div className={cx('wrapper')}>
            <form className={cx('form-login')} onSubmit={handleRegister}>
                <label className={cx('form-label')}>Register</label>
                <div className={cx('form-group')}>
                    <label>Username: </label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                    />
                </div>
                <div className={cx('form-group')}>
                    <label>Phone: </label>
                    <input
                        type="text"
                        value={phone}
                        onChange={(e) => {
                            setPhone(e.target.value);
                        }}
                    />
                </div>
                <div className={cx('form-group')}>
                    <label>Address: </label>
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => {
                            setAddress(e.target.value);
                        }}
                    />
                </div>
                <div className={cx('form-group')}>
                    <label>Password: </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        autoComplete="on"
                    />
                </div>

                <div className={cx('btn-group')}>
                    <button type="submit" className={cx('btn-register')}>
                        Register
                    </button>
                    <Link to={config.routes.login} className={cx('btn-login')}>
                        Login
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default Register;
