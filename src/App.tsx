import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AlbumPage } from "./pages/reactorPage";
import ITunesPage from "./pages/reactors";
import { ROUTES } from "../Routes";
import { HomePage } from "./pages/HomePage";
import Navigation from "./components/Navigation";
import './styles.css';

function App() {
  return (
    <BrowserRouter>
    <div className="space">
        <Navigation/>
        <div className="content-container">
          <Routes>
            <Route path={ROUTES.HOME} index element={<HomePage />} />
            <Route path={ROUTES.REACTORS} element={<ITunesPage />} />
            <Route path={`${ROUTES.REACTORS}/:id`} element={<AlbumPage />} />
          </Routes>
        </div>
    </div>
    </BrowserRouter>
  );
}

export default App;