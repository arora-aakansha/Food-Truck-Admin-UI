import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Topbar from "../Sub_Components/Topbar";

function SignUp() {
  const [emailid, setemailid] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [foodTruckName, setFoodTruckName] = useState('');
  const [mobileno, setmobileno] = useState('');
  const [mobilenoError, setmobilenoError] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const NewUserSignUp = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(''); // Clear any previous errors

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }

    const mobilenoRegex = /^\d{10}$/;
    if (!mobilenoRegex.test(mobileno)) {
      setmobilenoError('Phone number must be 10 digits.');
      setLoading(false);
      return;
    } else {
      setmobilenoError('');
    }

    try {
      const response = await fetch('http://localhost:5000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emailid: emailid,
          password: password,
          name: foodTruckName,
          mobileno: mobileno,
          isAdmin: "Y",
        }),
      });

      const data = await response.json();
      if (response.ok) {
        sessionStorage.setItem('token', 'true');
        sessionStorage.setItem('emailid', emailid);
        console.log(sessionStorage.getItem('emailid'))
        console.log(sessionStorage.getItem('token'))
        navigate('/Login');
      } else {
        setError(data.message || 'Failed to create user.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred. Please try again later.');
    }
    setLoading(false);
  };

  return (
    <div>
      <Topbar />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div style={{ width: '400px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', textAlign: 'center' }}>
          <form onSubmit={NewUserSignUp}>
            <h2>Welcome to Food Truck</h2>
            <div style={{ marginBottom: '20px' }}>
              <table>
                <tr>
                  <td style={{ textAlign: 'left'}}><label>Email id:</label></td>
                  <td><input
                      type="emailid"
                      value={emailid}
                      onChange={(e) => setemailid(e.target.value)}
                      placeholder="John@gmail.com"
                      required
                    />
                </td>
                </tr>
                <tr>
                  <td style={{ textAlign: 'left'}}><label>Password:</label></td>
                  <td><input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="XXXXXXXX"
                      required
                    />
                </td>
                </tr>
                <tr>
                <td style={{ textAlign: 'left'}}><label>Confirm Password:</label></td>
                <td>
                      <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="XXXXXXXX"
                    required
                  />
              </td>
                </tr>
                <tr>
                  <td style={{ textAlign: 'left'}}>
                  <label >Food Truck Name:</label>
                  </td>
                  <td>
                  <input
                type="text"
                value={foodTruckName}
                onChange={(e) => setFoodTruckName(e.target.value)}
                placeholder="John'S Truck"
                required
              />
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: 'left'}}><label>Phone Number:</label></td>
                  <td><input
                      type="tel"
                      value={mobileno}
                      onChange={(e) => setmobileno(e.target.value)}
                      placeholder="203XXXXXXX"
                      required
                    />
                    {mobilenoError && <p style={{ color: 'red', fontSize: '12px' }}>{mobilenoError}</p>}</td>
                </tr>
              </table>       
              
            </div>
            <div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
            <div>
            <button type="submit" style={{ backgroundColor: 'black', color: 'white', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer' }}>
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
            </div>
          </form>
          <p style={{ marginTop: '10px' }}>
            Already have an account? <Link to="/Login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;