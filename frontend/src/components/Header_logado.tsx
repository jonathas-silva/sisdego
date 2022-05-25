import { Col, Container, Nav, Navbar, Row, Stack } from 'react-bootstrap'
import './Header_logado.css'

export default function Header() {
    return (
        <Stack direction='horizontal' className='principal-header align-items-center justify-content-between'>
            <Navbar expand="sm" className='principal-header'>
                <Container>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className='me-auto'>
                            <Nav.Link href="#solicitacao">Nova solicitação</Nav.Link>
                            <Nav.Link href="#historico">Histórico</Nav.Link>
                            <Nav.Link href="#cadastro">Cadastro</Nav.Link>
                        </Nav>

                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <h2 className='logo m-0 p-2 d-flex'>SISDEGO</h2>
        </Stack>
    )
}   