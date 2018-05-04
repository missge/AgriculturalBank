import React from 'react';
import {Component,unshiftArrs}from '../../components/libs';
import html2canvas from 'html2canvas';
import * as homeActions from '../../actions/home';
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
let that = this ;
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

const actions = [
  homeActions
];
function mapStateToProps(state) {
  const {home}=state;
  return {
    home
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
/*@connect(
        state => ({...state.home}),
    dispatch => bindActionCreators({showIdCard}, dispatch)
)*/
class Party extends Component{
	constructor(props){
		super(props);
		this.state={
			form:{
				name: '',
		        region: '',
		        date1: null,
		        date2: null,
		        delivery: false,
		        type: [],
		        resource: '',
		        desc: ''
			},
            isInfoShow:false,
            isAddParty:false,
            isAddPartyShow:false,
            types:'本科',
            selectDialogVisible:false,
            list:['本科','硕士','博士','大专','高中','中专','初中'],
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
            typeRadio:'',
            jsRadio:'',
            hyRadio:'',
            phone:'',
            income:'',
            country :'',
            sexRadio :'',
            birthDay :'',
            manageRadio :'',
            liveRadio :'',
            year :'',
            address :'',
            idType :'',
            isVaild :'',
            deadline :'',
            isLocal :'',
            isLoaclRadio  :'',
            isNH  :'',
            isSR  :'',
            isTogether  :'',
            longAttr :'',

		}
	}
	onSubmit(e) {
	    e.preventDefault();
	}

	onChange(key, value) {
	    this.state.form[key] = value;
	    this.forceUpdate();
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
        unshiftArrs(this.state.list,this.state.types,(data)=>{
           this.setState({types:data})
           this.refs.educationSL.setState({selected:null})},showLength
        )
    }
    onChange(key, value) {
        this.setState({
            [key]: value,
        });
    }
    onEducateAppendClick(){
        this.setState({selectDialogVisible:true});
    }

    setComplete(cur){
        let value = this.context.getListValue();
        value[cur] = 2;
        return value;
    }

	render(){
		return(
			<div style={{height:window.innerHeight-this.getHeight(100)}}>
                <div id="party" class="showTab1" style={{display:this.state.isAddPartyShow === false ? "block" : "none"}}>
                    <div class="main_contanier">
                        <TabTitle title="证件信息" class="tabTitle orangeTabTitle"/>
                        <div class="form_content">
                                <div class="three_box">
                                    <div class="three_child_lf">
                                        <Form labelPosition="left" model={this.state.form} labelWidth="80" onSubmit={this.onSubmit.bind(this)}>
                                            <Form.Item label="证件类型">
                                                <Radio.Group value={this.state.radio3} onChange={this.onChange.bind(this, 'radio3')}>
                                                    <Radio.Button value="身份证" />
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
                        <TabTitle title="基本信息" class="tabTitle grayTabTitle"/>
                        <Form labelPosition="left" model={this.state.form} labelWidth="120" onSubmit={this.onSubmit.bind(this)}>
                                <div class="form_content_col">
                                    <ul class="form_content_row">
                                        <li class="form_lf">
                                            <Form.Item label="关系人类型">
                                                <Radio.Group value={this.state.typeRadio} onChange={this.onChange.bind(this, 'typeRadio')}>
                                                    <Radio.Button value="配偶" />
                                                    <Radio.Button value="子女" />
                                                    <Radio.Button value="父母" />
                                                    <Radio.Button value="祖父母" />
                                                    <Radio.Button value="兄弟姐妹" />
                                                    <Radio.Button value="更多" />

                                                </Radio.Group>
                                            </Form.Item>
                                        </li>
                                        <li class="form_rt">
                                            <Form.Item label="关系人角色">
                                                <Radio.Group value={this.state.jsRadio} onChange={this.onChange.bind(this, 'jsRadio')}>
                                                    <Radio.Button value="借款人配偶" />
                                                    <Radio.Button value="共同借款人" />
                                                    <Radio.Button value="待定" />
                                                </Radio.Group>
                                            </Form.Item>
                                        </li>
                                    </ul>

                                    <Dialog
                                        size="small"
                                        visible={ this.state.selectDialogVisible }
                                        title='对话框'
                                        onCancel={ () => this.setState({ selectDialogVisible: false,types:this.state.types}) }
                                        lockScroll={ false }
                                        className='mmpsc-select-list-dialog'
                                    >
                                        <Dialog.Body>
                                            <SelectList ref ="educationSL" 
                                        visible={ this.state.selectDialogVisible }
                                        value={this.state.types} multiple={false} onChange={(val)=>{
                                                this.removeByValue(this.state.list,val)
                                                this.state.list.unshift(val)
                                                this.setState({selectDialogVisible: false,types:val})
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

                                    <ul class="form_content_row">
                                        <li class="form_lf">
                                            <Form.Item label="文化程度">
                                                <Radio.Group value={this.state.types} onChange={this.onChange.bind(this, 'types')} appendix="更多"
                                                onAppendixClick={this.onEducateAppendClick.bind(this)}>
                                                    {
                                                        this.state.list.map(function(item,i){
                                                            return(
                                                                i<showLength+1?
                                                                    <Radio.Button key={i} value={item} /> :''

                                                            )
                                                        })

                                                    }
                                                    <Radio.Button value="更多" />
                                                </Radio.Group>
                                            </Form.Item>
                                        </li>
                                        <li class="form_rt">
                                            <Form.Item label="婚姻状况">
                                                <Radio.Group value={this.state.hyRadio} onChange={this.onChange.bind(this, 'hyRadio')}>
                                                    <Radio.Button value="已婚" />
                                                    <Radio.Button value="未婚" />
                                                    <Radio.Button value="离异" />
                                                    <Radio.Button value="丧偶" />
                                                    <Radio.Button value="其他" />
                                                </Radio.Group>
                                            </Form.Item>
                                        </li>
                                    </ul>
                                    <ul class="form_content_row">
                                        <li class="form_lf">
                                            <Form.Item label="手机号码">
                                                <Input  size="small" value={this.state.phone} onChange={this.onChange.bind(this, 'phone')}></Input>
                                            </Form.Item>
                                        </li>
                                        <li class="form_rt">
                                            <Form.Item label="本人年税后收入">
                                                <Input  size="small" value={this.state.income} onChange={this.onChange.bind(this, 'income')}></Input>
                                            </Form.Item>
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
                                    <Button type="warning" size="large"
                                            onClick={() => this.setState({ isAddPartyShow:!this.state.isAddPartyShow})}>新增关系人</Button>
                                </div>
                            </div>
                        </div>
                 </div>
                <div id="addParty"  style={{display:this.state.isAddPartyShow === false ? "none" : "block"}}>
                    <div class="main_contanier scrollauto">
                        <TabTitle title="关系人信息" class="tabTitle blueTabTitle"/>
                        <div class="form_content">
                            <ul class="addParty_box">
                                <li>
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
                                            onClick={() => {this.setState({isAddParty:!this.state.isAddParty})}}
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
						<div class="main_contanier">
							<Tabs activeName="1" onTabClick={(tab) => console.log(tab.props.name) }>
	                            <Tabs.Pane label="基本信息" name="1">
									<Form labelPosition="left"  model={this.state.form} labelWidth="170" onSubmit={this.onSubmit.bind(this)}>
			                               <div class="form_content">
			                                    <div class="form_lf">
			                                        <Form.Item label="国家">
			                                           <Input value={this.state.country} onChange={this.onChange.bind(this, 'country')}></Input>
			                                        </Form.Item>
				                                    <Form.Item label="性别">
				                                         <Radio.Group value={this.state.sexRadio} onChange={this.onChange.bind(this, 'sexRadio')}>
				                                            <Radio.Button value="女" />
				                                            <Radio.Button value="男" />
				                                        </Radio.Group>
				                                    </Form.Item>
			                                          <Form.Item label="出生日期">
			                                           <Input value={this.state.birthDay} onChange={this.onChange.bind(this, 'birthDay')}></Input>
			                                        </Form.Item>
				                                    <Form.Item label="职业经营类别">
					                                     <Radio.Group value={this.state.manageRadio} onChange={this.onChange.bind(this, 'manageRadio')}>
					                                        <Radio.Button value="工薪供职" />
					                                        <Radio.Button value="个体私营" />
					                                        <Radio.Button value="农业经营" />
					                                        <Radio.Button value="学生" />
					                                    </Radio.Group>
				                                    </Form.Item>
				                                    <Form.Item label="居住状况">
				                                         <Radio.Group value={this.state.liveRadio} onChange={this.onChange.bind(this, 'liveRadio')}>
				                                            <Radio.Button value="父母同住" />
				                                            <Radio.Button value="集体宿舍" />
				                                            <Radio.Button value="租住" />
				                                            <Radio.Button value="共有住宅" />
				                                            <Radio.Button value="其他" />
				                                            <Radio.Button value="更多" />
				                                        </Radio.Group>
				                                    </Form.Item>
			                                        <Form.Item label="本地居住年限">
			                                           <Input value={this.state.year} onChange={this.onChange.bind(this, 'year')}></Input>
			                                        </Form.Item>
			                                        <Form.Item label="长期居住地地址">
			                                           <Input value={this.state.address} onChange={this.onChange.bind(this, 'address')}></Input>
			                                        </Form.Item>
			                                    </div>
			                                    <div class="form_rt">
			                                  		<Form.Item label="证件类型">
			                                           <Input value={this.state.idType} onChange={this.onChange.bind(this, 'idType')}></Input>
			                                        </Form.Item>
			                                        <Form.Item label="是否长期有效">
			                                             <Radio.Group value={this.state.isVaild} onChange={this.onChange.bind(this, 'isVaild')}>
			                                                <Radio.Button value="是" />
			                                                <Radio.Button value="否" />
			                                            </Radio.Group>
			                                        </Form.Item>
			                                        <Form.Item label="证件有效终止日">
			                                           <Input value={this.state.deadline} onChange={this.onChange.bind(this, 'deadline')}></Input>
			                                        </Form.Item>
			                                        <Form.Item label="是否本地常住户口">
			                                             <Radio.Group value={this.state.isLocal} onChange={this.onChange.bind(this, 'isLocal')}>
			                                                <Radio.Button value="是" />
			                                                <Radio.Button value="否" />
			                                            </Radio.Group>
			                                        </Form.Item>
			                                        <Form.Item label="是否本地户籍">
			                                         <Radio.Group value={this.state.isLoaclRadio} onChange={this.onChange.bind(this, 'isLoaclRadio')}>
			                                            <Radio.Button value="是" />
			                                            <Radio.Button value="否" />
			                                        </Radio.Group>
				                                    </Form.Item>
			                                         <Form.Item label="是否农行员工">
			                                             <Radio.Group value={this.state.isNH} onChange={this.onChange.bind(this, 'isNH')}>
			                                                <Radio.Button value="是" />
			                                                <Radio.Button value="否" />
			                                            </Radio.Group>
			                                        </Form.Item>
			                                        <Form.Item label="是否私人银行客户">
			                                             <Radio.Group value={this.state.isSR} onChange={this.onChange.bind(this, 'isSR')}>
			                                                <Radio.Button value="是" />
			                                                <Radio.Button value="否" />
			                                            </Radio.Group>
			                                        </Form.Item>
			                                        <Form.Item label="是否有共同借款人">
			                                             <Radio.Group value={this.state.isTogether} onChange={this.onChange.bind(this, 'isTogether')}>
			                                                <Radio.Button value="是" />
			                                                <Radio.Button value="否" />
			                                            </Radio.Group>
			                                        </Form.Item>
			                                 		<Form.Item label="长期居住地城乡属性">
			                                           <Input value={this.state.longAttr} onChange={this.onChange.bind(this, 'longAttr')}></Input>
			                                        </Form.Item>

			                                    </div>
			                                </div>
			                        </Form>
			                    </Tabs.Pane>
			                </Tabs>
			            </div>
					</div>
				</SupplePage>
                {/*卡片点击新增联系人*/}
				<SupplePage style={{display:this.state.isAddParty === false ? "none" : "block"}}>
                    <NavBar
                        title={"新增关系人"}
                        lName={"取消"}
                        rName={"确定"}
                        lClick={() => this.setState({isAddParty:!this.state.isAddParty})}
                        rClick={() => this.setState({isAddParty:!this.state.isAddParty})}
                    >
                    </NavBar>
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
                                                    <Radio.Button value="身份证" />
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
                            <TabTitle title="基本信息" class="tabTitle grayTabTitle"/>
                            <Form labelPosition="left" model={this.state.form} labelWidth="120" onSubmit={this.onSubmit.bind(this)}>
                                <div class="form_content_col">
                                    <ul class="form_content_row">
                                        <li class="form_lf">
                                            <Form.Item label="关系人类型">
                                                <Radio.Group value={this.state.typeRadio} onChange={this.onChange.bind(this, 'typeRadio')}>
                                                    <Radio.Button value="配偶" />
                                                    <Radio.Button value="子女" />
                                                    <Radio.Button value="父母" />
                                                    <Radio.Button value="祖父母" />
                                                    <Radio.Button value="兄弟姐妹" />
                                                    <Radio.Button value="更多" />

                                                </Radio.Group>
                                            </Form.Item>
                                        </li>
                                        <li class="form_rt">
                                            <Form.Item label="关系人角色">
                                                <Radio.Group value={this.state.jsRadio} onChange={this.onChange.bind(this, 'jsRadio')}>
                                                    <Radio.Button value="借款人配偶" />
                                                    <Radio.Button value="共同借款人" />
                                                    <Radio.Button value="待定" />
                                                </Radio.Group>
                                            </Form.Item>
                                        </li>
                                    </ul>

                                    <Dialog
                                        size="small"
                                        visible={ this.state.selectDialogVisible }
                                        title='对话框'
                                        onCancel={ () => this.setState({ selectDialogVisible: false,types:this.state.types}) }
                                        lockScroll={ false }
                                        className='mmpsc-select-list-dialog'
                                    >
                                        <Dialog.Body>
                                            <SelectList ref ="educationSL"
                                                        visible={ this.state.selectDialogVisible }
                                                        value={this.state.types} multiple={false} onChange={(val)=>{
                                                this.removeByValue(this.state.list,val)
                                                this.state.list.unshift(val)
                                                this.setState({selectDialogVisible: false,types:val})
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

                                    <ul class="form_content_row">
                                        <li class="form_lf">
                                            <Form.Item label="文化程度">
                                                <Radio.Group value={this.state.types} onChange={this.onChange.bind(this, 'types')} appendix="更多"
                                                             onAppendixClick={this.onEducateAppendClick.bind(this)}>
                                                    {
                                                        this.state.list.map(function(item,i){
                                                            return(
                                                                i<showLength+1?
                                                                    <Radio.Button key={i} value={item} /> :''

                                                            )
                                                        })

                                                    }
                                                    <Radio.Button value="更多" />
                                                </Radio.Group>
                                            </Form.Item>
                                        </li>
                                        <li class="form_rt">
                                            <Form.Item label="婚姻状况">
                                                <Radio.Group value={this.state.hyRadio} onChange={this.onChange.bind(this, 'hyRadio')}>
                                                    <Radio.Button value="已婚" />
                                                    <Radio.Button value="未婚" />
                                                    <Radio.Button value="离异" />
                                                    <Radio.Button value="丧偶" />
                                                    <Radio.Button value="其他" />
                                                </Radio.Group>
                                            </Form.Item>
                                        </li>
                                    </ul>
                                    <ul class="form_content_row">
                                        <li class="form_lf">
                                            <Form.Item label="手机号码">
                                                <Input  size="small" value={this.state.phone} onChange={this.onChange.bind(this, 'phone')}></Input>
                                            </Form.Item>
                                        </li>
                                        <li class="form_rt">
                                            <Form.Item label="本人年税后收入">
                                                <Input  size="small" value={this.state.income} onChange={this.onChange.bind(this, 'income')}></Input>
                                            </Form.Item>
                                        </li>
                                    </ul>
                                </div>
                            </Form>
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
                                            onClick={() => this.setState({ isAddParty:!this.state.isAddParty})}>新增关系人</Button>
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