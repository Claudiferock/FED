import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import { ToastContainer, toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import Addcar from "./Addcar"

class EditCar extends Component {
  constructor(props) {
    super(props);
    this.state = {cars: []};
  }

  componentDidMount() {
    this.loadCars();
  }

  loadCars = () => {
    fetch('https://carstockrest.herokuapp.com/cars')
    .then(res => res.json())
    .then(resData => {
      this.setState({cars: resData._embedded.cars});
    })
  }

  deleteCar = (idLink) => {
    confirmAlert({
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            fetch(idLink, {method: 'DELETE'})
            .then(res => this.loadCars())
            .catch(err => console.error(err))
            toast.success("Delete succeded", {
              position: toast.POSITION.BOTTOM_LEFT
            });
          }
        },
        {
          label: 'No',
        }
      ]
    })
  }

addCar = (newCar) => {
  fetch('https://carstockrest.herokuapp.com/cars', {
    method: 'POST',
    headers : {'Content-Type': 'application/json'},
    body: JSON.stringify(newCar)
  })
  .then(res => this.loadCars())
  .catch(err => console.error(err))
}

  render() {
    return (
      <div className="App">
        <h2>My cars</h2>
        <div className="row">
          <Addcar addCar={this.addCar} />
        </div>
        <ReactTable
        data={this.state.cars}
        columns={[
          {
          Header: "Brand",
          accessor: "brand"
          },
          {
          Header: "Model",
          accessor: "model"
          },
          {
          Header: "Color",
          accessor: "color"
          },
          {
          Header: "Fuel",
          accessor: "fuel"
          },
          {
          Header: "Year",
          accessor: "year"
          },
          {
          Header: "Price",
          accessor: "price"
          },
          {
          accessor: "_links.self.href", 
          Cell: ({value}) => (
            <button
              type="button" 
              className="btn btn-outline-danger"      
              onClick={() => {this.deleteCar(value)}}>
              Delete
            </button>)
          },
        ]}
          filterable
         defaultPageSize={5}
         className="-striped -highlight"
        />
        <ToastContainer autoClose={1500}/>
      </div>
    );
  }
}

export default EditCar;
