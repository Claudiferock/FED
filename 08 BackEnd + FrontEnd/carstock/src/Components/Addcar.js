import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import SkyLight from 'react-skylight';

class Addcar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brand: '',
      model: '',
      color: '',
      year: '',
      price: '',
      fuel:''
    }
  }

  handleChange = (event) => {
    this.setState ({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const newCar = {
      brand: this.state.brand,
      model: this.state.model,
      color: this.state.color,
      year: this.state.year,
      price: this.state.price,
      fuel: this.state.fuel
    }
    this.props.addCar(newCar);
    this.props.loadCars();
    this.simpleDialog.hide();
  }

  render() {
    return (
      <div className="App">
        <SkyLight hideOnOverlayClicked ref={ref => this.simpleDialog = ref} title="Hi, I'm a simple modal">
          <from>
            <div className="form-group">
              <input className="form-control" placeholder="Brand" name="brand" onChange={this.handleChange}/>
            </div>
            <div className="form-group">
              <input className="form-control" placeholder="Model" name="model" onChange={this.handleChange}/>
            </div>
            <div className="form-group">
              <input className="form-control" placeholder="Color" name="color" onChange={this.handleChange}/>
            </div>
            <div className="form-group">
              <input className="form-control" placeholder="Year" name="year" onChange={this.handleChange}/>
            </div>
            <div className="form-group">
              <input className="form-control" placeholder="Price" name="price" onChange={this.handleChange}/>
            </div>
            <div className="form-group">
              <input className="form-control" placeholder="Fuel" name="fuel" onChange={this.handleChange}/>
            </div>
            <button className="btn btn-primary" onClick={this.handleSubmit}>Save</button>                                            
          </from>
        </SkyLight>
        <button style={{marginLeft:50}} className="btn btn-primary" onClick={() => this.simpleDialog.show()}>Add Car</button>
      </div>
    );
  }
}

export default Addcar;
