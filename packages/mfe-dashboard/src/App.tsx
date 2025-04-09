import { ToastContainer } from "react-toastify";
import { toastConfig } from "./utils/toastConfig";
import Dashboard from "./pages/Dashboard/Dashboard";

function App() {

  return (
    <>
      <Dashboard />
      <ToastContainer {...toastConfig} />
    </>
  )
}

export default App
