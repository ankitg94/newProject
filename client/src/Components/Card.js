import React from 'react';
import { useNavigate } from 'react-router-dom';

const Card = ({ name, productdetails, category, images, quantity, id }) => {
  const navigate = useNavigate();

  const handleKnowMore = () => {
    navigate(`/product/${id}`);
  };

  return (
    <div style={styles.cardContainer}>
      {images && images.length > 0 ? (
        <img src={images[0]} alt={name} style={styles.productImage} />
      ) : (
        <div style={styles.noImage}>No Image Available</div>
      )}

      <div style={styles.cardContent}>
        <h3 style={styles.productName}>Name: {name}</h3>
        <p style={styles.productDetails}>Details: {productdetails}</p>
        <p style={styles.category}>Category: {category}</p>
        <p style={styles.quantity}>Quantity: {quantity}</p>
        <button onClick={handleKnowMore} style={styles.knowMoreButton}>
          Know More
        </button>
      </div>
    </div>
  );
};

const styles = {
  cardContainer: {
    backgroundColor: '#000',
    color: '#fff',
    borderRadius: '10px',
    padding: '20px',
    margin: '10px',
    width: '100%',  // Set width to 100% for flexibility
    maxWidth: '300px', // Max width for larger screens
    boxShadow: '0 2px 8px rgba(255, 255, 255, 0.1)',
    transition: 'transform 0.3s ease',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '@media (min-width: 768px)': {
      width: 'calc(50% - 20px)', // Adjust for tablets
    },
    '@media (min-width: 1024px)': {
      width: 'calc(33.33% - 20px)', // Adjust for desktops
    },
  },
  cardContent: {
    textAlign: 'center',
  },
  productImage: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    marginBottom: '15px',
  },
  noImage: {
    width: '100%',
    height: '200px',
    backgroundColor: '#333',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#aaa',
    marginBottom: '15px',
  },
  productName: {
    fontSize: '18px', // Smaller font for flexibility
    fontWeight: 'bold',
    margin: '10px 0',
  },
  productDetails: {
    fontSize: '14px',
    color: '#ddd',
    marginBottom: '10px',
  },
  category: {
    fontSize: '14px',
    color: '#ddd',
    marginBottom: '10px',
  },
  quantity: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#fff',
    marginTop: '10px',
  },
  knowMoreButton: {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    backgroundColor: '#fff',
    color: '#000',
    marginTop: '10px',
    transition: 'background-color 0.3s ease',
  },
  '@media (max-width: 768px)': {
    cardContainer: {
      width: '100%',  // Full width on small screens
    },
    productName: {
      fontSize: '16px',  // Smaller font for mobile
    },
    productImage: {
      height: '150px',  // Reduce image height on mobile
    },
  },
};

export default Card;
