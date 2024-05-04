import React, { useState, useEffect } from 'react';
import { registerWithEmailAndPassword, loginWithEmailAndPassword, logout, auth } from './authService';
import './App.css';
import UserManagement from './UserManagement';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './Navigation';
import './login.css'

function App() {
  const [user, setUser] = useState(null);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [error, setError] = useState(null);
  const [showUserManagement, setShowUserManagement] = useState(false);
  const [registerName, setRegisterName] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authUser => {
      if (authUser) {
        setUser(authUser);
        setShowUserManagement(true);
      } else {
        setUser(null);
        setShowUserManagement(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await registerWithEmailAndPassword(registerEmail, registerPassword, registerName);
      setRegisterName('');
      setRegisterEmail('');
      setRegisterPassword('');
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await loginWithEmailAndPassword(loginEmail, loginPassword);
      setLoginEmail('');
      setLoginPassword('');
      setError(null);
      setShowUserManagement(true);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      setShowUserManagement(false);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="App">
      <div>
        {user ? (
          <div>
            <div className='header'>
            <h2 className='header__title'>Добро пожаловать, {user.email}</h2>
            <button className='header__button' onClick={handleLogout}>Выйти</button>
            </div>
            {showUserManagement && <UserManagement />}
          </div>
        ) : (
          <Router>
            <div className='navigation'>
              <Navigation />
              <Routes>
                <Route path="/login" element={
                  <>
                    <h2 className='login'>Войти</h2>
                    <form className='login__form' onSubmit={handleLogin}>
                      <input className='login__input' type="email" placeholder="Email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required />
                      <input className='login__input' type="password" placeholder="Password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required />
                      <button className='login__button' type="submit">Войти</button>
                    </form>
                    {error && <p className='login__error'>{error}</p>}
                  </>
                } />
                <Route path="/register" element={
                  <>
                    <h2 className='login'>Регистрация</h2>
                    <form className='login__form' onSubmit={handleRegister}>
                      <input className='login__input' type="email" placeholder="Email" value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} required />
                      <input className='login__input' type="password" placeholder="Password" value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} required />
                      <button className='login__button' type="submit">Зарегистрироваться</button>
                    </form>
                    {error && <p className='login__error'>{error}</p>}
                  </>
                } />
              </Routes>
            </div>
          </Router>
        )}
      </div>
    </div>
  );
}

export default App;