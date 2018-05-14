import React, { Component } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { ToastContainer, toast } from 'react-toastify';
import {CSVLink, CSVDownload} from 'react-csv';
import ReactTable from 'react-table';

import '../App.css';
import "react-table/react-table.css";
import 'react-confirm-alert/src/react-confirm-alert.css'

import AddCustomer from "./AddCustomer"

class CustomerList extends Component {
  constructor(props) {
  	super(props);
  	this.state = {
  		customers: []
  	};
  }

  renderEditable(cellInfo) {
  	return (
  			<div
  				contentEditable
  				suppressContentEditableWarning
  				onBlur = {e => {
  					const data = [...this.state.customers];
  					data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
  					this.setState({ customers: data });
  				}}
/*   				dangerouslySetInnerHTML = {{
  					__html: this.state.data[cellInfo.index][cellInfo.column.id]
  				}} */
  			/>
  		);
  }

  componentDidMount() {
		this.loadCustomers();
  }

  loadCustomers = () => {
  	fetch('https://customerrest.herokuapp.com/api/customers')
  	.then(response => response.json())
  	.then(responseData => {
  		this.setState({customers: responseData.content});
  	})
  }

  deleteCustomer = (idLink) => {
    confirmAlert({
    	title: 'Delete Customer',
      message: 'Are you sure you want to do this?',
      confirmable: 'Yes',
      cancelLabel: 'Cancel',
      onConfirm: () => {
      	fetch(idLink, {method: 'DELETE'})
      	.then(res => this.loadCustomers())
      	.catch(err => console.error(err))
      	toast.success("Successful deletion of customer", {
      		position: toast.POSITION.BOTTOM_LEFT
      	});
      }
    })
  }

  addCustomer = (newCustomer) => {
    fetch('https://customerrest.herokuapp.com/api/customers', {
      method: 'POST',
      headers : {'Content-Type': 'application/json'},
      body: JSON.stringify(newCustomer)
    })
    .then(res => this.loadCustomers())
    .catch(err => console.error(err))
    toast.success("New customer added successfully!", {
      position: toast.POSITION.BOTTOM_LEFT
    })
  }

  updateCustomer = (link, customers) => {
    fetch(link, {
      method: 'PUT',
      headers : {'Content-Type': 'application/json'},
      body: JSON.stringify(customers)
    })
    .then(res => this.loadCustomers())
    .catch(err => console.error(err))
  }

  render() {
    return (
      <div className="App">
        <h2>Customers</h2>
        <div className="row">
        	<AddCustomer addCustomer={this.addCustomer} loadCustomers={this.loadCustomers} />
        	<CSVLink style={{padding:20}} data={this.state.customers} >Download CVS</CSVLink>
        </div>
        <ReactTable
        data={this.state.customers}
        columns={[
        	{
        		columns: [
        		{
        			accessor: "_links.self.href",
        			show: false
        		},
        		{
        			Header: "First Name",
        			accessor: "firstname",
        			Cell: this.renderEditable
        		},
        		{
        			Header: "Last Name",
        			accessor: "lastname",
        			Cell: this.renderEditable
        		},
        		{
        			Header: "Address",
        			accessor: "streetaddress",
        			Cell: this.renderEditable
        		},
        		{
        			Header: "Postcode",
        			accessor: "postcode",
        			Cell: this.renderEditable
        		},
        		{
        			Header: "City",
        			accessor: "city",
        			Cell: this.renderEditable
        		},
        		{
        			Header: "Email",
        			accessor: "email",
        			Cell: this.renderEditable
            },
            {
        			Header: "Phone Number",
        			accessor: "phone",
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
        					onClick={() => {this.updateCustomer(value, row)}}>
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
        					onClick={() => {this.deleteCustomer(value)}}>
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

export default CustomerList;
