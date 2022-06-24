import React, { useEffect, useState } from "react";
import { Button, Col, Container, Modal, OverlayTrigger, Row, Stack, Toast, ToastContainer, Tooltip, TooltipProps } from "react-bootstrap";
import {UsuarioDTO } from "../assets/Types";
import './Historico.css';
import { FaTrashAlt } from 'react-icons/fa';
import { BsPencilFill } from 'react-icons/bs';
import { GrUpdate } from 'react-icons/gr';
import axios, { AxiosRequestConfig } from "axios";
import { BASE_URL } from "../assets/Keys";
import { getSessionId, getSessionKey, setSessionId, setSessionKey } from "../assets/Session_keys";
import { useNavigate } from "react-router-dom";



const dicaBtnApprove = (props: JSX.IntrinsicAttributes & TooltipProps & React.RefAttributes<HTMLDivElement>) => (
    <Tooltip id="button-tooltip" {...props}>
        Editar solicitação
    </Tooltip>
);
const dicaBtnCancel = (props: JSX.IntrinsicAttributes & TooltipProps & React.RefAttributes<HTMLDivElement>) => (
    <Tooltip id="button-tooltip" {...props}>
        Deletar solicitação
    </Tooltip>
);
const SolicitacaoAlterada = (props: JSX.IntrinsicAttributes & TooltipProps & React.RefAttributes<HTMLDivElement>) => (
    <Tooltip id="button-tooltip" {...props}>
        Solicitação alterada!
    </Tooltip>
);


//Interface com parâmetros opcionais
interface detalhes {
    id?: number;
    tipo?: string;
    descricao?: string;
    data?: string;
    endereco?: string;
    melhor_dia?: string;
    melhor_horario?: string;
    mostrar: boolean;
}

export function Historico() {


    const usuario_ativo: number = getSessionId();
    const token_ativo: string = getSessionKey();

    const inicializado: detalhes = {
        mostrar: false
    }

    const [lista, setLista] = useState<UsuarioDTO>();
    //CONTROLE DOS TOASTS
    const [showToastDelete, setShowToastDelete] = useState(false);
    const [showToastUpdate, setShowToastUpdate] = useState(false);
    const [showToastEdit, setShowToastEdit] = useState(false);


    /*useState utilizado para controlar a atualização do DB. Dado que o useEffect está
    monitorando a variável 'atualizar', então basta mudar o valor dessa variável para
    gerar uma nova leitura*/
    const [atualizar, setAtualizar] = useState(true);
    const nav = useNavigate();


    useEffect(() => {

        

        //Aqui fazemos com que o histórico mostre as solicitações apenas do usuário ativo
        axios.get(`${BASE_URL}/usuarios/${usuario_ativo}`, {
            headers: {
                Authorization: `Bearer ${token_ativo}`
            }
        }).then(
            response => {
                const data = response.data as UsuarioDTO;
                setLista(data);
                console.log(data);
            }

        //Aqui verificamos se o usuário não possui permissões.
        //Se for o caso, é redirecionado para o login
        ).catch(
            function (error) {
                if (error.response.status == 403){
                    setSessionId("-1");
                    setSessionKey("vazio");
                    alert("Parece que você não está logado. Faça o login para continuar!");
                    nav("/");
                }
            }
        )
        
             
        
    

    }, [atualizar]);

    function deleteEntry(id: number | undefined) {

        //ATUALIZAR FUNÇÃO PARA CONSIDERAR DELEÇÃO QUANDO A SOLICITAÇÃO JÁ FOI ACEITA

        const config: AxiosRequestConfig = {
            baseURL: `${BASE_URL}`,
            method: 'DELETE',
            url: `solicitacoes/${id}`,
            headers: {
                Authorization: `Bearer ${token_ativo}`
            }
        }

        axios(config).then(
            response => {
                console.log(response.status);
                setAtualizar(!atualizar); //está atualizando apenas depois que a resposta é recebida
                setShowToastDelete(true);
            }
        )

        //usando o useEffect para atualizar a leitura do banco de dados


        //utilizado para fechar o Modal
        setDetalhe({ mostrar: false });
    }






    //um use state que carrega todas as informações que eu preciso para mostrar os detalhes
    const [detalhe, setDetalhe] = React.useState<detalhes>(inicializado);
    const [showEditar, setShowEditar] = React.useState(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();

        const id = (event.target as any).primaryKey.value;        
        const tipo = (event.target as any).tipo.value;
        const descricao = (event.target as any).descricao.value;
        const endereco = (event.target as any).endereco.value;
        const melhor_dia = (event.target as any).dayOfWeek.value;
        const melhor_periodo = (event.target as any).periodo.value;

        if (endereco == "" || descricao == "") {
            alert("Endereço e descrição não podem ser nulos!");
        } else {
            const config: AxiosRequestConfig = {
                baseURL: `${BASE_URL}`,
                method: 'PUT',
                url: `/solicitacoes/${id}`,
                data: {
                    tipo: tipo,
                    descricao: descricao,
                    endereco: endereco,
                    melhor_dia: melhor_dia,
                    melhor_horario: melhor_periodo
                },
                headers: {
                    Authorization: `Bearer ${token_ativo}`
                }
            }
            axios(config).then(
                response => {
                    console.log(response.status);
                    console.log(response.data);
                    setShowToastUpdate(true);
                    setAtualizar(!atualizar);
                    setShowEditar(false);
                    setDetalhe({ mostrar: false });
                }
            )
        }}


    return (
        <div className='container-sm p-0'>
            <div className='mt-4 p-1 d-flex flex-column'>
                <div className="d-flex justify-content-between">
                    <h4 className="pt-1">Minhas solicitações:</h4>
                    <button className="btn border" onClick={() => setAtualizar(!atualizar)}><GrUpdate /></button>
                </div>
                <Container className="px-0 mb-2 mt-4">
                    <Row className="historico-cabecalho lead px-2 text-center">
                        <Col xs={4} sm={2}>Status</Col><Col xs={4} sm={6} >Data</Col><Col>Tipo</Col>
                    </Row>
                    {
                        lista?.solicitacoes.map(solicitacao => (

                            <Stack key={solicitacao.id}><button className="btn btn-light border"
                                onClick={() =>

                                    //inserindo os detalhes que serão mostrados no Modal
                                    setDetalhe(
                                        {
                                            id: solicitacao.id,
                                            tipo: solicitacao.tipo,
                                            descricao: solicitacao.descricao,
                                            data: solicitacao.data,
                                            endereco: solicitacao.endereco,
                                            melhor_dia: solicitacao.melhor_dia,
                                            melhor_horario: solicitacao.melhor_horario,
                                            mostrar: true
                                        }
                                    )


                                }>
                                <Row className="historico-lista">
                                    <Col xs={4} sm={2} className="text-truncate">{solicitacao.estado}</Col>
                                    <Col xs={4} sm={6} className="text-truncate">{solicitacao.data}</Col>
                                    <Col className="text-truncate">{solicitacao.tipo}</Col>
                                </Row></button>
                            </Stack>
                        ))

                    }


                </Container>

            </div>

            <Modal
                size="lg"
                show={detalhe.mostrar}
                aria-labelledby="contained-modal-title-vcenter"
                centered

                //o que acontece quando clicamos no 'x', fora da caixa de diálogo ou pressionamos 'esc'
                onHide={() => setDetalhe({ mostrar: false })}
            >

                <Modal.Header closeButton>
                    <Modal.Title>
                        {detalhe.tipo}
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div>
                        <p className="fw-light">Criado em {detalhe.data}</p>
                        <p>{detalhe.descricao}</p>
                        <p>Endereço: {detalhe.endereco}</p>
                        <p>Melhor dia: {detalhe.melhor_dia}</p>
                        <p>Melhor horário: {detalhe.melhor_horario}</p>
                    </div>
                    <div className="text-start">
                        {/* inserção de dica sobre o botão*/}
                        <OverlayTrigger
                            placement="top"
                            delay={{ show: 250, hide: 400 }}
                            overlay={dicaBtnApprove}>
                            <button className="btn btn-light border px-3" onClick={() => setShowEditar(true)}><BsPencilFill /></button>
                        </OverlayTrigger><OverlayTrigger
                            placement="bottom"
                            delay={{ show: 250, hide: 400 }}
                            overlay={dicaBtnCancel}>
                            <button className="btn btn-light border px-3" onClick={() => deleteEntry(detalhe.id)}><FaTrashAlt /></button>
                        </OverlayTrigger>
                    </div>

                </Modal.Body>
                <Modal.Footer className="d-flex justify-space-between">

                    <ToastContainer position="top-end">
                        <Toast show={showToastEdit} onClose={() => setShowToastEdit(false)} delay={2000} autohide>
                            <Toast.Body>Sua alteração não foi salva! (isso ainda não foi implantado)</Toast.Body>
                        </Toast>
                    </ToastContainer>

                    <Button className="d-flex" onClick={() => setDetalhe({ mostrar: false })}>Fechar</Button>
                </Modal.Footer>
            </Modal>
            {/* <DetailsModal show={detailShow} onHide={() => setDetailShow(false)} /> */}

            <Modal
                size="lg"
                show={showEditar}
                aria-labelledby="contained-modal-title-vcenter"
                centered

                //o que acontece quando clicamos no 'x', fora da caixa de diálogo ou pressionamos 'esc'
                onHide={() => setShowEditar(false)}>
                <Modal.Header >
                    <Modal.Title>
                        Editar solicitação {detalhe.id}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <form onSubmit={handleSubmit}>
                    <input readOnly hidden={true} id="primaryKey" value={detalhe.id}/>
                    <label className="form-label" htmlFor='tipo'>Tipo:</label>
                    <select className="form-select" id="tipo">
                            <option>Móveis</option>
                            <option>Eletrodomésticos</option>
                            <option>Madeira/ Galhos</option>
                            <option>Outros</option>
                        </select>
                        <label htmlFor="" className="form-label">Descrição:</label>
                        <input defaultValue={detalhe.descricao} className=" form-control m-1" type="text" id="descricao" />
                        <label htmlFor="" className="form-label">Endereço:</label>
                        <input defaultValue={detalhe.endereco} className="form-control m-1" type="text" id="endereco"/>
                        
                        <div className='row g-3'>
                        
                        <div className="col-sm-6">
                            <label htmlFor="dayOfWeek" className="form-label">Melhor dia:</label>
                            <select className="form-select" id="dayOfWeek">
                            <option>{detalhe.melhor_dia}</option>
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
                        <label htmlFor="periodo" className="form-label">Melhor horário:</label>
                            <select className="form-select" id="periodo">
                                <option>{detalhe.melhor_horario}</option>
                                <option>Manhã</option>
                                <option>Tarde</option>
                                <option>Noite</option>
                            </select>
                        </div>
                    </div>
                    <Button className="d-flex mt-2" type="submit">Salvar</Button>
                    </form>

                </Modal.Body>
                <Modal.Footer className="d-flex justify-space-between">

                    
                    <Button variant="danger" className="d-flex" onClick={() => setShowEditar(false)}>Cancelar</Button>
                </Modal.Footer>
            </Modal>


            {/* Toast */}
            <ToastContainer position="middle-center">
                <Toast show={showToastDelete} onClose={() => setShowToastDelete(false)} delay={2000} autohide>
                    <Toast.Body>Solicitação excluída com sucesso!</Toast.Body>
                </Toast>
            </ToastContainer>
            <ToastContainer position="middle-center">
                <Toast show={showToastUpdate} onClose={() => setShowToastDelete(false)} delay={2000} autohide>
                    <Toast.Body>Solicitação alterada com sucesso!</Toast.Body>
                </Toast>
            </ToastContainer>


        </div>
    )
}