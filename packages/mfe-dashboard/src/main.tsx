import { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { ApolloProvider } from "@apollo/client";
import { ToastContainer } from "react-toastify";
import App from "./App";
import "react-toastify/dist/ReactToastify.css";

const Loading = () => <div>Carregando...</div>;

const bootstrap = async () => {
  try {
    try {
      const remoteModule = await import("shared/store");
      const apolloModule = await import("shared/apolloClient");
      
      const { store } = remoteModule;
      const { client } = apolloModule;
      
      if (!store || !client) {
        throw new Error("Store ou Apollo Client não encontrado");
      }

      createRoot(document.getElementById("root")!).render(
        <Provider store={store}>
          <ApolloProvider client={client}>
            <Suspense fallback={<Loading />}>
              <App />
            </Suspense>
            <ToastContainer />
          </ApolloProvider>
        </Provider>
      );
    } catch (importError) {
      console.error("Erro específico na importação:", importError);
      throw importError;
    }
  } catch (error) {
    console.error("Erro ao carregar a aplicação:", error);
    createRoot(document.getElementById("root")!).render(
      <div style={{ padding: "20px", color: "red" }}>
        <h2>Erro ao carregar a aplicação</h2>
        <p>Verifique se o microfrontend shared está em execução na porta 5001.</p>
        <pre style={{ background: "#f8f8f8", padding: "10px", overflowX: "auto" }}>
          {String(error)}
        </pre>
      </div>
    );
  }
};

bootstrap();