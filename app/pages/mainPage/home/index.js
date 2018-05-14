import React from 'react';
import {Component}from '../../../components/libs'
import {Header,IconBar,Contain , Loading,Dialog,SelectList} from "../../../components/index";
 import First from "../../containerPage/first/index";
// import Second from "../../containerPage/second/index";
import NetCheck from "../../checkContainer/netcheck";
import Credit from "../../creditQuery/credit";
import Borrower from "../../borrowerInfo/borrower";
import Party from "../../partyInformation/party";
import Loan from "../../loanInformation/loan";
import Collect from "../../infoCollection/collect";
import Investi from "../../investigation/investi";
import Lab from "../../labContainer/lab";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {Map} from "immutable";
import * as loginActions from '../../../actions/login';
import * as homeActions from '../../../actions/home';
import Net from "../../../netRequest/mmspRequest";
import watermark from "../../../components/src/utils/waterMark";
import {MessageBox} from "../../../components";

const actions=[
    loginActions,homeActions
]
function mapStateToProps(state) {
    const {instData} = state;

    return {
        instData
    };
}
function mapDispatchToProps(dispatch) {

    const creators = Map()
        .merge(...actions)
        .filter(value => typeof value === 'function')
        .toObject();
    return {
        homeActions: bindActionCreators(creators, dispatch)

    };
}

const lwhcImage = [
    require("./image/lwhc_gray.png"),
    require("./image/lwhc_green.png"),
    require("./image/lwhc_yellow.png"),
];
const zxcxImage = [
    require("./image/zxcx_gray.png"),
    require("./image/zxcx_green.png"),
    require("./image/zxcx_yellow.png"),
];
const jkrxxImage = [
    require("./image/jkrxx_gray.png"),
    require("./image/jkrxx_green.png"),
    require("./image/jkrxx_yellow.png"),
];
const gxrxxImage = [
    require("./image/gxrxx_gray.png"),
    require("./image/gxrxx_green.png"),
    require("./image/gxrxx_yellow.png"),
];
const dkxxImage = [
    require("./image/dkxx_gray.png"),
    require("./image/dkxx_green.png"),
    require("./image/dkxx_yellow.png"),
];
const yxcjImage = [
    require("./image/yxcj_gray.png"),
    require("./image/yxcj_green.png"),
    require("./image/yxcj_yellow.png"),
];
const dcbgImage = [
    require("./image/dcbg_gray.png"),
    require("./image/dcbg_green.png"),
    require("./image/dcbg_yellow.png"),
];
const titleColor =["#999999","#12b2a8","#faa21e"];

function onBackPressed() {
    MessageBox.confirm(
        '您当前正在办理贷款业务\n' +
        '\n' +
        '请选择操作\n', '温馨提示',{showClose:false}).then(() => {
        // eslint-disable-next-line
        mmspc.button.backPress()
    }).catch(() => {

    });
}
class Index extends Component {
    constructor(props){
        super(props);

        this.state = {
            selectedValue2:true
        }
    }

    handleVal(val) {
        return val;
    }
    jumpControl(cur){
        let value = this.refs.myIconBar.getListValue();
        if(cur==0){
            if(value[0] == 2){
                this.refs.myIconBar.jumpTo(cur,value);
            }
        }else if(cur==1) {
            if(value[0] == 2){
                this.refs.myIconBar.jumpTo(cur,value);
            }
        } else  {
            if(value[1] == 2){
                this.refs.myIconBar.jumpTo(cur,value);
            }
        }
        this.props.homeActions.pageSelected(cur);
    }
    componentDidMount(){
        // 开始时注册一个插件
        // eslint-disable-next-line
        mmspc.android.init(onBackPressed);
        watermark({watermark_txt0:'小明   123456'});
        this.props.homeActions.loading(true);
        // setTimeout(()=>{
        //     // eslint-disable-next-line
        //     mmspc.bridge.get((data)=>{
        //         if ("A"==data){
        //             // eslint-disable-next-line
        //             mmspc.bridge.get((data)=>{
        //                 this.props.homeActions.login(data);
        //             });
        //         }
        //
        //     },()=>{},"page");
        // },2000)
        setTimeout(()=>{
            // eslint-disable-next-line
            mmspc.bridge.get((data)=>{
                this.props.homeActions.login(data);
            });
        },2000)
    }
    render() {
        return (
            <div style = {this.props.style}>
                <div>
                    {
                        this.props.instData.loading&&<Loading fullscreen={true} text={this.props.instData.text} style={{backgroundColor: 'rgba(0, 0, 0, 0)'}}/>
                    }
                </div>
                <Dialog
                    size="small"
                    visible={ this.props.instData.showList }
                    title='请选择机构'
                    onCancel={ () => this.props.homeActions.showList(false) }
                    lockScroll={ false }
                    className='mmpsc-select-list-dialog'
                >
                    <Dialog.Body>
                        <SelectList value={this.state.selectedValue2} multiple={false} onChange={val=>{
                            // eslint-disable-next-line
                            mmspc.bridge.get((data)=>{

                                this.props.homeActions.getInstInfo(data , val.instcode);
                            });
                            this.props.homeActions.changeName(val.instname);
                            this.props.homeActions.setInstCode(val.instcode);
                            this.setState({selectedValue2: true})
                            this.props.homeActions.showList(false)
                        }}>
                            {
                                this.props.instData.getInstResult==null?[]:JSON.parse(this.props.instData.getInstResult).data
                                    .map(option => {
                                        return <SelectList.Option key={option.instname} label={option.instname} value={option} />
                                    })
                            }
                        </SelectList>
                    </Dialog.Body>
                </Dialog>
                <Header style ={{height:this.getHeight(84)}}/>
                <IconBar
                    ref="myIconBar"
                    style ={{height:window.innerHeight-this.getHeight(84),width:this.getWidth(180),backgroundColor:"#f5f5f5"}}
                    touchColor ={"#ffffff"}
                    initSelect={0}
                    iconType={[0,0,0,0,0,0,0]}
                >
                    <IconBar.Item
                        id={0}
                        title ={"联网核查"}
                        image ={lwhcImage}
                        onClick={()=>this.jumpControl.bind(this)(0)}
                        titleColor ={titleColor}>
                        <NetCheck />
                    </IconBar.Item>
                    <IconBar.Item
                        id={1}
                        title ={"征信查询"}
                        image ={zxcxImage}
                        titleColor ={titleColor}
                        onClick={()=>this.jumpControl.bind(this)(1)}>
                        <Credit/>
                    </IconBar.Item>
                    <IconBar.Item
                        id={2}
                        title ={"借款人信息"}
                        image ={jkrxxImage}
                        titleColor ={titleColor}
                        onClick={()=>this.jumpControl.bind(this)(2)}>
                        <Borrower/>
                    </IconBar.Item>
                    <IconBar.Item
                        id={3}
                        title ={"关系人信息"}
                        image ={gxrxxImage}
                        titleColor ={titleColor}
                        onClick={()=>this.jumpControl.bind(this)(3)}>
                        <Party/>
                    </IconBar.Item>
                    <IconBar.Item
                        id={4}
                        title ={"贷款信息"}
                        image ={dkxxImage}
                        titleColor ={titleColor}
                        onClick={()=>this.jumpControl.bind(this)(4)}>
                         <Loan/>
                    </IconBar.Item>
                    <IconBar.Item
                        id={5}
                        title ={"影像采集"}
                        image ={yxcjImage}
                        titleColor ={titleColor}
                        onClick={()=>this.jumpControl.bind(this)(5)}>
                         <Collect/>
                     </IconBar.Item>
                    <IconBar.Item
                        id={6}
                        title ={"调查报告"}
                        image ={dcbgImage}
                        titleColor ={titleColor}
                        onClick={()=>this.jumpControl.bind(this)(6)}>
                        <Investi/>
                     </IconBar.Item>
                </IconBar>
            </div>
        )

    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Index);