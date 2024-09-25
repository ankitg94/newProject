import React, { useEffect, useState } from 'react';
import Layout from '../Components/Layout';
import { getAllCaterory, getAllProduct } from '../services/AllApi';
import "../css/HomePage.css";
import Card from '../Components/Card';

const HomePages = () => {
  const [cat, setCat] = useState([]);
  const [product, setProduct] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchAllCat = async () => {
      try {
        const mydata = await getAllCaterory();
        if (mydata.data.allCategory) {
          setCat(mydata.data.allCategory);
        } else {
          console.log("error in getting the category");
          setCat([]);
        }
      } catch (error) {
        console.log("error in fetching all the Category", error);
        setCat([]);
      }
    };
    fetchAllCat();
  }, []);

  useEffect(() => {
    const fetchAllPRodcut = async () => {
      try {
        const res = await getAllProduct();
        if (res.data.allproducts) {
          setProduct(res.data.allproducts);
        } else {
          console.log("error in getting the product");
          setProduct([]);
        }
      } catch (error) {
        console.log("error in fetching all the product");
        setProduct([]);
      }
    };
    fetchAllPRodcut();
  }, []);

  const filteredProducts = selectedCategory === 'All'
    ? product
    : product.filter((item) => item.category.name === selectedCategory);

  return (
    <Layout>
      <div className="container">
        <h4 className="heading">The Madras Branding Company</h4>
        <div className="categoryList">
          <button
            className="categoryButton"
            onClick={() => setSelectedCategory('All')}
          >
            All
          </button>
          {cat && cat.map((i) => (
            <button
              key={i._id}
              className="categoryButton"
              onClick={() => setSelectedCategory(i.name)}
            >
              {i.name}
            </button>
          ))}
        </div>
        <div className="cardGrid">
          {filteredProducts && filteredProducts.map((i) => (
            <Card
              key={i._id}
              id={i._id}
              name={i.name}
              productdetails={i.productdetails.substring(0, 5)}
              category={i.category.name}
              images={i.images}
              quantity={i.quantity}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default HomePages;
