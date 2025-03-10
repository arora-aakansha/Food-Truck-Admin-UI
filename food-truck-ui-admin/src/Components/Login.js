import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Css/Loginpage.css'; 
import Navbar_Menu from "../Sub_Components/NavbarMenu";


const Login = () => {
  const [emailid, setEmailid] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
    // Check if the token is already stored and if yes, prefill the email
    const token = sessionStorage.getItem('token');
    console.log(token)
    if (token) {
      try {
        const parsedToken = JSON.parse(atob(token.split('.')[1])); // Parse the JWT token
        setEmailid(parsedToken.emailid); // Extract and set the email from the token
      } catch (error) {
        console.error('Error parsing token:', error);
        // Handle invalid token or token format here
      }
    }
  }, []);

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emailid: emailid,
          password: password,
          isAdmin: "Y"
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Login successful, store the email in localStorage if it's not already stored or if it's different
        if (!localStorage.getItem('emailid') || localStorage.getItem('emailid') !== emailid) {
          localStorage.setItem('emailid', emailid);
          sessionStorage.setItem('token','true');
          sessionStorage.setItem('emailid', emailid);
        }

        // Navigate to the homepage for all users
        navigate('/Homepage');
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div>
      <Navbar_Menu />
      <div className="Login-container">
        <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
          <h2 className="login-heading">Login</h2>
          <div>
            <label>Email:</label>
            <input type="text" value={emailid} onChange={(e) => setEmailid(e.target.value)} />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit">Login</button>
        </form>
        {error && <div className="error">{error}</div>}
      </div>
    </div>
  );
};

export default Login;
