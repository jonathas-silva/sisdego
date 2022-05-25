import './Footer.css';

export default function Footer() {
    return (
        <footer className='footer' >
            <div className='principal-footer d-flex flex-column justify-content-between'>
                <p className='h3'>Sistema de Descarte de Grandes Objetos</p>
                <div>
                    <p className='h6'>Conheça mais:</p>
                    <ul className='list-unstyled text-decoration-none'>
                        <a href=""><li>Sobre as Cooperativas</li></a>
                        <a href=""><li>Sobre os desenvolvedores</li></a>
                        <a href=""><li>Como ajudar</li></a>
                    </ul>
                </div>
                <footer className="align-bottom">UNIVESP - 2022</footer>
            </div>
        </footer>
    )
}