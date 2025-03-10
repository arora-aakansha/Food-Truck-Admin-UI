import React, { useState } from 'react';
import {Link, useHistory} from 'react-router-dom';
import Navbar_Menu from "../Sub_Components/NavbarMenu";

function OrderDetails(props) {

    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Navbar_Menu/>
      <div style={{ textAlign: 'center', marginTop:'250px' }}>
        <h2>
          Welcome to Order Details page, Work In Progress!
        </h2>
      </div>
      </div>
    );
    
}

export default OrderDetails;