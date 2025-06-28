import styles from './LoginForm.module.css';
import { FaUser, FaLock } from 'react-icons/fa';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from 'shared/authSlice';
import 'react-toastify/dist/ReactToastify.css';
import { unwrapResult } from '@reduxjs/toolkit';

interface RootState {
  auth: {
    isAuthenticated: boolean;
    user: { id: string; username: string; email: string; role: string } | null;
    token: string | null;
    status: "idle" | "loading" | "failed";
    error: string | null;
  };
}

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    
    const { status, error } = useSelector((state: RootState) => state.auth);
    const loading = status === "loading";

    const onSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            const resultAction = await dispatch(loginUser({ username, password }) as any);
            
            const unwrappedResult = unwrapResult(resultAction);
            
            toast.success(`Login bem-sucedido! Bem-vindo, ${unwrappedResult + "Olá"}!`);
            
        } catch (error: any) {
            const errorMessage = error.message || 'Falha na autenticação';
            toast.error(`Erro: ${errorMessage}`);
        }
    };

    return (
        <main className={styles.mainContainer}>
            <div className={styles.wrapper}>
                <form onSubmit={onSignIn}>
                    <h1>Login</h1>
                    
                    {error && <div className={styles.errorMessage}>{error}</div>}
                    
                    <div className={styles.inputBox}>
                        <input
                            type="text"
                            placeholder="Username"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            disabled={loading}
                        />
                        <FaUser className={styles.icon} />
                    </div>
                    
                    <div className={styles.inputBox}>
                        <input
                            type="password"
                            placeholder="Senha"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={loading}
                        />
                        <FaLock className={styles.icon} />
                    </div>
                    
                    <button 
                        type="submit" 
                        className={styles.loginButton}
                        disabled={loading}
                    >
                        {loading ? 'Processando...' : 'Entrar'}
                    </button>
                </form>
            </div>
        </main>
    );
};

export default LoginForm;