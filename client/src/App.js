import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
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
import Catalog from "./components/CatalogComponents/Catalog";
import RegisterAirline from "./components/FormsComponents/RegisterAirline";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from "./components/CartComponents/Orders";
import Sales from "./components/CartComponents/Sales";
import Success from "./components/CartComponents/Success";
import UserProfile from "./components/Profile/UserProfile";
import UserPurchases from "./components/Profile/UserPurchases";
import AirlineSales from "./components/Profile/AirlineSales";
import FlightManagement from "./components/Profile/FlightManagement";
import UserManagement from "./components/Profile/UserManagement";
import AirlineManagement from "./components/Profile/AirlineManagement";
import AirlinePendingRequests from "./components/Profile/PendingRequests";
import { DarkModeProvider } from "./components/DarkModeContext";
import Business from "./components/HomeComponents/Business";

const promise = loadStripe(
  "pk_test_51LOWloHpIoeoktUtIVJXPVwS0wwgOLL4jWid6ymn1ZWdhL69T0JQxkwADRmqwnQ1RHGPiVTnTlHTnhrLWPbDASPr006V4SPmtp"
);

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="App">
          <DarkModeProvider>
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
                <Route exact path="/register/airline">
                  <RegisterAirline />
                </Route>
                <Route path="/register">
                  <Register />
                </Route>
                <Route path="/login">
                  <LogIn />
                </Route>
                <Route path="/profile">
                  <UserProfile />
                </Route>
                <Route path="/purchases">
                  <UserPurchases />
                </Route>
                <Route path="/airlineProfile">
                  <AirlineSales />
                </Route>
                <Route path="/catalogProfile">
                  <FlightManagement />
                </Route>
                <Route path="/userManagement">
                  <UserManagement />
                </Route>
                <Route path="/airlineManagement">
                  <AirlineManagement />
                </Route>
                <Route path="/airlinePendingRequests">
                  <AirlinePendingRequests />
                </Route>
                <Route path="/favs">
                  <Favs />
                </Route>
                <Route path="/cart">
                  <Cart />
                </Route>
                <Route path="/payment">
                  <Elements stripe={promise}>
                    <Payment />
                  </Elements>
                </Route>
                <Route path="/catalog">
                  <Catalog />
                </Route>
                <Route path="/sales">
                  <Sales />
                </Route>
                <Route path="/business">
                  <Business />
                </Route>
                <Route component={ErrorPage} />
              </Switch>
            </CartProvider>
            <ToastContainer />
          </DarkModeProvider>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
