import "./App.css";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Home from "./components/HomeComponents/Home";
import NavBar from "./components/HomeComponents/NavBar";
import Details from "./components/Details";
import LogIn from "./components/FormsComponents/LogIn";
import Register from "./components/FormsComponents/Register";
import Favs from "./components/Favs";
import ErrorPage from "./components/ErrorPage";
import CartProvider from "./components/CartComponents/CartContext";
// import CartDemo from './components/CartComponents/Cart'
import Cart from "./components/CartComponents/Cart";
import Payment from "./components/CartComponents/Payment";
import Catalog from './components/CatalogComponents/Catalog';
import RegisterAirline from "./components/FormsComponents/RegisterAirline";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import Orders from "./components/CartComponents/Orders";
import Success from "./components/CartComponents/Success";
import UserProfile from "./components/Profile/UserProfile";
import UserPurchases from "./components/Profile/UserPurchases";
import AirlineProfile from "./components/Profile/AirlineProfile"

const promise = loadStripe('pk_test_51LOWloHpIoeoktUtIVJXPVwS0wwgOLL4jWid6ymn1ZWdhL69T0JQxkwADRmqwnQ1RHGPiVTnTlHTnhrLWPbDASPr006V4SPmtp')

function App() {
  // const user = true;
  // const notify = () => toast("Wow so easy!");
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
              <Route path="/orders">
                <Orders />
              </Route>
              <Route path="/success">
                <Success />
              </Route>
              <Route path="/ticket/:id">
                <Details />
              </Route>
              <Route exact path='/register/airline'>
                <RegisterAirline />
              </Route>
              <Route path="/register">
                {/* {user ? <Redirect to='/' /> : <Register />} */}
                <Register />
              </Route>
              
              <Route path="/login">
                {/* {user ? <Redirect to='/' /> : <LogIn />} */}
                <LogIn />
              </Route>
              <Route path="/profile">
                <UserProfile/>
              </Route>
              <Route path="/purchases">
                <UserPurchases/>
              </Route>
              <Route path="/airlineProfile">
                <AirlineProfile/>
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
              <Route path="/catalog">
                  <Catalog />
              </Route>
              <Route component={ErrorPage} /> 
            </Switch>
          </CartProvider>
          <ToastContainer />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
