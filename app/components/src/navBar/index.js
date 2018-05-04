import React from 'react';
import {Component,PropTypes }from '../../libs'
export default class navBar extends Component{
    render() {
        return(
            <div style={this.style(styles.navBar)}>
                <div onClick={()=>this.props.lClick&&this.props.lClick()} style={{display:'flex',marginLeft:this.getWidth(50)}}>
                    {this.props.lImg && <img style={{height:25}} src={this.props.lImg}/>}
                    {this.props.lName && <p style={{marginLeft:this.props.lImg?10:0}}>{this.props.lName}</p>}
                </div>
                <div>
                    {this.props.title && <p >{this.props.title}</p>}
                    {this.props.titleImg && <img src={this.props.titleImg} style={{height:25}}/>}
                </div>
                <div onClick={()=>this.props.rClick&&this.props.rClick()} style={{display:'flex',marginRight:this.getWidth(50)}}>
                    {this.props.rImg &&  <img style={{height:25}} style={{marginRight:this.props.rName?10:0}} src={this.props.rImg}/>}
                    {this.props.rName && <p>{this.props.rName}</p>}
                </div>
            </div>
        )

    }
};
let styles = {
         navBar:{
        height: 44,
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
        color:"#ffffff",
        width:window.innerWidth,
        background:`url(${require("./images/green_top.png")}) no-repeat`
    },
};
navBar.propTypes = {
    // 标题
    title: PropTypes.string,
    //标题图片
    titleImg: PropTypes.string,
    // 点左按钮
    lClick: PropTypes.func,
    // 点右按钮
    rClick: PropTypes.func,
    // 左按钮文字
    lName: PropTypes.string,
    // 右按钮文字
    rName: PropTypes.string,
    // 左按钮图片
    lImg: PropTypes.string,
    // 右按钮图片
    rImg: PropTypes.string,
  };
  