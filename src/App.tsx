import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ListPage from "./pages/ListPage";
import ItemPage from "./pages/ItemPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListPage />} />
        <Route path="/item" element={<ItemPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
