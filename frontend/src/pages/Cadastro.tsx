import { Container } from "react-bootstrap";
import { FaTrashAlt } from 'react-icons/fa'
import Footer from "../components/Footer";

interface Usuario {
    key: number;
    nome: string;
    telefone: string;
    enderecos: string[];
}

const joao: Usuario = {
    key: 1,
    nome: "João da Silva",
    telefone: "(11) 988456213",
    enderecos: ["Rua dos Santos, 26", "Rua dos Anjos, 25"]
}

export function Cadastro() {
    return (
        <Container className="d-flex justify-content-center inicio-principal">
            <div className='socilite-recolha d-flex flex-column cadastro'>
                <h4>Cadastro</h4>
                <div className="formulario">
                    <div className="row gap-2   mt-4">
                        <label htmlFor="" className="form-label">Nome:</label>
                        <div className="col-sm-6 d-grid px-0"><input type="text" className="form-control" placeholder={joao.nome} /></div>
                        <div className="col-sm-4 d-grid px-0"><button className="btn btn-primary">Alterar</button></div>
                    </div>

                    <div className="row gap-2   mt-4">
                        <label htmlFor="" className="form-label">Telefone:</label>
                        <div className="col-sm-6 d-grid px-0"><input type="text" className="form-control" placeholder={joao.telefone} /></div>
                        <div className="col-sm-4 d-grid px-0"><button className="btn btn-primary">Alterar</button></div>
                    </div>

                    <div className="row gap-2   mt-4">
                        <label htmlFor="" className="form-label">Endereços:</label>

                        {
                            joao.enderecos.map(x => (
                                <>
                                    <div className="col-7 d-grid px-0"><input type="text" placeholder={x} className="form-control" /></div>
                                    <div className="col-3 d-grid px-0"><button className="btn btn-primary">Alterar</button></div>
                                    <div className="col-1 d-grid px-0">
                                        <button className="btn btn-outline-primary">
                                            <FaTrashAlt />
                                        </button></div>
                                </>
                            ))
                        }
                    </div>

                    <div className="row gap-2   mt-4">
                        <label htmlFor="" className="form-label">Senha:</label>
                        <div className="col-sm-6 d-grid px-0"><input type="password" className="form-control" /></div>
                        <div className="col-sm-4 d-grid px-0"><button className="btn btn-primary">Alterar</button></div>
                    </div>


                </div>



            </div>
            
            
        </Container>

    )
}