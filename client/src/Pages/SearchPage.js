import React, { useState } from 'react';
import Layout from '../Components/Layout';
import { searchProduct } from '../services/AllApi';
import Loadeer from '../Components/Loadeer';
import Card from '../Components/Card';

const SearchPage = () => {
  const [query, setQuery] = useState(''); 
  const [results, setResults] = useState([]); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await searchProduct(query);
      if (response.data && response.data.products) {
        setResults(response.data.products);  
      } else {
        setResults([]);
        setError('No results found');
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
      setError('Something went wrong while fetching data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Layout>
        <div style={styles.container}>
          <h2>Search Products</h2>

        
          <form onSubmit={handleSearch} style={styles.searchForm}>
            <input
              type="text"
              placeholder="Search for products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={styles.searchInput}
            />
            <button type="submit" style={styles.searchButton}>Search</button>
          </form>

          
          {loading && <div><Loadeer/></div>}
          {error && <div style={styles.error}>{error}</div>}

        
          <div style={styles.resultsContainer}>
            
             {results && results.map((i)=>{
                     return (
                    <Card
                    key={i._id} 
                    id={i._id}
                    name ={i.name}
                    productdetails ={i.productdetails.substring(0,5)}
                    category={i.category.name}
                    images={i.images}
                    quantity={i.quantity}
                    />
                )
            })
            }
          </div>
        </div>
      </Layout>
    </>
  );
};

const styles = {
  container: {
    padding: '20px',
    textAlign: 'center',
    marginLeft: '40px'
  },
  searchForm: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  searchInput: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    marginRight: '10px',
    width: '300px',
  },
  searchButton: {
    padding: '10px 20px',
    backgroundColor: '#333',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  resultsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)', 
    justifyContent: 'center',
  }
  
  
};

export default SearchPage;
