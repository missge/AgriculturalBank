import React, { Component } from 'react';
export default class Head extends Component{
    render() {
        return(
            <div style={styles.head}>
            </div>
        )

    }
}
var styles = {
    head: {
        height: 44,
        width:'100%',
        background:`url(${require("./images/green_top.png")}) no-repeat`
    },
};