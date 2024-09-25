import React from 'react';
import Sidebar from './Siderbar';

const Layout = ({ children }) => {
  return (
    <> 
    <div style={{display:'flex'}}> 
    <Sidebar />
    <div style={{flex:1, backgroundColor:'black', minHeight:"100vh", opacity:"0.8"}}> 
         {children}
        </div> 
    </div>
    </>

        

  );
};

export default Layout;
