import { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

const LazyAuth = lazy(() => {
  console.log("Tentando carregar auth/App...");
  
  return import('auth/App')
    .catch(error => {
      console.error("Erro ao carregar auth/App:", error);
      
      return {
        default: () => (
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <h2>Componente de Login (Fallback)</h2>
            <p>Não foi possível carregar o microfrontend de autenticação.</p>
            <p>Verifique se o serviço mfe-auth está rodando em <a href="http://localhost:5002" target="_blank" rel="noopener noreferrer">http://localhost:5002</a></p>
          </div>
        )
      };
    });
});

const LazyDashboard = lazy(() => {
  console.log("Tentando carregar dashboard/Dashboard...");
  
  return import('dashboard/Dashboard')
    .catch(error => {
      console.error("Erro ao carregar dashboard/Dashboard:", error);
      
      return {
        default: () => (
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <h2>Dashboard (Fallback)</h2>
            <p>Não foi possível carregar o microfrontend do dashboard.</p>
            <p>Verifique se o serviço mfe-dashboard está rodando em <a href="http://localhost:5003" target="_blank" rel="noopener noreferrer">http://localhost:5003</a></p>
          </div>
        )
      };
    });
});

const Loading = () => (
  <div style={{ 
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100%'
  }}>
    Carregando...
  </div>
);

function App() {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  return (
    <>
      <div style={{ 
        height: '100vh',
        width: '100%',
        margin: 0,
        padding: 0,
        overflow: 'auto' 
      }}>
        <Suspense fallback={<Loading />}>
          {isAuthenticated ? <LazyDashboard /> : <LazyAuth />}
        </Suspense>
      </div>
      <ToastContainer />
    </>
  );
}

export default App;