import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ROUTES, ROUTE_LABELS } from '../../Routes';
import logo from '../assets/logo.jpg'
//import './Navigation.css'
import '../styles.css'

/*const Navigation = () => {
    return (
        <Navbar expand="lg" className="m-0 p-0">
            <Container>
                <Nav className="w-100 d-flex justify-content-between">
                    <Navbar.Brand as={Link} to={ROUTES.HOME} className="logo-container">
                        
                        <a>Атомные электростанции СССР и СНГ</a>
                    </Navbar.Brand>
                    <div className="nav-container">
                        <Nav.Link as={Link} to={ROUTES.HOME} className="d-inline-block">
                            {ROUTE_LABELS.HOME}
                        </Nav.Link>
                        <Nav.Link as={Link} to={ROUTES.REACTORS} className="d-inline-block">
                            {ROUTE_LABELS.REACTORS}
                        </Nav.Link>
                    </div>
                </Nav>
            </Container>
        </Navbar>
    );
};*/

const Navigation = () => {
    return (
        <nav className="navbar">
            <nav className="container">
                <Link to={ROUTES.HOME} className="navbar-brand">
                    <img src={logo} alt="Nuclear" title="Nuclear" className='logo-img'/>
                    Атомные электростанции СССР и СНГ
                </Link>
                <div className="nav-container">
                        <Nav.Link as={Link} to={ROUTES.HOME} className="d-inline-block">
                            {ROUTE_LABELS.HOME}
                        </Nav.Link>

                        <Nav.Link as={Link} to={ROUTES.REACTORS} className="d-inline-block">
                            {ROUTE_LABELS.REACTORS}
                        </Nav.Link>
                </div>
            </nav>
        </nav>
    );
};

export default Navigation;