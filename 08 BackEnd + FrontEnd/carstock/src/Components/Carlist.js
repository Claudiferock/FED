import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import { ToastContainer, toast } from 'react-toastify';

class Carlist extends Component {
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

  deleteCar = (value) => {
  		fetch(value, {method: 'DELETE'})
  		.then(res => {		
		toast.success("Car deleted successfully", {
			position: toast.POSITION.TOP_RIGHT
		});
		this.loadCars();
  		})
  }

  render() {
    return (
      <div className="App">
          <header>
          <h1 className="App-title">My React car shop</h1>
        </header>
        <h2>My cars</h2>
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

export default Carlist;
