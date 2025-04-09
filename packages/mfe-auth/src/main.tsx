import { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { toastConfig } from "./utils/toastConfig";
import App from "./App";

const Loading = () => <div>Carregando...</div>;

const bootstrap = async () => {
  try {
    const { store } = await import("shared/store");
    
    createRoot(document.getElementById("root")!).render(
      <Provider store={store}>
        <Suspense fallback={<Loading />}>
          <App />
        </Suspense>
        <ToastContainer {...toastConfig} />
      </Provider>
    );
  } catch (error) {
    console.error("Erro ao carregar a store:", error);
    createRoot(document.getElementById("root")!).render(
      <div style={{ padding: "20px", color: "red" }}>
        <h2>Erro ao carregar a aplicação</h2>
        <p>Verifique se o microfrontend shared está em execução.</p>
      </div>
    );
  }
};

bootstrap();