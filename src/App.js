import React from 'react';
import './App.css';
import Layout from './components/Layout/Layout';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import WelcomePage from './components/WelcomePage/WelcomePage';
import BestsellerList from './containers/BestsellerList/BestsellerList';

function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Switch>
                    <Route path="/list" component={BestsellerList} />
                    <Route path="/" component={WelcomePage} />
                </Switch>
            </Layout>
        </BrowserRouter>
    );
}

export default App;
