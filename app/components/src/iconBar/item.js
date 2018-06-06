
import React from 'react';
import {Component}from '../../libs'
import './banner.css';
import PropTypes from 'prop-types';
export default class Item extends Component{

    render() {
        let type = this.context.iconType[this.props.id];
        if(this.context.select==this.props.id){
            type=1;
        }
        if(this.props.disable==true){
            return (
                <div style={{marginRight:this.getWidth(20),marginTop:this.getWidth(20),textAlign:"center"}}
                >
                    <img src={this.props.image[type]} width="30" height="30"/>
                    <p style={{marginTop:0,fontFamily:"Microsoft YaHei",fontSize:"16px",color:this.props.titleColor[type]}}>{this.props.title}</p>
                </div>
            )
        }else{
            return (
                <div style={{marginRight:this.getWidth(20),marginTop:this.getWidth(20),textAlign:"center"}}
                     onClick={this.props.onClick}
                >
                    <img src={this.props.image[type]} width="30" height="30"/>
                    <p style={{marginTop:0,fontFamily:"Microsoft YaHei",fontSize:"16px",color:this.props.titleColor[type]}}>{this.props.title}</p>
                </div>
            )
        }


    }
};

Item.contextTypes = {
    select: PropTypes.number,
    iconType:PropTypes.array
};