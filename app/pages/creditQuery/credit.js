import React from 'react';
import html2canvas from 'html2canvas';
import {Component} from '../../components/libs';
import * as creditActions from '../../actions/credit';
import * as homeActions from '../../actions/home';
import * as fileActions from '../../actions/file';
import * as loginActions from '../../actions/login';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Map} from 'immutable';
import {Link} from 'react-router-dom';
import {Button, Dialog, TabTitle, Header, SupplePage, NavBar, Loading, ImageViewer, Tabs} from '../../components/index';
import '../publicCss/public.css';
import PropTypes from 'prop-types';
import {loading} from "../../actions/login";


var that = "";

// 授权人签名/
var sign = "";
/*曾用名签名*/
var usedName = "";
/*纸质拍照签名*/
var photoPic = "";
/*手持身份拍照图片*/
var idPhoto = "";
/*授权书页面截图*/
var pagePic = "";

const actions = [
    creditActions, homeActions, fileActions, loginActions
];

function mapStateToProps(state) {
    const {credit} = state;
    const {home} = state;
    const {client} = state;
    return {
        credit, home, client
    };
}

function mapDispatchToProps(dispatch) {
    const creators = Map()
        .merge(...actions)
        .filter(value => typeof value === 'function')
        .toObject();
    return {
        creditActions: bindActionCreators(creators, dispatch)

    };
}


/*@connect(
        state => ({...state.home}),
    dispatch => bindActionCreators({showIdCard}, dispatch)
)*/
class Credit extends Component {

    componentDidMount() {
        that = this;
    }

    constructor(props) {
        super(props);

        this.state = {
            containerHeight: window.innerHeight - this.getHeight(100),
            /*签署征信授权书，弹出电子签名或拍照*/
            dialogVisible: false,
            /* 授权人签名弹出窗*/
            signDialog: false,
            /* 曾用名签名弹出窗*/
            usedNameDialog: false,
            /* w网页签名页面弹出窗*/
            pageSignDialog: false,
            /* 征信查询按钮与绿色勾号图片显示*/
            isShow: false,
            /* 打开授权书页面*/
            isJump: false,
            /* 手持身份认证*/
            showIdentity: "none",
            showFaceFinished: "none",
            showFaceFailure: "none",
            showIdentityFinished: "none",
            showCreditFinished: "none",
            /* 征信查询*/
            showQuery: "none",

            /* 展示征信查询报告*/
            isShowReport: false,

            /* 弹出窗显示签名图片*/
            showPhotoSignDialog: false,
            /* 判断显示电子签名还是拍照签名的图片*/
            isShowPhotoSign: "",
            /* 弹出窗显示手持身份认证的图片*/
            showIdPhotoDialog: false,
            photoSign: {
                imageBase64: "",
                oprId: "",
                pageId: "",
                pageName: "纸质拍照签名",
                pageType: "png",
            },
            pageSign: {
                imageBase64: "",
                oprId: "",
                pageId: "",
                pageName: "授权书页面截图",
                pageType: "png",
            },
        }

    }

    onSubmit(e) {
        e.preventDefault();
    }

    onChange(key, value) {
        this.state.form[key] = value;
        this.forceUpdate();
    }

    creditReport() {
        const w = window.open('about:blank');
        w.location.href = 'http://localhost:3000/#/'
    }

    setComplete(cur) {
        let value = this.context.getListValue();
        value[cur] = 2;
        return value;
    }

    showImageViewer(src, onRetake, onDelete) {
        ImageViewer.show(src, {showActionButtons: false}).then((action) => {
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

    clearCreditInfo() {
        /*1、props里面的暂时没有重置，征信查询成功后的状态
        * 2、已拍的照片不需要清空，状态重置后，预览不了，只能重拍。*/
        this.setState({
            /*签署征信授权书，弹出电子签名或拍照*/
            dialogVisible: false,
            /* 授权人签名弹出窗*/
            signDialog: false,
            /* 曾用名签名弹出窗*/
            usedNameDialog: false,
            /* w网页签名页面弹出窗*/
            pageSignDialog: false,
            /* 征信查询按钮与绿色勾号图片显示*/
            isShow: false,
            /* 打开授权书页面*/
            isJump: false,
            /* 手持身份认证*/
            showIdentity: "none",
            showFaceFinished: "none",
            showFaceFailure: "none",
            showIdentityFinished: "none",
            showCreditFinished: "none",
            /* 征信查询*/
            showQuery: "none",
            /* 展示征信查询报告*/
            isShowReport: false,
            /* 弹出窗显示签名图片*/
            showPhotoSignDialog: false,
            /* 判断显示电子签名还是拍照签名的图片*/
            isShowPhotoSign: "",
            /* 弹出窗显示手持身份认证的图片*/
            showIdPhotoDialog: false,
        });
        //重置props征信信息为空
        this.props.creditActions.clearPropsCredit();
    }

    render() {
        return <div style={{height: this.state.containerHeight}}>
            <div style={{overflow: "auto", height: "100%"}}>
                <div class="main_contanier">
                    <div>
                        {
                            this.props.home.pageSelected == 1
                        }
                    </div>
                    <TabTitle title="征信授权" class="tabTitle blueTabTitle"/>
                    <div class="form_content">
                        <div class="three_box">
                            <div class="three_child_rt">
                                <ul class="img_box">
                                    <li>
                                        <div class="camera_bigBox"
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
                                        <div class="camera_bigBox"
                                             onClick={() => {
                                                 if (this.state.showIdentityFinished == "none") {
                                                     // eslint-disable-next-line
                                                     mmspc.customCamera.openRectCamera(successData => {
                                                         idPhoto = "data:image/png;base64," + successData;
                                                         this.setState({showIdentityFinished: "block"});
                                                     }, errorData => {
                                                         // eslint-disable-next-line
                                                         mmspc.dialog.toast("手持身份认证失败！");
                                                     }, '/借款人影像/手持身份认证/010102002.jpg');
                                                 } else {
                                                     this.showImageViewer(idPhoto, () => {

                                                     }, () => {

                                                     });
                                                 }
                                             }
                                                 /*弹窗显示手持身份认证的照片*/
                                                 /*(this.state.showIdentityFinished == "block") ?
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
                                                 }*/
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
                                        <div class="camera_bigBox"
                                             onClick={
                                                 () => {
                                                     if (((this.state.showFaceFinished == "block") || ((this.state.showFaceFailure == "block") && (this.state.showIdentityFinished == "block")))) {
                                                         if (this.state.showCreditFinished == 'none') {
                                                             this.setState({dialogVisible: true});
                                                         } else if (this.state.isShowPhotoSign == "write") {
                                                             this.setState({isShowPhotoSign: "write"});
                                                             this.showImageViewer(pagePic, () => {

                                                             }, () => {

                                                             });

                                                         } else {
                                                             this.setState({isShowPhotoSign: "photo"});
                                                             this.showImageViewer(photoPic, () => {
                                                             }, () => {
                                                             });
                                                         }
                                                     } else {
                                                         // eslint-disable-next-line
                                                         mmspc.dialog.toast("请先完成人脸识别认证或手持身份认证！");
                                                     }
                                                 }
                                                 /* ((this.state.showFaceFinished == "block") || ((this.state.showFaceFailure == "block") && (this.state.showIdentityFinished == "block"))) == true ?
                                                                 (this.state.showCreditFinished == "none" ?
                                                                         () => this.setState({dialogVisible: true})
                                                                         :
                                                                         (this.state.isShowPhotoSign == "write" ?
                                                                                 () => this.setState({
                                                                                     showPhotoSignDialog: true,
                                                                                     isShowPhotoSign: "write"
                                                                                 })
                                                                                 :
                                                                                 () => this.setState({
                                                                                     showPhotoSignDialog: true,
                                                                                     isShowPhotoSign: "photo"
                                                                                 })
                                                                         )
                                                                 )
                                                                 :
                                                                 () => alert("请先完成人脸识别或手持身份认证")*/
                                                 /*  (this.state.showCreditFinished == "none" ?
                                                           () => this.setState({dialogVisible: true})
                                                           :
                                                           (this.state.isShowPhotoSign == "write" ?
                                                                   () => this.setState({
                                                                       showPhotoSignDialog: true,
                                                                       isShowPhotoSign: "write"
                                                                   })
                                                                   :
                                                                   () => this.setState({
                                                                       showPhotoSignDialog: true,
                                                                       isShowPhotoSign: "photo"
                                                                   })
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
                                            <div style={{
                                                width: 380,
                                                display: 'flex',
                                                justifyContent: 'center',
                                                margin: '15% auto 0'
                                            }}>
									    <span>
                                                <img class="lWhiteTabTitle" src={require("../../images/signature.png")}
                                                     width="100px" height="auto"
                                                     onClick={() => {
                                                         // eslint-disable-next-line
                                                         mmspc.fileConversion.getAuthorizationLetter(msg => {
                                                             //           this.props.creditActions.loading(true);
                                                             pagePic = "data:image/png;base64," + msg;
                                                             this.state.pageSign.imageBase64 = msg;
                                                             this.setState({dialogVisible: false});
                                                             //上传图片
                                                             this.props.creditActions.uploadFile("{\"fileDesp\":\"征信查询授权书\",\"groupId\":\"010102\",\"workId\":\"" + this.props.client.procsId + "\",\"uploadPageList\":[" + JSON.stringify(this.state.pageSign) + "]}",
                                                                 (successData) => {
                                                                     this.setState({
                                                                         showCreditFinished: "block",
                                                                         isShowPhotoSign: "write"
                                                                     });
                                                                     this.props.creditActions.loading(false);
                                                                 }, () => {
                                                                     // eslint-disable-next-line
                                                                     mmspc.dialog.toast("电子签名上传失败！");
                                                                     this.props.creditActions.loading(false);
                                                                 });
                                                             //上传征信授权书
                                                             this.props.creditActions.uploadCreditPage(this.props.client.procsId, this.props.client.clientId, "/" + this.props.client.procsId + '/借款人影像/征信查询授权书/010102001.jpg',
                                                                 successData => {
                                                                     // eslint-disable-next-line
                                                                     mmspc.dialog.toast("征信授权书上传成功！");
                                                                     this.props.creditActions.loading(false);
                                                                 },erroeData => {
                                                                     // eslint-disable-next-line
                                                                     mmspc.dialog.toast("征信授权书上传失败！");
                                                                     this.props.creditActions.loading(false);
                                                                 });
                                                         }, errorStr => {

                                                         }, this.props.client.certNo, "/" + this.props.client.procsId + '/借款人影像/征信查询授权书/010102001.jpg');
                                                     }
                                                         /*this.setState({isJump: !this.state.isJump, dialogVisible: false
                                                         })*/
                                                         /* this.state.showCreditFinished == "none" ?
                                                         :
                                                          () => this.setState({showPhotoSignDialog: true,dialogVisible: false,isShowPhotoSign: "write"})*/
                                                     }
                                                />
												<p style={{color: "#FFFFFF", marginRight: "35%"}}>电子手写签名</p>
											</span>
                                                <span>
												<img class="rWhiteTabTitle" src={require("../../images/shoot.png")}
                                                     width="100px" height="auto"
                                                    /*判断是否已经纸质签名拍照，若已拍过，点击查看签名*/
                                                     onClick={() => {
                                                         // eslint-disable-next-line
                                                         mmspc.customCamera.openRectCamera(successData => {
                                                             this.state.photoSign.imageBase64 = successData;
                                                             photoPic = "data:image/png;base64," + successData;
                                                             this.setState({dialogVisible: false});
                                                             this.props.creditActions.uploadFile("{\"fileDesp\":\"征信查询授权书\",\"groupId\":\"010102\",\"workId\":\"" + this.props.client.procsId + "\",\"uploadPageList\":[" + JSON.stringify(this.state.photoSign) + "]}",
                                                                 (successData) => {
                                                                     this.setState({
                                                                         showCreditFinished: "block",
                                                                         isShowPhotoSign: "photo"
                                                                     });
                                                                     this.props.creditActions.loading(false);
                                                                 }, () => {
                                                                     this.props.creditActions.loading(false);
                                                                     // eslint-disable-next-line
                                                                     mmspc.dialog.toast("纸质签名拍照上传失败！");
                                                                 });
                                                             //上传征信授权书
                                                             this.props.creditActions.uploadCreditPage(this.props.client.procsId, this.props.client.clientId, "/" + this.props.client.procsId + '/借款人影像/征信查询授权书/010102001.jpg',
                                                                 successData => {
                                                                     // eslint-disable-next-line
                                                                     mmspc.dialog.toast("征信授权书上传成功！");
                                                                     this.props.creditActions.loading(false);
                                                                 },erroeData => {
                                                                     // eslint-disable-next-line
                                                                     mmspc.dialog.toast("征信授权书上传失败！");
                                                                     this.props.creditActions.loading(false);
                                                                 });
                                                             //             idPhoto = "data:image/png;base64," + successData;
                                                             //             this.setState({showIdentityFinished: "block"});
                                                         }, errorData => {
                                                             alert('失败：' + errorData);
                                                         }, "/" + this.props.client.procsId + '/借款人影像/征信查询授权书/010102001.jpg');
                                                         /* // eslint-disable-next-line
                                                          navigator.camera.getPicture(successData => {
                                                              //           alert("data:"+successData);
                                                              this.state.photoSign.imageBase64 = successData;
                                                              //            alert(this.state.photoSign.imageBase64);
                                                              photoPic = "data:image/png;base64," + successData;
                                                              this.setState({dialogVisible: false});
                                                              this.props.creditActions.uploadFile("{\"fileDesp\":\"征信查询授权书\",\"groupId\":\"010102\",\"workId\":\"" + this.props.client.procsId + "\",\"uploadPageList\":[" + JSON.stringify(this.state.photoSign) + "]}",
                                                                  (successData) => {
                                                                      this.setState({
                                                                          showCreditFinished: "block",
                                                                          isShowPhotoSign: "photo"
                                                                      });
                                                                      this.props.creditActions.loading(false);
                                                                  }, () => {
                                                                      this.props.creditActions.loading(false);
                                                                      // eslint-disable-next-line
                                                                      mmspc.dialog.toast("纸质签名拍照上传失败！");
                                                                  });

                                                          }, errData => {
                                                              alert("error");
                                                          }, {quality: 50, destinationType: 0})*/
                                                         ;
                                                     }
                                                         /*this.state.showCreditFinished == "none" ?
                                                               :
                                                               () => {this.setState({showPhotoSignDialog: true,dialogVisible: false,isShowPhotoSign: "photo"})}*/
                                                     }
                                                />
                                            	<p style={{color: "#FFFFFF", marginLeft: "35%"}}>纸质签名拍照</p>
											</span>
                                            </div>
                                            <img src={require("../../images/close_50.png")}
                                                 style={{flex: 1, margin: '5% auto 0'}}
                                                 onClick={() => this.setState({dialogVisible: false})}
                                            />
                                        </Dialog.Body>
                                    </Dialog>

                                </div>
                                {/* 弹出窗显示签名图片*/}
                                {/*<Dialog
                                    size="full"
                                    visible={this.state.showPhotoSignDialog}
                                    onCancel={() => this.setState({showPhotoSignDialog: false})}
                                    lockScroll={false}
                                    style={{background: "#000000", textAlign: "center"}}
                                >
                                    <Dialog.Body>
                                             <span>{this.state.isShowPhotoSign == "write" ?
                                                 <img src={pagePic} width="100%" height="100%"
                                                      onClick={() => this.setState({showPhotoSignDialog: false})}/>
                                                 :
                                                 <img id="showPhotoSign" src={photoSign} width="100%" height="100%"
                                                      onClick={() => this.setState({showPhotoSignDialog: false})}/>
                                             }
											</span>
                                    </Dialog.Body>
                                </Dialog>*/}
                                {/* 弹出窗显示手持身份拍照图片*/}
                                {/* <Dialog
                                    size="full"
                                    visible={this.state.showIdPhotoDialog}
                                    onCancel={() => this.setState({showIdPhotoDialog: !this.state.showIdPhotoDialog})}
                                    lockScroll={false}
                                    style={{background: "#000000", textAlign: "center"}}
                                >
                                    <Dialog.Body>
                                             <span>
                                                 <img id="showIdPhoto" src={idPhoto} width="100%" height="100%"
                                                      onClick={() => this.setState({showIdPhotoDialog: !this.state.showIdPhotoDialog})}/>
											</span>
                                    </Dialog.Body>
                                </Dialog>*/}
                            </div>
                            <div class="three_box_rt"> {/*this.state.isShow === false ?*/}
                                <div>{this.props.credit.creditResult === false ?
                                    <div>
                                        {(((this.state.showFaceFinished == "block") || ((this.state.showFaceFailure == "block") && (this.state.showIdentityFinished == "block"))) && (this.state.showCreditFinished == "block")) == false ?
                                            <div>
                                                <Button style={{height: 70, width: 70}} disabled={true} textStyle={{
                                                    fontSize: 18,
                                                    lineHeight: 1.3,
                                                    whiteSpace: 'normal'
                                                }}>征信查询</Button>
                                            </div>
                                            :
                                            <div>
                                                <Button type="warning" style={{height: 70, width: 70}} textStyle={{
                                                    fontSize: 18,
                                                    lineHeight: 1.3,
                                                    whiteSpace: 'normal'
                                                }}
                                                        onClick={() => {
                                                            //征信查询接口
                                                            this.props.creditActions.getCreditResult(JSON.parse("{\"req_id\":\"" + this.props.client.procsId + "\",\"clientId\":\"" + this.props.client.clientId + "\"}"));
                                                            //查询客户级别接口
                                                            //this.props.creditActions.getLoadnerInfo(JSON.parse("{\"clientId\":"+"\""+this.props.client.clientId+"\"}"));
                                                            //征信查询成功后，隐藏征信查询按钮，显示查询成功图片并且 征信报告显示已查询
                                                            //   this.setState({showQuery: "block", isShow: true})
                                                        }}>
                                                    征信查询
                                                </Button>

                                            </div>
                                        }
                                        {/*  <Button type="warning" style={{height: 70, width: 70}}
                                                textStyle={{fontSize: 18, lineHeight: 1.3, whiteSpace: 'normal'}}
                                                onClick={() => {
                                                    //  alert("征信查询："+JSON.stringify(this.state.transId));  req_id procsId
                                                    // eslint-disable-next-line
                                                    mmspc.bridge.get(data => {
                                                        //      alert(this.props.client.clientId);
                                                        //       this.props.creditActions.getCreditResult(data, JSON.parse("{\"req_id\":\"dc01db22-a682-4fee-\",\"clientId\":\"7d236673-7df8-4ab9-\"}"));
                                                        this.props.creditActions.getCreditResult(data, JSON.parse("{\"req_id\":" + "\"" + this.props.client.procsId + "\",\"clientId\":" + "\"" + this.props.client.clientId + "\"}"));
                                                    });
                                                    this.setState({showQuery: "block", isShow: true})
                                                }}>
                                            征信查询
                                        </Button>*/}
                                    </div>
                                    :
                                    <div>
                                        <img src={require("../../images/success_iocn.png")}
                                             width="65%" height="65%"/>
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
                                        <div class="camera_bigBox" onClick={() => {
                                            /*征信查询后，可点击查看征信报告*/
                                            if (this.props.credit.showQuery != "none") {
                                                this.setState({isShowReport: true});
                                            }
                                        }}>
                                            <img src={require("../../images/credit_certificate.png")}/>
                                            <p style={{display: this.props.credit.showQuery}}>
                                                <img src={require("../../images/yicahxun.png")}/>
                                            </p>
                                        </div>
                                        <p>征信报告</p>
                                    </li>

                                    <li>
                                        <div class="camera_bigBox">
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
                        {/*<Button type="warning" size="large"
                                onClick={() => {
                                    //重置页面状态
                                    this.clearCreditInfo();
                                }}>
                            重置</Button>*/}
                        {/* 下一步按钮是否可以点击，当征信查询后，在可以点击下一步按钮style={{background: "#999999", color: "#fff", borderColor: "#999999"}}*/}
                        <div class="footer_content_rt"> {/*this.state.isShow === false ?*/}
                            {/*{this.props.credit.creditResult === false ?
                                <Button disabled={true} type="warning"
                                        size="large">
                                    下一步
                                </Button>
                                :
                                <Button type="warning" size="large"
                                        onClick={() => {
                                            this.context.jumpTo(2, this.setComplete.bind(this)(1))
                                            this.props.creditActions.pageSelected(2);
                                        }}>
                                    下一步
                                </Button>
                            }*/}
                            <Button type="warning" size="large"
                                    onClick={() => {
                                        // this.props.creditActions.downloadFile(JSON.parse("{\"workId\":\"001802A5100000026\",\"groupId\":\"\"}"),
                                        //     (successData) => {
                                        //         alert(successData);
                                        //         this.props.creditActions.loading(false);
                                        //     }, () => {
                                        //         this.props.creditActions.loading(false);
                                        //         // eslint-disable-next-line
                                        //         mmspc.dialog.toast("图片下载失败！");
                                        //     });
                                        this.context.jumpTo(2, this.setComplete.bind(this)(1));
                                        this.props.creditActions.pageSelected(2);
                                    }}>
                                下一步
                            </Button>
                        </div>
                    </div>
                </div>
                {/*征信报告*/}
                <SupplePage style={{display: this.state.isShowReport != true ? "none" : "block"}}>
                    <NavBar
                        title={"客户征信报告"}
                        lName={"返回"}
                        //     rName={"确定"}
                        lClick={() => this.setState({isShowReport: !this.state.isShowReport})}
                        //      rClick={() => this.setState({isShowReport: !this.state.isShowReport})}
                    >
                    </NavBar>
                    <div id="signPage" style={{
                        height: window.innerHeight - this.getHeight(100),
                        overflowY: "auto",
                        overflowX: "hidden"
                    }}>
                        <div>
                            <Tabs activeName="1" onTabClick={(tab) => console.log(tab.props.name)}>
                                <Tabs.Pane label="征信预览" name="1">
                                    <div style={{
                                        marginLeft: "22%",
                                        marginRight: "22%",
                                        background: "#FFFFFF",
                                        fontSize: "100%"
                                    }}>
                                        {this.props.credit.parsedInfo}
                                    </div>
                                </Tabs.Pane>
                                <Tabs.Pane label="基本信息" name="2">
                                    <div style={{
                                        marginLeft: "22%",
                                        marginRight: "22%",
                                        background: "#FFFFFF",
                                        fontSize: "100%"
                                    }} dangerouslySetInnerHTML={
                                        {__html: this.props.credit.basicInfo}
                                    }>
                                    </div>
                                </Tabs.Pane>
                                <Tabs.Pane label="信息概要" name="3">
                                    <div style={{
                                        marginLeft: "22%",
                                        marginRight: "22%",
                                        background: "#FFFFFF",
                                        fontSize: "100%"
                                    }} dangerouslySetInnerHTML={
                                        {__html: this.props.credit.summaryInfo}
                                    }>
                                    </div>
                                </Tabs.Pane>
                                <Tabs.Pane label="信贷信息" name="4">
                                    <div style={{
                                        marginLeft: "22%",
                                        marginRight: "22%",
                                        background: "#FFFFFF",
                                        fontSize: "100%"
                                    }} dangerouslySetInnerHTML={
                                        {__html: this.props.credit.creditTrans}
                                    }>
                                    </div>
                                </Tabs.Pane>
                                <Tabs.Pane label="公共信息" name="5">
                                    <div style={{
                                        marginLeft: "22%",
                                        marginRight: "22%",
                                        background: "#FFFFFF",
                                        fontSize: "100%"
                                    }} dangerouslySetInnerHTML={
                                        {__html: this.props.credit.publicInfo}
                                    }>
                                    </div>
                                </Tabs.Pane>
                                <Tabs.Pane label="查询记录" name="6">
                                    <div style={{
                                        marginLeft: "22%",
                                        marginRight: "22%",
                                        background: "#FFFFFF",
                                        fontSize: "100%"
                                    }} dangerouslySetInnerHTML={
                                        {__html: this.props.credit.queryLog}
                                    }>
                                    </div>
                                </Tabs.Pane>
                            </Tabs>


                        </div>
                    </div>
                </SupplePage>
            </div>

        </div>;

    }
}

Credit.contextTypes = {
    jumpTo: PropTypes.func,
    getListValue: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(Credit);