import React, { useState } from "react";
import { Card , Skeleton, Tooltip} from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import laptop from "../../images/Gear-Surface-Laptop-4-angle-SOURCE-Microsoft.jpeg";
import { Link } from "react-router-dom";
import { showAverage } from "../../functions/rating";
import _ from 'lodash'
import { useSelector, useDispatch } from 'react-redux'

const { Meta } = Card;

const ProductCard = ({ product }) => {

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



  // destructure
  const { images, title, description, slug,price } = product;
  return (
    <>
      {product && product.ratings && product.ratings.length > 0 ? (
        showAverage(product)
      ) : (
        <div className="text-center pt-1 pb-3">No rating yet</div>
      )}

      <Card
        cover={
          <img
            src={images && images.length ? images[0].url : laptop}
            style={{ height: "150px", objectFit: "cover" }}
            className="p-1"
          />
        }
        actions={[
          <Link to={`/product/${slug}`}>
            <EyeOutlined className="text-warning" /> <br /> View Product
          </Link>,
         <Tooltip title={tooltip}> 
         <a onClick={handleCart}>
         <ShoppingCartOutlined className="text-danger" /> <br /> Add to Cart
       </a>
         
         </Tooltip>,
        ]}
      >
        <Meta
        title={`${title} - $${price}`}
          description={`${description && description.substring(0, 40)}...`}
        />
      </Card>
    </>
  );
};

export default ProductCard;
