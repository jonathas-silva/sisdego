import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header_logado from "./components/Header_logado"
import { Cadastro } from "./pages/Cadastro";
import { Historico } from "./pages/Historico";
import Inicio from "./pages/Inicio";


function App() {
  return (
    <>
    <BrowserRouter>
      <Header_logado />
      <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/historico" element={<Historico />} />
      <Route path="/cadastro" element={<Cadastro />} />
      </Routes>
    </BrowserRouter>
    <Footer/>
    </>
  )
}

export default App;