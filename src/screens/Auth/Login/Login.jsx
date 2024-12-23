import React, { useState } from 'react';
import './Login.css';
import { Icons } from '../../../Icons/Icons';
import { loginUser } from '../../../services/api/user/repository';

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({ username: '', password: '' });

  const validateForm = () => {
    let isValid = true;
    const newErrors = { username: '', password: '' };

    if (username.trim() === '') {
      newErrors.username = 'Username is required';
      isValid = false;
    }

    if (password.trim() === '') {
      newErrors.password = 'Password is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    localStorage.setItem('userToken', "jkhgfzxcfg");
    onLogin();
    // if (validateForm()) {
    //   const data = {
    //     identifier: username,
    //     password: password,
    //   };
    //   const response = await loginUser(data);

    //   if (response) {
    //     localStorage.setItem('userToken', response.jwt);
    //     onLogin();
    //   }
    // }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div style={{ textAlign: 'center' }}>
          <img className="hunter_logo" src={Icons.hunter_logo} alt="hunter_logo" />
        </div>

        <form onSubmit={handleSubmit} style={{ marginBottom: '5px' }}>
          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {errors.username && <p className="error-message" style={{ marginTop: '2px' }}>{errors.username}</p>}
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <p className="error-message" style={{ marginTop: '2px' }}>{errors.password}</p>}
          </div>
          <div className="remember-me">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <label style={{ position: 'relative', top: '4px' }}>Remember me</label>
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
