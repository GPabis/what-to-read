import React from "react";
import "./App.css";
import Layout from "./components/Layout/Layout";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import WelcomePage from "./components/WelcomePage/WelcomePage";
import BestsellerList from "./containers/BestsellerList/BestsellerList";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route path="/" exact component={WelcomePage} />
            <Route path="/list" component={BestsellerList} />
          </Switch>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
