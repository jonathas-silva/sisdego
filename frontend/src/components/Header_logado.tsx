import { useState } from 'react';
import { Container, Nav, Navbar, Stack } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './Header_logado.css'


export default function Header() {
    const [open, setOpen] = useState(false);
    return (
        <Stack direction='horizontal' className='sticky-top principal-header align-items-center justify-content-between'>
            <Navbar expand="sm" className='principal-header'>
                <Container className='p-0'>
                    <Navbar.Toggle aria-controls="menu" onClick={() => setOpen(!open)} />
                    <Navbar.Collapse in={open} id="menu">
                        <Nav className='me-auto'>
                            <Link to="/" className='nav-link' onClick={() => setOpen(false)}>Nova Solicitação</Link>
                            <Link to="/historico" className='nav-link' onClick={() => setOpen(false)}>Histórico</Link>
                            <Link to="/" className='nav-link' onClick={() => setOpen(false)}>Como funciona?</Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <button className="navbar-toggler" type="button"></button>
            <h2 className='logo m-0 p-2 d-flex'>SISDEGO</h2>
        </Stack>
    )
}   