import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home"
import About from "./pages/About"

function MainRouter(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/about" element={<About/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default MainRouter