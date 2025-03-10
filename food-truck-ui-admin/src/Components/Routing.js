import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Homepage from './Homepage';
import SignUp from './SignUp';
import Login from './Login';
import Menu from '../pages/Menu';
import OrderDetails from './OrderDetails';
import OrderHistory from '../Components/OrderHistory';
import { AuthProvider } from '../Components/AuthContext';
import ProtectedRoute from '../Components/ProtectedRoute'; 

export default class Routing extends React.Component {
    render() {
        return (
            <div>
                <AuthProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Navigate replace to="/Homepage" />} />
                        <Route path="/SignUp" element={<SignUp />} />
                        <Route path="/Login" element={<Login />} />
                        <Route path="/Homepage" element={<Homepage />} />
                        <Route path="/menu" element={
                          <ProtectedRoute>
                            <Menu />
                          </ProtectedRoute>
                        }/>
                        <Route path="/order_details" element={
                          <ProtectedRoute>
                            <OrderDetails />
                          </ProtectedRoute>
                        }/>
                    </Routes>
                </BrowserRouter>
                </AuthProvider>
            </div>
        );
    }
}
