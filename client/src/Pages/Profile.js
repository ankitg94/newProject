import React, { useEffect, useState } from 'react';
import Layout from '../Components/Layout';
import { deleteProduct, sellerProduct, userDetails } from '../services/AllApi';
import { useNavigate } from 'react-router-dom';
import Card from '../Components/Card';
import Loadeer from '../Components/Loadeer';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await userDetails();
        if (response.data.userDetails) {
          setUser(response.data.userDetails);
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkUser();
  }, []);

  
    const getSellerProduct = async () => {
      const res = await sellerProduct();
      if (res && res.data && res.data.Sellerproduct) {
        setProducts(res.data.Sellerproduct);
         
      }
    };
    

  const handleCreateProduct = () => {
    navigate('/create-product');
  };

  const handleUpdateProduct = (productId) => {
    navigate(`/update-product/${productId}`);
  };

  const handleDeleteProduct = async(productId) => {
    setLoading(true);
    try{
      const res =await deleteProduct(productId);
      toast.success('Product deleted successfully!');
      setProducts((prevRec) => prevRec.filter((item) => item._id !== productId)); 

      if(!res){
        <Loadeer/>
      } 

    }catch(error){
      toast.error('Error deleting the product');
      console.log("error in deleting the product",error)
    }
    finally {
      setLoading(false);
    }
  };
  useEffect(()=>{
    getSellerProduct();
  },[])

  return (
    <>
      <div>
        <Layout>
          <div style={styles.container}>
            {isLoggedIn ? (
              <>
                {user.role === 'user' ? (
                  <div style={styles.userProfile}>
                    <h2>User Profile</h2>
                    <p>
                      <strong>Name:</strong> {user.name}
                    </p>
                    <p>
                      <strong>Email:</strong> {user.email}
                    </p>
                    <p>
                      <strong>Phone:</strong> {user.phoneNumber}
                    </p>
                  </div>
                ) : user.role === 'seller' ? (
                  <div style={styles.sellerProfile}>
                    <h2>Seller Dashboard</h2>
                    <button style={styles.button} onClick={handleCreateProduct}>
                      Create Product
                    </button>
                    <div style={styles.productGrid}>
                      {products &&
                        products.map((product) => (
                          <div key={product._id} style={styles.productCard}>
                            <Card
                              id={product._id}
                              name={product.name}
                              productdetails={product.productdetails.substring(0, 5)}
                              category={product.category.name}
                              images={product.images}
                              quantity={product.quantity}
                            />
                            <div style={styles.actionButtons}>
                              <button
                                style={styles.button}
                                onClick={() => handleUpdateProduct(product._id)}
                              >
                                Update
                              </button>
                              {loading ? (
                              toast.success("your product is being deleted")
                              ) : (
                              <button
                                style={{ ...styles.button, backgroundColor: 'red' }}
                                onClick={() => handleDeleteProduct(product._id)}
                              >
                                Delete
                              </button>
                              )}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ) : null}
              </>
            ) : (
              <div style={styles.loginPrompt}>
                <h2 style={styles.loginButton}>Please login to see your profile</h2>
                <button style={styles.loginButton} onClick={() => navigate('/auth')}>
                  Go to Login
                </button>
              </div>
            )}
          </div>
        </Layout>
      </div>
      <ToastContainer />
    </>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '1000px',
    margin: '0 auto',
  },
  userProfile: {
    backgroundColor: '#f9f9f9',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  sellerProfile: {
    backgroundColor: '#f9f9f9',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  productGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '20px',
    width: '100%',
  },
  productCard: {
    backgroundColor: '#fff',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
  },
  button: {
    padding: '10px 20px',
    margin: '10px 0',
    backgroundColor: '#333',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '100%',
  },
  actionButtons: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  loginPrompt: {
    textAlign: 'center',
    marginTop: '50px',
  },
  loginButton: {
    padding: '10px 20px',
    backgroundColor: 'white',
    color: 'black',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '10px',
  },
};

export default Profile;
