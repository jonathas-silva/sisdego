import { Col, Container, Row } from "react-bootstrap";
import { pedido1, pedido2 } from "../assets/StaticData";
import { Solicitacao } from "../assets/Types";
import './Historico.css';

const pedidos: Solicitacao[] = [pedido1, pedido2];


export function Historico() {
    return (
        <div className='container-sm p-0'>
            <div className='mt-4 p-1 d-flex flex-column'>
                <h4>Solicitações em aberto</h4>
                <Container className="px-0 mb-2 mt-4 bg-light border">
                    <Row className="historico-cabecalho">
                        <Col sm={1} xs={1} >Id</Col><Col sm={2} xs={4}>Data</Col><Col xs={4} sm={6}>Endereço</Col><Col>Tipo</Col>
                        </Row>
                        {
                            pedidos.map( pedido => (
                                <Row>
                                <Col sm={1} xs={1}>{pedido.id}</Col><Col sm={2} xs={4} className="text-truncate">{pedido.horario}</Col><Col xs={4} sm={6} className="text-truncate">{pedido.endereco}</Col><Col>{pedido.tipo}</Col>
                            </Row>
                            ))
                            
                        }

                    
                </Container>
            </div>
        </div>
    )
}