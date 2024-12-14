import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import styles from './Login.module.scss';
import classNames from 'classnames/bind';
import { jwtDecode } from "jwt-decode";
import { login } from '~/services/authService';
import { getMyInfo } from '~/services/teacherService';
const cx = classNames.bind(styles);

function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { token, authenticated } = await login(username, password);
            localStorage.setItem('token', token);
            
                if (authenticated) {
                    const decodedToken = jwtDecode(token);
                    const role = decodedToken.scope;
                    const currentUsername = decodedToken.sub;

                    localStorage.setItem('role', role);
                    localStorage.setItem('username', currentUsername);
                    console.log('Login successful');

                    try {
                        const myInfo = await getMyInfo();
                        console.log('My Info:', myInfo);
                        console.log('Teacher Code:', myInfo.teacherCode);
        
                        localStorage.setItem('teacherCode', myInfo.teacherCode);

                    } catch (error) {
                        console.error('Error fetching my info:', error);
                        setError('Unable to fetch user information');
                    }

                    switch (role) {
                        case 'ROLE_ADMIN':
                            navigate('/admin');
                            break;
                        case 'ROLE_MANAGER':
                            navigate('/manager');
                            break;
                        case 'ROLE_TEACHER':
                            navigate('/teacher');
                            break;
                        default:
                            navigate('/');
                            break;
                    }
                } else {
                    setError('Authentication failed');
                }
        } catch (err) {
            setError('Invalid username or password');
            console.error('Login error:', err);
        }
    };

    return (
<div>
            <form className={cx('loginForm')} onSubmit={handleLogin}>
                <div>
                    <label>Tài khoản  </label>
                    <input
                        className={cx('inputField')}
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Nhập tài khoản của bạn"
                    />
                </div>
                <div>
                    <label>Mật khẩu  </label>
                    <input
                        className={cx('inputField')}
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='nhập mật khẩu của bạn'
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button className={cx('loginBtn')} type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;