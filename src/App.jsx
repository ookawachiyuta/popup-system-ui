import { BrowserRouter } from "react-router-dom"
import TopLayout from "./components/layout/TopLayout.jsx"

function App() {
  return (
    <div className={"App"}>
      <BrowserRouter>
        <TopLayout/>
      </BrowserRouter>
    </div>
  )
}

export default App
