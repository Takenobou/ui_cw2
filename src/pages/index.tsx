import React from 'react';
import TopBar from "../components/TopBar.tsx";
import SideBar from "../components/SideBar.tsx";

const Home: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <TopBar />
            <SideBar />
            <div className="pt-16 ml-64 p-4">
                <h1 className="text-3xl font-bold mb-4">Welcome</h1>
                <p>BLAH BLAH BLAH.</p>
            </div>
        </div>
    );
};

export default Home;