import React from 'react';
import './Components.css';

class BGCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clicked: false
          };
    }
    render() {
        return(
         <div style={this.props.style} className={this.props.type}>{this.props.children}</div>)
    }
}

export default BGCard;
