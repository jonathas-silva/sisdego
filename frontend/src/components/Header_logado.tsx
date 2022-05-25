import { Col, Container, Nav, Navbar, Row, Stack } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './Header_logado.css'

export default function Header() {
    return (
        <Stack direction='horizontal' className='principal-header align-items-center justify-content-between'>
            <Navbar expand="sm" className='principal-header'>
                <Container className='p-0'>
                    <Navbar.Toggle aria-controls="menu" />
                    <Navbar.Collapse id="menu">
                        <Nav className='me-auto'>
                            <Link to="/" className='nav-link'>Nova Solicitação</Link>
                            <Link to="/historico" className='nav-link'>Histórico</Link>
                            <Link to="/cadastro" className='nav-link'>Cadastro</Link>  
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <h2 className='logo m-0 p-2 d-flex'>SISDEGO</h2>
        </Stack>
    )
}   