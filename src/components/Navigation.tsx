import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ROUTES, ROUTE_LABELS } from '../../Routes';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import logo from '../assets/logo.jpg'
import './Navbar.css'
import '../styles.css'
import { useAppDispatch, RootState } from '../store';
import { logoutUserAsync } from '../slices/userSlice'; 
import { setSearchValue, getReactorList } from '../slices/reactorSlice'; 

const Navigation = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated); // получение из стора значения флага состояния приложения
    const username = useSelector((state: RootState) => state.user.username); // получение значения username из стора

    const isModerator = useSelector((state: RootState) => state.user.isModerator);
    // Обработчик события нажатия на кнопку "Выйти"
    const handleExit = async ()  => {
        await dispatch(logoutUserAsync());
        dispatch(setSearchValue('')); // можно реализовать в `extrareducers` у функции logoutUserAsynс
        navigate('/reactors'); // переход на страницу списка услуг
        await dispatch(getReactorList()); // для показа очищения поля поиска
    }
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
                    <Nav.Link as={Link} to={ROUTES.STATIONSEDITOR} className="d-inline-block px-3">
                        Станции
                    </Nav.Link>
                    {(isAuthenticated == true) && (isModerator == true) && (
                        <Nav.Link as={Link} to={ROUTES.REACTORSLISTEDITOR} className="d-inline-block px-3">
                            Изменить реакторы
                        </Nav.Link>
                    )}
                    {isAuthenticated ? (
                        <Nav.Link as={Link} to={ROUTES.ACCOUNT} className="d-inline-block px-3">
                            {username}
                        </Nav.Link>
                    ) : (
                        <Nav.Link className="d-inline-block px-3">
                            Гость
                        </Nav.Link>
                    )}
                    {(isAuthenticated == false ) && (
                        <Nav.Link as={Link} to={ROUTES.REGISTER} className="d-inline-block px-3">
                        Регистрация и вход
                        </Nav.Link>
                    )}
                    {(isAuthenticated == true) && (
                        <Nav.Link onClick={handleExit} className="d-inline-block px-3">
                        Выйти
                        </Nav.Link>
                    )}
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation;