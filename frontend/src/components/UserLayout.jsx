import React from 'react';
import Header from './Header';
import Sidemenu from './Sidemenu';

const UserLayout = ({ children }) => {
    return (
        <>
            <Header />

            <div className="flex pt-20">  
                <Sidemenu />

                <div className="flex-grow p-4">
                    {children}
                </div>
            </div>
        </>
    );
};

export default UserLayout;
