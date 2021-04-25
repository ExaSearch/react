import React from 'react';
import './Components.css';


function BGCard(props) {
    return(
        <div style={props.style} className="card">
            {props.children}
        </div>
    );
}

export default BGCard;
