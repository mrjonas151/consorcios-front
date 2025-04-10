import styles from './LoginForm.module.css';
import { FaUser, FaLock } from 'react-icons/fa';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, setAuthLoading, setAuthError } from 'shared/authSlice';
import 'react-toastify/dist/ReactToastify.css';

interface RootState {
  auth: {
    isAuthenticated: boolean;
    user: { id: string; name: string; email: string } | null;
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
            dispatch(setAuthLoading());
            
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            if (username && password) {
                const mockUser = {
                    id: "1",
                    name: username,
                    email: `${username}@example.com`
                };
                const token = "mock-jwt-token-" + Math.random().toString(36).substring(2);
                
                dispatch(loginSuccess({ user: mockUser, token }));
                toast.success('Login bem-sucedido! Redirecionando...');
            } else {
                dispatch(setAuthError('Usuário ou senha inválidos'));
                toast.error('Usuário ou senha inválidos');
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Login falhou';
            dispatch(setAuthError(errorMessage));
            toast.error(`Login falhou: ${errorMessage}`);
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
                            placeholder="Email/Username"
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