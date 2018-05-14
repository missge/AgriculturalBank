
import React from 'react';
import {Component}from '../../libs'
import './banner.css';
import PropTypes from 'prop-types';
import {pageSelected} from "../../../actions/home"
export default class IconBar extends Component{
    constructor(props, context) {
        super(props, context);


        this.state = {
            select: this.props.initSelect,
            iconType: this.props.iconType
        };
        this.listValue = [];
    }

    shouldComponentUpdate( nextProps, nextState){

        return !(
            nextProps==this.props &&
            nextState===this.State);
    }
    render() {

            this.listValue = this.state.iconType;
        return (
            <div style={{display:"flex"}}>
                <div style={this.style(styles.IconBar)}>
                    {this.renderItem.bind(this)(this.props.children)}
                </div>
                <div style={{flex:1,position:"relative",backgroundColor:"#ffffff"}}>
                    {this.renderContent.bind(this)(this.props.children)}
                </div>
            </div>
            )

    }
    renderItem(items){
        return items.map(
            function (item, i) {
                if(this.state.select==i){
                    return (
                        <div style={{width:this.getWidth(160),height:this.getHeight(140),backgroundColor:this.props.touchColor,borderTopLeftRadius:10,borderBottomLeftRadius:10}}>
                            {item}
                        </div>
                    )
                }else
                    return (
                        <div style={{width:this.getWidth(160),height:this.getHeight(140)}}>
                            {item}
                        </div>
                    )
            }.bind(this)
        )
    }

    renderContent(items){
        return items.map(
            function (item, i) {
                if(this.state.select==i){
                    return (
                        <div style={{position:"absolute",bottom:30,left:30,top:30,right:30,zIndex:1000,overflow:"hidden"}}>
                            {item.props.children}
                        </div>
                    )
                }else
                    return (
                        <div style={{position:"absolute",bottom:30,left:30,top:30,right:30,zIndex:-1,overflow:"hidden"}}>
                            {item.props.children}
                        </div>
                    )
            }.bind(this)
        )
    }
    jumpTo(num,iconType){
        this.setState({select:num,iconType:iconType})
    }
    getChildContext() {
        return {
            select: this.state.select,
            jumpTo:this.jumpTo.bind(this),
            getListValue:this.getListValue.bind(this),
            iconType:this.state.iconType
        };
    }
    getListValue(){
        return this.listValue;
    }

};

function send(dispatch){
    dispatch(pageSelected(true));
    alert("方法执行了");
}
IconBar.childContextTypes = {
    select:PropTypes.number,
    jumpTo:PropTypes.func,
    getListValue:PropTypes.func,
    iconType:PropTypes.array.isRequired
};
const styles = {
    IconBar: {
        display:"flex",
        flexDirection:"column",
        alignItems:"flex-end",
        justifyContent:"space-around",
        height: 44,
        width:100,
        backgroundColor:"#f5f5f5"
    },
};