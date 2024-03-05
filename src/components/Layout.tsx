import React from 'react';
import { Outlet } from 'react-router-dom';
import AppBarComponent from './AppBarComponent';

const Layout = () => {
    return (
        <div style={{ margin: 0, padding: 0,  boxSizing: 'border-box', minHeight: '100vh', minWidth: '100vh'}}>
            <AppBarComponent/>
            <Outlet/>
        </div>
    );
};

export default Layout;