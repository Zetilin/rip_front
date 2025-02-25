import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AlbumPage } from "./pages/reactorPage";
import ITunesPage from "./pages/reactors";
import { ROUTES } from "../Routes";
import { HomePage } from "./pages/HomePage";
import Navigation from "./components/Navigation";
import './styles.css';
import { useEffect } from "react";

//const { invoke } = (window as any).__TAURI__.tauri;

function App() {
  /*useEffect(() => {
    invoke('tauri', {cmd: 'create'})
      .then((response: any) => console.log(response))
      .catch((error: any) => console.log(error));
    
      return () => {
        invoke('tauri', {cmd: 'close'})
          .then((response: any) => console.log(response))
          .catch((error: any) => console.log(error));
      }
  }, [])*/
  return (
    <BrowserRouter basename="/rip_front">
    <div className="space">
        <Navigation/>
        <div className="content-container">
          <Routes>
            <Route path="/" index element={<HomePage />} />
            <Route path="/reactors" element={<ITunesPage />} />
            <Route path="/reactors/:id" element={<AlbumPage />} />
          </Routes>
        </div>
    </div>
    </BrowserRouter>
  );
}

export default App;