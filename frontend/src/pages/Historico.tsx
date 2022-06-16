import React, { useEffect, useState } from "react";
import { Button, Col, Container, Modal, ModalProps, OverlayTrigger, Row, Stack, Toast, ToastContainer, Tooltip, TooltipProps } from "react-bootstrap";
import { Solicitacao, UsuarioDTO } from "../assets/Types";
import './Historico.css';
import { FcCheckmark } from 'react-icons/fc';
import { FaTrashAlt } from 'react-icons/fa';
import { BsPencilFill } from 'react-icons/bs';
import { GrUpdate } from 'react-icons/gr';
import axios, { AxiosRequestConfig } from "axios";



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


    const usuario_ativo: number = 2;

    const inicializado: detalhes = {
        mostrar: false
    }

    const [lista, setLista] = useState<UsuarioDTO>();

    const [showToastDelete, setShowToastDelete] = useState(false);
    const [showToastEdit, setShowToastEdit] = useState(false);


    /*useState utilizado para controlar a atualização do DB. Dado que o useEffect está
    monitorando a variável 'atualizar', então basta mudar o valor dessa variável para
    gerar uma nova leitura*/
    const [atualizar, setAtualizar] = useState(true);


    useEffect(() => {
        //Aqui fazemos com que o histórico mostre as solicitações apenas do usuário ativo
        axios.get(`http://localhost:8080/usuarios/${usuario_ativo}`).then(
            response => {
                const data = response.data as UsuarioDTO;
                setLista(data);
                console.log(data);
            }

        )
        console.log('iteraction');

    }, [atualizar]);

    function deleteEntry(id: number | undefined) {

        const config: AxiosRequestConfig = {
            baseURL: 'http://localhost:8080',
            method: 'DELETE',
            url: `solicitacoes/${id}`
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

    function handleEditSolicitacao() {
        setShowEditar(false);
        setShowToastEdit(true);
    }


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

                <Modal.Body>

                    <form action="">
                        <label htmlFor="" className="form-label">Descrição:</label>
                        <input defaultValue={detalhe.descricao} className=" form-control m-1" type="text" />
                        <label htmlFor="" className="form-label">Endereço:</label>
                        <input defaultValue={detalhe.endereco} className="form-control m-1" type="text" />
                    </form>

                </Modal.Body>
                <Modal.Footer className="d-flex justify-space-between">

                    <Button className="d-flex" onClick={() => handleEditSolicitacao()}>Salvar</Button>
                    <Button variant="danger" className="d-flex" onClick={() => setShowEditar(false)}>Cancelar</Button>
                </Modal.Footer>
            </Modal>


            {/* Toast */}
            <ToastContainer position="middle-center">
                <Toast show={showToastDelete} onClose={() => setShowToastDelete(false)} delay={2000} autohide>
                    <Toast.Body>Solicitação excluída com sucesso!</Toast.Body>
                </Toast>
            </ToastContainer>


        </div>
    )
}