import React, { useState, useEffect } from "react";
import Navbar_Menu from "../Sub_Components/NavbarMenu";
import Footer from "../Sub_Components/Footer";

const fullPageStyle = {
  height: '100vh',
  display: 'flex',
  flexDirection: 'column'
};

const containerStyle = {
  flex: 1, 
  overflowY: 'auto' 
};

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/order/getordersuccess');
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const orderData = await response.json();
        setOrders(orderData || []);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setOrders([]); 
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="App" style={fullPageStyle}>
      <Navbar_Menu />
      <main style={containerStyle}>
        <h1>Order History</h1>
        {orders.length > 0 ? orders.map((order, index) => (
          <div key={index}>
            <h2>Order #{order.orderid} - {order.username}</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Order Status</th>
                  <th>Payment Status</th>
                  <th>Total Price</th>
                  <th>Items</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{order.username}</td>
                  <td>{order.orderstatus}</td>
                  <td>{order.paymentstatus}</td>
                  <td>${order.totalprice}</td>
                  <td>{order.items.map(item => item.itemdescription).join(", ")}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )) : <p>No orders found.</p>}
      </main>
      <Footer />
    </div>
  );
}
