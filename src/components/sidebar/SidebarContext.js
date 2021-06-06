import React from 'react';
import { useLocation } from 'react-router-dom';
import { SidebarProvider } from '../../hooks/useSidebar';

function SidebarContext({ children }) {
    const { pathname } = useLocation();
    console.log('PATH', pathname);
    return <SidebarProvider defaultItem={pathname}>{children}</SidebarProvider>;
}
export default SidebarContext;
