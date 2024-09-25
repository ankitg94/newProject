import React, { useEffect, useState } from 'react';
import Layout from '../Components/Layout';
import { useParams } from 'react-router-dom';
import { getSingleProduct } from '../services/AllApi';
import Loadeer from '../Components/Loadeer';

const ProductsDetails = () => {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams(); 

  useEffect(() => { 
    const fetchSingleProduct = async () => {
      try {
        const response = await getSingleProduct(id); 
        if (response.data.singleProduct) {
          setProduct(response.data.singleProduct); 
        } else {
          console.log("Error in getting the single product");
          setProduct({});
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        setError("Failed to fetch product details");
      } finally {
        setLoading(false); 
      }
    };

    fetchSingleProduct();
  }, [id]);

  if (loading) {
    return <div style={styles.loading}><Loadeer/></div>; 
  }

  if (error) {
    return <div style={styles.error}>{error}</div>; 
  }

  return (
    <Layout>
      <div style={styles.productContainer}>
        <div style={styles.imageContainer}>
          {product.images && product.images.length > 0 ? (
              <img src={product.images[0]} alt={product.name} style={styles.productImage} />
            ) : (
                <div style={styles.noImage}>No Image Available</div>
            )}
        </div>
        <div style={styles.detailsContainer}>
            <h1>Product Detail Page</h1>
          <h3 style={styles.productName}>Name:{product.name}</h3>
          <p style={styles.productDetails}><strong>Details:</strong> {product.productdetails}</p>
          <p style={styles.productCategory}><strong>Category</strong> {product.category.name}</p>
          <p style={styles.productQuantity}><strong>Quantity:</strong> {product.quantity}</p>
          
        </div>
      </div>
    </Layout>
  );
};

const styles = {
  productContainer: {
    display: 'flex',
    padding: 'auto',
    borderRadius: '8px',
    height:'20rem',
    width:"28rem",
    margin:'auto',
    backgroundColor:'white',
    marginTop:'8rem'
  },
  imageContainer: {
    marginRight: '20px',
  },
  productImage: {
    width: '15rem',
    height: '20rem',
  },
  noImage: {
    width: '20px',
    height: '30px',
    backgroundColor: '#333',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#aaa',
  },
  detailsContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column', 
  },
  productName: {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  productDetails: {
    fontSize: '18px',
    marginBottom: '10px',
  },
  loading: {
    color: '#fff',
    textAlign: 'center',
    marginTop: '50px',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: '50px',
  },
};

export default ProductsDetails;
