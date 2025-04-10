import React, { lazy, Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

const Auth = lazy(() => import('auth/App'));
const Dashboard = lazy(() => import('dashboard/Dashboard'));

const Loading = () => <div>Carregando...</div>;

function App() {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  return (
    <>
      <div style={{ padding: '20px' }}>
        <header style={{ marginBottom: '20px' }}>
          <h1>Sistema de Consórcio</h1>
        </header>
        
        <main>
          <Suspense fallback={<Loading />}>
            {isAuthenticated ? <Dashboard /> : <Auth />}
          </Suspense>
        </main>
      </div>
      <ToastContainer />
    </>
  );
}

export default App;