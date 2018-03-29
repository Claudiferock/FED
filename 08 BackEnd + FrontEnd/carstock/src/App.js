  import React, { Component } from 'react';
  import logo from './logo.svg';
  import './App.css';
  import {BrowserRouter,Route, Switch, Link} from 'react-router-dom';
  import Home from './Components/Home.js';
  import Carlist from './Components/Carlist.js';

  class App extends Component {
    render() {
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">My React car shop</h1>
          </header>
          <BrowserRouter>
            <div>
            <Link to="/">Frontpage</Link>{' '}
            <Link to="/home">Home</Link>{' '}
            <Link to="/cars">Carlist</Link>{' '}
            <Switch>
              <Route exact path="/" render={() => <h2>Oh</h2>}/>
              <Route path="/home" component={Home}/>
              <Route path="/cars" component={Carlist}/>
            </Switch>
            </div>
          </BrowserRouter>
        </div>
      );
    }
  }

  export default App;
