import React, { useState, useEffect } from 'react';
import Layout from '../../Components/Layout';
import { getAllCaterory, createProduct } from '../../services/AllApi';
import { useNavigate } from 'react-router-dom';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const CreateProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    productdetails: '',
    quantity: '',
  });
  const [images, setImages] = useState([]);
  const [cat, setCat] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  
  useEffect(() => {
    const fetchAllCat = async () => {
      try {
        const mydata = await getAllCaterory();
        if (mydata.data.allCategory) {
          setCat(mydata.data.allCategory);
        } else {
          console.log('Error in getting the category');
          setCat([]);
        }
      } catch (error) {
        console.log('Error in fetching all categories', error);
        setCat([]);
      }
    };
    fetchAllCat();
  }, []);

  
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('category', formData.category);
      data.append('productdetails', formData.productdetails);
      data.append('quantity', formData.quantity);

      
      images.forEach((image) => {
        data.append('images', image);
      });

      
      const response = await createProduct(data);
      if (response.data.success) {
        toast.success('Product created successfully');
        navigate('/profile'); 
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      toast.error('Error in creating product:', error);
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div style={styles.container}>
        <h2>Create Product</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label htmlFor="name">Product Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              style={styles.input}
              placeholder="Enter product name"
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="category">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
              style={styles.select}
            >
              <option value="">Select Category</option>
              {cat.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="productdetails">Product Details</label>
            <textarea
              name="productdetails"
              value={formData.productdetails}
              onChange={handleInputChange}
              required
              style={styles.textarea}
              placeholder="Enter product details"
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="quantity">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              required
              style={styles.input}
              placeholder="Enter product quantity"
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="images">Upload Images</label>
            <input
              type="file"
              name="images"
              onChange={handleImageChange}
              multiple
              required
              style={styles.input}
            />
          </div>
         {loading ? (toast.success("your product is being created")):( 
          <button type="submit" style={styles.button}>
            Create Product
          </button>
          )}
        </form>
      </div>
      <ToastContainer/>
    </Layout>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
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
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    width: '90%',
  },
  textarea: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    width: '90%',
    height: '100px',
  },
  select: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    width: '100%',
  },
  button: {
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#333',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default CreateProduct;
