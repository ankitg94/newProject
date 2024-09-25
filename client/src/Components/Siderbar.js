import React from 'react';
import { FaHome, FaSearch, FaUserAlt, FaSignInAlt } from 'react-icons/fa';
import { RiShieldUserLine } from 'react-icons/ri';
import './Sidebar.css';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const navigate =useNavigate(); 
  return (
    <div className="sidebar">
      <div className="icon logo"> 
        <RiShieldUserLine size={20} />
      </div>
      <div className="icon">
        <FaHome size={20} onClick={()=>navigate("/")} />
      </div>
      <div className="icon">
        <FaSearch size={20} onClick={()=>navigate("/search")} />
      </div>
      <div className="icon">
        <FaUserAlt size={20} onClick={()=>navigate("/profile")} />
      </div>
      <div className="icon">
        <FaSignInAlt size={20} onClick={()=>navigate("/auth")}/>
      </div>
    </div>
  );
};
export default Sidebar;
