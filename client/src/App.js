import './App.css';
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import LogIn from './components/LogIn';
import Register from './components/Register';
import Details from './components/Details';
import NavBar from './components/NavBar';
import Favs from './components/Favs';
import ErrorPage from './components/ErrorPage';

function App() {
  const user = true

  return (
    <>
    <BrowserRouter>
      <div className="App">
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
          <Route component={ErrorPage} />
        </Switch>
      </div>
    </BrowserRouter>
  </>
  );
}

export default App;
