import React from 'react';
import { Link } from 'react-router-dom';
import './navigation.css'

const Navigation = () => {
    return (
        <div className='welcome' >
            <h2 className='welcome__title'>Добро пожаловать!</h2>
            <div className='welcome__buttons'>
                <Link to="/login"><button className='welcome__button'>Войти</button></Link>
                <Link to="/register"><button className='welcome__button'>Регистрация</button></Link>
            </div>
        </div>
    );
}

export default Navigation;