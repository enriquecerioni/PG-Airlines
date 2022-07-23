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
import Cart from "./components/Cart";

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
              <Route component={ErrorPage} />
            </Switch>
          </CartProvider>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
