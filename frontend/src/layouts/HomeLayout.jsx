import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/shared/Navbar';

const HomeLayout = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
            {/* The Outlet component will render the child routes here */}
        </div>
    )
}

export default HomeLayout
