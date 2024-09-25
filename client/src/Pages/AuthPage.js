import React, { useState } from 'react';
import Layout from '../Components/Layout';
import AuthForm from '../Components/Auth/AuthForm';
import { logout } from '../services/AllApi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AuthPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('accessToken'));

  const handleLogout = async () => {
    try {
      await logout(); 
      localStorage.removeItem('accessToken'); 
      toast.success("You are logged out successfully");
      setIsLoggedIn(false); 
    } catch (error) {
      toast.error(`Logout failed: ${error.message || "Unknown error"}`); 
    }
  };

  return (
    <Layout>
      <div style={styles.container}>
        {isLoggedIn ? (
          <button onClick={handleLogout} style={styles.logoutButton}>
            Logout
          </button>
        ) : (
          <AuthForm onLogin={() => setIsLoggedIn(true)} /> 
        )}
      </div>
      <ToastContainer />
    </Layout>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  logoutButton: {
    padding: '10px 20px',
    backgroundColor: 'white',
    color: 'black',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default AuthPage;
