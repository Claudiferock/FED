import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

import Particles from 'react-particles-js';
import logo from './logo.svg';
import './App.css';

import CustomerList from "./Components/CustomerList"
import TrainingList from "./Components/TrainingList"
import AddCustomer from "./Components/AddCustomer"

const particlesOptions = {
  "particles": {
    "number": {
      "value": 68,
      "density": {
        "enable": true,
        "value_area": 800
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "bubble"
      }
    },
    "modes": {
      "bubble": {
        "distance": 100,
        "size": 10,
        "duration": 2,
        "opacity": 0.8,
        "speed": 5
      }
    },
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <Particles className='particles'
            params={particlesOptions} />
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">GYM Database</h1>
        </header>
        <BrowserRouter>
          <div>
            <Link className='f2 black bg-animate hover-bg-light-blue pointer' to="/">FrontPage</Link>{' '}
            <Link className='f2 black bg-animate hover-bg-light-blue pointer' to="/customers">Customers</Link>{' '}
            <Link className='f2 black bg-animate hover-bg-light-blue pointer' to="/trainings">Trainings</Link>{' '}
            <Switch>
              <Route exact path="/" render={() => <h2>Welcome!</h2>}/>
              <Route path="/customers" component={CustomerList}/>
              <Route path="/trainings" component={TrainingList}/>
            </Switch>
          </div>
        </BrowserRouter>
        <p className="App-intro">
          Try switching between Customers and Trainings!
        </p>
      </div>
    );
  }
}

export default App;
