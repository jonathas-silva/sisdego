import { Container } from "react-bootstrap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header_logado from "./components/Header_logado"
import { Cadastro } from "./pages/Cadastro";
import { Historico } from "./pages/Historico";
import Inicio from "./pages/Inicio";
import './App.css'
import Teste from "./pages/testes";
import CatadorHome from "./pages/CatadorHome";
import Login from "./pages/Login";


function App() {
  return (
    <>
      <BrowserRouter>
        <Header_logado />
        <div className="principal-container m-0 p-0 ">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/historico" element={<Historico />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/testes" element={<Teste />} />
            <Route path="/catador" element={<CatadorHome />} />
          </Routes>
          <Footer />
        </div>
        
      </BrowserRouter>


    </>
  )
}

export default App;