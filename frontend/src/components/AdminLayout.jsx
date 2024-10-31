import React from 'react';
import Header from '../pages/Instructor/InstructorHeader.jsx';
import AdminSidemenu from './AdminSidemenu';

const AdminLayout = ({ children }) => {
    return (
        <>
            <Header />

            <div className="flex pt-20">  
                <AdminSidemenu />

                <div className="flex-grow p-4">
                    {children}
                </div>
            </div>
        </>
    );
};

export default AdminLayout;
