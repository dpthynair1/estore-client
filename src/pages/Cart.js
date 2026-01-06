import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ProductCardInCheckout from "../components/cards/ProductCardInCheckout";
import { ShoppingCartOutlined } from "@ant-design/icons";

const Cart = () => {
  const { cart, user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const getTotal = () => {
    return cart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const saveOrderToDb = () => {
    //
  };

  const showCartItems = () => (
    <table className="table table-bordered">
      <thead className="thead-light">
        <tr>
          <th scope="col">Image</th>
          <th scope="col">Title</th>
          <th scope="col">Price</th>
          <th scope="col">Brand</th>
          <th scope="col">Color</th>
          <th scope="col">Count</th>
          <th scope="col">Shipping</th>
          <th scope="col">Remove</th>
        </tr>
      </thead>

      {cart.map((p) => (
        <ProductCardInCheckout key={p._id} p={p} />
      ))}
    </table>
  );

  return (
    <div className="container-fluid pt-2">
      <div className="row">
        <div className="col-md-8">
          <h4>
            Shopping Cart
            {cart.length > 0 && (
              <span className="text-muted float-right"> {cart.length} {cart.length === 1 ? 'Item' : 'Items'}</span>
            )}
          </h4>
          <hr />

          {!cart.length ? (
            <div className="text-center p-5">
              <ShoppingCartOutlined style={{ fontSize: '60px', color: '#ccc' }} />
              <p className="mt-3">Your cart is empty.</p>
              <Link to="/shop">
                <button className="btn btn-primary">Continue Shopping</button>
              </Link>
            </div>
          ) : (
            showCartItems()
          )}
        </div>

        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Order Summary</h4>
              <hr />

              <div className="mb-3">
                <h6 className="text-muted">Products:</h6>
                {cart.map((c, i) => (
                  <div key={i} className="d-flex justify-content-between mb-2">
                    <span className="text-truncate" style={{ maxWidth: '200px' }}>
                      {c.title} × {c.count}
                    </span>
                    <span className="font-weight-bold">${(c.price * c.count).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <hr />

              <div className="d-flex justify-content-between mb-3">
                <h5>Total:</h5>
                <h5 className="text-primary">
                  <b>${getTotal().toFixed(2)}</b>
                </h5>
              </div>

              <hr />

              {user ? (
                <button
                  onClick={saveOrderToDb}
                  className="btn btn-primary btn-block btn-lg"
                  disabled={!cart.length}
                >
                  Proceed to Checkout
                </button>
              ) : (
                <Link
                  to={{
                    pathname: "/login",
                    state: { from: "cart" },
                  }}
                  className="btn btn-primary btn-block btn-lg"
                >
                  Login to Checkout
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
