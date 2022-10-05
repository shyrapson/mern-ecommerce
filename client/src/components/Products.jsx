import axios from "axios";
import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Product from "./Product";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
`;

const Products = ({ category, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filterProduct, setFilterProduct] = useState([]);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get(
          category
            ? `http://localhost:3000/api/v1/products?category=${category}`
            : "http://localhost:3000/api/v1/products",
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzBmNWUyOTA1ODNlMmJiZTJiMTgzMGIiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2NjQyNjcyMDAsImV4cCI6MTY2Njg1OTIwMH0.FhWyMk182urcP9iKtGotWsFFUdWAF3ymz443Q1A2Je4 ",
            },
          }
        );
        setProducts(res.data);
        console.log(res.data);
      } catch (error) {}
    };
    getProduct();
  }, [category]);

  useEffect(() => {
    category &&
      setFilterProduct(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [products, category, filters]);

  useEffect(() => {
    if (sort === "newest") {
      setFilterProduct((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilterProduct((prev) => [...prev].sort((a, b) => a.price - b.price));
    } else {
      setFilterProduct((prev) => [...prev].sort((a, b) => b.price - a.price));
    }
  }, [sort]);

  return (
    <Container>
      {category
        ? filterProduct.map((item) => <Product item={item} key={item.id} />)
        : products.map((item) => <Product item={item} key={item.id} />)}
    </Container>
  );
};

export default Products;
