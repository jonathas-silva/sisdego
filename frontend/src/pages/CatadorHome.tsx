import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Col, Container, Modal, OverlayTrigger, Row, Stack, Toast, ToastContainer, ToggleButton, Tooltip, TooltipProps } from "react-bootstrap";
import { CatadorDTO, SolicitacaoDTO } from "../assets/Types";
import './Historico.css';
import { RiInboxUnarchiveLine } from 'react-icons/ri';
import { GrUpdate } from 'react-icons/gr';
import axios, { AxiosError, AxiosRequestConfig } from "axios";



const dicaBtnApprove = (props: JSX.IntrinsicAttributes & TooltipProps & React.RefAttributes<HTMLDivElement>) => (
    <Tooltip id="button-tooltip" {...props}>
        Aceitar Solicitação
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
    estado?: number;
    mostrar: number; //de 0 a 2 - 0 - não mostrar, 1 - mostrar quando está adicionado// 2 - mostrar quando está em fila
}

export default function CatadorHome() {


    //botões de alternância

    const [radioValue, setRadioValue] = useState('1');

    const catador_ativo: number = 1;
    const [endereco, setEndereco] = useState('solicitacoes');

    const radios = [
        { name: 'Todas  ', value: '1' },
        { name: 'Aceitas', value: '2' },
    ];


    const [showToastDelete, setShowToastDelete] = useState(false);


    /*useState utilizado para controlar a atualização do DB. Dado que o useEffect está
    monitorando a variável 'atualizar', então basta mudar o valor dessa variável para
    gerar uma nova leitura*/
    const [atualizar, setAtualizar] = useState(true);

    const [solicArray, setSolicArray] = useState<SolicitacaoDTO[]>();

    useEffect(() => {
        //Aqui fazemos com que o histórico mostre as solicitações apenas do usuário ativo
        if (radioValue == '1') {
            axios.get(`http://localhost:8080/${endereco}`).then(
                response => {
                    const data = response.data as SolicitacaoDTO[];
                    setSolicArray(data);
                    console.log(solicArray);
                }
            )
        } else {
            axios.get(`http://localhost:8080/catadores/${catador_ativo}`).then(
                response => {
                    const data = response.data as CatadorDTO;
                    setSolicArray(data.solicitacoes);
                    console.log(solicArray);
                }
            )
        }


        console.log('iteraction');

    }, [atualizar]);

    function atualizaHistorico(e: React.ChangeEvent<HTMLInputElement>) {
        setRadioValue(e.currentTarget.value);
        setAtualizar(!atualizar); //força a atualização do backend
    }

    function aceitarSolic(idSolicitacao: number | undefined) {
        console.log('tentando enviar');
        const config: AxiosRequestConfig = {
            baseURL: 'http://localhost:8080',
            method: 'PUT',
            url: `/catadores/${catador_ativo}?idSolicitacao=${idSolicitacao}`
        }

        axios(config).then(
            response => {
                console.log(response.status);
                alert("Solicitação aceita com sucesso!");
                setDetalhe({ mostrar: 0 });
                setAtualizar(!atualizar);
            }
        ).catch(function (error) {
            if(error.response){
                alert("Não foi possível aceitar essa solicitação!");
            }
            setDetalhe({ mostrar: 0 });
        });

    }





    //um use state que carrega todas as informações que eu preciso para mostrar os detalhes
    const [detalhe, setDetalhe] = React.useState<any>(0);


    return (
        <div className='container-sm p-0'>
            <div className='mt-4 p-1 d-flex flex-column'>
                <div className="d-flex justify-content-between">

                    <ButtonGroup>
                        {
                            radios.map((radio, idx) => (
                                <ToggleButton
                                    key={idx}
                                    id={`radio-${idx}`}
                                    type="radio"
                                    variant={idx % 2 ? 'outline-success' : 'outline-primary'}
                                    name="radio"
                                    value={radio.value}
                                    checked={radioValue === radio.value}
                                    onChange={(e) => atualizaHistorico(e)}
                                >
                                    {radio.name}
                                </ToggleButton>
                            ))

                        }
                    </ButtonGroup>




                    <button className="btn border" onClick={() => setAtualizar(!atualizar)}><GrUpdate /></button>
                </div>
                <Container className="px-0 mb-2 mt-4">
                    <Row className="historico-cabecalho lead px-2 text-center">
                        <Col xs={4} sm={2}>Status</Col><Col xs={4} sm={6} >Data</Col><Col>Tipo</Col>
                    </Row>
                    {
                        solicArray?.map(solicitacao => (

                            <Stack key={solicitacao.id}><button className="btn btn-light border"
                                onClick={() =>

                                    //inserindo os detalhes que serão mostrados no Modal
                                    setDetalhe(
                                        {//Montando o DTO para enviar no aceite
                                            id: solicitacao.id,
                                            tipo: solicitacao.tipo,
                                            descricao: solicitacao.descricao,
                                            data: solicitacao.data,
                                            endereco: solicitacao.endereco,
                                            melhor_dia: solicitacao.melhor_dia,
                                            melhor_horario: solicitacao.melhor_horario,
                                            estado: solicitacao.estado,
                                            mostrar: solicitacao.estado === 0 ? 1 : 2    
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
                show={detalhe.mostrar === 1 ? true : false}
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
                        <p>Status: {detalhe.estado}</p>
                    </div>
                    <div className="text-start">
                        {/* inserção de dica sobre o botão*/}
                        <OverlayTrigger
                            placement="top"
                            delay={{ show: 250, hide: 400 }}
                            overlay={dicaBtnApprove}>
                            <button className="btn btn-success border px-3" onClick={() => aceitarSolic(detalhe.id)}>Aceitar solicitação <RiInboxUnarchiveLine /></button>
                        </OverlayTrigger>
                    </div>

                </Modal.Body>
                <Modal.Footer className="d-flex justify-space-between">

                    <Button className="d-flex" onClick={() => setDetalhe({ mostrar: false })}>Fechar</Button>
                </Modal.Footer>
            </Modal>




            <Modal
                size="lg"
                show={detalhe.mostrar === 2 ? true : false}
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
                        O barato é loko
                    </div>

                </Modal.Body>
                <Modal.Footer className="d-flex justify-space-between">

                    <Button className="d-flex" onClick={() => setDetalhe({ mostrar: false })}>Fechar</Button>
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