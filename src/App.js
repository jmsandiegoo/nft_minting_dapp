import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { MainPageLayout } from "./layouts/MainLayout";
import { HomePage } from "./pages/HomePage";
import { MintPage } from "./pages/MintPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route element={<MainPageLayout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/mint" element={<MintPage />} />
        </Route>
      </Routes>
      <Link to="/home">Home</Link>
      <Link to="/mint">Mint</Link>
    </BrowserRouter>
  );
}

export default App;
