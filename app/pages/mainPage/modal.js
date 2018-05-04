import React, { Component } from 'react';
export default class Modal extends Component {
    render() {
        return (
            <div style = {this.props.style}>
            <div className="row" style={{backgroundColor:'blue',height:window.innerHeight/2,width:10}}>
            </div>
                </div>
        )

    }
}
