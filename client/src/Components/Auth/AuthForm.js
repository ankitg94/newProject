import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Login, Register } from '../../services/AllApi';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

const AuthForm = () => {
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
    role: 'user', 
  });

  const [isLogin, setIsLogin] = useState(true); 

  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        
        const loginData = { email: formData.email, password: formData.password };
        const response = await Login(loginData);
        if(response.data.accessToken){

        

        
        localStorage.setItem('accessToken', response.data.accessToken);

        
        toast.success('Login successful!');
        navigate('/');
         
        }
        } else {
        
        const response = await Register(formData);
        if(response.data){
          
        toast.success('Registration successful! Please log in.');
        toggleAuthMode(); 
        }
           }
    } catch (error) {
    
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(`Error: ${error.response.data.message}`);
      } else {
        toast.error('An unexpected error occurred. Please try again.');
      }
    }
  };

  
  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      fullName: '',
      email: '',
      phoneNumber: '',
      password: '',
      role: 'user',
    });
  };

  return (
    <div style={styles.formContainer}>
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        {!isLogin && (
          <>
            <div style={styles.formGroup}>
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                name="fullName"
                id="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                style={styles.input}
                required={!isLogin}
              />
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                id="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Enter your phone number"
                style={styles.input}
                required={!isLogin}
              />
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="role">Role</label>
              <select
                name="role"
                id="role"
                value={formData.role}
                onChange={handleChange}
                style={styles.select}
                required={!isLogin}
              >
                <option value="user">User</option>
                <option value="seller">Seller</option>
              </select>
            </div>
          </>
        )}

        <div style={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            style={styles.input}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            style={styles.input}
            required
          />
        </div>

        <button type="submit" style={styles.submitButton}>
          {isLogin ? 'Login' : 'Register'}
        </button>
      </form>

      <div style={styles.toggleContainer}>
        <p style={styles.toggleText}>
          {isLogin ? "Don't have an account?" : 'Already have an account?'}
          <button onClick={toggleAuthMode} style={styles.toggleButton}>
            {isLogin ? 'Register here' : 'Login here'}
          </button>
        </p>
      </div>
      <ToastContainer /> 
    </div>
  );
};


const styles = {
  formContainer: {
    maxWidth: '400px',
    margin: '50px auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '15px',
  },
  input: {
    width: '90%',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ddd',
  },
  select: {
    width: '95%',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ddd',
  },
  submitButton: {
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#333',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  toggleContainer: {
    textAlign: 'center',
    marginTop: '15px',
  },
  toggleText: {
    fontSize: '14px',
    color: '#333',
  },
  toggleButton: {
    background: 'none',
    border: 'none',
    color: '#007bff',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
};

export default AuthForm;
