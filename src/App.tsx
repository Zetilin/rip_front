import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { AlbumPage } from "./pages/reactorPage";
import ITunesPage from "./pages/reactors";
import { ROUTES } from "../Routes";
import { HomePage } from "./pages/HomePage";
import  LoginPage  from "./pages/loginPage";
import  StationPage  from "./pages/stationPage";
import Navigation from "./components/Navigation";
import './styles.css';
import { useEffect } from "react";
import RegisterPage from "./pages/registerPage";
import {RootState} from './store';
import { useSelector } from 'react-redux';
import { Page403 } from './pages/403Page';
import { Page404 } from './pages/404Page';
import AccountPage from "./pages/accountPage";


const ProtectedRoute = ({ children, isAuthenticated, isModerator }) => {
  if (!isAuthenticated || !isModerator) {
    return <Navigate to="/403" replace />; // Перенаправление на страницу 403 (Запрещено)
  }
  return children;
};

const AuthRoute = ({ children, isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Navigate to="/403" replace />; // Перенаправление на страницу 403 (Запрещено)
  }
  return children;
};


function App() {
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
  const isModerator = useSelector((state: RootState) => state.user.isModerator);

  return (
    <BrowserRouter basename="/rip_front">
    <div className="space">
        <Navigation/>
        <div className="content-container">
          <Routes>
            <Route path="/" index element={<HomePage />} />
            <Route path="/reactors" element={<ITunesPage />} />
            <Route path="/reactors/:id" element={<AlbumPage />} />
            <Route path={ROUTES.LOGIN} element={<LoginPage />} />
            <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
            <Route path={`${ROUTES.STATION}/:current_station_id`} element={<StationPage />} />
            <Route
              path={ROUTES.ACCOUNT}
              element={
                <AuthRoute isAuthenticated={isAuthenticated}>
                  <AccountPage />
                </AuthRoute>
              }
            />
          </Routes>
        </div>
    </div>
    </BrowserRouter>
  );
}

export default App;