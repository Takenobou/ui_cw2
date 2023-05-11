import React from 'react';
import TopBar from './TopBar';
import SideBar from './SideBar';

interface PageWrapperProps {
    children: React.ReactNode;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
    return (
        <div className="flex h-screen bg-gray-50">
            <TopBar />
            <div className="flex flex-row w-full">
                <SideBar />
                <div className="w-full overflow-auto pt-20 pl-72 pr-4 pb-4"> {/* adjust padding as needed */}
                    {children}
                </div>
            </div>
        </div>
    );
};

export default PageWrapper;
