import styles from './LoginForm.module.css';
import { FaUser, FaLock } from 'react-icons/fa';
import { useState } from 'react';
import { toast } from 'react-toastify';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSignIn = (e: React.FormEvent) => {
        e.preventDefault();
        toast.success('Bem-vindo!');
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
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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

