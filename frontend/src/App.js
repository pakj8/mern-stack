import { useState } from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from "./components/Register";


export default function App() {
  
  const [user, setLoginUser] = useState({})
  
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {
            user && user._id ? <Home />:<Login />
          }<Home />
        </Route>
        <Route exact path="/login"><Login setLoginUser={setLoginUser}/></Route>
        <Route exact path="/register"><Register /></Route>
      </Switch>
    </Router>
  );
}
