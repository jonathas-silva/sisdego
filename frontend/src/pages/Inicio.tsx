
import React from 'react'
import './inicio.css'

export default function Inicio() {

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();

        const endereco = (event.target as any).endereco.value;
        const descricao = (event.target as any).descricao.value;
        const tipo = (event.target as any).tipo.value;
        const dia = (event.target as any).dayOfWeek.value;
        const periodo = (event.target as any).periodo.value;


        console.log("Endereço: " + endereco);
        console.log("Descrição: " + descricao);
        console.log("Tipo: " + tipo);
        console.log("Dia da Semana: " + dia);
        console.log("Período: " + periodo);
    }


    return (
        <div className='container-sm inicio-principal'>
            <div className='mt-4 p-1 d-flex flex-column'>
                <h4>Solicite uma recolha</h4>
                <form className="m-1 mb-2" onSubmit={handleSubmit}>
                    <label className="form-label" htmlFor='endereco'>Endereço:</label>
                    <input type="text" className="form-control" id="endereco" placeholder="Insira seu endereço"></input>


                    <div className="mt-3">
                        <label className="form-label" htmlFor='tipo'>Tipo:</label>
                        <select className="form-select" id="tipo">
                            <option>Móveis</option>
                            <option>Eletrodomésticos</option>
                            <option>Madeira/ Galhos</option>
                            <option>Outros</option>
                        </select>
                    </div>


                    <div className='formulario mt-2'>
                        <label htmlFor='descricao' className='form-label text-area-personal'>Descrição:</label>
                        <div className="mb-3">
                            <input type="text" className="form-control" id="descricao" placeholder="Ex.: Sofá velho, 2m x 1.85m, etc "></input>
                        </div>
                    </div>

                    <div className='row g-3'>
                        <label htmlFor='dayOfWeek' className='form-label text-area-personal'>Melhor horário para recolha:</label>
                        <div className="col-sm-6">
                            <select className="form-select" id="dayOfWeek">
                                <option>Segunda-Feira</option>
                                <option>Terça-Feira</option>
                                <option>Quarta-Feira</option>
                                <option>Quinta-Feira</option>
                                <option>Sexta-Feira</option>
                                <option>Sábado</option>
                                <option>Domingo</option>
                            </select>
                        </div>
                        <div className="col-sm-6">
                            <select className="form-select" id="periodo">
                                <option>Manhã</option>
                                <option>Tarde</option>
                                <option>Noite</option>
                            </select>
                        </div>
                    </div>
                    <div className="d-grid gap-2 botao-solicitar">
                        <button className="btn btn-primary mt-4" type="submit">Solicitar</button>
                    </div>
                </form>




            </div>


        </div>


    )
}