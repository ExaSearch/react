import React from 'react';
import './Components.css';

function Tag(props) {
    return (
    <div style={props.backgroundStyle} className="tagBackground">
        <div style={props.textStyle} className="tagText">
            {props.text}
        </div>
    </div>
    );
}

export default Tag;