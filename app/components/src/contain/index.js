
import React from 'react';
import './banner.css';
import {Component}from '../../libs'
export default class Contain extends Component{

    render() {
        return (
                <div className="row" style={this.style(styles.frame)}>
                    {this.renderChildren(this.props.children)}
                </div>
            )

    }


renderChildren(children){
    return children.map(
        function (item, i) {
            if(i==0){
                return (
                    <div style={{position:"absolute",zIndex:1000}}>
                        {children[i]}
                    </div>
                )
            }else
            return (
               <div style={{position:"absolute",zIndex:-1}}>
                   {children[i]}
               </div>
            )
        }.bind(this)
    )


}


};
var styles = {
    frame: {
        height: "auto",
        width:"auto",
        backgroundColor:"yellow"
    },
};