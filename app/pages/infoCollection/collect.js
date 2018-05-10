import React from 'react';
import {Component}from '../../components/libs'
// import 'element-theme-default';
// import { Form,Input,Button,Layout,Tabs,Select,DatePicker } from 'element-react';
import { Form,Input,Button,Layout,Tabs,Select,DatePicker,Dialog,ImageViewer} from "../../components/index";

import './style/collect.css'
import '../publicCss/public.css'
import PropTypes from 'prop-types';
var loanerList = "";
var showList = "";
var imageList="";
var image = require("../../images/certificate_back.png");
var that = "";
class Collect extends Component{
    constructor(props){
        super(props);

        this.state={
            dialogVisible:false, // 要不要show
            currentPosition:0,
            frontImage:image,
            backImage:image,
            eleImage:image,
            pageImage:image,
            repayImage:image,
            marryImage:image,
            houseHoldImage:image,

            show0:false,
            show1:false,
            show2:false,
            show3:false,
            show4:false,
            show5:false,
            show6:false,

            currentImage:image
            // 关系人影像
            // 贷款资料影像
            // 自定义资料
        }
    }
    componentDidMount() {
        that = this;
        loanerList = [
            this.state.frontImage,
            this.state.backImage,
            this.state.eleImage,
            this.state.pageImage,
            this.state.repayImage,
            this.state.marryImage,
            this.state.houseHoldImage,
        ]
        showList = [
            this.state.show0,
            this.state.show1,
            this.state.show2,
            this.state.show3,
            this.state.show4,
            this.state.show5,
            this.state.show6,
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
    onSelected(id){
        if (showList[id]){
            switch (id) {
                case 0:
                    this.showImageViewer(this.state.frontImage,()=>{navigator.camera.getPicture((data)=>{
                        this.setState({frontImage:"data:image/png;base64," + data , show0:true});
                    },(data)=>{
                    },{quality:50,destinationType:0});
                    },()=>{this.setState({frontImage:null}) ; showList[id] =false});
                    // this.setState({currentImage: this.state.backImage , dialogVisible:true});
                    break;
                case 1:
                    this.showImageViewer(this.state.backImage,()=>{navigator.camera.getPicture((data)=>{
                        this.setState({backImage:"data:image/png;base64," + data , show1:true});
                    },function(data){
                    },{quality:50,destinationType:0});
                    },()=>{this.setState({backImage:null}) ; showList[id] =false});
                    // this.setState({currentImage: this.state.backImage , dialogVisible:true});
                    break;
                case 2:
                    this.showImageViewer(this.state.eleImage,()=>{navigator.camera.getPicture((data)=>{
                        this.setState({eleImage:"data:image/png;base64," + data , show2:true});
                    },function(data){
                    },{quality:50,destinationType:0});
                    },()=>{this.setState({eleImage:null}) ; showList[id] =false});
                    // this.setState({currentImage: this.state.eleImage , dialogVisible:true});
                    break;
                case 3:
                    this.showImageViewer(this.state.pageImage,()=>{navigator.camera.getPicture((data)=>{
                        this.setState({pageImage:"data:image/png;base64," + data , show3:true});
                    },function(data){
                    },{quality:50,destinationType:0});
                    },()=>{this.setState({pageImage:null}) ; showList[id] =false});
                    // this.setState({currentImage: this.state.pageImage , dialogVisible:true});
                    break;
                case 4:
                    this.showImageViewer(this.state.repayImage,()=>{navigator.camera.getPicture((data)=>{
                        this.setState({repayImage:"data:image/png;base64," + data , show4:true});
                    },function(data){
                    },{quality:50,destinationType:0});
                    },()=>{this.setState({repayImage:null}) ; showList[id] =false});
                    // this.setState({currentImage: this.state.repayImage , dialogVisible:true});
                    break;
                case 5:
                    this.showImageViewer(this.state.marryImage,()=>{navigator.camera.getPicture((data)=>{
                        this.setState({marryImage:"data:image/png;base64," + data , show5:true});
                    },function(data){
                    },{quality:50,destinationType:0});
                    },()=>{this.setState({marryImage:null}) ; showList[id] =false});
                    // this.setState({currentImage: this.state.marryImage , dialogVisible:true});
                    break;
                case 6:
                    this.showImageViewer(this.state.houseHoldImage,()=>{navigator.camera.getPicture((data)=>{
                        this.setState({houseHoldImage:"data:image/png;base64," + data , show6:true});
                    },function(data){
                    },{quality:50,destinationType:0});
                    },()=>{this.setState({houseHoldImage:null}) ; showList[id] =false});
                    // this.setState({currentImage: this.state.houseHoldImage , dialogVisible:true});
                    break;
            }
        }else {
            // eslint-disable-next-line
            navigator.camera.getPicture(data=>{
                showList[id] = true;
                switch (id){
                    case 0:
                        this.setState({frontImage:"data:image/png;base64," + data});
                        break;
                    case 1:
                        this.setState({backImage:"data:image/png;base64," + data});
                        break;
                    case 2:
                        this.setState({eleImage:"data:image/png;base64," + data});
                        break;
                    case 3:
                        this.setState({pageImage:"data:image/png;base64," + data});
                        break;
                    case 4:
                        this.setState({repayImage:"data:image/png;base64," + data});
                        break;
                    case 5:
                        this.setState({marryImage:"data:image/png;base64," + data});
                        break;
                    case 6:
                        this.setState({houseHoldImage:"data:image/png;base64," + data});
                        break;
                }
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

                                <Layout.Row gutter="12" style={{marginTop:"37px"}}>
                                    <Layout.Col span="6">
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
                                    </div></Layout.Col>

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

                                <span style={{fontSize:"13px"}}>关小明</span>
                                <Layout.Row gutter="12" style={{marginTop:"12px"}}>
                                    <Layout.Col span="6"><div className="grid-content bg-purple layoutBoxs">
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
                                    </div></Layout.Col>
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

                                <Layout.Row gutter="12" style={{marginTop:"37px"}}>
                                    <Layout.Col span="6"><div className="grid-content bg-purple layoutBoxs">
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
                                    </div></Layout.Col>
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
                                            <img src={require("../../images/add.png")} width="58px" height="58px" />
                                            <p>新增自定义资料</p>
                                        </div>
                                    </div> 
                                </div> 
                            </div>
                        </Tabs.Pane>
                    </Tabs>

                    <Dialog
                        size="full"
                        visible={this.state.dialogVisible}
                        onCancel={() => this.setState({dialogVisible: !this.state.dialogVisible})}
                        lockScroll={false}
                        style={{background: "#000000", textAlign: "center"}}
                    >
                        <Dialog.Body>
                                             <span>
                                                 <img id="showIdPhoto" src={this.state.currentImage} width="800px" height="100%"/>
											</span>
                        </Dialog.Body>
                    </Dialog>
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