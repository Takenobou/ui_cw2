import React from 'react';
import './index.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/index';
import SignUp from './pages/signup';
import SignIn from './pages/signin';
import NotFound from './components/NotFound';
import PageWrapper from './components/PageWrapper';
import Tasks from "./pages/tasks.tsx";
import Projects from "./pages/projects.tsx";
import Calendar from "./pages/calendar.tsx";

const App: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);

    return (
        <BrowserRouter>
            <div className="">
                <Routes>
                    <Route path="/" element={isLoggedIn ? <PageWrapper><Home /></PageWrapper> : <Navigate to="/signin" />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/tasks" element={<PageWrapper><Tasks /></PageWrapper>} />
                    <Route path="/projects" element={<PageWrapper><Projects /></PageWrapper>} />
                    <Route path="/signin" element={<SignIn setIsLoggedIn={setIsLoggedIn} />} />
                    <Route path="*" element={<NotFound />} />
                    <Route path="/calendar" element={<PageWrapper><Calendar /></PageWrapper>} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
