import React from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import { pedido1, pedido2, pedido3 } from "../assets/StaticData";
import { Solicitacao } from "../assets/Types";
import './Historico.css';

const pedidos: Solicitacao[] = [pedido1, pedido2, pedido3];

function DetailsModal(props, atual: Solicitacao) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>

            <Modal.Header closeButton>
                <Modal.Title>
                    Solicitação {atual.id}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <h4>{atual.descricao}</h4>
                <p>Teste de detalhamento com modal</p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Fechar</Button>
            </Modal.Footer>
        </Modal>
    )
}




export function Historico() {
    const [detailShow, setDetailShow] = React.useState(false);

    return (
        <div className='container-sm p-0'>
            <div className='mt-4 p-1 d-flex flex-column'>
                <h4>Solicitações em aberto</h4>
                <Container className="px-0 mb-2 mt-4 bg-light border">
                    <Row className="historico-cabecalho">
                        <Col sm={1} xs={1} >Id</Col><Col sm={2} xs={4}>Data</Col><Col xs={4} sm={6}>Endereço</Col><Col>Tipo</Col>
                    </Row>
                    {
                        pedidos.map(pedido => (
                            <Row className="historico-lista">
                                <Col sm={1} xs={1}> <a href="#" className="btn-link" onClick={() => setDetailShow(true)}>{pedido.id}</a></Col>
                                <Col sm={2} xs={4} className="text-truncate">{pedido.horario}</Col>
                                <Col xs={4} sm={6} className="text-truncate">{pedido.endereco}</Col>
                                <Col>{pedido.tipo}</Col>
                            </Row>
                        ))

                    }


                </Container>
            </div>

            <DetailsModal show={detailShow} onHide={() => setDetailShow(false)} />


        </div>
    )
}