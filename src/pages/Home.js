import React, { useEffect, useState } from "react";
import { getProductsByCount } from "../functions/product";
import ProductCard from "../components/cards/ProductCard";
import Jumbotron from "../components/cards/Jumbotron";
import LoadingCard from "../components/cards/LoadingCard";
import { getProducts } from "../functions/product";
import NewArrivals from "../components/home/NewArrivals";
import BestSellers from "../components/home/BestSellers";
import CategoryList from "../components/category/CategoryList";
import SubList from "../components/sub/SubList";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    // getProductsByCount(3).then((res) => {
    getProducts("createdAt", "desc", 3).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };

  return (
    <>
      <div
        // className="jumbotron  splash-screen text-dark h1 font-weight-bold text-center bg-transparent cta"
        className="jumbotron text-dark h1 font-weight-bold text-center bg-transparent"
        style={{
          backgroundImage: `url("https://via.placeholder.com/500")`,
        }}
      >
        <Jumbotron text={["Latest Products", "New Arrivals", "Best Sellers"]} />
      </div>

      <h4 className="display-4 jumbotron text-center p-3 mt-5 mb-5">
        New Arrivals
      </h4>

      <NewArrivals />

      <h4 className="display-4 jumbotron text-center p-3 mt-5 mb-5">
        Best Sellers
      </h4>

      <BestSellers />
      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
      Categories
    </h4>
    <CategoryList />

    <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
     Sub-Categories
    </h4>
    <SubList />


    </>
  );
};

export default Home;
