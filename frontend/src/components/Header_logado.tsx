import { useState } from 'react';
import { Button, Container, Nav, Navbar, Stack } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { getSessionId, getSessionRole, setSessionId, setSessionKey, setSessionRole } from '../assets/Session_keys';
import './Header_logado.css'


export default function Header() {

    const nav = useNavigate();

    function logout(): void {
        setSessionKey("vazio");
        setSessionId(-1);
        setSessionRole(-1);
        nav("/");
    }   

    const usuario_ativo: number = getSessionId();
    const role_ativo: number = getSessionRole();
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
                                usuario_ativo!=-1 && role_ativo!=1
                                ? <Link to="/solicitacao" className='nav-link' onClick={() => setOpen(false)}>Nova Solicitação</Link>
                                : null
                            }
                            {
                                usuario_ativo!=-1
                                ?<Link to={  role_ativo==0?"/historico" : "/catador"} className='nav-link' onClick={() => setOpen(false)}>Minhas Solicitações</Link>
                                :<Link to="/" className='nav-link' onClick={() => setOpen(false)}>Login</Link>
                            }
                            <Link to="/funcionamento" className='nav-link' onClick={() => setOpen(false)}>Como funciona?</Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <button className="navbar-toggler" type="button"></button>
            <div className='d-flex'>
                {
                     usuario_ativo!=-1
                    ? <button className='btn text-danger' onClick={() => logout()}>sair</button> : null
                    }
                <h2 className='logo m-0 p-2 d-flex'>SISDEGO</h2></div>
        </Stack>
    )


}   


