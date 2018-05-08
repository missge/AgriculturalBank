import React from 'react';
import {Component,unshiftArrs}from '../../components/libs';
import html2canvas from 'html2canvas';
import * as homeActions from '../../actions/home';
import * as partyActions from '../../actions/party';

import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {Map} from 'immutable';
// import Head from '../../ma-ui/Head'
import {Link}  from 'react-router-dom';
// import TabTitle from '../../components/src/TabTitle'
// import {  Form, Icon, Input, Button, Checkbox } from 'antd';
// import 'antd/dist/antd.css';
// import 'element-theme-default';
// import { Form,Input,Button,Layout,Tabs,Select } from 'element-react';
import {Form,Input,Button,Layout,Tabs,Select,TabTitle,Head,Dialog,Radio,SelectList,NavBar,SupplePage} from "../../components/index";
import PropTypes from 'prop-types';
import '../publicCss/public.css'

let showLength=4;
var that='';
/*授权人签名*/
var sign = "";
/*曾用名签名*/
var usedName = "";
/*纸质拍照签名*/
var photoSign = "";
/*手持身份拍照图片*/
var idPhoto = "";
/*授权书页面截图*/
var pagePic = "";
var frontImage = require("../../images/certificate_front.png");
var backImage = require("../../images/certificate_back.png");
const actions = [
  homeActions,
  partyActions
];
function mapStateToProps(state) {
  const {partyData}=state;
  return {
    partyData
  };
}

function mapDispatchToProps(dispatch) {

  const creators = Map()
      .merge(...actions)
      .filter(value => typeof value === 'function')
      .toObject();
  return {
    homeActions: bindActionCreators(creators, dispatch),
    partyActions: bindActionCreators(creators, dispatch)

  };
}
/*@connect(
        state => ({...state.home}),
    dispatch => bindActionCreators({showIdCard}, dispatch)
)*/

function regexString(value) {
    if (value!=undefined&&value!=null&&value.length!=0&&value!=""){
        return true;
    }else {
        return false;
    }
}
class Party extends Component{
    constructor(props){
        super(props);
        this.state={
            form:{
                isrel:'否',//是否共同借款人
                edulevel:'小学',//文化程度
                mobno:'',//手机号码
                parincpm:'',//配偶年税后收入,
                reltype:'夫',// 关系人类型
                marrysta:'已婚',//婚姻状况
                myselfincpm:'',//本人年税后收入
                /****基本信息******/
                country:'',//国家/地区
                certtype :'',//证件类型
                gender :'男',//性别
                isLong:'否',//----------是否长期有效
                birthday:'',//出生日期
                isbirthday:'',//-------------证件有效终止日
                isLocal:'是',//---------是否本地常住户口
                housesta:'自有住房有按揭或抵押',//居住状况
                hjdz:'', //--------------是否本地户籍
                abcstuffflag:'否',//是否为农行员工
                isyhzh:'否',//-------------是否私人银行客户
                 bdzjnx:'', //--------------本地居住年限
                // isGtjhr:'', //--------是否有共同借款人
                addagrflag :'城市',//长期居住地城乡属性
                settleaddr :'',//长期居住地地址,
                perclienttype:'非农户',//人行涉农个人客户类别
                /****职业信息******/
                corpname:'' ,//单位全称
                corpchar:'国资委或省国资委直属企业',//单位性质 
                dwdz:'',//-------------单位地址
                title:'其他',//职称
                dutysta:'其他',//职务状况 
                dwgddh:'',  //----------------单位固定电话
                dutysta:'',//职务状况 
                manageRadio :'工薪供职',// -----------职业经营类别
                corpstdtype:'',//单位国标行业分类 
                stdjobtype:'其他',//国标职业分类 
                careertype:'',//个人信贷对象 
                /****财务信息******/
                asssum:'',//资产合计 ,
                guaramt:'',//家庭对外担保额 
                debtexpd:'',//本人年债务性支出 
                pardebtexpd:'',//配偶年债务性支出
                debtsum:'',//负债合计 
                othincpm:'',//家庭其他年收入
                protexpd:'',//本人年生活保障支出 
                /****联系人信息******/
                addr:'居住地址',//常用通信地址
                email:'',//电子邮箱
                teliprefix:'',//固定电话
            },
            container_height:window.innerHeight-this.getHeight(100),
            // radio:"身份证",
            isInfoShow:false,
            isAddParty:false,
            isAddPartyShow:false,
            //  types:'中专',
            selectDialogVisible:false,
            selectDialog2Visible:false,
            selectDialog3Visible:false,
            list:['大学','研究生','博士','大专','高中','中专','初中','小学'],
            liveList:['父母同住','集体宿舍','租住','共有住宅','其他','自有住房无按揭无抵押','自有住房有按揭或抵押'],
            corpcharList:['事业单位','国家机关','小企业','个体工商','其他','国资委或省国资委直属企业','优质上市公司','经营规范、效益一般的企业'],
            selectKey:'',
            /*签署征信授权书，弹出电子签名或拍照*/
            dialogVisible: false,
            /* 授权人签名弹出窗*/
            signDialog: false,
            /* 曾用名签名弹出窗*/
            usedNameDialog:false,
            /* 征信查询按钮与绿色勾号图片显示*/
            isShow:false,
            /* 打开授权书页面*/
            isJump:false,
            /* 手持身份认证*/
            showIdentity:"none",
            showFaceFinished:"none",
            showFaceFailure:"none",
            showIdentityFinished:"none",
            showCreditFinished:"none",
            /* 征信查询*/
            showQuery:"none",
            /* 弹出窗显示签名图片*/
            showPhotoSignDialog:false,
            /* 判断显示电子签名还是拍照签名的图片*/
            isShowPhotoSign:"",
            /* 弹出窗显示手持身份认证的图片*/
            showIdPhotoDialog:false,
            // typeRadio:'配偶',
            // jsRadio:'待定',
            // hyRadio:'已婚',
            // phone:'',
            // income:'',
            // country :'',
            // sexRadio :'男',
            // birthDay :'',
            
            // liveRadio :'',
            // year :'',
            // address :'',
            // idType :'',
            // isVaild :'是',
            // deadline :'',
            // isLocal :'是',
            // isLoaclRadio  :'是',
            // isNH  :'否',
            // isSR  :'是',
            // isTogether  :'是',
            // longAttr :'',
            // check:"inline",
            // checkSuccess:"none",
            // showFrontPhotoDialog:false,
            // showBackPhotoDialog:false,
            // netCheckState:false,
            // cardNumber:"",
            // cardName:"",
            // frontImage:frontImage,
            // backImage:backImage,
            // frontDisplay:"inline",
            // backDisplay:"inline",
            isLookorAdd:''
        }
    }
    onSubmit(e) {
        e.preventDefault();
    }

    creditReport(){
        const w=window.open('about:blank');
        w.location.href='http://localhost:3000/#/'
    }

    removeByValue(arr, val) {
        for(var i=0; i<arr.length; i++) {
            if(arr[i] == val) {
                arr.splice(i, 1);
                break;
            }
        }
    }/*
    unshiftArr(arr,selectTypes){
        let oldI=''
        arr.map((item,i)=>{

            if(item==selectTypes){
                oldI=i
            }
            if(oldI>showLength){
                console.log(arr)
                this.removeByValue(arr,selectTypes)
                arr.unshift(selectTypes)
                this.setState({types:selectTypes})
                this.refs.educationSL.setState({selected:null});
                console.log(arr)
            }
        })

    }*/
    componentDidMount(){
        // this.props.partyActions.showNewContact(false) 
        let procsId='1234'
        this.queryAllInformation(procsId)
        that = this;
            unshiftArrs(this.state.list,this.state.form.edulevel,(data)=>{
             this.state.form['edulevel']=data
            this.refs.educationSL.setState({selected:null})
            },showLength)
            unshiftArrs(this.state.liveList,this.state.form.housesta,(data)=>{
            this.state.form['housesta']=data
            this.refs.educationSL.setState({selected:null})
            },showLength)
            unshiftArrs(this.state.corpcharList,this.state.form.corpchar,(data)=>{
                this.state.form['corpchar']=data
                this.refs.educationSL.setState({selected:null})
                },showLength)
            this.forceUpdate();

            

    }
    queryAllInformation(procsId){
        let that =this
        // eslint-disable-next-line
    //     mmspc.bridge.get(function (data) {
    //          that.props.partyActions.ishaveInformation(data , {"procsId":procsId});
    //    });
    }
    onChange(key, value) {
        this.state.form[key] = value;
        this.setState({
            [key]: value,
        });
        switch (key){
            case "cardName":
                this.state.cardName = value;
                break;
            case "cardNumber":
                this.state.cardNumber = value;
                break;
        }
        this.setCheckState();
    }
    setCheckState(){
        if (regexString(this.state.cardNumber)&&regexString(this.state.cardName) &&this.state.frontDisplay=="none" && this.state.backDisplay=="none"){
            this.setState({netCheckState:true})
        } else {
            this.setState({netCheckState:false})
        }

    }
    onEducateAppendClick(){
        this.setState({selectDialogVisible:true});
    }

    onLiveAppendClick(){
        this.setState({selectDialog2Visible:true});
    }
    onCorpcharAppendClick(){
        this.setState({selectDialog3Visible:true});

    }
    setComplete(cur){
        let value = this.context.getListValue();
        value[cur] = 2;
        return value;
    }
    getInfo(){
        alert("11")
        console.log(this.state.form)
    }
    render(){
        return(
            <div style={{height:this.state.container_height}}>
                <div id="party" class="showTab1" style={{display:this.props.partyData.showNewContact === false ? "block" : "none"}}>
                    <div class="main_contanier">
                        <TabTitle title="证件信息" class="tabTitle orangeTabTitle"/>
                        <div class="form_content">
                            <div class="three_box">
                                <div class="three_child_lf">
                                    <Form labelPosition="left" labelWidth="80" onSubmit={this.onSubmit.bind(this)}>
                                        <Form.Item label="证件类型">
                                            <Radio.Group value={this.state.radio} onChange={this.onChange.bind(this, 'radio')}>
                                                <Radio.Button style={{marginBottom:"0px"}} value="身份证" />
                                            </Radio.Group>
                                        </Form.Item>
                                        <Form.Item label="证件号码">
                                            <Input type="text" placeholder="请输入证件号码" value={this.state.cardNumber} onChange={this.onChange.bind(this, 'cardNumber')}/>
                                            <button type="button" className="loading-button" onClick={()=>
                                            {
                                                // eslint-disable-next-line
                                                mmspc.abcDevice.initDevice();
                                                // eslint-disable-next-line
                                                mmspc.abcDevice.readIDCardInfo("0", function(json) {
                                                    that.setState({cardNumber:json.identityCardNumber , cardName:json.fullName});
                                                }, function (error){

                                                }, 30000);

                                            }
                                            }>读取</button>

                                        </Form.Item>
                                        <Form.Item label="客户姓名">
                                            <Input  id="card_name" type="text" size="small" value={this.state.cardName} onChange={this.onChange.bind(this, 'cardName')}></Input>
                                        </Form.Item>
                                    </Form>
                                </div>
                                <div class="three_child_rt">
                                    <ul class="img_box">
                                        <li>
                                            <div class="camera_box"  >
                                                <img src={this.state.frontImage} onClick={()=>{
                                                    if (this.state.frontDisplay=="none"){
                                                        this.setState({showFrontPhotoDialog:true})
                                                    }
                                                }} />
                                                <p>
                                                    <img  src={require("../../images/camera.png")} style={{display:this.state.frontDisplay}} onClick={()=>{
                                                        // eslint-disable-next-line
                                                        navigator.camera.getPicture(successData => {
                                                            this.setState({frontImage:"data:image/png;base64," + successData , frontDisplay:"none"});
                                                            this.state.frontDisplay = "none";
                                                            this.setCheckState();
                                                        }, errData => {

                                                        }, {quality: 50, destinationType: 0});
                                                    }}/>
                                                </p>
                                            </div>
                                            <p>请上传身份证头像面</p>

                                        </li>
                                        <li>
                                            <div class="camera_box">
                                                <img src={this.state.backImage} onClick={()=>{
                                                    if (this.state.backDisplay=="none"){
                                                        this.setState({showBackPhotoDialog:true})
                                                    }
                                                }}/>
                                                <p>
                                                    <img src={require("../../images/camera.png")} style={{display:this.state.backDisplay}} onClick={()=>{
                                                        // eslint-disable-next-line
                                                        navigator.camera.getPicture(successData => {
                                                            this.setState({backImage:"data:image/png;base64," + successData  , backDisplay:"none"});
                                                            this.state.backDisplay = "none";
                                                            this.setCheckState();
                                                        }, errData => {

                                                        }, {quality: 50, destinationType: 0});

                                                    }}/>
                                                </p>
                                            </div>
                                            <p>请上传身份证国徽面</p>
                                        </li>

                                    </ul>
                                </div>
                            </div>
                            <div class="three_box_rt" >
                                <div style={{display:this.state.check}}>
                                    <input type="button" class={(this.state.netCheckState)?"orangeButton":"grayButton"} value="联网核查" onClick={()=>{
                                        if (this.state.netCheckState){
                                            this.setState({loadingContent:"联网核查..." , fullscreen:true});
                                            // eslint-disable-next-line
                                            mmspc.nativeRequest.init();
                                            // eslint-disable-next-line
                                            mmspc.bridge.get(appId=>{
                                                // eslint-disable-next-line
                                                mmspc.nativeRequest.get("http://219.142.79.229:8989/mmsp-ps/forward/"+appId+"/rest/pub/access/onlinecheck?clientId=易贤武&userId=360731199110284813"
                                                    , ()=>{
                                                        this.setState({nextBg:"#FFA400" , nextBorder:"#FFA400" ,
                                                            nextState:true,loadingContent:"联网核查..." , fullscreen:false,
                                                            check:"none" ,checkSuccess:"inline"});
                                                    }, ()=>{
                                                        this.setState({loadingContent:"联网核查..." , fullscreen:false});
                                                    });
                                            },()=>{

                                            })

                                        }
                                    }}/>

                                </div>
                                <div style={{display:this.state.checkSuccess}}>
                                    <img src={require("../../images/success_iocn.png")}
                                         width="75%" height="75%"/>
                                    <p style={{color:"#00CD00"}}>核查通过</p>
                                </div>
                            </div>

                        </div>

                        {/*正面照片的弹框*/}
                        <Dialog
                            size="full"
                            visible={this.state.showFrontPhotoDialog}
                            onCancel={() => this.setState({showFrontPhotoDialog: !this.state.showFrontPhotoDialog})}
                            lockScroll={false}
                            style={{background: "#000000", textAlign: "center"}}
                        >
                            <Dialog.Body>
                                             <span>
                                                 <img id="showIdPhoto" src={this.state.frontImage} width="800px" height="100%"/>
                                            </span>
                            </Dialog.Body>
                        </Dialog>
                        {/*背面照片的弹框*/}
                        <Dialog
                            size="full"
                            visible={this.state.showBackPhotoDialog}
                            onCancel={() => this.setState({showBackPhotoDialog: !this.state.showBackPhotoDialog})}
                            lockScroll={false}
                            style={{background: "#000000", textAlign: "center"}}
                        >
                            <Dialog.Body>
                                             <span>
                                                 <img id="showIdPhoto" src={this.state.backImage} width="800px" height="100%"/>
                                            </span>
                            </Dialog.Body>
                        </Dialog>
                        <TabTitle title="征信授权" class="tabTitle blueTabTitle"/>
                        <div class="form_content">
                            <div class="three_box">
                                <div class="three_child_rt">
                                    <ul class="img_box">
                                        <li>
                                            <div class="camera_box"
                                                 onClick={() => {
                                                     // eslint-disable-next-line
                                                     mmspc.faceDetect.startLive(dataStr => {
                                                         this.setState({showFaceFinished: "block"});
                                                     }, errStr => {
                                                         this.setState({showFaceFailure: "block"});
                                                         this.setState({showIdentity: "block"});
                                                     });
                                                 }}
                                            >
                                                <img src={require("../../images/face_recognition.png")}/>
                                                <p style={{display: this.state.showFaceFinished}}>
                                                    <img src={require("../../images/finished.png")}/>
                                                </p>
                                                <p style={{display: this.state.showFaceFailure}}>
                                                    <img src={require("../../images/failure.png")}/>

                                                </p>
                                            </div>
                                            <p>人脸识别认证</p>
                                        </li>
                                        <li style={{display: this.state.showIdentity}}>
                                            <div class="camera_box"
                                                 onClick={(this.state.showIdentityFinished == "block") ?
                                                     () => {
                                                         this.setState({showIdPhotoDialog: true})
                                                     }
                                                     :
                                                     () => {
                                                         // eslint-disable-next-line
                                                         navigator.camera.getPicture(successData => {
                                                             idPhoto = "data:image/png;base64," + successData;
                                                             document.getElementById("showIdPhoto").src = idPhoto;
                                                             this.setState({showIdentityFinished: "block"});
                                                         }, errData => {
                                                             alert("error");
                                                         }, {quality: 50, destinationType: 0});
                                                     }
                                                 }
                                            >
                                                <img src={require("../../images/identity_authentication.png")}/>
                                                <p style={{display: this.state.showIdentityFinished}}>
                                                    <img src={require("../../images/finished.png")}/>
                                                </p>
                                            </div>
                                            <p>手持身份认证</p>
                                        </li>
                                        <li>
                                            <div class="camera_box"
                                                 onClick={
                                                     ((this.state.showFaceFinished == "block") || ((this.state.showFaceFailure == "block") && (this.state.showIdentityFinished == "block"))) == true ?
                                                         ( this.state.showCreditFinished == "none" ?
                                                              () => this.setState({dialogVisible: true})
                                                              :
                                                              ( this.state.isShowPhotoSign == "write" ?
                                                                      () => this.setState({showPhotoSignDialog: true,isShowPhotoSign:"write"})
                                                                      :
                                                                      () => this.setState({showPhotoSignDialog: true,isShowPhotoSign:"photo"})
                                                              )
                                                         )
                                                      :
                                                         () => alert("请先完成人脸识别或手持身份认证")
                                             /*        ( this.state.showCreditFinished == "none" ?
                                                             () => this.setState({dialogVisible: true})
                                                             :
                                                             ( this.state.isShowPhotoSign == "write" ?
                                                                     () => this.setState({showPhotoSignDialog: true,isShowPhotoSign:"write"})
                                                                     :
                                                                     () => this.setState({showPhotoSignDialog: true,isShowPhotoSign:"photo"})
                                                             )
                                                     )*/
                                                 }
                                            >
                                                <img src={require("../../images/credit_authorizatio.png")}/>
                                                <p style={{display: this.state.showCreditFinished}}>
                                                    <img src={require("../../images/finished.png")}/>
                                                </p>
                                            </div>
                                            <p>签署征信授权书</p>
                                        </li>

                                    </ul>
                                    <div>
                                        <Dialog
                                            size="full"
                                            visible={this.state.dialogVisible}
                                            onCancel={() => this.setState({dialogVisible: false})}
                                            lockScroll={false}
                                            style={{background: "rgba(0,0,0,0.1)", textAlign: "center"}} /*透明*/
                                        >
                                            <Dialog.Body>
                                                <div style={{width:380,display:'flex',justifyContent:'center', margin:'15% auto 0'}}>
                                        <span>
                                                <img class="lWhiteTabTitle" src={require("../../images/signature.png")}
                                                     width="100px" height="auto"
                                                     onClick={() => this.setState({isJump: !this.state.isJump,dialogVisible: false})
                                                         /* this.state.showCreditFinished == "none" ?
                                                         :
                                                          () => this.setState({showPhotoSignDialog: true,dialogVisible: false,isShowPhotoSign: "write"})*/
                                                     }
                                                />
                                                <p style={{color: "#FFFFFF"}}>电子手写签名</p>
                                            </span>
                                                    <span>
                                                <img class="rWhiteTabTitle" src={require("../../images/shoot.png")}
                                                     width="100px" height="auto"
                                                    /*判断是否已经纸质签名拍照，若已拍过，点击查看签名*/
                                                     onClick={() => {
                                                         // eslint-disable-next-line
                                                         navigator.camera.getPicture(successData => {
                                                             photoSign = "data:image/png;base64," + successData;
                                                             document.getElementById("showPhotoSign").src = photoSign;
                                                             this.setState({showCreditFinished: "block",dialogVisible: false, isShowPhotoSign:"photo"});
                                                         }, errData => {
                                                             alert("error");
                                                         }, {quality: 50,destinationType: 0});
                                                     }
                                                         /*this.state.showCreditFinished == "none" ?
                                                               :
                                                               () => {this.setState({showPhotoSignDialog: true,dialogVisible: false,isShowPhotoSign: "photo"})}*/
                                                     }
                                                />
                                                <p style={{color: "#FFFFFF"}}>纸质签名拍照</p>
                                            </span>
                                                </div>
                                                <img src={require("../../images/close_50.png")}
                                                     style={{flex:1,margin:'5% auto 0'}}
                                                     onClick={() => this.setState({dialogVisible: false})}
                                                />
                                            </Dialog.Body>
                                        </Dialog>

                                    </div>
                                    {/* 弹出窗显示签名图片*/}
                                    <Dialog
                                        size="full"
                                        visible={this.state.showPhotoSignDialog}
                                        onCancel={() => this.setState({showPhotoSignDialog: false})}
                                        lockScroll={false}
                                        style={{background: "#000000", textAlign: "center"}}
                                    >
                                        <Dialog.Body>
                                             <span>{this.state.isShowPhotoSign == "write" ?
                                                 <img  src={pagePic} width="800px" height= "100%"/>
                                                 :
                                                 <img id="showPhotoSign" src={photoSign} width="800px" height="100%"/>
                                             }
                                            </span>
                                        </Dialog.Body>
                                    </Dialog>
                                    {/* 弹出窗显示手持身份拍照图片*/}
                                    <Dialog
                                        size="full"
                                        visible={this.state.showIdPhotoDialog}
                                        onCancel={() => this.setState({showIdPhotoDialog: !this.state.showIdPhotoDialog})}
                                        lockScroll={false}
                                        style={{background: "#000000", textAlign: "center"}}
                                    >
                                        <Dialog.Body>
                                             <span>
                                                 <img id="showIdPhoto" src={idPhoto} width="800px" height="100%"/>
                                            </span>
                                        </Dialog.Body>
                                    </Dialog>
                                </div>
                                <div class="three_box_rt">
                                    <div>{this.state.isShow === false ?
                                        <div>{(((this.state.showFaceFinished == "block") || ((this.state.showFaceFailure == "block") && (this.state.showIdentityFinished == "block"))) && (this.state.showCreditFinished == "block")) == false ?
                                            <div>
                                                <Button  style={{height:70,width:70}}disabled={true} textStyle={{fontSize:18,lineHeight:1.3,whiteSpace:'normal'}}>征信查询</Button>
                                            </div>
                                            :
                                            <div>
                                                <Button type="warning" style={{height:70,width:70}} textStyle={{fontSize:18,lineHeight:1.3,whiteSpace:'normal'}}
                                                        onClick={() => this.setState({showQuery: "block", isShow: true})}>
                                                    征信查询
                                                </Button>
                                            </div>
                                        }
                                        </div>
                                        :
                                        <div>
                                            <img src={require("../../images/success_iocn.png")}
                                                 width="75%" height="75%"/>
                                            <p style={{color: "#00CD00"}}>核查通过</p>
                                        </div>

                                    }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <TabTitle title="征信报告" class="tabTitle greenTabTitle"/>
                        <div class="form_content">
                            <div class="three_box">
                                <div class="three_child_rt">
                                    <ul class="img_box">
                                        <li>
                                            <div class="camera_box"  onClick={this.creditReport}>
                                                <img src={require("../../images/credit_certificate.png")}/>
                                                <p style={{display: this.state.showQuery}}>
                                                    <img src={require("../../images/yicahxun.png")}/>
                                                </p>
                                            </div>
                                            <p>征信报告</p>
                                        </li>

                                        <li>
                                        </li>
                                        <li style={{display: this.state.showIdentity}}>
                                        </li>
                                    </ul>
                                </div>
                                <div class="three_box_rt">
                                </div>

                            </div>
                        </div>


                        <TabTitle title="基本信息" class="tabTitle grayTabTitle"/>
                        <Form labelPosition="left" model={this.state.form} labelWidth="120" onSubmit={this.onSubmit.bind(this)}>
                                <div class="form_content_col">
                                    <ul class="form_content_row">
                                     <li class="form_lf">
                                            <Form.Item label="是否共同借款人">
                                                <Radio.Group value={this.state.form.isrel} onChange={this.onChange.bind(this, 'isrel')}>
                                                    <Radio.Button style={{marginBottom:"0px"}} value="是" />
                                                    <Radio.Button style={{marginBottom:"0px"}} value="否" />
                                                </Radio.Group>
                                            </Form.Item>
                                        </li>
                                        <li class="form_rt">
                                            <Form.Item label="关系人类型">
                                                <Radio.Group value={this.state.form.reltype} onChange={this.onChange.bind(this, 'reltype')}>
                                                    <Radio.Button  value="夫" />
                                                    <Radio.Button  value="妻" />
                                                    <Radio.Button  value="子" />
                                                    <Radio.Button  value="女" />
                                                    <Radio.Button  value="父母" />
                                                    <Radio.Button  value="其他" />
                                                </Radio.Group>
                                            </Form.Item>
                                        </li>
                                       
                                    </ul>

                                 
                                    <ul class="form_content_row">
                                        <li class="form_lf">
                                            <Form.Item label="文化程度">
                                                <Radio.Group value={this.state.form.edulevel} onChange={this.onChange.bind(this, 'edulevel')} appendix="更多"
                                                onAppendixClick={this.onEducateAppendClick.bind(this)}>
                                                    {
                                                        this.state.list.map(function(item,i){
                                                            return(
                                                                i<showLength+1?
                                                                    <Radio.Button key={i} value={item} /> :''

                                                            )
                                                        })

                                                    }
                                                    <Radio.Button style={{marginBottom:"0px"}} value="更多" />
                                                </Radio.Group>
                                            </Form.Item>
                                            <Dialog
                                                size="small"
                                                visible={ this.state.selectDialogVisible }
                                                title='对话框'
                                                // onCancel={ () => this.setState({ selectDialogVisible: false,types:this.state.types}) }
                                                onCancel={ () => this.setState({ selectDialogVisible: false}) }
                                                
                                                lockScroll={ false }
                                                className='mmpsc-select-list-dialog'
                                            >
                                                <Dialog.Body>
                                                    <SelectList ref ="educationSL" 
                                                visible={ this.state.selectDialogVisible }
                                                value={this.state.form.edulevel} multiple={false} onChange={(val)=>{
                                                        this.removeByValue(this.state.list,val)
                                                        this.state.list.unshift(val)
                                                        this.onChange('edulevel',val)
                                                        this.setState({selectDialogVisible: false})
                                                        this.refs.educationSL.setState({selected:null});
                                                    }}>
                                                        {
                                                            this.state.list.map(function(item,i){
                                                                return i>showLength? <SelectList.Option key={i} label={item} value={item} /> :''
                                                            })
                                                        }

                                                    </SelectList>
                                                </Dialog.Body>
                                            </Dialog>

                                        </li>
                                        <li class="form_rt">
                                            <Form.Item label="婚姻状况">
                                                <Radio.Group value={this.state.form.marrysta} onChange={this.onChange.bind(this, 'marrysta')}>
                                                    <Radio.Button  value="已婚" />
                                                    <Radio.Button  value="未婚" />
                                                    <Radio.Button  value="离异" />
                                                    <Radio.Button  value="丧偶" />
                                                    <Radio.Button  value="其他" />
                                                </Radio.Group>
                                            </Form.Item>
                                        </li>
                                    </ul>
                                    <ul class="form_content_row">
                                        <li class="form_lf">
                                            <Form.Item label="手机号码">
                                                <Input  size="small" value={this.state.form.mobno} placeholder="请输入手机号" onChange={this.onChange.bind(this, 'mobno')}></Input>
                                            </Form.Item>
                                        </li>
                                        <li class="form_rt">
                                            <Form.Item label="本人年税后收入">
                                                <Input  size="small" value={this.state.form.myselfincpm}  placeholder="20万" onChange={this.onChange.bind(this, 'myselfincpm')}></Input>
                                            </Form.Item>
                                        </li>
                                        
                                    </ul>
                                     <ul class="form_content_row">
                                        <li class="form_lf">
                                            <Form.Item label="配偶年税后收入">
                                                <Input  size="small" value={this.state.form.parincpm}  placeholder="配偶年税后收入" onChange={this.onChange.bind(this, 'parincpm')}></Input>
                                            </Form.Item>
                                        </li>
                                        <li class="form_rt">
                                        </li>
                                    </ul>
                                </div>
                            </Form>
                    </div>
                    <div class="loan_footer">
                            <div class="footer_content" >
                                <div class="footer_content_lf">
                                    <Button plain={true} type="info" size="large"
                                            onClick={ () => this.setState({ isInfoShow:!this.state.isInfoShow})}>信息补录</Button>
                                </div>
                                <div class="footer_content_rt">
                                    <Button type="warning" size="large" onClick={() => {
                                        alert(JSON.stringify(this.state.form));
                                         // eslint-disable-next-line
                                        // mmspc.bridge.get(function (data) {
                                        //         that.props.partyActions.postPartyInfo(data , that.state.form);
                                        //     });
                                          this.props.partyActions.showNewContact(true)

                                        }}
                                        >新增关系人
                                    </Button>
                                </div>
                            </div>
                        </div>
                 </div>
                 
                {/* <div id="addParty"  style={{display:this.state.isAddPartyShow === false ? "none" : "block"}}> */}
                <div id="addParty"  style={{display:this.props.partyData.showNewContact === false ? "none" : "block"}}>
                    <div class="main_contanier scrollauto">
                        <TabTitle title="关系人信息" class="tabTitle blueTabTitle"/>
                        <div class="form_content">
                            <ul class="addParty_box">
                                <li onClick={() =>{
                                    // mmspc.bridge.get(function (data) {
                                        // that.props.partyActions.postPartyInfo(data,clickId);
                                    // });
                                    this.setState({isAddParty:!this.state.isAddParty,isLookorAdd:1})
                                    
                                }}>
                                    <ul class="addParty_title">
                                        <li>
                                        <span class="addParty_title_key">
                                            姓名：
                                        </span>
                                            <span class="addParty_title_value">
                                            关小明
                                        </span>
                                        </li>
                                        <li>
                                        <span class="addParty_title_key">
                                            证件号码：
                                        </span>
                                            <span class="addParty_title_value">
                                            100101001010101010000
                                        </span>
                                        </li>
                                        <li>
                                        <span class="addParty_title_key">
                                            角色：
                                        </span>
                                            <span class="addParty_title_value">
                                            借款人配偶
                                        </span>
                                        </li>
                                        <li >
                                        <span class="addParty_title_key">
                                            类型：
                                        </span>
                                            <span class="addParty_title_value">
                                          配偶
                                        </span>
                                        </li>
                                    </ul>
                                    <div class="addParty_footer">
                                    <span class="greenFont">
                                        已信息核查
                                    </span>
                                        <span class="grayFont">
                                        未征信查询
                                    </span>
                                    </div>
                                </li>
                                <div class="addcontact">
                                    <div>
                                        <img src={require("./img/add.png")} width="58px" height="58px"
                                            onClick={() => {this.setState({isAddParty:!this.state.isAddParty,isLookorAdd:2})}}
                                        />
                                        <p>新增关系人</p>
                                    </div>
                                </div>
                            </ul>
                        </div>
                        <div class="loan_footer">
                            <div class="footer_content" >
                                <div class="footer_content_rt">
                                    <Button type="warning" size="large"
                                            onClick={() => {this.context.jumpTo(4, this.setComplete.bind(this)(3))}}>下一步</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*关系人信息补录*/}
                <SupplePage style={{display:this.state.isInfoShow === false ? "none" : "block"}}>
                    <NavBar
                        title={"关系人信息补录"}
                        lName={"取消"}
                        rName={"确定"}
                        lClick={ this.state.isAddPartyShow === false ?
                            /* 当页面进来直接填写第一个关系人信息时，点击信息补录跳转时，关闭只需要关闭当前*/
                            () => this.setState({ isInfoShow:!this.state.isInfoShow})
                            :
                           /* 当页面时由新增关系人卡片，点击信息补录跳转时，关闭需要再打开 新增关系人页面*/
                            () => this.setState({ isInfoShow:!this.state.isInfoShow,isAddParty:true})
                        }
                        rClick={ this.state.isAddPartyShow === false ?
                            /* 当页面进来直接填写第一个关系人信息时，点击信息补录跳转时，关闭只需要关闭当前*/
                            () => this.setState({ isInfoShow:!this.state.isInfoShow})
                            :
                            /* 当页面时由新增关系人卡片，点击信息补录跳转时，关闭需要再打开 新增关系人页面*/
                            () => this.setState({ isInfoShow:!this.state.isInfoShow,isAddParty:true})
                        }
                    >
                    </NavBar>
                    {/*关系人信息补录*/}
                        <div class="showTab2">
                            <Tabs activeName="1" onTabClick={(tab) => console.log(tab.props.name) }>
                                <Tabs.Pane label="基本信息" name="1">
                                    <Form labelPosition="left"  model={this.state.form} labelWidth="170" onSubmit={this.onSubmit.bind(this)}>
                                           <div class="form_content">
                                                <div class="form_lf">
                                                    <Form.Item label="国家">
                                                       <Input value={this.state.form.country} placeholder="" onChange={this.onChange.bind(this, 'country')}></Input>
                                                    </Form.Item>
                                                    <Form.Item label="性别">
                                                         <Radio.Group value={this.state.form.gender } onChange={this.onChange.bind(this, 'gender')}>
                                                            <Radio.Button style={{marginBottom:"0px"}} value="女" />
                                                            <Radio.Button style={{marginBottom:"0px"}} value="男" />
                                                        </Radio.Group>
                                                    </Form.Item>
                                                      <Form.Item label="出生日期">
                                                       <Input value={this.state.form.birthday} placeholder="" onChange={this.onChange.bind(this, 'birthday')}></Input>
                                                    </Form.Item>
                                                    <Form.Item label="户籍地址">
                                                       <Input value={this.state.form.hjdz} placeholder="" onChange={this.onChange.bind(this, 'hjdz')}></Input>
                                                    </Form.Item>
                                                    <Form.Item label="居住状况">
                                                        <Radio.Group value={this.state.form.housesta} onChange={this.onChange.bind(this, 'housesta')} appendix="更多"
                                                             onAppendixClick={this.onLiveAppendClick.bind(this)}>
                                                            {
                                                                this.state.liveList.map(function(item,i){
                                                                    return(
                                                                        i<showLength+1?
                                                                            <Radio.Button  key={i} value={item} /> :''

                                                                    )
                                                                })

                                                            }
                                                            <Radio.Button  value="更多" />
                                                        </Radio.Group>
                                                    </Form.Item>
                                                    <Dialog
                                                        size="small"
                                                        visible={ this.state.selectDialog2Visible }
                                                        title='对话框'
                                                        onCancel={ () => this.setState({ selectDialog2Visible: false}) }
                                                        lockScroll={ false }
                                                        className='mmpsc-select-list-dialog'
                                                    >
                                                        <Dialog.Body>
                                                            <SelectList ref ="liveRadio"
                                                                        visible={ this.state.selectDialog2Visible }
                                                                        value={this.state.form.housesta} multiple={false} onChange={(val)=>{
                                                                this.removeByValue(this.state.liveList,val)
                                                                this.state.liveList.unshift(val)
                                                                this.onChange('housesta',val)
                                                                this.setState({selectDialog2Visible: false})
                                                                this.refs.liveRadio.setState({selected:null});
                                                            }}>
                                                                {
                                                                    this.state.liveList.map(function(item,i){
                                                                        return i>showLength? <SelectList.Option key={i} label={item} value={item} /> :''
                                                                    })
                                                                }

                                                            </SelectList>
                                                        </Dialog.Body>
                                                    </Dialog>
                                                    <Form.Item label="本地居住年限">
                                                       <Input value={this.state.form.bdzjnx} placeholder={this.state.form.bdzjnx} onChange={this.onChange.bind(this, 'bdzjnx')}></Input>
                                                    </Form.Item>
                                                    
                                                    <Form.Item label="长期居住地城乡属性">
                                                     <Radio.Group value={this.state.form.addagrflag} onChange={this.onChange.bind(this, 'addagrflag')}>
                                                            <Radio.Button style={{marginBottom:"0px"}} value="城市" />
                                                            <Radio.Button style={{marginBottom:"0px"}} value="农村" />
                                                        </Radio.Group>       
                                                    </Form.Item>

                                                </div>
                                                <div class="form_rt">
                                                    <Form.Item label="证件类型">
                                                       <Input value={this.state.form.certtype} placeholder="身份证" onChange={this.onChange.bind(this, 'certtype')}></Input>
                                                    </Form.Item>
                                                    <Form.Item label="是否长期有效">
                                                         <Radio.Group value={this.state.form.isLong} onChange={this.onChange.bind(this, 'isLong')}>
                                                            <Radio.Button style={{marginBottom:"0px"}} value="是" />
                                                            <Radio.Button style={{marginBottom:"0px"}} value="否" />
                                                        </Radio.Group>
                                                    </Form.Item>
                                                    <Form.Item label="证件有效终止日">
                                                       <Input value={this.state.form.isbirthday} placeholder="2022-05-11" onChange={this.onChange.bind(this, 'isbirthday')}></Input>
                                                    </Form.Item>
                                                    <Form.Item label="是否本地常住户口">
                                                         <Radio.Group value={this.state.form.isLocal} onChange={this.onChange.bind(this, 'isLocal')}>
                                                            <Radio.Button style={{marginBottom:"0px"}} value="是" />
                                                            <Radio.Button style={{marginBottom:"0px"}} value="否" />
                                                        </Radio.Group>
                                                    </Form.Item>
                                                   
                                                     <Form.Item label="是否农行员工">
                                                         <Radio.Group value={this.state.form.abcstuffflag} onChange={this.onChange.bind(this, 'form','abcstuffflag')}>
                                                            <Radio.Button style={{marginBottom:"0px"}} value="是" />
                                                            <Radio.Button style={{marginBottom:"0px"}} value="否" />
                                                        </Radio.Group>
                                                    </Form.Item>
                                                    <Form.Item label="是否私人银行客户">
                                                         <Radio.Group value={this.state.form.isyhzh} onChange={this.onChange.bind(this, 'isyhzh')}>
                                                            <Radio.Button style={{marginBottom:"0px"}} value="是" />
                                                            <Radio.Button style={{marginBottom:"0px"}} value="否" />
                                                        </Radio.Group>
                                                    </Form.Item>
                                                    <Form.Item label="人行涉农个人客户类别">
                                                     <Radio.Group value={this.state.form.perclienttype} onChange={this.onChange.bind(this, 'perclienttype')}>
                                                            <Radio.Button style={{marginBottom:"0px"}} value="非农户" />
                                                            <Radio.Button style={{marginBottom:"0px"}} value="农户" />
                                                            <Radio.Button style={{marginBottom:"0px"}} value="未认定" />
                                                            
                                                        </Radio.Group>       
                                                    </Form.Item>
                                                    <Form.Item label="长期居住地地址">
                                                       <Input value={this.state.form.settleaddr} placeholder="" onChange={this.onChange.bind(this, 'settleaddr')}></Input>
                                                    </Form.Item>
                                                </div>
                                            </div>
                                    </Form>
                                </Tabs.Pane>
                                 <Tabs.Pane label="职业信息" name="2">
                                    <Form labelPosition="left"  model={this.state.form} labelWidth="170" onSubmit={this.onSubmit.bind(this)}>
                                           <div class="form_content">
                                                <div class="form_lf">
                                                                
                                                    <Form.Item label="单位全称">
                                                       <Input value={this.state.form.corpname} placeholder="" onChange={this.onChange.bind(this, 'corpname')}></Input>
                                                    </Form.Item>
                                                    <Form.Item label="单位地址">
                                                       <Input value={this.state.form.dwdz} placeholder="" onChange={this.onChange.bind(this, 'dwdz')}></Input>
                                                    </Form.Item>
                                                    <Form.Item label="职称" >
                                                         <Radio.Group value={this.state.form.title}  onChange={this.onChange.bind(this, 'title')}>
                                                            <Radio.Button style={{marginBottom:"0px"}} value="初级" />
                                                            <Radio.Button style={{marginBottom:"0px"}} value="中级" />
                                                            <Radio.Button style={{marginBottom:"0px"}} value="高级" />
                                                            <Radio.Button style={{marginBottom:"0px"}} value="其他" />
                                                        </Radio.Group>
                                                    </Form.Item>
                                                     <Form.Item label="单位固定电话">
                                                       <Input value={this.state.form.dwgddh} placeholder="" onChange={this.onChange.bind(this, 'dwgddh')}></Input>
                                                    </Form.Item>
                                                    <Form.Item label="单位国标行业分类 ">
                                                         <Radio.Group value={this.state.form.corpstdtype} onChange={this.onChange.bind(this, 'corpstdtype')}>
                                                            <Radio.Button style={{marginBottom:"0px"}} value="其他" />
                                                        </Radio.Group>
                                                    </Form.Item>
                                                     <Form.Item label="个人信贷对象">
                                                         <Radio.Group value={this.state.form.careertype} onChange={this.onChange.bind(this, 'careertype')}>
                                                            <Radio.Button  value="公务员" />
                                                            <Radio.Button  value="企事业职工" />
                                                            <Radio.Button  value="私营业主" />
                                                            <Radio.Button  value="农户" />
                                                            <Radio.Button  value="更多" />
                                                        </Radio.Group>
                                                    </Form.Item>
                                                </div>
                                                <div class="form_rt">
                                                   <Form.Item label="单位性质">
                                                         <Radio.Group value={this.state.form.corpchar} onChange={this.onChange.bind(this, 'corpchar')} appendix="更多"
                                                           onAppendixClick={this.onCorpcharAppendClick.bind(this)}>
                                                            {
                                                                this.state.corpcharList.map(function(item,i){
                                                                    return(
                                                                        i<showLength+1?
                                                                            <Radio.Button key={i} value={item} /> :''

                                                                    )
                                                                })

                                                            }
                                                            <Radio.Button style={{marginBottom:"0px"}} value="更多" />
                                                        </Radio.Group>
                                                        <Dialog
                                                            size="small"
                                                            visible={ this.state.selectDialog3Visible }
                                                            title='对话框'
                                                            // onCancel={ () => this.setState({ selectDialogVisible: false,types:this.state.types}) }
                                                            onCancel={ () => this.setState({ selectDialog3Visible: false}) }
                                                            
                                                            lockScroll={ false }
                                                            className='mmpsc-select-list-dialog'
                                                        >
                                                            <Dialog.Body>
                                                                <SelectList ref ="educationSL" 
                                                            visible={this.state.selectDialog3Visible}
                                                            value={this.state.form.corpchar} multiple={false} onChange={(val)=>{
                                                                    this.removeByValue(this.state.corpcharList,val)
                                                                    this.state.corpcharList.unshift(val)
                                                                    this.onChange('corpchar',val)
                                                                    this.setState({selectDialog3Visible: false})
                                                                    this.refs.educationSL.setState({selected:null});
                                                                }}>
                                                                    {
                                                                        this.state.corpcharList.map(function(item,i){
                                                                            return i>showLength? <SelectList.Option key={i} label={item} value={item} /> :''
                                                                        })
                                                                    }

                                                                </SelectList>
                                                            </Dialog.Body>
                                                        </Dialog>




                                                    </Form.Item>
                                                      <Form.Item label="职务状况">
                                                         <Radio.Group value={this.state.form.dutysta} onChange={this.onChange.bind(this, 'dutysta')}>
                                                            <Radio.Button style={{marginBottom:"0px"}} value="其他" />
                                                        </Radio.Group>
                                                    </Form.Item>
                                                     <Form.Item label="职业经营类别">
                                                         <Radio.Group value={this.state.form.manageRadio} onChange={this.onChange.bind(this, 'manageRadio')}>
                                                            <Radio.Button style={{marginBottom:"0px"}} value="工薪供职" />
                                                        </Radio.Group>
                                                    </Form.Item>
                                                    <Form.Item label="国标职业分类">
                                                        <Radio.Group value={this.state.form.stdjobtype} onChange={this.onChange.bind(this, 'stdjobtype')}>
                                                            <Radio.Button  value="专业技术人员" />
                                                            <Radio.Button  value="商业、服务业人员" />
                                                            <Radio.Button  value="办事人员和有关人员" />
                                                            <Radio.Button  value="更多" />
                                                        </Radio.Group>
                                                    </Form.Item>
                                                </div>
                                            </div>
                                    </Form>
                                </Tabs.Pane>
                                <Tabs.Pane label="财务信息" name="3">
                                     <Form labelPosition="left"  model={this.state.form} labelWidth="170" onSubmit={this.onSubmit.bind(this)}>
                                           <div class="form_content">
                                                <div class="form_lf">
                                                    <Form.Item label="资产合计">
                                                       <Input value={this.state.form.asssum} placeholder="" onChange={this.onChange.bind(this, 'asssum')}></Input>
                                                    </Form.Item>
                                                    <Form.Item label="家庭对外担保额">
                                                       <Input value={this.state.form.guaramt} placeholder="" onChange={this.onChange.bind(this, 'guaramt')}></Input>
                                                    </Form.Item>
                                                </div>
                                                <div class="form_rt">
                                                    <Form.Item label="负债合计">
                                                      <Input value={this.state.form.debtsum} placeholder="" onChange={this.onChange.bind(this, 'debtsum')}></Input>
                                                    </Form.Item>
                                                     <Form.Item label="家庭其他年收入">
                                                       <Input value={this.state.form.othincpm} placeholder="" onChange={this.onChange.bind(this, 'othincpm')}></Input>
                                                    </Form.Item>
                                                </div>
                                            </div>
                                             <div class="form_content" >
                                                <div class="form_lf" style={{paddingTop:"0px"}}>
                                                    <Form.Item label="本人年债务性支出">
                                                       <Input value={this.state.form.debtexpd} placeholder="" onChange={this.onChange.bind(this, 'debtexpd')}></Input>
                                                    </Form.Item>
                                                  
                                                </div>
                                                <div class="form_rt" style={{paddingTop:"0px"}}>
                                                    <Form.Item label="本人年生活保障支出">
                                                      <Input value={this.state.form.debtexpd} placeholder="" onChange={this.onChange.bind(this, 'debtexpd')}></Input>
                                                    </Form.Item>
                                                </div>
                                            </div>
                                             <div class="form_content">
                                                 <div class="form_lf" style={{paddingTop:"0px"}}>
                                                    <Form.Item label="配偶年债务性支出">
                                                       <Input value={this.state.form.pardebtexpd} placeholder="" onChange={this.onChange.bind(this, 'pardebtexpd')}></Input>
                                                    </Form.Item>
                                                  
                                                </div>
                                                <div class="form_rt">
                                                    
                                                </div>
                                            </div>
                                    </Form>
                                </Tabs.Pane>
                                 <Tabs.Pane label="联系信息" name="4">
                                     <Form labelPosition="left"  model={this.state.form} labelWidth="170" onSubmit={this.onSubmit.bind(this)}>
                                           <div class="form_content">
                                                <div class="form_lf">
                                                     <Form.Item label="通信地址">
                                                         <Radio.Group value={this.state.form.addr} onChange={this.onChange.bind(this, 'addr')}>
                                                            <Radio.Button style={{marginBottom:"0px"}} value="居住地址" />
                                                            <Radio.Button style={{marginBottom:"0px"}} value="单位地址" />

                                                        </Radio.Group>
                                                    </Form.Item>
                                                    <Form.Item label="固定电话">
                                                       <Input value={this.state.form.teliprefix} placeholder="" onChange={this.onChange.bind(this, 'teliprefix')}></Input>
                                                    </Form.Item>
                                                </div>
                                                <div class="form_rt">
                                               
                                                    <Form.Item label="电子邮箱">
                                                       <Input value={this.state.form.email} placeholder="" onChange={this.onChange.bind(this, 'email')}></Input>
                                                    </Form.Item>
                                                     
                                                </div>
                                            </div>
                                        </Form>
                                  </Tabs.Pane>
                            </Tabs>
                        </div>

                </SupplePage>
                {/*卡片点击新增联系人*/}
                {this.state.isLookorAdd}
                <SupplePage style={{display:this.state.isAddParty === false ? "none" : "block"}}>
                    <NavBar
                        title={this.state.isLookorAdd===1?"关系人信息 ":"新增关系人"}
                        lName={"取消"}
                        rName={this.state.isLookorAdd===1?"删除":""}
                        lClick={() => this.setState({isAddParty:!this.state.isAddParty})}
                        rClick={() => this.setState({isAddParty:!this.state.isAddParty})}
                    >
                    </NavBar>
                    {/* <NavBar style={{display:this.state.isLookorAdd===2?"none":"block"}}
                        title={"关系人信息"}
                        lName={"取消"}
                        rName={"删除"}
                        lClick={() => this.setState({isAddParty:!this.state.isAddParty})}
                        rClick={() => this.setState({isAddParty:!this.state.isAddParty})}
                    >
                    </NavBar> */}
                    {/*新增关系人*/}
                    <div style={{height:window.innerHeight-this.getHeight(100), overflowY:"auto", overflowX:"hidden"}}>
                        <div class="main_contanier">
                            <TabTitle title="证件信息" class="tabTitle orangeTabTitle"/>
                            <div class="form_content">
                                <div class="three_box">
                                    <div class="three_child_lf">
                                        <Form labelPosition="left" model={this.state.form} labelWidth="80" onSubmit={this.onSubmit.bind(this)}>
                                            <Form.Item label="证件类型">
                                                <Radio.Group value={this.state.radio3} onChange={this.onChange.bind(this, 'radio3')}>
                                                    <Radio.Button style={{marginBottom:"0px"}} value="身份证" />
                                                </Radio.Group>
                                            </Form.Item>
                                            <Form.Item label="证件号码">
                                                <Input  size="small" value={this.state.form.name} onChange={this.onChange.bind(this, 'name')}></Input>
                                            </Form.Item>
                                            <Form.Item label="客户姓名">
                                                <Input  size="small" value={this.state.form.name} onChange={this.onChange.bind(this, 'name')}></Input>
                                            </Form.Item>
                                        </Form>
                                    </div>
                                    <div class="three_child_rt">
                                        <ul class="img_box">
                                            <li>
                                                <img src={require("./img/img.png")}  />
                                                <p>请上传身份证头像面</p>
                                            </li>
                                            <li>
                                                <img src={require("./img/img.png")}  />
                                                <p>请上传身份证头像面</p>
                                            </li>

                                        </ul>
                                    </div>
                                </div>
                                <div class="three_box_rt">
                                    <div>
                                        <input type="button" class="grayButton" value="联网核查"/>

                                    </div>
                                </div>
                            </div>
                            <TabTitle title="征信授权" class="tabTitle blueTabTitle"/>
                            <div class="form_content">
                                <div class="three_box">
                                    <div class="three_child_rt">
                                        <ul class="img_box">
                                            <li>
                                                <div class="camera_box"
                                                     onClick={() => {
                                                         // eslint-disable-next-line
                                                         mmspc.faceDetect.startLive(dataStr => {
                                                             this.setState({showFaceFinished: "block"});
                                                         }, errStr => {
                                                             this.setState({showFaceFailure: "block"});
                                                             this.setState({showIdentity: "block"});
                                                         });
                                                     }}
                                                >
                                                    <img src={require("../../images/face_recognition.png")}/>
                                                    <p style={{display: this.state.showFaceFinished}}>
                                                        <img src={require("../../images/finished.png")}/>
                                                    </p>
                                                    <p style={{display: this.state.showFaceFailure}}>
                                                        <img src={require("../../images/failure.png")}/>

                                                    </p>
                                                </div>
                                                <p>人脸识别认证</p>
                                            </li>
                                            <li style={{display: this.state.showIdentity}}>
                                                <div class="camera_box"
                                                     onClick={(this.state.showIdentityFinished == "block") ?
                                                         () => {
                                                             this.setState({showIdPhotoDialog: true})
                                                         }
                                                         :
                                                         () => {
                                                             // eslint-disable-next-line
                                                             navigator.camera.getPicture(successData => {
                                                                 idPhoto = "data:image/png;base64," + successData;
                                                                 document.getElementById("showIdPhoto").src = idPhoto;
                                                                 this.setState({showIdentityFinished: "block"});
                                                             }, errData => {
                                                                 alert("error");
                                                             }, {quality: 50, destinationType: 0});
                                                         }
                                                     }
                                                >
                                                    <img src={require("../../images/identity_authentication.png")}/>
                                                    <p style={{display: this.state.showIdentityFinished}}>
                                                        <img src={require("../../images/finished.png")}/>
                                                    </p>
                                                </div>
                                                <p>手持身份认证</p>
                                            </li>
                                            <li>
                                                <div class="camera_box"
                                                     onClick={
                                                         /* ((this.state.showFaceFinished == "block") || ((this.state.showFaceFailure == "block") && (this.state.showIdentityFinished == "block"))) == true ?
                                                             ( this.state.showCreditFinished == "none" ?
                                                                  () => this.setState({dialogVisible: true})
                                                                  :
                                                                  ( this.state.isShowPhotoSign == "write" ?
                                                                          () => this.setState({showPhotoSignDialog: true,isShowPhotoSign:"write"})
                                                                          :
                                                                          () => this.setState({showPhotoSignDialog: true,isShowPhotoSign:"photo"})
                                                                  )
                                                             )
                                                          :
                                                             () => alert("请先完成人脸识别或手持身份认证")*/
                                                         ( this.state.showCreditFinished == "none" ?
                                                                 () => this.setState({dialogVisible: true})
                                                                 :
                                                                 ( this.state.isShowPhotoSign == "write" ?
                                                                         () => this.setState({showPhotoSignDialog: true,isShowPhotoSign:"write"})
                                                                         :
                                                                         () => this.setState({showPhotoSignDialog: true,isShowPhotoSign:"photo"})
                                                                 )
                                                         )
                                                     }
                                                >
                                                    <img src={require("../../images/credit_authorizatio.png")}/>
                                                    <p style={{display: this.state.showCreditFinished}}>
                                                        <img src={require("../../images/finished.png")}/>
                                                    </p>
                                                </div>
                                                <p>签署征信授权书</p>
                                            </li>

                                        </ul>
                                        <div>
                                            <Dialog
                                                size="full"
                                                visible={this.state.dialogVisible}
                                                onCancel={() => this.setState({dialogVisible: false})}
                                                lockScroll={false}
                                                style={{background: "rgba(0,0,0,0.1)", textAlign: "center"}} /*透明*/
                                            >
                                                <Dialog.Body>
                                                    <div style={{width:380,display:'flex',justifyContent:'center', margin:'15% auto 0'}}>
                                        <span>
                                                <img class="whiteTabTitle" src={require("../../images/signature.png")}
                                                     width="100px" height="auto"
                                                     onClick={() => this.setState({isJump: !this.state.isJump,dialogVisible: false})
                                                         /* this.state.showCreditFinished == "none" ?
                                                         :
                                                          () => this.setState({showPhotoSignDialog: true,dialogVisible: false,isShowPhotoSign: "write"})*/
                                                     }
                                                />
                                                <p style={{color: "#FFFFFF"}}>电子手写签名</p>
                                            </span>
                                                        <span>
                                                <img class="whiteTabTitle" src={require("../../images/shoot.png")}
                                                     width="100px" height="auto"
                                                    /*判断是否已经纸质签名拍照，若已拍过，点击查看签名*/
                                                     onClick={() => {
                                                         // eslint-disable-next-line
                                                         navigator.camera.getPicture(successData => {
                                                             photoSign = "data:image/png;base64," + successData;
                                                             document.getElementById("showPhotoSign").src = photoSign;
                                                             this.setState({showCreditFinished: "block",dialogVisible: false, isShowPhotoSign:"photo"});
                                                         }, errData => {
                                                             alert("error");
                                                         }, {quality: 50,destinationType: 0});
                                                     }
                                                         /*this.state.showCreditFinished == "none" ?
                                                               :
                                                               () => {this.setState({showPhotoSignDialog: true,dialogVisible: false,isShowPhotoSign: "photo"})}*/
                                                     }
                                                />
                                                <p style={{color: "#FFFFFF"}}>纸质签名拍照</p>
                                            </span>
                                                    </div>
                                                    <img src={require("../../images/close_50.png")}
                                                         style={{flex:1,margin:'5% auto 0'}}
                                                         onClick={() => this.setState({dialogVisible: false})}
                                                    />
                                                </Dialog.Body>
                                            </Dialog>

                                        </div>
                                        {/* 弹出窗显示签名图片*/}
                                        <Dialog
                                            size="full"
                                            visible={this.state.showPhotoSignDialog}
                                            onCancel={() => this.setState({showPhotoSignDialog: false})}
                                            lockScroll={false}
                                            style={{background: "#000000", textAlign: "center"}}
                                        >
                                            <Dialog.Body>
                                             <span>{this.state.isShowPhotoSign == "write" ?
                                                 <img  src={pagePic} width="800px" height= "100%"/>
                                                 :
                                                 <img id="showPhotoSign" src={photoSign} width="800px" height="100%"/>
                                             }
                                            </span>
                                            </Dialog.Body>
                                        </Dialog>
                                        {/* 弹出窗显示手持身份拍照图片*/}
                                        <Dialog
                                            size="full"
                                            visible={this.state.showIdPhotoDialog}
                                            onCancel={() => this.setState({showIdPhotoDialog: !this.state.showIdPhotoDialog})}
                                            lockScroll={false}
                                            style={{background: "#000000", textAlign: "center"}}
                                        >
                                            <Dialog.Body>
                                             <span>
                                                 <img id="showIdPhoto" src={idPhoto} width="800px" height="100%"/>
                                            </span>
                                            </Dialog.Body>
                                        </Dialog>
                                    </div>
                                    <div class="three_box_rt">
                                        <div>{this.state.isShow === false ?
                                            <div>{(((this.state.showFaceFinished == "block") || ((this.state.showFaceFailure == "block") && (this.state.showIdentityFinished == "block"))) && (this.state.showCreditFinished == "block")) == false ?
                                                <div>
                                                    <Button  style={{height:70,width:70}}disabled={true} textStyle={{fontSize:18,lineHeight:1.3,whiteSpace:'normal'}}>征信查询</Button>
                                                </div>
                                                :
                                                <div>
                                                    <Button type="warning" style={{height:70,width:70}} textStyle={{fontSize:18,lineHeight:1.3,whiteSpace:'normal'}}
                                                            onClick={() => this.setState({showQuery: "block", isShow: true})}>
                                                        征信查询
                                                    </Button>
                                                </div>
                                            }
                                            </div>
                                            :
                                            <div>
                                                <img src={require("../../images/success_iocn.png")}
                                                     width="75%" height="75%"/>
                                                <p style={{color: "#00CD00"}}>核查通过</p>
                                            </div>

                                        }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <TabTitle title="征信报告" class="tabTitle greenTabTitle"/>
                            <div class="form_content">
                                <div class="three_box">
                                    <div class="three_child_rt">
                                        <ul class="img_box">
                                            <li>
                                                <div class="camera_box"  onClick={this.creditReport}>
                                                    <img src={require("../../images/credit_certificate.png")}/>
                                                    <p style={{display: this.state.showQuery}}>
                                                        <img src={require("../../images/yicahxun.png")}/>
                                                    </p>
                                                </div>
                                                <p>征信报告</p>
                                            </li>

                                            <li>
                                            </li>
                                            <li style={{display: this.state.showIdentity}}>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="three_box_rt">
                                    </div>

                                </div>
                            </div>
                            
            
                             <Tabs activeName="1" onTabClick={ (tab) => console.log(tab.props.name) }>
                                <Tabs.Pane label="基本信息" name="1">
                                    <Form labelPosition="left" model={this.state.form} labelWidth="120" onSubmit={this.onSubmit.bind(this)}>
                                    <div class="form_content_col">
                                        <ul class="form_content_row">
                                        <li class="form_lf">
                                                <Form.Item label="是否共同借款人">
                                                    <Radio.Group value={this.state.form.isrel} onChange={this.onChange.bind(this, 'isrel')}>
                                                        <Radio.Button style={{marginBottom:"0px"}} value="是" />
                                                        <Radio.Button style={{marginBottom:"0px"}} value="否" />
                                                    </Radio.Group>
                                                </Form.Item>
                                            </li>
                                            <li class="form_rt">
                                                <Form.Item label="关系人类型">
                                                    <Radio.Group value={this.state.form.reltype} onChange={this.onChange.bind(this, 'reltype')}>
                                                        <Radio.Button  value="夫" />
                                                        <Radio.Button  value="妻" />
                                                        <Radio.Button  value="子" />
                                                        <Radio.Button  value="女" />
                                                        <Radio.Button  value="父母" />
                                                        <Radio.Button  value="其他" />
                                                    </Radio.Group>
                                                </Form.Item>
                                            </li>
                                        
                                        </ul>

                                    
                                        <ul class="form_content_row">
                                            <li class="form_lf">
                                                <Form.Item label="文化程度">
                                                    <Radio.Group value={this.state.form.edulevel} onChange={this.onChange.bind(this, 'edulevel')} appendix="更多"
                                                    onAppendixClick={this.onEducateAppendClick.bind(this)}>
                                                        {
                                                            this.state.list.map(function(item,i){
                                                                return(
                                                                    i<showLength+1?
                                                                        <Radio.Button key={i} value={item} /> :''

                                                                )
                                                            })

                                                        }
                                                        <Radio.Button style={{marginBottom:"0px"}} value="更多" />
                                                    </Radio.Group>
                                                </Form.Item>
                                                <Dialog
                                                    size="small"
                                                    visible={ this.state.selectDialogVisible }
                                                    title='对话框'
                                                    // onCancel={ () => this.setState({ selectDialogVisible: false,types:this.state.types}) }
                                                    onCancel={ () => this.setState({ selectDialogVisible: false}) }
                                                    
                                                    lockScroll={ false }
                                                    className='mmpsc-select-list-dialog'
                                                >
                                                    <Dialog.Body>
                                                        <SelectList ref ="educationSL" 
                                                    visible={ this.state.selectDialogVisible }
                                                    value={this.state.form.edulevel} multiple={false} onChange={(val)=>{
                                                            this.removeByValue(this.state.list,val)
                                                            this.state.list.unshift(val)
                                                            this.onChange('edulevel',val)
                                                            this.setState({selectDialogVisible: false})
                                                            this.refs.educationSL.setState({selected:null});
                                                        }}>
                                                            {
                                                                this.state.list.map(function(item,i){
                                                                    return i>showLength? <SelectList.Option key={i} label={item} value={item} /> :''
                                                                })
                                                            }

                                                        </SelectList>
                                                    </Dialog.Body>
                                                </Dialog>

                                            </li>
                                            <li class="form_rt">
                                                <Form.Item label="婚姻状况">
                                                    <Radio.Group value={this.state.form.marrysta} onChange={this.onChange.bind(this, 'marrysta')}>
                                                        <Radio.Button  value="已婚" />
                                                        <Radio.Button  value="未婚" />
                                                        <Radio.Button  value="离异" />
                                                        <Radio.Button  value="丧偶" />
                                                        <Radio.Button  value="其他" />
                                                    </Radio.Group>
                                                </Form.Item>
                                            </li>
                                        </ul>
                                        <ul class="form_content_row">
                                            <li class="form_lf">
                                                <Form.Item label="手机号码">
                                                    <Input  size="small" value={this.state.form.mobno} placeholder="请输入手机号" onChange={this.onChange.bind(this, 'mobno')}></Input>
                                                </Form.Item>
                                            </li>
                                            <li class="form_rt">
                                                <Form.Item label="本人年税后收入">
                                                    <Input  size="small" value={this.state.form.myselfincpm}  placeholder="20万" onChange={this.onChange.bind(this, 'myselfincpm')}></Input>
                                                </Form.Item>
                                            </li>
                                            
                                        </ul>
                                        <ul class="form_content_row">
                                            <li class="form_lf">
                                                <Form.Item label="配偶年税后收入">
                                                    <Input  size="small" value={this.state.form.parincpm}  placeholder="配偶年税后收入" onChange={this.onChange.bind(this, 'parincpm')}></Input>
                                                </Form.Item>
                                            </li>
                                            <li class="form_rt">
                                            </li>
                                        </ul>
                                    </div>
                                </Form>
                                </Tabs.Pane>
                              </Tabs>
                        </div>
                        <div class="loan_footer">
                            <div class="footer_content" >
                                <div class="footer_content_lf">
                                    <Button plain={true} type="info" size="large"
                                           /* 信息补录时需要set一下isAddParty的状态，不然isInfoShow的状态改变不会立即渲染； 信息补录关闭时需要注意这种情况*/
                                            onClick={ () => this.setState({ isInfoShow:!this.state.isInfoShow,isAddParty:!this.state.isAddParty})}>信息补录</Button>
                                </div>
                                <div class="footer_content_rt">
                                    <Button type="warning" size="large" 
                                            onClick={() => this.setState({ isAddParty:!this.state.isAddParty})}>{this.state.isLookorAdd===1?"确认修改":"新增关系人"}</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </SupplePage>
                {/*电子签名授权书*/}
                <SupplePage  style={{display: this.state.isJump === false ? "none" : "block"}}>
                    <NavBar
                        title={"授权书"}
                        lName={"取消"}
                        rName={"确定"}
                        lClick={() => this.setState({isJump: !this.state.isJump})}
                        rClick={
                            () => html2canvas(  document.getElementById("signPage")).then(canvas => {
                                pagePic = canvas.toDataURL();
                                alert("保存成功");
                                this.setState({isJump: !this.state.isJump});

                            })
                        }>
                    </NavBar>
                    {/* 授权书页面*/}
                    <div  id="signPage" style={{height: window.innerHeight - this.getHeight(100), overflowY: "auto", overflowX: "hidden"}}>
                        <div style={{marginLeft: "10%", marginRight: "10%", background: "#FFFFFF", fontSize: "100%"}}>
                            {/*授权书*/}
                            <html lang="en">
                            <head>
                                <title>授权书</title>
                            </head>

                            <body>
                            {/*差样式的图片*/}
                            {/* <p><img class="whiteTabTitle" src={require("../../images/close.png")}
                                    width="30px" height="auto" style={{marginLeft: "90%", marginTop: "1%"}}
                                    onClick={() => this.setState({isJump: !this.state.isJump})}/></p>*/}

                            <h2 align="center">授&nbsp;&nbsp;&nbsp;&nbsp;权&nbsp;&nbsp;&nbsp;&nbsp;书</h2>

                            <p align="center">（个人征信业务）</p>

                            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>重要提示：</b></p>
                            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <b>尊敬的客户：为了维护您的权益，请在签署本授权书前，仔细阅读本授权书各条款（特别是黑体字条款），关注您在授权书中的权利、义务。如有任何疑问，请向经办行咨询。</b>
                            </p>
                            <p>中国农业银行股份有限公司：</p>
                            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 一、本人同意并不可撤销地授权：
                                <b>贵行（包括贵行各分支机构）按照国家相关规定采集并向金融信用信息基础数据库提供本人个人信息和包括信贷信息在内的信用信息，包含但不限于本人因未及时履行合同义务产生的不良信息。</b>
                            </p>
                            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 二、本人同意并不可撤销地授权：
                                <b>贵行（包括贵行各分支机构）根据国家有关规定，在办理涉及本人的业务时，有权通过金融信用信息基础数据库查询、打印、保存、使用符合相关规定的本人信用报告、个人信息和包括信贷信息在内的信用信息，并用于以下用途：</b>
                            </p>
                            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                □1.审核本人授信业务或用信申请，进行贷后风险管理。
                            </p>
                            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                □ 2.审核本人为他人（含自然人、法人、其他组织）提供担保，进行贷后等风险管理。
                            </p>
                            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                □ 3.审核本人担任法定代表人、负责人或出资人的法人或其他组织（或该法人、其他组织作为担保人）的授信和用信申请，进行相关风险管理。
                            </p>
                            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                □ 4.审核本人担任法定代表人、负责人或出资人的法人、商户或其他组织的特约商户开户申请，进行相关风险管理。
                            </p>
                            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                □ 5.用于 业务。
                            </p>
                            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <b>三、如果贵行超出本授权范围进行查询使用，则贵行应承担与此相关的法律责任。</b>
                            </p>
                            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <b>四、若相关业务未获批准办理，本人同意本授权书及本人信用报告等资料由贵行留存，无须退还。</b>
                            </p>
                            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <b>五、本授权书有效期自签署之日起至本人约定用途的授信到期或业务结清之日止。</b>
                            </p>
                            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <b>授权人声明：贵行已依法向本人提示了相关条款（特别是黑体字条款），应本人要求对相关条款的概念、内容及法律效果做了说明，本人已经知悉并理解上述条款。</b>
                            </p>
                            <div class="authorization_content">
                                <div>
                                    授权人（签字）：
                                    <p>
                                        <img id="signature" src={sign} width="140px" height="70px"
                                             onClick={() => {
                                                 // eslint-disable-next-line
                                                 mmspc.abcDevice.initDevice();
                                                 // eslint-disable-next-line
                                                 mmspc.abcDevice.openSignature(600, 400, json => {
                                                     this.setState({signDialog: true})
                                                 }, errorData => {
                                                     alert("errorData：" + JSON.stringify(errorData));
                                                 });
                                             }}/>
                                    </p>
                                </div>
                            </div>
                            <div class="authorization_content">
                                <div>
                                    曾用名（签字）：
                                    <p>
                                        <img id="usedNameSign" src={usedName} width="140px" height="70px"
                                             onClick={() => {
                                                 // eslint-disable-next-line
                                                 mmspc.abcDevice.initDevice();
                                                 // eslint-disable-next-line
                                                 mmspc.abcDevice.openSignature(600, 400, json => {
                                                     this.setState({usedNameDialog: true})
                                                 }, errorData => {
                                                     alert("errorData：" + JSON.stringify(errorData));
                                                 });
                                             }}/>
                                    </p>
                                </div>
                            </div>
                            <p>证件名称：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; □ 居民身份证 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; □
                                其他 </p>
                            <p>证件号码：</p>
                            </body>
                            </html>
                            {/* 授权人签名*/}
                            <div>
                                <Dialog
                                    title="请手写签名"
                                    size="small"
                                    visible={this.state.signDialog}
                                    onCancel={() => {
                                        // eslint-disable-next-line
                                        mmspc.abcDevice.closeSignature(json => {
                                            this.setState({signDialog: false})
                                        }, error => {
                                            alert("error：" + JSON.stringify(error));
                                        });
                                    }}
                                    lockScroll={false}
                                    style={{textAlign: "center"}}
                                >
                                    <Dialog.Body style={{height: "200px"}}>
                                        <span>假装有一个授权人签名</span>
                                    </Dialog.Body>
                                    <Dialog.Footer className="dialog-footer">
                                        <Button style={{float: "left"}}
                                                onClick={() => {
                                                    // eslint-disable-next-line
                                                    mmspc.abcDevice.clearSignature(json => {
                                                    }, error => {
                                                        alert("error：" + JSON.stringify(error));
                                                    });
                                                }}>
                                            清除签名
                                        </Button>
                                        <Button style={{float: "right"}} type="primary"
                                                onClick={() => {
                                                    // eslint-disable-next-line
                                                    mmspc.abcDevice.getSignaturePhoto(json => {
                                                        // eslint-disable-next-line
                                                        sign = "data:image/jpeg;base64," + json.data;
                                                        document.getElementById("signature").src = sign;
                                                        this.setState({showCreditFinished: "block",isShowPhotoSign:"write"});
                                                    }, error => {
                                                        alert("error：" + JSON.stringify(error));
                                                    });
                                                    // eslint-disable-next-line
                                                    mmspc.abcDevice.closeSignature(json => {
                                                        this.setState({signDialog: false})
                                                    }, error => {
                                                        alert("error：" + JSON.stringify(error));
                                                    });
                                                }}>
                                            确定签名
                                        </Button>
                                    </Dialog.Footer>
                                </Dialog>
                            </div>
                            {/* 曾用名签名*/}
                            <div>
                                <Dialog
                                    title="请手写签名"
                                    size="small"
                                    visible={this.state.usedNameDialog}
                                    onCancel={() => {
                                        // eslint-disable-next-line
                                        mmspc.abcDevice.closeSignature(json => {
                                            this.setState({usedNameDialog: false})
                                        }, error => {
                                            alert("error：" + JSON.stringify(error));
                                        });
                                    }}
                                    lockScroll={false}
                                    style={{textAlign: "center"}}
                                    showClose={true}
                                >
                                    <Dialog.Body style={{height: "200px"}}>
                                        <span>假装有一个曾用名签名</span>
                                    </Dialog.Body>
                                    <Dialog.Footer className="dialog-footer">
                                        <Button style={{float: "left"}} onClick={() => {
                                            // eslint-disable-next-line
                                            mmspc.abcDevice.clearSignature(json => {
                                            }, error => {
                                                alert("error：" + JSON.stringify(error));
                                            });
                                        }}>
                                            清除签名
                                        </Button>
                                        <Button style={{float: "right"}} type="primary" onClick={() => {
                                            // eslint-disable-next-line
                                            mmspc.abcDevice.getSignaturePhoto(json => {
                                                // eslint-disable-next-line
                                                usedName = "data:image/jpeg;base64," + json.data;
                                                document.getElementById("usedNameSign").src = usedName;
                                                this.setState({isShowPhotoSign:"write"});
                                            }, error => {
                                                alert("error：" + JSON.stringify(error));
                                            });
                                            // eslint-disable-next-line
                                            mmspc.abcDevice.closeSignature(json => {
                                                this.setState({usedNameDialog: false});
                                            }, error => {
                                                alert("error：" + JSON.stringify(error));
                                            });
                                        }}>
                                            确定签名
                                        </Button>
                                    </Dialog.Footer>
                                </Dialog>
                            </div>
                        </div>
                    </div>
                </SupplePage>
            </div>  


        )
    }
}
Party.contextTypes = {
    jumpTo: PropTypes.func,
    getListValue:PropTypes.func
};
export default connect (mapStateToProps,mapDispatchToProps)(Party); 