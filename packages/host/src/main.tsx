import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { initializeStore } from "./store/store";
import "react-toastify/dist/ReactToastify.css";
import "./index.css"

const Loading = () => <div>Carregando aplicação...</div>;

const bootstrap = async () => {
  try {
    const store = await initializeStore();
    
    const App = React.lazy(() => import("./App"));

    ReactDOM.createRoot(document.getElementById("root")!).render(
      <Provider store={store}>
        <Suspense fallback={<Loading />}>
          <App />
        </Suspense>
      </Provider>
    );
  } catch (error) {
    console.error("Erro ao inicializar a aplicação:", error);
    ReactDOM.createRoot(document.getElementById("root")!).render(
      <div style={{ padding: "20px", color: "red" }}>
        <h2>Erro ao carregar a aplicação</h2>
        <p>Verifique se todos os microfrontends estão em execução.</p>
        <pre>{String(error)}</pre>
      </div>
    );
  }
};

bootstrap();