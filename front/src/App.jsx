import { BrowserRouter } from "react-router-dom"
import { RoutesApp } from "./routes"
import { ThemeProvider } from "./components/theme-provider"

function App() {

  return (
    <BrowserRouter>
      <ThemeProvider>
        <RoutesApp />
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
