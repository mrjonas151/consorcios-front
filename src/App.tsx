import { ToastContainer } from "react-toastify";
import SignIn from "./pages/SignIn/SignIn";
import { toastConfig } from "./utils/toastConfig";

function App() {
  return (
    <>
      <SignIn />
      <ToastContainer {...toastConfig} />
    </>
  )
}

export default App
