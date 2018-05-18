import React from 'react';
import {Component}from '../../components/libs'
// import 'element-theme-default';
// import { Form,Input,Button,Layout,Tabs,Select,DatePicker } from 'element-react';
import { Form,Input,Button,Layout,Tabs,Select,DatePicker,Dialog,ImageViewer} from "../../components/index";

import './style/collect.css'
import '../publicCss/public.css'
import PropTypes from 'prop-types';
var loanerList = "";
var relateList = "";
var loanInfoList = "";
var loanShowList = "";
var relateShowList = "";
var loanInfoShowList = "";
var imageList="";
var image = require("../../images/certificate_back.png");
var loanPicList = ["身份证头像面" ,"身份证国徽面" ,"电子征信授权书" ,"纸质征信授权书" ,"还款能力证明" ,"婚姻状态证明", "户籍证明"];
var relatePicList = ["身份证头像面" ,"身份证国徽面" ,"电子征信授权书" ,"纸质征信授权书" ,"还款能力证明" ,"婚姻状态证明" , "户籍证明"];
var loanInfoPicList = ["电子业务申请书" ,"纸质业务申请书" ,"购房合同" ,"首付款证明" ,"购房资格查询文件" ,"还款账户" , "公积金贷款资料" , "面谈笔录"];
class Collect extends Component{
    constructor(props){
        super(props);

        this.state={
            dialogVisible:false, // 要不要show
            // 借款人
            frontImage1:image,
            backImage1:image,
            eleImage1:image,
            pageImage1:image,
            repayImage1:image,
            marryImage1:image,
            houseHoldImage1:image,

            show11:false,
            show12:false,
            show13:false,
            show14:false,
            show15:false,
            show16:false,
            show17:false,

            // 关系人影像
            frontImage2:image,
            backImage2:image,
            eleImage2:image,
            pageImage2:image,
            repayImage2:image,
            marryImage2:image,
            houseHoldImage2:image,

            show21:false,
            show22:false,
            show23:false,
            show24:false,
            show25:false,
            show26:false,
            show27:false,

            // 贷款资料影像
            eleBusinessImage:image,
            pageBusinessImage:image,
            contractImage:image,
            firstPayImage:image,
            houseAccessImage:image,
            repayAccountImage:image,
            fundLoanImage:image,
            recordImage:image,

            show31:false,
            show32:false,
            show33:false,
            show34:false,
            show35:false,
            show36:false,
            show37:false,
            show38:false,
            // 自定义资料
        }
    }
    componentDidMount() {
        loanerList = [
            "frontImage1",
            "backImage1",
            "eleImage1",
            "pageImage1",
            "repayImage1",
            "marryImage1",
            "houseHoldImage1",
        ]
        relateList = [
            "frontImage2",
            "backImage2",
            "eleImage2",
            "pageImage2",
            "repayImage2",
            "marryImage2",
            "houseHoldImage2",
        ]

        loanInfoList = [
            "eleBusinessImage",
            "pageBusinessImage",
            "contractImage",
            "firstPayImage",
            "houseAccessImage",
            "repayAccountImage",
            "fundLoanImage",
            "recordImage",
        ]
        loanShowList = [
            this.state.show11,
            this.state.show12,
            this.state.show13,
            this.state.show14,
            this.state.show15,
            this.state.show16,
            this.state.show17,
        ]
        relateShowList = [
            this.state.show21,
            this.state.show22,
            this.state.show23,
            this.state.show24,
            this.state.show25,
            this.state.show26,
            this.state.show27,
        ]
        loanInfoShowList = [
            this.state.show31,
            this.state.show32,
            this.state.show33,
            this.state.show34,
            this.state.show35,
            this.state.show36,
            this.state.show37,
            this.state.show38,
        ]
    }

    showImageViewer(src,onRetake,onDelete){
        ImageViewer.show(src).then((action) => {
            switch (action) {
                case 'retake':
                    onRetake();
                    break;
                case 'delete':
                    onDelete();
                    return;
                default:
                    break;
            }
        }).catch(() => {
        });
    }

    setComplete(cur){
        let value = this.context.getListValue();
        value[cur] = 2;
        return value;
    }
    // 第一个参数是选择的position ，第二个参数是page的页码
    onSelected(id , page){
        var imageList = "";
        var clickList = "";
        if (page==1){
            imageList = loanerList;
            clickList = loanShowList;
        } else if (page==2) {
            imageList = relateList;
            clickList = relateShowList;
        } else if (page==3){
            imageList = loanInfoList;
            clickList = loanInfoShowList;
        } else if (page==4){

        }
        if (clickList[id]){
            this.showImageViewer(this.state[imageList[id]],()=>{navigator.camera.getPicture((data)=>{
                this.setState({[imageList[id]]:"data:image/png;base64," + data , [clickList[id]]:true});
            },(data)=>{
            },{quality:50,destinationType:0});
            },()=>{this.setState({[imageList[id]]:null}) ; clickList[id] =false});

        }else {
            // eslint-disable-next-line
            navigator.camera.getPicture(data=>{
                clickList[id] = true;
                this.setState({[imageList[id]]:"data:image/png;base64," + data})
            },()=>{

            },{quality:50,destinationType:0})
        }

    }
    render(){
        return(
            <div style={{height:window.innerHeight-this.getHeight(100)}}>
                <div className={"tabPan scrollauto"} >
                    <Tabs activeName="1" onTabClick={ (tab) => console.log(tab.props.name)} >
                        <Tabs.Pane label="借款人影像" name="1">
                            <div class="collectBox">

                                <Layout.Row gutter="12" style={{marginTop:"8px"}}>
                                    {/* {
                                        loanPicList.map((option , position)=>{
                                            return  <Layout.Col span="6">
                                                        <div className="grid-content bg-purple layoutBoxs" >
                                                            <img id="tab11" style={{marginTop:"8px", height:"100px"}} src={(this.state[loanerList[position]])?(this.state[loanerList[position]]):image} class="collect_img" onClick={()=>{this.onSelected(position , 1)}}></img>

                                                            <span class="collect_span" style={{marginTop:"8px"}}>{option}</span>

                                                        </div>
                                                     </Layout.Col>
                                        })
                                    } */}
                                    {/* 有摄像机的 */}
                                     <div className="layout_box1" >
                                        <div className="camera_box1">
                                            <img src={require("../../images/graybg.png")} />
                                            <p>
                                            <img src={require("../../images/camera.png")} />
                                            </p>
                                        </div>
                                        <span >身份证头像面</span>
                                    </div>

                                    <div className="layout_box1" >
                                        <div className="camera_box1">
                                             <img src={require("../../images/bg.png")} />
                                            <span className="fontTrans">
                                                 仅限办理贷款使用
                                            </span>
                                            <div class="gray_bg" >
                                            </div>
                                            <div class="bot_sj">
                                                <img src={require("../../images/botsj.png")}/>
                                                <span>共2张</span>
                                            </div>
                                        </div>
                                        <span >借款人有效证件</span>
                                    </div>
                                   



                                    {/*<Layout.Col span="6">
                                        <div className="grid-content bg-purple layoutBoxs" >
                                            <img id="tab11" src={this.state.frontImage?this.state.frontImage:image} class="collect_img" onClick={()=>{this.onSelected(0)}}></img>

                                            <span class="collect_span">身份证头像面</span>

                                        </div></Layout.Col>
                                    <Layout.Col span="6"><div className="grid-content bg-purple layoutBoxs">
                                        <img id="tab12" src={this.state.backImage?this.state.backImage:image} class="collect_img"onClick={()=>{this.onSelected(1)}}></img>
                                        <span class="collect_span">身份证国徽面</span>
                                    </div></Layout.Col>
                                    <Layout.Col span="6"><div className="grid-content bg-purple layoutBoxs" >
                                        <img id="tab13" src={this.state.eleImage?this.state.eleImage:image} class="collect_img" onClick={()=>{this.onSelected(2)}}></img>
                                        <span class="collect_span">电子征信授权书</span>
                                    </div></Layout.Col>
                                    <Layout.Col span="6"><div className="grid-content bg-purple layoutBoxs">
                                        <img id="tab14" src={this.state.pageImage?this.state.pageImage:image} class="collect_img" onClick={()=>{this.onSelected(3)}}></img>
                                        <span class="collect_span">纸质征信授权书</span>
                                    </div></Layout.Col>
                                </Layout.Row>
                                <Layout.Row gutter="12" style={{marginTop:"30px"}}>
                                    <Layout.Col span="6"><div className="grid-content bg-purple layoutBoxs">
                                        <img id="tab15" src={this.state.repayImage?this.state.repayImage:image} class="collect_img" onClick={()=>{this.onSelected(4)}}></img>
                                        <span class="collect_span">还款能力证明</span>

                                    </div></Layout.Col>
                                    <Layout.Col span="6"><div className="grid-content bg-purple layoutBoxs">
                                        <img id="tab16" src={this.state.marryImage?this.state.marryImage:image} class="collect_img" onClick={()=>{this.onSelected(5)}}></img>
                                        <span class="collect_span">婚姻状态证明</span>
                                    </div></Layout.Col>
                                    <Layout.Col span="6"><div className="grid-content bg-purple layoutBoxs">
                                        <img id="tab17" src={this.state.houseHoldImage?this.state.houseHoldImage:image} class="collect_img" onClick={()=>{this.onSelected(6)}}></img>
                                        <span class="collect_span">户籍证明</span>
                                    </div></Layout.Col>*/}

                                </Layout.Row>

                            </div>
                            <div className="loan_footer">
                                <div className="footer_content">
                                    <div className="footer_content_rt">
                                        <Button type="warning" size="large" onClick={()=>{
                                            this.context.jumpTo(6, this.setComplete.bind(this)(5))
                                        }}>上传影像资料</Button>
                                    </div>
                                </div>
                            </div>
                        </Tabs.Pane>
                        <Tabs.Pane label="关系人影像" name="2">
                            <div class="collectBox">

                                {/*<span style={{fontSize:"13px"}}>关小明</span>*/}
                                <Layout.Row gutter="12" style={{marginTop:"8px"}}>
                                    {
                                        relatePicList.map((option , position)=>{
                                            return <Layout.Col span="6"><div className="grid-content bg-purple layoutBoxs">
                                                <img  style={{marginTop:"8px" , height:"100px"}} src={(this.state[relateList[position]])?(this.state[relateList[position]]):image} class="collect_img"  onClick={()=>{this.onSelected(position , 2)}}></img>
                                                <span class="collect_span" style={{marginTop:"8px"}}>{option}</span>

                                            </div></Layout.Col>
                                        })
                                    }
                                   {/* <Layout.Col span="6"><div className="grid-content bg-purple layoutBoxs">
                                        <img id="tab21" src={image} class="collect_img"  onClick={(id)=>{this.onSelected("tab21")}}></img>
                                        <span class="collect_span">身份证头像面</span>

                                    </div></Layout.Col>
                                    <Layout.Col span="6"><div className="grid-content bg-purple layoutBoxs">
                                        <img id="tab22" src={image} class="collect_img"  onClick={(id)=>{this.onSelected("tab22")}}></img>
                                        <span class="collect_span">身份证国徽面</span>
                                    </div></Layout.Col>
                                    <Layout.Col span="6"><div className="grid-content bg-purple layoutBoxs">
                                        <img id="tab23" src={image} class="collect_img"  onClick={(id)=>{this.onSelected("tab23")}}></img>
                                        <span class="collect_span">电子征信授权书</span>
                                    </div></Layout.Col>
                                    <Layout.Col span="6"><div className="grid-content bg-purple layoutBoxs">
                                        <img id="tab24" src={image} class="collect_img"  onClick={(id)=>{this.onSelected("tab24")}}></img>
                                        <span class="collect_span">纸质征信授权书</span>
                                    </div></Layout.Col>
                                </Layout.Row>
                                <span style={{fontSize:"13px"}}>关小明</span>
                                <Layout.Row gutter="12" style={{marginTop:"10px"}}>
                                    <Layout.Col span="6"><div className="grid-content bg-purple layoutBoxs">
                                        <img id="tab25" src={image} class="collect_img"  onClick={(id)=>{this.onSelected("tab25")}}></img>
                                        <span class="collect_span">还款能力证明</span>

                                    </div></Layout.Col>
                                    <Layout.Col span="6"><div className="grid-content bg-purple layoutBoxs">
                                        <img id="tab26" src={image} class="collect_img"  onClick={(id)=>{this.onSelected("tab26")}}></img>
                                        <span class="collect_span">婚姻状态证明</span>
                                    </div></Layout.Col>
                                    <Layout.Col span="6"><div className="grid-content bg-purple layoutBoxs">
                                        <img id="tab27" src={image} class="collect_img"  onClick={(id)=>{this.onSelected("tab27")}}></img>
                                        <span class="collect_span">户籍证明</span>
                                    </div></Layout.Col>*/}
                                </Layout.Row>
                            </div>
                            <div className="loan_footer">
                                <div className="footer_content">
                                    <div className="footer_content_rt">
                                        <Button type="warning" size="large" onClick={()=>{
                                            this.context.jumpTo(6, this.setComplete.bind(this)(5))
                                        }}>上传影像资料</Button>
                                    </div>
                                </div>
                            </div>
                        </Tabs.Pane>
                        <Tabs.Pane label="贷款资料影像" name="3">
                            <div class="collectBox">

                                <Layout.Row gutter="12" style={{marginTop:"8px"}}>
                                    {
                                        loanInfoPicList.map((option , position)=>{
                                            return  <Layout.Col span="6">
                                                <div className="grid-content bg-purple layoutBoxs" >
                                                    <img id="tab11" style={{marginTop:"8px" , height:"100px"}} src={(this.state[loanInfoList[position]])?(this.state[loanInfoList[position]]):image} class="collect_img" onClick={()=>{this.onSelected(position , 3)}}></img>

                                                    <span class="collect_span" style={{marginTop:"8px"}}>{option}</span>

                                                </div>
                                            </Layout.Col>
                                        })
                                    }
                                  {/*  <Layout.Col span="6"><div className="grid-content bg-purple layoutBoxs">
                                        <img id="tab31" src={image} class="collect_img"  onClick={(id)=>{this.onSelected("tab31")}}></img>
                                        <span class="collect_span">电子业务申请书</span>

                                    </div></Layout.Col>
                                    <Layout.Col span="6"><div className="grid-content bg-purple layoutBoxs">
                                        <img id="tab32" src={image} class="collect_img" onClick={(id)=>{this.onSelected("tab32")}}></img>
                                        <span class="collect_span">纸质业务申请书</span>
                                    </div></Layout.Col>
                                    <Layout.Col span="6"><div className="grid-content bg-purple layoutBoxs">
                                        <img id="tab33" src={image} class="collect_img"  onClick={(id)=>{this.onSelected("tab33")}}></img>
                                        <span class="collect_span">购房合同</span>
                                    </div></Layout.Col>
                                    <Layout.Col span="6"><div className="grid-content bg-purple layoutBoxs">
                                        <img id="tab34" src={image} class="collect_img"  onClick={(id)=>{this.onSelected("tab34")}}></img>
                                        <span class="collect_span">首付款证明</span>
                                    </div></Layout.Col>
                                </Layout.Row>
                                <Layout.Row gutter="12" style={{marginTop:"30px"}}>
                                    <Layout.Col span="6"><div className="grid-content bg-purple layoutBoxs">
                                        <img id="tab35" src={image} class="collect_img"  onClick={(id)=>{this.onSelected("tab35")}}></img>
                                        <span class="collect_span">购房资格查询文件</span>

                                    </div></Layout.Col>
                                    <Layout.Col span="6"><div className="grid-content bg-purple layoutBoxs">
                                        <img id="tab36" src={image} class="collect_img"  onClick={(id)=>{this.onSelected("tab36")}}></img>
                                        <span class="collect_span">还款账户</span>
                                    </div></Layout.Col>
                                    <Layout.Col span="6"><div className="grid-content bg-purple layoutBoxs">
                                        <img id="tab37" src={image} class="collect_img"  onClick={(id)=>{this.onSelected("tab37")}}></img>
                                        <span class="collect_span">公积金贷款资料</span>
                                    </div></Layout.Col>
                                    <Layout.Col span="6"><div className="grid-content bg-purple layoutBoxs">
                                        <img id="tab38" src={image} class="collect_img"  onClick={(id)=>{this.onSelected("tab38")}}></img>
                                        <span class="collect_span">面谈笔录</span>
                                    </div></Layout.Col>*/}
                                </Layout.Row>
                            </div>
                            <div className="loan_footer">
                                <div className="footer_content">
                                    <div className="footer_content_rt">
                                        <Button type="warning" size="large" onClick={()=>{
                                            this.context.jumpTo(6, this.setComplete.bind(this)(5))
                                        }}>上传影像资料</Button>
                                    </div>
                                </div>
                            </div>
                        </Tabs.Pane>
                        <Tabs.Pane label="其他自定义资料" name="4">
                            <div class="form_content ">
                                <div class="center_box">
                                    <div class="addcontact">
                                        <div>
                                            <img src={require("../../images/add.png")} width="58px" height="58px"/>
                                            <p>新增自定义资料</p>
                                        </div>
                                    </div> 
                                </div> 
                            </div>
                            <div className="loan_footer">
                                <div className="footer_content">
                                    <div className="footer_content_rt">
                                        <Button type="warning" size="large" onClick={()=>{
                                            this.context.jumpTo(6, this.setComplete.bind(this)(5))
                                        }}>上传影像资料</Button>
                                    </div>
                                </div>
                            </div>
                        </Tabs.Pane>
                    </Tabs>

                </div>
            </div>
        );

    }
}
Collect.contextTypes = {
    jumpTo: PropTypes.func,
    getListValue:PropTypes.func
};
export default Collect;