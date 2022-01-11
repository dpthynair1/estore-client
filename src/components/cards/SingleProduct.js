import React, { useState }  from "react";
import { Card, Tabs,Tooltip } from "antd";
import { Link } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Laptop from "../../images/Gear-Surface-Laptop-4-angle-SOURCE-Microsoft.jpeg";
import ProductListItems from "./ProductListItems";
import StarRating from "react-star-ratings";
import RatingModal from "../modal/RatingModal";
import { showAverage } from "../../functions/rating";
import { getRelatedProducts } from "../../functions/product";
import _ from 'lodash'
import { useSelector, useDispatch } from 'react-redux'

const { TabPane } = Tabs;

// Child component of Product Page
const SingleProduct = ({ product, changeRating, star }) => {
  const { title, description, images, _id } = product;

  const [tooltip, setTooltip] = useState('Click to add');
  const {user,cart} = useSelector((state) => ({...state}));
  let dispatch = useDispatch();


  const handleCart = () => {
    // Create cart array
   
      let cart = [];
      if (typeof window !== "undefined") {
        // if cart is in local storage GET it
        if (localStorage.getItem("cart")) {
          cart = JSON.parse(localStorage.getItem("cart"));
        }
        // push new product to cart
        cart.push({
          ...product,
          count: 1,
        });
        // remove duplicates
        let unique = _.uniqWith(cart, _.isEqual);
        // save to local storage
        // console.log('unique', unique)
        localStorage.setItem("cart", JSON.stringify(unique));
        setTooltip('Added');
  // Add to redux
  dispatch({
    type: "ADD_TO_CART",
    payload: unique
  })
  
    };
  }
  return (
    <>
      <div className="col-md-7">
        {images && images.length ? (
          <Carousel showArrows={true} autoPlay infiniteLoop>
            {images &&
              images.map((image) => (
                <img src={image.url} key={image.public_id} />
              ))}
          </Carousel>
        ) : (
          <Card
            cover={<img src={Laptop} className="mb-3 card-image  shadow" />}
          ></Card>
        )}
        <Tabs type="card" className="border-start-0  ">
          <TabPane tab="Description" key="1">
            <ul>
              <li>{description && description}</li>
              <li> Minimal meets mighty</li>
            </ul>
          </TabPane>
          <TabPane tab="Specification" key="2" className="pl-3">
            <ul>
              <li className="">
                Offering an abundance of performance options for any gamer in a
                clean, minimalist design.
              </li>
              <li>
                Enjoy blindingly fast refresh rates on a 100% color accurate FHD
                display and quick controls with the TrueStrike keyboard to
                scream past competition.
              </li>
            </ul>
          </TabPane>
        </Tabs>
      </div>

      <div className="col-md-5">
        <h3 className="bg-dark text-white  border border-dark  shadow-lg p-3">
          {title}
        </h3>

        {product && product.ratings && product.ratings.length > 0
          ? showAverage(product)
          : <div className="pt-1 pb-3">No rating yet</div>}

        <Card
          className="shadow-lg border-start-0 "
          actions={[
            <Tooltip title={tooltip}> 
            <a onClick={handleCart}>
              <ShoppingCartOutlined className="text-success" /> <br />
              Add to Cart
            </a>
            </Tooltip>,
            <Link to="/">
              <HeartOutlined className="text-info" /> <br /> Add to Wishlist
            </Link>,
            <RatingModal>
              <StarRating
                style={{ height: "0.1px" }}
                name={_id}
                numberOfStars={5}
                rating={star}
                changeRating={changeRating}
                isSelectable={true}
                starRatedColor="#00bcd4"
                starHoverColor="orange"
              />
            </RatingModal>,
          ]}
        >
          <ProductListItems product={product} />
        </Card>
      </div>
    </>
  );
};

export default SingleProduct;
