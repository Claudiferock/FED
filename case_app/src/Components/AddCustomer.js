import React, { Component } from 'react';
import '../App.css';
import SkyLight from 'react-skylight';

class AddCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      streetaddress: '',
      postcode: '',
      city: '',
      email:'',
      phone:'',
    }
  }

  handleChange = (event) => {
    this.setState ({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const newCustomer = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      streetaddress: this.state.streetaddress,
      postcode: this.state.postcode,
      city: this.state.city,
      email: this.state.email,
      phone: this.state.phone,
    }
    this.props.addCustomer(newCustomer);
    this.props.loadCustomers();
    this.simpleDialog.hide();
  }

  render() {
    return (
      <div className="App">
        <SkyLight hideOnOverlayClicked ref={ref => this.simpleDialog = ref} title="Hi, I'm a simple modal">
          <from>
            <div className="form-group">
              <input className="form-control" placeholder="First Name" name="firstname" onChange={this.handleChange}/>
            </div>
            <div className="form-group">
              <input className="form-control" placeholder="Last Name" name="lastname" onChange={this.handleChange}/>
            </div>
            <div className="form-group">
              <input className="form-control" placeholder="Address" name="streetaddress" onChange={this.handleChange}/>
            </div>
            <div className="form-group">
              <input className="form-control" placeholder="Postcode" name="postcode" onChange={this.handleChange}/>
            </div>
            <div className="form-group">
              <input className="form-control" placeholder="City" name="city" onChange={this.handleChange}/>
            </div>
            <div className="form-group">
              <input className="form-control" placeholder="Email" name="email" onChange={this.handleChange}/>
            </div>
            <div className="form-group">
              <input className="form-control" placeholder="Phone Number" name="phone" onChange={this.handleChange}/>
            </div>
            <button className="btn btn-primary" onClick={this.handleSubmit}>Save</button>                                            
          </from>
        </SkyLight>
        <button style={{marginLeft:50}} className="btn btn-primary" onClick={() => this.simpleDialog.show()}>Add Customer</button>
      </div>
    );
  }
}

export default AddCustomer;