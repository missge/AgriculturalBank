
import React, { Component } from 'react';
import './banner.css';
var greenImage = [
    require("./images/green01.png"),
    require("./images/green02.png"),
    require("./images/green03.png"),
    require("./images/green04.png"),
    require("./images/green05.png"),
    require("./images/green06.png"),
    require("./images/green07.png"),
    require("./images/green08.png"),
    require("./images/green09.png"),
];
var blueImage = [
    require("./images/blue01.png"),
    require("./images/blue02.png"),
    require("./images/blue03.png"),
    require("./images/blue04.png"),
    require("./images/blue05.png"),
    require("./images/blue06.png"),
    require("./images/blue07.png"),
    require("./images/blue08.png"),
    require("./images/blue09.png"),
];
var grayImage = [
    require("./images/gray01.png"),
    require("./images/gray02.png"),
    require("./images/gray03.png"),
    require("./images/gray04.png"),
    require("./images/gray05.png"),
    require("./images/gray06.png"),
    require("./images/gray07.png"),
    require("./images/gray08.png"),
    require("./images/gray09.png"),
];
export default class Banner extends Component{
    _renderIcon(data,step,listValue) {
        //var s=[1,2,3,4];
        if (data==null){
            return null;
        }
        var num = data.length-1;
        return data.map(function (items,i) {
            var image = null;
            if(listValue[i]==0){
                image = grayImage[i];
            }else if(listValue[i]==2){
                image = blueImage[i];
            }else {
                image = greenImage[i];
            }
            if(i==num){
                return (
                    <div class="step-line-end">
                        <div class="step-end">
                            <img src={image} width="50" height="auto"/>
                            <p>{items}</p>
                        </div>
                    </div>
                )
            }else {
                return (
                    <div class="step-line active" style = {{backgroundColor:i<step?"#07b8ac":"#eee"}}>
                        <div class="step">
                            <img src={image} width="50" height="auto"/>
                            <p>{items}</p>
                        </div>
                    </div>
                )
            }

        }.bind(this))
    }
    render() {
/*        var iconList = null;
        if(this.props.iconList ==null){
            iconList = ["客户信息核查","客户征信查询","借款人信息录入","关系人信息录入","贷款人信息录入","押品信息录入","申请表生成","影像采集","贷款报告调查"];
        }else {
            iconList = this.props.iconList;
        }
        var listValue =[0,2,0,1,0,1,0,1,0];*/

        var {iconList ,listValue,currentStep} = this.props;
       return(
           <div class="step-state">
           <div class="step-state-line-group">
               {this._renderIcon(iconList,currentStep,listValue)}
           </div>
               </div>
       )

    }

};