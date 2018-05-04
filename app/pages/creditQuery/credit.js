import React from 'react';
import html2canvas from 'html2canvas';
import {Component}from '../../components/libs';
import * as homeActions from '../../actions/home';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {Map} from 'immutable';
import {Link}  from 'react-router-dom';
import {Button,Dialog,TabTitle,Header,SupplePage,NavBar} from '../../components/index';
import '../publicCss/public.css';
import PropTypes from 'prop-types';



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
class Credit extends Component{

	constructor(props){
		super(props);
		this.state={
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
            showIdPhotoDialog:false
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

    setComplete(cur){
	    let value = this.context.getListValue();
	    value[cur] = 2;
	    return value;
    }



	render(){
        return (
            <div style={{height: window.innerHeight - this.getHeight(100),overflow:"auto"}}>
                <div class="main_contanier">
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
                                             /*   ( this.state.showCreditFinished == "none" ?
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
                                        <div class="camera_box" onClick={this.creditReport}>
                                            <img src={require("../../images/credit_certificate.png")}/>
                                            <p style={{display: this.state.showQuery}}>
                                                <img src={require("../../images/yicahxun.png")}/>
                                            </p>
                                        </div>
                                        <p>征信报告</p>
                                    </li>

                                    <li>
                                        <div class="camera_box">
                                            <img src={require("../../images/customer_level_no.png")}/>
                                            <p>
                                            </p>
                                        </div>
                                        <p>客户级别</p>
                                    </li>
                                    <li style={{display: this.state.showIdentity}}>
                                    </li>
                                </ul>
                            </div>
                            <div class="three_box_rt">
                            </div>

                        </div>
                    </div>
                </div>
                <div class="loan_footer">
                    <div class="footer_content">
                        {/* 下一步按钮是否可以点击，当征信查询后，在可以点击下一步按钮*/}
                        <div class="footer_content_rt">
                          {/*} {this.state.isShow === false ?
                            <Button style={{background: "#999999", color: "#fff", borderColor: "#999999"}}
                                    size="large">
                                下一步
                            </Button>
                            :*/}
                            <Button type="warning" size="large"
                                onClick={() => {this.context.jumpTo(2, this.setComplete.bind(this)(1))}}>
                                下一步
                            </Button>

                        }
                           {/*<Button type="warning" size="large"
                                    onClick={() => {
                                        this.context.jumpTo(2, this.setComplete.bind(this)(1))
                                    }}>
                                下一步
                            </Button>*/}
                        </div>
                    </div>
                </div>
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
        );

    }
}

Credit.contextTypes = {
    jumpTo: PropTypes.func,
    getListValue:PropTypes.func
};

export default connect (mapStateToProps,mapDispatchToProps)(Credit);