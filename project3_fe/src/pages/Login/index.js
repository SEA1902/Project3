import classNames from 'classnames/bind';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Login.module.scss';
import * as userService from '~/services/userService';
import config from '~/config';

const cx = classNames.bind(styles);

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        const fetchApi = async () => {
            const result = await userService.login(username, password);
            
            if (result) {
                localStorage.setItem('user', JSON.stringify(result.user));

                navigate(config.routes.home);
            } else{
                alert('Sai tên đăng nhập hoặc mật khẩu')
            }
        };

        fetchApi();
    };

    return (
        <div className={cx('wrapper')}>
            <form className={cx('form-login')} onSubmit={handleLogin}>
                <label className={cx('form-label')}>Login</label>
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
                    <button type="submit" className={cx('btn-login')}>
                        Login
                    </button>
                    <Link to={config.routes.register} className={cx('btn-register')}>
                        Register
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default Login;
