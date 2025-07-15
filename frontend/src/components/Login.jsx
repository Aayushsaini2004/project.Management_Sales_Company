import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import { gsap } from 'gsap';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const bgRef = useRef(null);
  const cubesRef = useRef([]);

  useEffect(() => {
    gsap.to(bgRef.current, {
      backgroundPosition: "200% 0%",
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });
    cubesRef.current.forEach((cube, idx) => {
      gsap.to(cube, {
        rotationY: 360,
        rotationX: 360,
        y: -100 - idx * 20,
        scale: 1.2,
        repeat: -1,
        yoyo: true,
        duration: 4 + idx,
        ease: "power2.inOut",
        delay: idx * 0.5
      });
    });
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', { email, password });
      if (response.data.success) {
        navigate('/dashboard');
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert('Login failed');
    }
  };

  return (
    <div>
      <div
        className="animated-bg"
        ref={bgRef}
        style={{
          background: "linear-gradient(120deg,rgb(57, 7, 123) 0%,rgb(54, 58, 79) 100%)",
          backgroundSize: "200% 200%",
        }}
      >
        <div className="spheres-3d-bg">
          <div className="sphere sphere1"></div>
          <div className="sphere sphere2"></div>
          <div className="sphere sphere3"></div>
          <div className="sphere sphere4"></div>
          <div className="sphere sphere5"></div>
        </div>
        <div className="three-d-cubes-bg">
          {[1, 2, 3, 4, 5].map((n, idx) => (
            <div
              key={n}
              className={`cube cube${n}`}
              ref={el => (cubesRef.current[idx] = el)}
            ></div>
          ))}
        </div>
        <div className="circles">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter your email'
              required
              autoFocus
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Enter your password'
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Login</button>
        </form>
        <p>Don't have an account? <a href="/signup">Sign up</a></p>
      </div>
    </div>
  );
};

export default Login;
