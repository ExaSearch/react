import React from 'react';
import Tag from '../Tag';


function Header(props) {
    return(
    <div style={props.style} className="header">
        <div className="title">
            Exa Search
        </div>
        <Tag 
        textStyle={{color:'#D39A71',}}
        backgroundStyle={{background:'rgba(211, 154, 113, 0.2)',}}
        text="alpha">
        </Tag>
    </div>)
}

export default Header;