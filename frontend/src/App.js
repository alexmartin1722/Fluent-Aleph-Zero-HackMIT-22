import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Page from "./View/Pages/Page";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Page />}></Route>
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
