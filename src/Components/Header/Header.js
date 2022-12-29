import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from './logo.png';
const Header = () => {
    return (
        <div className='Header'>
           
            <nav>

                <img src={logo} alt=''/>
        
                <input type="text" placeholder="Search your Destination.." name="search"/>
                <Link to="/home">Home</Link>
                <Link to="/news">News</Link>
                <Link to="/destination">Destination</Link>
                <Link to="/blog">Blog</Link>
                <Link to="/contact">Contact</Link>
                <Link to="/login">LogIn</Link>

                
            </nav>   

        </div>

      
    );
};

export default Header;