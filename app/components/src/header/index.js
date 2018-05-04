import React from 'react';
import {Component}from '../../libs'
import * as homeActions from '../../../actions/home';
import * as loginActions from '../../../actions/login';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {Map} from "immutable";
import {MessageBox} from "../../index";
const actions = [
    homeActions,loginActions
]
function mapStateToProps(state) {
    const {head}=state;
    const {home}=state;
    const {instData}=state;
    return {
        head,home,instData
    };
}

function mapDispatchToProps(dispatch) {

    const creators = Map()
        .merge(...actions)
        .filter(value => typeof value === 'function')
        .toObject();
    return {
        netActions: bindActionCreators(creators, dispatch)

    };
}
class Header extends Component{
    constructor(props){
        super(props)
        this.state = {
            MessageBoxType:"",
        }
    }
    onMesageBoxClick(key) {
        switch (key){
            case "back":
                MessageBox.confirm(
                    '您当前正在办理贷款业务\n' +
                    '\n' +
                    '请选择操作\n', '温馨提示',{showClose:false}).then(() => {
                    // eslint-disable-next-line
                    mmspc.button.backPress()
                }).catch(() => {

                });
                break;
            case "end":
                MessageBox.confirm('您确定要终止当前贷款吗？\n' +
                    '\n' +
                    '您所填写的信息都将清空无法找回\n', '温馨提示',{showClose:false}).then(() => {
                    // eslint-disable-next-line
                    mmspc.button.backPress()
                }).catch(() => {

                });
                break;
            case "switch":
                this.props.netActions.showList(true);
                break;
            default:
                break;
        }

    }

    render() {
        return(
            <div style={this.style(styles.head)}>
                <img style={{width:20,height:25,marginLeft:this.getWidth(50)}} src={require("./images/return.png")} onClick={this.onMesageBoxClick.bind(this , "back")}/>
                 <img  src={require("./images/logo_gedai.png")}style={{height:25}}/>
                <div style={{display:"flex",alignItems:"center"}}>
                    <p style={{float:'right',marginRight:this.getWidth(12)}} onClick={this.onMesageBoxClick.bind(this , "switch")}>{this.props.head.instName}</p>
                    <img style={{width:30,height:30,float:'right',marginRight:this.getWidth(40)}} src={require("./images/switch.png")}
                         onClick={this.onMesageBoxClick.bind(this , "switch")}
                    />
                    <div style={{backgroundColor:'#ffffff',float:'right',width:2,height:30,marginRight:this.getWidth(40)}}/>
                    <p style={{float:'right',marginRight:this.getWidth(12)}} onClick={this.onMesageBoxClick.bind(this , "end")}>终止贷款</p>
                    <img style={{width:30,height:30,float:'right',marginRight:this.getWidth(50)}} src={require("./images/stop.png")}
                         onClick={this.onMesageBoxClick.bind(this , "end")}/>


                </div>
            </div>
        )

    }
}
let styles = {
    head: {
        height: 44,
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
        color:"#ffffff",
        width:window.innerWidth,
        background:`url(${require("./images/green_top.png")}) no-repeat`
    },
};

export default connect(mapStateToProps , mapDispatchToProps)(Header)