
import axios, { AxiosRequestConfig } from 'axios';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../assets/Keys';
import { getSessionId, getSessionKey } from '../assets/Session_keys';
import './inicio.css'

export default function Inicio() {

    //declarando o navigate

    //definindo o usuário a partir do LocalStorage
    const usuario_ativo: number = getSessionId();
    const token_ativo: string = getSessionKey();
    const navigate = useNavigate();


    //aqui verificamos, sobretudo, se o token que o usuário tem está válido.
    //Se não for o caso, o mesmo é redirecionado para o login
    useEffect(() => {

    axios.get(`${BASE_URL}/auth`, {
        headers: {
            Authorization: `Bearer ${token_ativo}`
        }
    }).catch(
        function(error){
            if(error.response.status == 403){
                navigate("/");
            }
        }
    )
    }, []);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();

        const tipo = (event.target as any).tipo.value;
        const descricao = (event.target as any).descricao.value;
        const data = new Date().toLocaleString();
        const endereco = (event.target as any).endereco.value;
        const melhor_dia = (event.target as any).dayOfWeek.value;
        const melhor_periodo = (event.target as any).periodo.value;


        if (endereco == "" || descricao == "") {
            alert("Endereço e descrição não podem ser nulos!");
        } else { //só dispara se os campos não forem nulos. Simples assim. Sem Re-renderização


            //não vamos usar essa implementação, por enquanto
            //const dia = (event.target as any).dayOfWeek.value;
            //const periodo = (event.target as any).periodo.value;

            /* console.log(data);
            console.log("Endereço: " + endereco);
            console.log("Descrição: " + descricao);
            console.log("Tipo: " + tipo); */

            //Configuração do método POST
            const config: AxiosRequestConfig = {
                baseURL: `${BASE_URL}`,
                method: 'POST',
                url: '/solicitacoes',
                data: {
                    tipo: tipo,
                    descricao: descricao,
                    data: data,
                    endereco: endereco,
                    melhor_dia: melhor_dia,
                    melhor_horario: melhor_periodo,
                    user: usuario_ativo,
                    estado: 0 //sempre novas postagens entram com o status 'Aguardando'
                },
                headers: {
                    Authorization: `Bearer ${token_ativo}`
                }
            }

            //Disparando o método post
            axios(config).then(
                response => {
                    console.log(response.status);
                    console.log(response.data);
                    alert("Solicitação criada com sucesso!");
                    navigate("/historico");
                }
            )
    

        }
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