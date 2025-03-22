import { BrowserRouter, Route, Routes } from "react-router-dom";
import MenuHeader from "./MenuHeader";
import Home from "./pages/home/Home";
import PolicySearch from "./pages/policy-search/PolicySearch";

function App() {
  return (
    <>
      <BrowserRouter>
        <MenuHeader />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/policy-search" element={<PolicySearch />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
