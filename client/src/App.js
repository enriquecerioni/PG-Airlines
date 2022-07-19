<<<<<<< HEAD
import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home";

function App() {
  return (
    <>
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          
        </Switch>
      </div>
    </BrowserRouter>
  </>
=======
import "./App.css";
import NavBar from "./components/NavBar";
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* <Home /> */}
      </div>
    </BrowserRouter>
>>>>>>> c27af2bbd66c2f9cdcf0851691dc6378f8e5b05b
  );
}

export default App;
