import React from 'react';
import { Link, IndexLink } from 'react-router';

const Header = () => {
  return (
    <nav className="navbar navbar-default">
        <div className="container-fluid">
            <ul className="nav navbar-nav">
                <li>Home</li>
                <li>Expenses</li>
                <li>About</li>
            </ul>
        </div>
    </nav>
  );
};

export default Header;
