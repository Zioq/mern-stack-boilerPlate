import "./App.css";
import React, { Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// Components
import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import Auth from "./hoc/Auth";
// Page views
import Footer from "./components/views/Footer/Footer";

//[option]
//null  : All people access allowed
//true  : Only logged in user access allowed
//false : Deny logged in user access

function App() {
  return (

      <div style={{ paddingTop: "70px", minHeight: "calc(100vh - 80px)" }}>
        <Router>
          <Switch>
            <Route exact path="/" component={Auth(LandingPage, null)} />
            <Route exact path="/login" component={Auth(LoginPage, false)} />
            <Route
              exact
              path="/register"
              component={Auth(RegisterPage, false)}
            />
          </Switch>
        </Router>
      </div>
  );
}

export default App;
