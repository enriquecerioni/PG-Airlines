import "./App.css";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Home from "./components/HomeComponents/Home";
import NavBar from "./components/HomeComponents/NavBar";
import Details from "./components/Details";
import LogIn from "./components/LogIn";
import Register from "./components/Register";
import Favs from "./components/Favs";
import ErrorPage from "./components/ErrorPage";
import CartProvider from "./components/CartComponents/CartContext";
// import CartDemo from './components/CartComponents/Cart'
import Cart from "./components/Cart";
import Payment from "./components/Payment";

import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

const promise = loadStripe('pk_test_51LOWloHpIoeoktUtIVJXPVwS0wwgOLL4jWid6ymn1ZWdhL69T0JQxkwADRmqwnQ1RHGPiVTnTlHTnhrLWPbDASPr006V4SPmtp')

function App() {
  // const user = true;

  return (
    <>
      <BrowserRouter>
        <div className="App">
          <CartProvider>
            <NavBar />
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/ticket/:id">
                <Details />
              </Route>
              <Route path="/register">
                {/* {user ? <Redirect to='/' /> : <Register />} */}
                <Register />
              </Route>
              <Route path="/login">
                {/* {user ? <Redirect to='/' /> : <LogIn />} */}
                <LogIn />
              </Route>
              <Route path="/favs">
                <Favs />
              </Route>
              <Route path="/cart">
                <Cart />
              </Route>
              <Route path="/payment">
                <Elements stripe={promise} >
                  <Payment />
                </Elements>
              </Route>
              <Route component={ErrorPage} />
            </Switch>
          </CartProvider>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
