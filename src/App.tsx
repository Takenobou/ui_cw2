import React from 'react';
import './index.css';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Home from './pages/index';
import SignUp from "./pages/signup.tsx";
import SignIn from "./pages/signin.tsx";
import NotFound from "./components/NotFound.tsx";


const App: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);

    return (
        <BrowserRouter>
            <div className="">
                <Routes>
                    <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/signin" />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/signin" element={<SignIn setIsLoggedIn={setIsLoggedIn} />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;

