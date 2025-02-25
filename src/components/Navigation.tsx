import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ROUTES, ROUTE_LABELS } from '../../Routes';
import logo from '../assets/logo.jpg'
import './Navbar.css'
import '../styles.css'

const Navigation = () => {
    return (
        <Navbar expand="lg" className="m-0 p-0">
            <Container className="d-flex flex-dir-row p-0 align-items-center">
                {/* Логотип и бренд (слева) */}
                <Navbar.Brand as={Link} to={ROUTES.HOME} className="logo-container">
                <img src={logo} alt="Nuclear" title="Nuclear" />
                <span>AЭС СССР и СНГ</span>
                </Navbar.Brand>

                {/* Кнопка "бургер" для мобильных устройств */}
                <Navbar.Toggle aria-controls="navbar-nav" className="custom-navbar-toggler" />

                {/* Контейнер для навигации, который сворачивается на мобильных устройствах */}
                <Navbar.Collapse id="navbar-nav">
                {/* Навигационные ссылки (справа) */}
                <Nav className="ms-auto"> {/* Выравнивание справа */}
                    <Nav.Link as={Link} to={ROUTES.HOME} className="d-inline-block">
                    {ROUTE_LABELS.HOME}
                    </Nav.Link>
                    <Nav.Link as={Link} to={ROUTES.REACTORS} className="d-inline-block">
                    {ROUTE_LABELS.REACTORS}
                    </Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation;