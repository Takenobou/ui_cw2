import React from 'react';
import TopBar from './TopBar';
import SideBar from './SideBar';

interface PageWrapperProps {
    children: React.ReactNode;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
    return (
        <>
            <TopBar />
            <SideBar />
            {children}
        </>
    );
};

export default PageWrapper;
