// @ts-nocheck
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import ThankYou from "./pages/thank-you";
import NotFound from "./pages/not-found";


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" index element={<Home />} />
        <Route path="/thank-you" element={<ThankYou />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
