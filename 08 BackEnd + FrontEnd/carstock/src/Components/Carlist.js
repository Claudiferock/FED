import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'
import { ToastContainer, toast } from 'react-toastify';
import {CSVLink, CSVDownload} from 'react-csv';
import Addcar from "./Addcar"
import Editcar from "./Editcar"

class Carlist extends Component {
  constructor(props) {
  	super(props);
  	this.state = {
  		cars: []
  	};
  }

  renderEditable(cellInfo) {
  	return (
  			<div
  				contentEditable
  				suppressContentEditableWarning
  				onBlur = {e => {
  					const data = [...this.state.data];
  					data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
  					this.setState({ cars: data });
  				}}
  				dangerouslySetInnerHTML = {{
  					__html: this.state.data[cellInfo.index][cellInfo.column.id]
  				}}
  			/>
  		);
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
    	title: 'Delete Car Information',
      message: 'Are you sure you want to do this?',
      confirmable: 'Yes',
      cancelLabel: 'Cancel',
      onConfirm: () => {
      	fetch(idLink, {method: 'DELETE'})
      	.then(res => this.loadCars())
      	.catch(err => console.error(err))
      	toast.success("Successful deletion of car Information", {
      		position: toast.POSITION.BOTTOM_LEFT
      	});
      }
      //	** Different approach commented out **
      //buttons: [
      //  {
      //    label: 'Yes',
      //    onClick: () => {
      //    	fetch(idLink, {method: 'DELETE'})
      //    	.then(res => this.loadCars())
      //    	.catch(err => console.error(err))
      //    	toast.success("Delete succeded", {
      //    		position: toast.POSITION.BOTTOM_LEFT
      //    	});
      //    }
      //  },
      //  {
      //    label: 'No',
      //  }
      //]
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
	toast.success("New car was added successfully!", {
		position: toast.POSITION.BOTTOM_LEFT
	})
}

updateCar = (link, car) => {
	fetch(link, {
		method: 'PUT',
		headers : {'Content-Type': 'application/json'},
		body: JSON.stringify(car)
	})
	.then(res => this.loadCars())
	.catch(err => console.error(err))
}

  render() {
    return (
      <div className="App">
        <h2>My cars</h2>
        <div className="row">
        	<Addcar addCar={this.addCar} loadCars={this.loadCars} />
        	<CSVLink style={{padding:20}} data={this.state.cars} >Download CVS</CSVLink>
        </div>
        <ReactTable
        data={this.state.cars}
        columns={[
        	{
        		columns: [
        		{
        			accessor: "_links.self.href",
        			show: false
        		},
        		{
        			Header: "Brand",
        			accessor: "brand",
        			Cell: this.renderEditable
        		},
        		{
        			Header: "Model",
        			accessor: "model",
        			Cell: this.renderEditable
        		},
        		{
        			Header: "Color",
        			accessor: "color",
        			Cell: this.renderEditable
        		},
        		{
        			Header: "Fuel",
        			accessor: "fuel",
        			Cell: this.renderEditable
        		},
        		{
        			Header: "Year",
        			accessor: "year",
        			Cell: this.renderEditable
        		},
        		{
        			Header: "Price €",
        			accessor: "price",
        			Cell: this.renderEditable
        		},
        		{
        			id: 'button',
        			sortable: false,
        			filterable: false,
        			width: 100,
        			accessor: "_links.slef.href",
        			Cell: ({value, row}) => (
        				<button
        					type="button"
        					className="btn btn-outline-primary"
        					onClick={() => {this.updateCar(value, row)}}>
        					Save
        				</button>)
        		},
        		{
        			id: 'button',
        			sortable: false,
        			filterable: false,
        			width: 100,
        			accessor: "_links.self.href", 
        			Cell: ({value}) => (
        				<button
        					type="button" 
        					className="btn btn-outline-danger" 			
        					onClick={() => {this.deleteCar(value)}}>
        					Delete
        				</button>)
        		}
        	]
        	}
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
