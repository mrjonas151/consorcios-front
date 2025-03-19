import styles from './LoginForm.module.css';
import { FaUser, FaLock } from 'react-icons/fa';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { loginUser } from '../../redux/store';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useAppDispatch();
    const { loading, error } = useAppSelector(state => state.auth);

    const onSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const result = await dispatch(loginUser(username, password));
        
        if (result.success) {
            toast.success('Bem-vindo!');
        } else {
            toast.error(`Login falhou: ${error}`);
        }
    };

    return (
        <main className={styles.mainContainer}>
            <div className={styles.wrapper}>
                <form onSubmit={onSignIn}>
                    <h1>Login</h1>
                    
                    <div className={styles.inputBox}>
                        <input
                            type='text'
                            placeholder='Email/Username'
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <FaUser className={styles.icon} />
                    </div>
                    
                    <div className={styles.inputBox}>
                        <input
                            type='password'
                            placeholder='Senha'
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <FaLock className={styles.icon} />
                    </div>
                    
                    <button type='submit' className={styles.loginButton}>
                        Login
                    </button>
                </form>
            </div>
        </main>
    );
};

export default LoginForm;

