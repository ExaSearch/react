import React from 'react';
import Terminal from '../Terminal';
import Header from './Header';
import './layout.css';

function Layout(props) {
    return(
        <div className="layout">
            <Header/>
            <div className="instructions">
            Give us a prompt with a * in it, we’ll predict which URLs best fill that blank
            </div>
            <Terminal/>
        </div>
        
    )
}

export default Layout;