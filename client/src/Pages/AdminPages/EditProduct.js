import React, { useState, useEffect } from 'react';
import Layout from '../../Components/Layout';
import { getAllCaterory, getSingleProduct, updateProduct } from '../../services/AllApi';
import { useNavigate, useParams } from 'react-router-dom';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    productdetails: '',
    quantity: '',
  });
  const [images, setImages] = useState([]);
  const [cat, setCat] = useState([]);
  const navigate = useNavigate();
  const {id} =useParams();
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
  useEffect(() => { 
    const fetchSingleProduct = async () => {
      try {
        const response = await getSingleProduct(id); 
        if (response.data.singleProduct) {
          setFormData(response.data.singleProduct); 
        } else {
          console.log("Error in getting the single product");
          setFormData({});
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      
      } finally {
        setLoading(false)
      }
    };

    fetchSingleProduct();
  }, [id]);



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

      
      const response = await updateProduct(id,data);
      if (response.data.success) {
        toast.success('Product updated successfully');
        navigate('/profile'); 
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      toast.error('Error in updating product:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div style={styles.container}>
        <h2>update Product</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label htmlFor="name">Product Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
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
              style={styles.input}
            />
          </div>
{loading? (toast.success("your product has been updated")):( 
          <button type="submit" style={styles.button}>
            update
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
    marginBottom: '10px',
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

export default EditProduct;
