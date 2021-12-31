import React, { useEffect} from 'react'
import {Switch, Route} from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import Home from './pages/Home'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import RegisterComplete from './pages/auth/RegisterComplete'
import Header from './components/Header'
import ForgotPassword from './pages/auth/ForgotPassword';

import {auth} from './firebase';
import {useDispatch} from 'react-redux';

const App = () => {

  const dispatch = useDispatch();

  // To check firebase auth state

  useEffect(() => {
    // to clean state after dispatching state to store

    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      console.log('user',user);
      if(user){
        const idTokenResult = await user.getIdTokenResult();

        dispatch({
          type: 'LOGGED_IN_User',
          payload: {
           email: user.email,
           token: idTokenResult.token
          }
        })
      }
    })

  // Clean up
  return () => unsubscribe();
  }, [])
  return (
    <>
   <Header />
   <ToastContainer />
    <Switch >
    <Route exact path= "/" component= {Home} />
    <Route exact path= "/register" component= {Register} />
    <Route exact path= "/register/complete" component= {RegisterComplete} />
    <Route exact path= "/login" component= {Login} />
    <Route exact path= "/forgot/password" component= {ForgotPassword}/>
    </Switch>
  </>
  );
  
}

export default App;
