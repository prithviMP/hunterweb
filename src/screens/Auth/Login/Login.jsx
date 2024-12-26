import React, { useState } from 'react';
import './Login.css';
import { Icons } from '../../../Icons/Icons';
import { loginUser } from '../../../services/api/user/repository';

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({ username: '', password: '' });
  const [apiError, setApiError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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

    if (validateForm()) {
      const data = {
        identifier: username,
        password: password,
      };
      const response = await loginUser(data);

      if (response.status === 200) {
        localStorage.setItem('userToken', response?.data?.jwt);
        onLogin();
      } else {
        setApiError(response?.response?.data?.error?.message);
      }
    }
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
              placeholder='Enter your username'
            />
            {errors.username && <p className="error-message" style={{ marginTop: '2px' }}>{errors.username}</p>}
          </div>
          <div className="input-group">
            <label>Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Enter your password'
              />
              <i 
                className={showPassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"} 
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: 'var(--primary-color)' }}
              ></i>
            </div>
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
          {apiError && <p className="error-message" style={{ marginTop: '10px' }}>{apiError}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
