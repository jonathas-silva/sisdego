import React from "react";
import { Button, Col, Container, Modal, ModalProps, OverlayTrigger, Row, Stack, Tooltip, TooltipProps } from "react-bootstrap";
import { Omit, BsPrefixProps } from "react-bootstrap/esm/helpers";
import { pedido1, pedido2, pedido3 } from "../assets/StaticData";
import { Solicitacao } from "../assets/Types";
import './Historico.css';
import { FcCancel, FcCheckmark } from 'react-icons/fc';

const pedidos: Solicitacao[] = [pedido1, pedido2, pedido3];

const dicaBtnApprove = (props: JSX.IntrinsicAttributes & TooltipProps & React.RefAttributes<HTMLDivElement>) => (
    <Tooltip id="button-tooltip" {...props}>
        Aceitar solicitação
    </Tooltip>
);
const dicaBtnCancel = (props: JSX.IntrinsicAttributes & TooltipProps & React.RefAttributes<HTMLDivElement>) => (
    <Tooltip id="button-tooltip" {...props}>
        Cancelar solicitação
    </Tooltip>
);


//Interface com parâmetros opcionais
interface detalhes {
    id?: number;
    tipo?: string;
    descricao?: string;
    data?: string;
    mostrar: boolean;
}

export function Historico() {
    const inicializado: detalhes = {
        mostrar: false
    }

    //um use state que carrega todas as informações que eu preciso para mostrar os detalhes
    const [detalhe, setDetalhe] = React.useState<detalhes>(inicializado);

    return (
        <div className='container-sm p-0'>
            <div className='mt-4 p-1 d-flex flex-column'>
                <h4>Solicitações em aberto</h4>
                <Container className="px-0 mb-2 mt-4">
                    <Row className="historico-cabecalho lead px-2 text-center">
                        <Col sm={1} xs={1} className="text-start">Id</Col><Col sm={2} xs={4}>Data</Col><Col xs={4} sm={6}>Endereço</Col><Col>Tipo</Col>
                    </Row>
                    {
                        pedidos.map(pedido => (

                            <Stack><button className="btn btn-light border"
                                onClick={() =>

                                    //inserindo os detalhes que serão mostrados no Modal
                                    setDetalhe(
                                        {
                                            id: pedido.id,
                                            tipo: pedido.tipo,
                                            descricao: pedido.descricao,
                                            data: pedido.horario,
                                            mostrar: true
                                        }
                                    )


                                }>
                                <Row className="historico-lista">
                                    <Col sm={1} xs={1} className="text-start">{pedido.id}</Col>
                                    <Col sm={2} xs={4} className="text-truncate">{pedido.horario}</Col>
                                    <Col xs={4} sm={6} className="text-truncate">{pedido.endereco}</Col>
                                    <Col>{pedido.tipo}</Col>
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
                        Solicitação {detalhe.id}
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div>
                        <h4>{detalhe.tipo}</h4>
                        <p>{detalhe.descricao}</p>
                        <p>Criado em {detalhe.data}</p>
                    </div>
                    <div className="text-start">
                        {/* inserção de dica sobre o botão*/}
                        <OverlayTrigger
                            placement="top"
                            delay={{ show: 250, hide: 400 }}
                            overlay={dicaBtnApprove}>
                            <button className="btn btn-light border px-3"><FcCheckmark /></button>
                        </OverlayTrigger><OverlayTrigger
                            placement="bottom"
                            delay={{ show: 250, hide: 400 }}
                            overlay={dicaBtnCancel}>
                            <button className="btn btn-light border px-3"><FcCancel /></button>
                        </OverlayTrigger>
                    </div>

                </Modal.Body>
                <Modal.Footer className="d-flex justify-space-between">

                    <Button className="d-flex" onClick={() => setDetalhe({ mostrar: false })}>Fechar</Button>
                </Modal.Footer>
            </Modal>
            {/* <DetailsModal show={detailShow} onHide={() => setDetailShow(false)} /> */}


        </div>
    )
}