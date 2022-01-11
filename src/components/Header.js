import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu ,Badge} from "antd";
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
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import Search from "./forms/Search";

const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState("");
  let dispatch = useDispatch();
  let history = useHistory();
  let { user,cart } = useSelector((state) => ({ ...state }));

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const logout = () => {
    firebase.auth().signOut();
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
      style={{ backgroundColor: "#E7E7E7" }}
    >
      <Item   key="home" icon={<HomeOutlined  style={{ fontSize: '25px', color: '#75A1AB' }}/>}>
        <Link to="/"> <span className="home">El Butik</span></Link>
      </Item>

      <Item key="shop" icon={<ShoppingOutlined  style={{ fontSize: '25px', color: '#75A1AB' }}/>}>
        <Link to="/shop">Shop</Link>
      </Item>

      <Item key="shop" icon={<ShoppingCartOutlined  style={{ fontSize: '25px', color: '#75A1AB' }}/>}>
        <Link to="/cart">
        <Badge count= {cart.length} offset={[9,0]}>
        Cart 
        </Badge>
       </Link>
      </Item>

      {!user && (
        <Item key="register" icon={<UserAddOutlined />} className="float-right">
          <Link to="/register">Register</Link>
        </Item>
      )}

      {!user && (
        <Item key="login" icon={<UserOutlined />} className="float-right">
          <Link to="/login">Login</Link>
        </Item>
      )}

      {user && (
        <SubMenu
          key="SubMenu"
          icon={<SettingOutlined />}
          title={user.email && user.email.split("@")[0]}
          className="float-right"
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

      <span className="float-right p-1 ">
      <Search  style={{ fontSize: '25px', color: '#75A1AB' }}/>
    </span>
    </Menu>
  );
};

export default Header;
