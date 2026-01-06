import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Badge } from "antd";
// import { elbutik } from '/Users/dpthynair/React/estore/client/public/download.png'

import {
  HomeOutlined,
  UserOutlined,
  UserAddOutlined,
  SettingOutlined,
  LoginOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
  CarTwoTone,
} from "@ant-design/icons";
// import firebase from "firebase";
import { auth, googleAuthProvider } from '../firebase';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import Search from "./forms/Search";

const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState("");
  let dispatch = useDispatch();
  let history = useHistory();
  let { user, cart } = useSelector((state) => ({ ...state }));

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const logout = () => {
    auth.signOut();
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    history.push("/login");
  };

  return (
    <Menu
      onClick={handleClick}
      selectedKeys={[current]}
      mode="horizontal"
      style={{ backgroundColor: "#E7E7E7", display: 'flex' }}
    >
      <Item key="home" icon={<HomeOutlined style={{ fontSize: '30px', color: '#45A4A0', marginTop: '5px' }} />}>
        <Link to="/">  <img
          src="/download2.png"
          alt="Home"
          style={{ height: "40px", alignItems: "center", marginBottom: "7px" }}
        /></Link>
      </Item>

      <Item key="shop" icon={<ShoppingOutlined style={{ fontSize: '25px', color: '#75A1AB' }} />}>
        <Link to="/shop">Shop</Link>
      </Item>

      <Item key="cart" icon={<ShoppingCartOutlined style={{ fontSize: '25px', color: '#75A1AB' }} />}>
        <Link to="/cart">
          <Badge count={cart.length} offset={[9, 0]}>
            Cart
          </Badge>
        </Link>
      </Item>

      {/* Spacer to push items to the right */}
      <div style={{ marginLeft: 'auto' }}></div>

      {!user && (
        <Item key="register" icon={<UserAddOutlined />}>
          <Link to="/register">Register</Link>
        </Item>
      )}

      {!user && (
        <Item key="login" icon={<UserOutlined />}>
          <Link to="/login">Login</Link>
        </Item>
      )}

      {user && (
        <SubMenu
          key="SubMenu"
          icon={<SettingOutlined />}
          title={user.email && user.email.split("@")[0]}
          style={{ fontSize: '15px', color: '#75A1AB' }}
        >
          {user && user.role === "subscriber" && (
            <Item>
              <Link to="/user/history"> Dashboard</Link>
            </Item>
          )}

          {user && user.role === "admin" && (
            <Item>
              <Link to="/admin/dashboard"> Dashboard</Link>
            </Item>
          )}

          <Item icon={<LoginOutlined />} onClick={logout}>
            Logout
          </Item>
        </SubMenu>
      )}

      <Item key="search" style={{ cursor: 'default' }}>
        <Search style={{ fontSize: '25px', color: '#75A1AB' }} />
      </Item>
    </Menu>
  );
};

export default Header;
