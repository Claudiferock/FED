import React, { Component } from 'react';
import logo from './logo.svg';
import Particles from 'react-particles-js';
import './App.css';

const particlesOptions = {
  particles: {
    number: {
      value: 68,
      density: {
        enable: true,
        value_area: 800
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
        "size": 5,
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
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
