// import logo from './logo.svg';
import React from "react";
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import './App.css';
import './assets/css/styles.css'

import HeaderComp from './Header';
import Sidenav from './Sidenavbar';
import Dashboard from './Dashboard';
import CustomDataTable from "./CustomDataTable";
import CustomerFeedback from "./Feedback";

import orderList from './assets/js/data.json'


function App() {

  // Define the columns for the DataTable
  const columns = [
    {
      name: 'Order ID',
      selector: row => row.Order_ID,
      sortable: true,
    },
    {
      name: 'Customer Name',
      selector: row => row.Customer_Name,
      sortable: true,
    },
    {
      name: 'Address',
      selector: row => row.Customer_Address,
      sortable: true,
    },
    {
      name: 'Amount',
      selector: row => row.Amount,
      sortable: true,
    },
    {
      name: 'Status',
      selector: row => row.Order_Status,
      sortable: true,
    },
    {
      name: 'Delivery Person',
      selector: row => row.Delivery_Person,
      sortable: true,
    },
  ];


  const transformData = (jsonData) => {
    // console.log(jsonData,"srk")
    return jsonData.map(order => {
      const totalAmount = order.Items.reduce((sum, item) => sum + item.Total_Price, 0);
      var order_status_badge;
      if (order.Order_Status === "Delivered") {
        order_status_badge = <badge class="badge bg-success fs-1 p-1">{order.Order_Status}</badge>
      }
      else if (order.Order_Status === "Pending") {
        order_status_badge = <badge class="badge bg-danger fs-1 p-1">{order.Order_Status}</badge>
      }
      else {
        order_status_badge = <badge class="badge bg-warning fs-1 p-1">{order.Order_Status}</badge>
      }
      return {
        Order_ID: order.Order_ID,
        Customer_Name: order.Customer_Name,
        Customer_Address: order.Customer_Address,
        Amount: "$" + totalAmount.toFixed(2),
        Order_Status: order_status_badge,
        Delivery_Person: order.Delivery_Person || 'Not Assigned',
      };
    });
  };

  const data = transformData(orderList);
  // console.log(data,"tableData")



  return (
    <div className='appwidth'>
      <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6"
        data-sidebartype="full"
        data-sidebar-position="fixed"
        data-header-position="fixed"
      >
        <BrowserRouter>
          <Sidenav />
          <div className='body-wrapper'>
            <HeaderComp />
            <div className="container-fluid">
              <Routes>

                <Route index element={<Dashboard />} />
                <Route path="/feedback" element={<CustomerFeedback />} />
                <Route path="/orders" element={<CustomDataTable columns={columns} data={data} title="Order List" />} />
                {/* <Route path="/about" element={<About />} /> */}

              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </div>
    </div>



  )
}

export default App;
