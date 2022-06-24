import { useState } from 'react';
import { Button, Container, Nav, Navbar, Stack } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { getSessionId } from '../assets/Session_keys';
import './Header_logado.css'


export default function Header() {


    const usuario_ativo: number = getSessionId();
    /*Pegamos o número do id ativo. Desta forma a opção de 'nova solicitação' e 'sair'
    só aparece se houver um usuário ativo armazenado */


    const [open, setOpen] = useState(false);
    return (
        <Stack direction='horizontal' className='sticky-top principal-header align-items-center justify-content-between'>
            <Navbar expand="sm" className='principal-header'>
                <Container className='p-0'>
                    <Navbar.Toggle aria-controls="menu" onClick={() => setOpen(!open)} />
                    <Navbar.Collapse in={open} id="menu">
                        <Nav className='me-auto'>
                            {
                                usuario_ativo!=-1
                                ? <Link to="/" className='nav-link' onClick={() => setOpen(false)}>Nova Solicitação</Link>
                                : null
                            }
                            <Link to="/historico" className='nav-link' onClick={() => setOpen(false)}>Minhas Solicitações</Link>
                            <Link to="/" className='nav-link' onClick={() => setOpen(false)}>Como funciona?</Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <button className="navbar-toggler" type="button"></button>
            <div className='d-flex'>
                {
                     usuario_ativo!=-1
                    ? <button className='btn text-danger'>sair</button> : null
                    }
                <h2 className='logo m-0 p-2 d-flex'>SISDEGO</h2></div>
        </Stack>
    )


}   