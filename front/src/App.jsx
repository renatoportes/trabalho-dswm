import { BrowserRouter } from "react-router-dom"
import { RoutesApp } from "./routes"
import { ThemeProvider } from "./components/theme-provider"
import AuthProvider from "./contexts/auth"
import { Flip, ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <ToastContainer autoClose={3000} transition={Flip} closeButton draggable theme='light' />
          <RoutesApp />
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
