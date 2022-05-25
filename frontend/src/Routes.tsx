import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Historico } from "./pages/Historico";
import { Cadastro } from "./pages/Cadastro";

const AppRoutes = () => {

    return(
        <BrowserRouter>
        
        <Route path="/" element="{<inicio />}" ></Route>
        <Route path="/cadastro" element={<Cadastro />}></Route>
        <Route path="/historico" element={<Historico />}></Route>
        
        </BrowserRouter>
    )



}
export default AppRoutes;