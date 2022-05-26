
import './Inicio.css'

export default function Inicio() {
    return (
        <div className='inicio-principal'>
            <div className='socilite-recolha d-flex flex-column'>
                <h4>Solicite uma recolha</h4>
                <div className="mb-3 formulario">
                    <label className="form-label">Endereço:</label>
                    <select className="form-select" id="">
                        <option value={1}> Escolha ou cadastre seu endereço </option>
                    </select>

                    <div className='formulario'>
                        <label htmlFor='text-area' className='form-label text-area-personal'>Descrição:</label>
                        <div className="mb-3">
                            <input type="text" className="form-control" id="text-area" placeholder="Ex.: Sofá velho, 2m x 1.85m, etc "></input>
                        </div>
                    </div>

                    <div className='row g-3'>
                        <label htmlFor='text-area' className='form-label text-area-personal'>Melhor horário para recolha:</label>
                        <div className="col-sm-6">
                            <select className="form-select" id="inputEmail4">
                                <option value={1}>Dia da semana</option>
                                <option value={2}>Segunda-Feira</option>
                                <option value={3}>Terça-Feira</option>
                                <option value={4}>Quarta-Feira</option>
                                <option value={5}>Quinta-Feira</option>
                                <option value={6}>Sexta-Feira</option>
                                <option value={7}>Sábado</option>
                                <option value={8}>Domingo</option>
                            </select>
                        </div>
                        <div className="col-sm-6">
                            <select className="form-select" id="inputEmail4">
                                <option value={1}>Período</option>
                                <option value={2}>Manhã</option>
                                <option value={3}>Tarde</option>
                                <option value={4}>Noite</option>

                            </select>
                        </div>
                    </div>
                    <div className="d-grid gap-2 botao-solicitar">
                        <button className="btn btn-primary mt-4" type="button">Solicitar</button>
                    </div>


                </div>



            </div>


        </div>


    )
}