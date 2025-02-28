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
import ReactorEditor from "./pages/reactorsEditor";
import ReactorCreator from "./pages/AddReactorPage";
import { ReactorListEditor } from "./pages/reactorsListEditor";
import StationsEditor from './pages/stationsEditor'


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
            <Route
              path={`${ROUTES.REACTORSEDITOR}/:reactorId`}
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated} isModerator={isModerator}>
                  <ReactorEditor />
                </ProtectedRoute>
              }
            />
            <Route
              path={ROUTES.REACTORSCREATOR}
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated} isModerator={isModerator}>
                  <ReactorCreator />
                </ProtectedRoute>
              }
            />
            <Route
              path={ROUTES.REACTORSLISTEDITOR}
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated} isModerator={isModerator}>
                  <ReactorListEditor />
                </ProtectedRoute>
              }
            />
            <Route
              path={ROUTES.STATIONSEDITOR}
              element={
                <AuthRoute isAuthenticated={isAuthenticated}>
                  <StationsEditor />
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