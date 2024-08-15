import React from 'react'
import Sidemenu from '../../components/Sidemenu';
import Header from '../../components/Header';

export const UDashboard = () => {
  return (
    <>
        {/* Header Component */}
        <Header />

        {/* Layout with Sidemenu and main content */}
        <div className="flex pt-20">  {/* pt-20 to adjust for the fixed header height */}
            <Sidemenu />
            
        </div>
    </>
);
}
