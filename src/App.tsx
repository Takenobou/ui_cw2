import React from 'react';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/index';

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <div className="md:pl-32">
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
