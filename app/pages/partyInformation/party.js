import React from 'react';
import {Component, unshiftArrs} from '../../components/libs';
import html2canvas from 'html2canvas';
import * as homeActions from '../../actions/home';
import * as loginActions from '../../actions/login';
import * as partyAction from '../../actions/party';
import * as creditActions from '../../actions/credit';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Map} from 'immutable';
// import Head from '../../ma-ui/Head'
import {Link} from 'react-router-dom';
// import TabTitle from '../../components/src/TabTitle'
// import {  Form, Icon, Input, Button, Checkbox } from 'antd';
// import 'antd/dist/antd.css';
// import 'element-theme-default';
// import { Form,Input,Button,Layout,Tabs,Select } from 'element-react';
import {
    Form,
    Input,
    Button,
    Layout,
    Tabs,
    Select,
    TabTitle,
    Head,
    Dialog,
    Radio,
    SelectList,
    NavBar,
    SupplePage,
    Loading
} from "../../components/index";
import PropTypes from 'prop-types';
import '../publicCss/public.css'
import {ImageViewer} from "../../components";

let showLength = 4;
var that = '';
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
var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
var frontImage = require("../../images/certificate_front.png");
var backImage = require("../../images/certificate_back.png");
const actions = [
    homeActions,
    partyAction,
    loginActions,
    creditActions,
];

function mapStateToProps(state) {
    const {instData} = state;
    const {partyData} = state;
    const {client} = state;
    const {credit} = state;
    const {home} = state;
    
    return {
        partyData,
        instData,
        client,
        credit,
        home

    };
}

function mapDispatchToProps(dispatch) {

    const creators = Map()
        .merge(...actions)//把一堆都揉
        .filter(value => typeof value === 'function')
        .toObject();
    return {
        partyActions: bindActionCreators(creators, dispatch)
    };
}

/*@connect(
        state => ({...state.home}),
    dispatch => bindActionCreators({showIdCard}, dispatch)
)*/

function regexString(value) {
    if (value != undefined && value != null && value.length != 0 && value != "") {
        return true;
    } else {
        return false;
    }
}

class Party extends Component {
    constructor(props) {
        super(props);
        this.state = {
            container_height: window.innerHeight - this.getHeight(100),
            isInfoShow: false,
            isAddParty: false,
            isAddPartyShow: false,
            //  types:'中专',
            selectDialogVisible: false,
            selectDialog2Visible: false,
            selectDialog3Visible: false,
            list: ['大学', '研究生', '博士', '大专', '高中', '中专', '初中', '小学'],
            liveList: ['父母同住', '集体宿舍', '租住', '共有住宅', '其他', '自有住房无按揭无抵押', '自有住房有按揭或抵押'],
            corpcharList: ['事业单位', '国家机关', '小企业', '个体工商', '其他', '国资委或省国资委直属企业', '优质上市公司', '经营规范、效益一般的企业'],
            selectKey: '',
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
            isLookorAdd: '',
            clickId: '11',
            check: "inline",
            checkSuccess: "none",
            frontImage: frontImage,
            backImage: backImage,
            radio: "身份证",
            loadingContent: "登录中...",
            fullscreen: false,
            netCheckState: false,
            radio3: "身份证",
            cardNumber: "",
            cardName: "",
            frontDisplay: "inline",
            backDisplay: "inline",
            query: false,

        }
    }

    onSubmit(e) {
        e.preventDefault();
    }

    creditReport() {
        const w = window.open('about:blank');
        w.location.href = 'http://localhost:3000/#/'
    }

    removeByValue(arr, val) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == val) {
                arr.splice(i, 1);
                break;
            }
        }
    }

    /*
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
    componentDidMount() {
        that = this;
        // this.props.partyActions.showNewContact(false) 
        //作业id
        // if(this.props.client.procsId){
        //     //如果procsId有调用id
        //     this.queryAllInformation(this.props.client.procsId)
        // }else{
        //     //没有掉接口
        //     this.queryAllInformation('dc01db22-a682-4fee-')
        // }

        unshiftArrs(this.state.list, this.props.partyData.form.edulevel, (data) => {
            this.props.partyData.form['edulevel'] = data
            this.refs.educationSL.setState({selected: null})
        }, showLength)
        unshiftArrs(this.state.liveList, this.props.partyData.form.housesta, (data) => {
            this.props.partyData.form['housesta'] = data
            this.refs.educationSL.setState({selected: null})
        }, showLength)
        unshiftArrs(this.state.corpcharList, this.props.partyData.form.corpchar, (data) => {
            this.props.partyData.form['corpchar'] = data
            this.refs.educationSL.setState({selected: null})
        }, showLength)
        this.forceUpdate();


    }

    // queryAllInformation(procsId){
    //     // let procsId='dc01db22-a682-4fee-'
    //     //传一个作业id
    //     // eslint-disable-next-line
    //     mmspc.bridge.get(function (data) {
    //          that.props.partyActions.ishaveInformation(data , JSON.parse(`{\"req_id\":\"${procsId}\"}`));

    //         //  that.props.partyActions.ishaveInformation(data , JSON.parse("{\"req_id\":\"dc01db22-a682-4fee-\"}"));
    //    });
    // //    单笔作业信息
    // //    eslint-disable-next-line
    // //    mmspc.bridge.get(function (data) {
    // //          that.props.partyActions.querySingleInformation(data , JSON.parse("{\"clientId\":\"dc01db22-a682-4fee-\"}"));
    // //    });

    // }
    onChange(key, value) {
        this.props.partyData.form[key] = value;
        this.setState({
            [key]: value,
        });
        switch (key) {
            case "cardName":
                this.state.cardName = value;
                break;
            case "cardNumber":
                this.state.cardNumber = value;
                break;
        }
        this.setCheckState();
    }

    setCheckState() {
        if (regexString(this.state.cardNumber) && regexString(this.state.cardName) && this.state.frontDisplay == "none" && this.state.backDisplay == "none") {
            this.setState({netCheckState: true})
        } else {
            this.setState({netCheckState: false})
        }

    }

    onEducateAppendClick() {
        this.setState({selectDialogVisible: true});
    }

    onLiveAppendClick() {
        this.setState({selectDialog2Visible: true});
    }

    onCorpcharAppendClick() {
        this.setState({selectDialog3Visible: true});

    }

    setComplete(cur) {
        let value = this.context.getListValue();
        value[cur] = 2;
        return value;
    }

    // getInfo(){
    //     alert("11")
    //     console.log(this.props.partyData.form)
    // }
    showImageViewer(src, onRetake, onDelete) {
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

    showImageNoButt(src, onRetake, onDelete) {
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

    render() {
        return (
            <div style={{height: this.state.container_height}}>
                <div id="party" class="showTab1"
                     style={{display: this.props.partyData.showNewContact === false ? "block" : "none"}}>
                    <div>
                        {
                            this.props.credit.loadingCredit &&
                            <Loading fullscreen={true} text={this.props.credit.loadingCreditText}
                                     style={{backgroundColor: 'rgba(0, 0, 0, 0.3)'}}/>
                        }
                    </div>
                    <div>
                        {
                            this.props.home.pageSelected === 3 && !this.state.query
                            &&
                            // eslint-disable-next-line
                            mmspc.bridge.get((data) => {
                                this.state.query = true;
                                // this.props.partyActions.ishaveInformation(data , JSON.parse("{\"req_id\":"+"\""+this.props.client.procsId+"\"}"));
                                this.props.partyActions.ishaveInformation(data, JSON.parse("{\"req_id\":\"dc01db22-a682-4fee-\"}"));

                            })
                        }
                        }
                    </div>
                    <div class="main_contanier">
                        <TabTitle title="证件信息" class="tabTitle orangeTabTitle"/>
                        <div class="form_content">
                            <div class="three_box">
                                <div class="three_child_lf">
                                    <Form labelPosition="left" labelWidth="80" onSubmit={this.onSubmit.bind(this)}>
                                        <Form.Item label="证件类型">
                                            <Radio.Group value={this.state.radio}
                                                         onChange={this.onChange.bind(this, 'radio')}>
                                                <Radio.Button style={{marginBottom: "0px"}} value="身份证"/>
                                            </Radio.Group>
                                        </Form.Item>
                                        <Form.Item label="证件号码">
                                            <Input type="text" placeholder="请输入证件号码" value={this.state.cardNumber}
                                                   onChange={this.onChange.bind(this, 'cardNumber')}/>
                                            <button type="button" className="loading-button" onClick={() => {
                                                // eslint-disable-next-line
                                                mmspc.abcDevice.initDevice();
                                                // eslint-disable-next-line
                                                mmspc.abcDevice.readIDCardInfo("0", function (json) {
                                                    that.setState({
                                                        cardNumber: json.identityCardNumber,
                                                        cardName: json.fullName
                                                    });
                                                }, function (error) {

                                                }, 30000);

                                            }
                                            }>读取
                                            </button>

                                        </Form.Item>
                                        <Form.Item label="客户姓名">
                                            <Input id="card_name" type="text" size="small" value={this.state.cardName}
                                                   onChange={this.onChange.bind(this, 'cardName')}></Input>
                                        </Form.Item>
                                    </Form>
                                </div>
                                <div class="three_child_rt">
                                    <ul class="img_box">
                                        <li>
                                            <div class="camera_box">
                                                <img src={this.state.frontImage ? this.state.frontImage : frontImage}
                                                     onClick={() => {
                                                         if (this.state.frontDisplay == "none") {
                                                             this.showImageViewer(this.state.frontImage, () => {
                                                                 navigator.camera.getPicture((data) => {

                                                                     that.setState({
                                                                         frontImage: "data:image/png;base64," + data,
                                                                         frontDisplay: "none"
                                                                     });
                                                                     that.state.frontDisplay = "none";
                                                                     that.setCheckState();
                                                                 }, (data) => {
                                                                 }, {quality: 50, destinationType: 0});
                                                             }, () => {
                                                                 this.setState({frontImage: null});
                                                                 this.state.frontDisplay = "inline";
                                                                 this.setCheckState()
                                                             });
                                                         }
                                                     }}/>
                                                <p>
                                                    <img src={require("../../images/camera.png")}
                                                         style={{display: this.state.frontDisplay}} onClick={() => {
                                                        // eslint-disable-next-line
                                                        navigator.camera.getPicture((data) => {
                                                            that.setState({
                                                                frontImage: "data:image/png;base64," + data,
                                                                frontDisplay: "none"
                                                            });
                                                            that.state.frontDisplay = "none";
                                                            that.setCheckState();
                                                        }, (data) => {
                                                        }, {quality: 50, destinationType: 0});
                                                    }}/>
                                                </p>
                                            </div>
                                            <p>请上传身份证头像面</p>

                                        </li>
                                        <li>
                                            <div class="camera_box">
                                                <img src={this.state.backImage ? this.state.backImage : backImage}
                                                     onClick={() => {
                                                         if (this.state.backDisplay == "none") {
                                                             this.showImageViewer(this.state.backImage, () => {
                                                                 navigator.camera.getPicture((data) => {
                                                                     that.setState({
                                                                         backImage: "data:image/png;base64," + data,
                                                                         backDisplay: "none"
                                                                     });
                                                                     that.state.backDisplay = "none";
                                                                     that.setCheckState();
                                                                 }, (data) => {
                                                                 }, {quality: 50, destinationType: 0});
                                                             }, () => {
                                                                 this.setState({backImage: null});
                                                                 this.state.backDisplay = "inline";
                                                                 this.setCheckState()
                                                             });
                                                         }

                                                     }}/>
                                                <p>
                                                    <img src={require("../../images/camera.png")}
                                                         style={{display: this.state.backDisplay}} onClick={() => {
                                                        // eslint-disable-next-line
                                                        navigator.camera.getPicture((data) => {
                                                            that.setState({
                                                                backImage: "data:image/png;base64," + data,
                                                                backDisplay: "none"
                                                            });
                                                            that.state.backDisplay = "none";
                                                            that.setCheckState();
                                                        }, (data) => {
                                                        }, {quality: 50, destinationType: 0});

                                                    }}/>
                                                </p>
                                            </div>
                                            <p>请上传身份证国徽面</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="three_box_rt">
                                <div style={{display: this.state.check}}>
                                    <input type="button"
                                           class={(this.state.netCheckState) ? "orangeButton" : "grayButton"}
                                           value="联网核查" onClick={() => {
                                        if (this.state.netCheckState) {
                                            this.setState({loadingContent: "联网核查...", fullscreen: true});
                                            // eslint-disable-next-line
                                            mmspc.nativeRequest.init();
                                            // eslint-disable-next-line
                                            mmspc.bridge.get(appId => {
                                                // eslint-disable-next-line
                                                mmspc.nativeRequest.get("http://219.142.79.229:8989/mmsp-ps/forward/" + appId + "/rest/pub/access/onlinecheck?clientId=易贤武&userId=360731199110284813"
                                                    , () => {
                                                        this.setState({
                                                            nextBg: "#FFA400",
                                                            nextBorder: "#FFA400",
                                                            nextState: true,
                                                            loadingContent: "联网核查...",
                                                            fullscreen: false,
                                                            check: "none",
                                                            checkSuccess: "inline"
                                                        });
                                                    }, () => {
                                                        this.setState({loadingContent: "联网核查...", fullscreen: false});
                                                    });
                                            }, () => {

                                            })

                                        }
                                    }}/>

                                </div>
                                <div style={{display: this.state.checkSuccess}}>
                                    <img src={require("../../images/success_iocn.png")}
                                         width="75%" height="75%"/>
                                    <p style={{color: "#00CD00"}}>核查通过</p>
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
                                                 <img id="showIdPhoto" src={this.state.frontImage} width="800px"
                                                      height="100%"/>
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
                                            <img id="showIdPhoto" src={this.state.backImage} width="800px"
                                                 height="100%"/>
                                    </span>
                            </Dialog.Body>
                        </Dialog>
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
                                                         navigator.camera.getPicture(successData => {
                                                             idPhoto = "data:image/png;base64," + successData;
                                                             document.getElementById("showIdPhoto").src = idPhoto;
                                                             this.setState({showIdentityFinished: "block"});
                                                         }, errData => {
                                                             alert("error");
                                                         }, {quality: 50, destinationType: 0});
                                                     } else {
                                                         this.showImageNoButt(idPhoto, () => {

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
                                                                 this.showImageNoButt(pagePic, () => {

                                                                 }, () => {

                                                                 });

                                                             } else {
                                                                 this.setState({isShowPhotoSign: "photo"});
                                                                 this.showImageNoButt(photoSign, () => {

                                                                 }, () => {

                                                                 });
                                                             }
                                                         } else {
                                                             alert("请先完成人脸识别或手持身份认证");
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
                                                             //   alert('成功');
                                                             this.setState({
                                                                 dialogVisible: false,
                                                                 showCreditFinished: "block",
                                                                 isShowPhotoSign: "write"
                                                             });
                                                             pagePic = "data:image/png;base64," + msg;
                                                         }, function (errorStr) {
                                                             alert(errorStr);
                                                         }, '32132120010203234x');
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
                                                         navigator.camera.getPicture(successData => {
                                                             photoSign = "data:image/png;base64," + successData;
                                                             document.getElementById("showPhotoSign").src = photoSign;
                                                             this.setState({
                                                                 showCreditFinished: "block",
                                                                 dialogVisible: false,
                                                                 isShowPhotoSign: "photo"
                                                             });
                                                         }, errData => {
                                                             alert("error");
                                                         }, {quality: 50, destinationType: 0});
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
                                    <Dialog
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
                                    </Dialog>
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
                                <div class="three_box_rt">
                                    <div>{this.state.isShow === false ?
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
                                                                // alert("征信查询："+JSON.stringify(this.state.transId));
                                                                // eslint-disable-next-line
                                                                mmspc.bridge.get(data => {
                                                               //     this.props.creditActions.getCreditResult(data, JSON.parse("{\"req_id\":\"dc01db22-a682-4fee-\",\"clientId\":\"7d236673-7df8-4ab9-\"}"));
                                                                    this.props.partyActions.getCreditResult(data, JSON.parse("{\"req_id\":"+"\""+this.props.client.procsId+"\",\"clientId\":"+"\""+this.props.client.clientId+"\"}"));
                                                                    this.setState({showQuery: "block", isShow: true})
                                                                });
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
                                                if (this.state.showQuery != "none") {
                                                    this.setState({isShowReport: true});
                                                }
                                            }}>
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
                        <Form labelPosition="left" model={this.props.partyData.form} labelWidth="120"
                              onSubmit={this.onSubmit.bind(this)}>
                            <div class="form_content_col">
                                <ul class="form_content_row">
                                    <li class="form_lf">
                                        <Form.Item label="是否共同借款人">
                                            <Radio.Group value={this.props.partyData.form.isrel}
                                                         onChange={this.onChange.bind(this, 'isrel')}>
                                                <Radio.Button style={{marginBottom: "0px"}} value="是"/>
                                                <Radio.Button style={{marginBottom: "0px"}} value="否"/>
                                            </Radio.Group>
                                        </Form.Item>
                                    </li>
                                    <li class="form_rt">
                                        <Form.Item label="关系人类型">
                                            <Radio.Group value={this.props.partyData.form.reltype}
                                                         onChange={this.onChange.bind(this, 'reltype')}>
                                                <Radio.Button value="夫"/>
                                                <Radio.Button value="妻"/>
                                                <Radio.Button value="子"/>
                                                <Radio.Button value="女"/>
                                                <Radio.Button value="父母"/>
                                                <Radio.Button value="其他"/>
                                            </Radio.Group>
                                        </Form.Item>
                                    </li>

                                </ul>


                                <ul class="form_content_row">
                                    <li class="form_lf">
                                        <Form.Item label="文化程度">
                                            <Radio.Group value={this.props.partyData.form.edulevel}
                                                         onChange={this.onChange.bind(this, 'edulevel')} appendix="更多"
                                                         onAppendixClick={this.onEducateAppendClick.bind(this)}>
                                                {
                                                    this.state.list.map(function (item, i) {
                                                        return (
                                                            i < showLength + 1 ?
                                                                <Radio.Button key={i} value={item}/> : ''

                                                        )
                                                    })

                                                }
                                                <Radio.Button style={{marginBottom: "0px"}} value="更多"/>
                                            </Radio.Group>
                                        </Form.Item>
                                        <Dialog
                                            size="small"
                                            visible={this.state.selectDialogVisible}
                                            title='对话框'
                                            // onCancel={ () => this.setState({ selectDialogVisible: false,types:this.state.types}) }
                                            onCancel={() => this.setState({selectDialogVisible: false})}

                                            lockScroll={false}
                                            className='mmpsc-select-list-dialog'
                                        >
                                            <Dialog.Body>
                                                <SelectList ref="educationSL"
                                                            visible={this.state.selectDialogVisible}
                                                            value={this.props.partyData.form.edulevel} multiple={false}
                                                            onChange={(val) => {
                                                                this.removeByValue(this.state.list, val)
                                                                this.state.list.unshift(val)
                                                                this.onChange('edulevel', val)
                                                                this.setState({selectDialogVisible: false})
                                                                this.refs.educationSL.setState({selected: null});
                                                            }}>
                                                    {
                                                        this.state.list.map(function (item, i) {
                                                            return i > showLength ?
                                                                <SelectList.Option key={i} label={item}
                                                                                   value={item}/> : ''
                                                        })
                                                    }

                                                </SelectList>
                                            </Dialog.Body>
                                        </Dialog>

                                    </li>
                                    <li class="form_rt">
                                        <Form.Item label="婚姻状况">
                                            <Radio.Group value={this.props.partyData.form.marrysta}
                                                         onChange={this.onChange.bind(this, 'marrysta')}>
                                                <Radio.Button value="已婚"/>
                                                <Radio.Button value="未婚"/>
                                                <Radio.Button value="离异"/>
                                                <Radio.Button value="丧偶"/>
                                                <Radio.Button value="其他"/>
                                            </Radio.Group>
                                        </Form.Item>
                                    </li>
                                </ul>
                                <ul class="form_content_row">
                                    <li class="form_lf">
                                        <Form.Item label="手机号码">
                                            <Input size="small" value={this.props.partyData.form.mobno}
                                                   placeholder="请输入手机号"
                                                   onChange={this.onChange.bind(this, 'mobno')}></Input>
                                        </Form.Item>
                                    </li>
                                    <li class="form_rt">
                                        <Form.Item label="本人年税后收入">
                                            <Input size="small" value={this.props.partyData.form.myselfincpm}
                                                   placeholder="20万"
                                                   onChange={this.onChange.bind(this, 'myselfincpm')}></Input>
                                        </Form.Item>
                                    </li>

                                </ul>
                                <ul class="form_content_row">
                                    <li class="form_lf">
                                        <Form.Item label="配偶年税后收入">
                                            <Input size="small" value={this.props.partyData.form.parincpm}
                                                   placeholder="配偶年税后收入"
                                                   onChange={this.onChange.bind(this, 'parincpm')}></Input>
                                        </Form.Item>
                                    </li>
                                    <li class="form_rt">
                                    </li>
                                </ul>
                            </div>
                        </Form>
                    </div>
                    <div class="loan_footer">
                        <div class="footer_content">
                            <div class="footer_content_lf">
                                <Button plain={true} type="info" size="large"
                                        onClick={() => this.setState({isInfoShow: !this.state.isInfoShow})}>信息补录</Button>
                            </div>
                            <div class="footer_content_rt">
                                <Button type="warning" size="large" onClick={() => {
                                    // alert(JSON.stringify(this.props.partyData.form));
                                    // eslint-disable-next-line
                                    mmspc.bridge.get((data) => {
                                        //用我自己
                                        this.props.partyData.form.clientId = this.props.relateData.relateId;
                                        this.props.partyData.form.req_id = this.props.client.procsId;
                                        this.props.partyActions.postPartyInfo(data, this.props.partyData.form);
                                    });
                                    //   this.props.partyActions.showNewContact(true)


                                }}
                                >新增关系人
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <div id="addParty"  style={{display:this.state.isAddPartyShow === false ? "none" : "block"}}> */}
                <div id="addParty" style={{display: this.props.partyData.showNewContact === false ? "none" : "block"}}>
                    <div class="main_contanier scrollauto">
                        <TabTitle title="关系人信息" class="tabTitle blueTabTitle"/>
                        <div class="form_content">
                            <ul class="addParty_box">
                                <li onClick={() => {
                                    //当前点击的id
                                    // mmspc.bridge.get(function (data) {
                                    // that.props.partyActions.postPartyInfo(data,clickId);
                                    // });
                                    this.setState({isAddParty: !this.state.isAddParty, isLookorAdd: 1})

                                }}>
                                    <ul class="addParty_title">
                                        <li>
                                        <span class="addParty_title_key">
                                            姓名：
                                        </span>
                                            <span class="addParty_title_value">
                                            {/* 关小明 */}
                                                {this.props.partyData.partyDataList.cliname}

                                        </span>
                                        </li>
                                        <li>
                                        <span class="addParty_title_key">
                                            证件号码：
                                        </span>
                                            <span class="addParty_title_value">
                                            {this.props.partyData.partyDataList.cert_no}
                                            
                                        </span>
                                        </li>
                                        <li>
                                        <span class="addParty_title_key">
                                            角色：
                                        </span>
                                            <span class="addParty_title_value">
                                            {/* {this.props.partyData.partyDataList.cert_no} */}
                                                无此字段 借款人配偶
                                        </span>
                                        </li>
                                        <li>
                                        <span class="addParty_title_key">
                                            类型：
                                        </span>
                                            <span class="addParty_title_value">
                                              {this.props.partyData.partyDataList.reltype}
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
                                             onClick={() => {
                                                 this.setState({
                                                     isAddParty: !this.state.isAddParty, isLookorAdd: 2,
                                                     showFaceFailure: "none",
                                                     showIdentityFinished: "none",
                                                     showCreditFinished: "none",
                                                     showFaceFinished: "none"


                                                 })
                                             }}

                                        />
                                        <p>新增关系人</p>
                                    </div>
                                </div>
                            </ul>
                        </div>
                        <div class="loan_footer">
                            <div class="footer_content">
                                <div class="footer_content_rt">
                                    <Button type="warning" size="large"
                                            onClick={() => {
                                                this.context.jumpTo(4, this.setComplete.bind(this)(3))
                                                this.props.partyActions.pageSelected(4);
                                            }}>下一步</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*关系人信息补录*/}
                <SupplePage style={{display: this.state.isInfoShow === false ? "none" : "block"}}>
                    <NavBar
                        title={"关系人信息补录"}
                        lName={"取消"}
                        rName={"确定"}
                        lClick={this.state.isAddPartyShow === false ?
                            /* 当页面进来直接填写第一个关系人信息时，点击信息补录跳转时，关闭只需要关闭当前*/
                            () => this.setState({isInfoShow: !this.state.isInfoShow})
                            :
                            /* 当页面时由新增关系人卡片，点击信息补录跳转时，关闭需要再打开 新增关系人页面*/
                            () => this.setState({isInfoShow: !this.state.isInfoShow, isAddParty: true})
                        }
                        rClick={this.state.isAddPartyShow === false ?
                            /* 当页面进来直接填写第一个关系人信息时，点击信息补录跳转时，关闭只需要关闭当前*/
                            () => this.setState({isInfoShow: !this.state.isInfoShow})
                            :
                            /* 当页面时由新增关系人卡片，点击信息补录跳转时，关闭需要再打开 新增关系人页面*/
                            () => this.setState({isInfoShow: !this.state.isInfoShow, isAddParty: true})
                        }
                    >
                    </NavBar>
                    {/*关系人信息补录*/}
                    <div class="showTab2">
                        <Tabs activeName="1" onTabClick={(tab) => console.log(tab.props.name)}>
                            <Tabs.Pane label="基本信息" name="1">
                                <Form labelPosition="left" model={this.props.partyData.form} labelWidth="170"
                                      onSubmit={this.onSubmit.bind(this)}>
                                    <div class="form_content">
                                        <div class="form_lf">
                                            <Form.Item label="国家">
                                                <Input value={this.props.partyData.form.country} placeholder=""
                                                       onChange={this.onChange.bind(this, 'country')}></Input>
                                            </Form.Item>
                                            <Form.Item label="性别">
                                                <Radio.Group value={this.props.partyData.form.gender}
                                                             onChange={this.onChange.bind(this, 'gender')}>
                                                    <Radio.Button style={{marginBottom: "0px"}} value="女"/>
                                                    <Radio.Button style={{marginBottom: "0px"}} value="男"/>
                                                </Radio.Group>
                                            </Form.Item>
                                            <Form.Item label="出生日期">
                                                <Input value={this.props.partyData.form.birthday} placeholder=""
                                                       onChange={this.onChange.bind(this, 'birthday')}></Input>
                                            </Form.Item>
                                            <Form.Item label="户籍地址">
                                                <Input value={this.props.partyData.form.hjdz} placeholder=""
                                                       onChange={this.onChange.bind(this, 'hjdz')}></Input>
                                            </Form.Item>
                                            <Form.Item label="居住状况">
                                                <Radio.Group value={this.props.partyData.form.housesta}
                                                             onChange={this.onChange.bind(this, 'housesta')}
                                                             appendix="更多"
                                                             onAppendixClick={this.onLiveAppendClick.bind(this)}>
                                                    {
                                                        this.state.liveList.map(function (item, i) {
                                                            return (
                                                                i < showLength + 1 ?
                                                                    <Radio.Button key={i} value={item}/> : ''

                                                            )
                                                        })

                                                    }
                                                    <Radio.Button value="更多"/>
                                                </Radio.Group>
                                            </Form.Item>
                                            <Dialog
                                                size="small"
                                                visible={this.state.selectDialog2Visible}
                                                title='对话框'
                                                onCancel={() => this.setState({selectDialog2Visible: false})}
                                                lockScroll={false}
                                                className='mmpsc-select-list-dialog'
                                            >
                                                <Dialog.Body>
                                                    <SelectList ref="liveRadio"
                                                                visible={this.state.selectDialog2Visible}
                                                                value={this.props.partyData.form.housesta}
                                                                multiple={false} onChange={(val) => {
                                                        this.removeByValue(this.state.liveList, val)
                                                        this.state.liveList.unshift(val)
                                                        this.onChange('housesta', val)
                                                        this.setState({selectDialog2Visible: false})
                                                        this.refs.liveRadio.setState({selected: null});
                                                    }}>
                                                        {
                                                            this.state.liveList.map(function (item, i) {
                                                                return i > showLength ?
                                                                    <SelectList.Option key={i} label={item}
                                                                                       value={item}/> : ''
                                                            })
                                                        }

                                                    </SelectList>
                                                </Dialog.Body>
                                            </Dialog>
                                            <Form.Item label="本地居住年限">
                                                <Input value={this.props.partyData.form.bdzjnx}
                                                       placeholder={this.props.partyData.form.bdzjnx}
                                                       onChange={this.onChange.bind(this, 'bdzjnx')}></Input>
                                            </Form.Item>

                                            <Form.Item label="长期居住地城乡属性">
                                                <Radio.Group value={this.props.partyData.form.addagrflag}
                                                             onChange={this.onChange.bind(this, 'addagrflag')}>
                                                    <Radio.Button style={{marginBottom: "0px"}} value="城市"/>
                                                    <Radio.Button style={{marginBottom: "0px"}} value="农村"/>
                                                </Radio.Group>
                                            </Form.Item>

                                        </div>
                                        <div class="form_rt">
                                            <Form.Item label="证件类型">
                                                <Input value={this.props.partyData.form.certtype} placeholder="身份证"
                                                       onChange={this.onChange.bind(this, 'certtype')}></Input>
                                            </Form.Item>
                                            <Form.Item label="是否长期有效">
                                                <Radio.Group value={this.props.partyData.form.isLong}
                                                             onChange={this.onChange.bind(this, 'isLong')}>
                                                    <Radio.Button style={{marginBottom: "0px"}} value="是"/>
                                                    <Radio.Button style={{marginBottom: "0px"}} value="否"/>
                                                </Radio.Group>
                                            </Form.Item>
                                            <Form.Item label="证件有效终止日">
                                                <Input value={this.props.partyData.form.isbirthday}
                                                       placeholder="2022-05-11"
                                                       onChange={this.onChange.bind(this, 'isbirthday')}></Input>
                                            </Form.Item>
                                            <Form.Item label="是否本地常住户口">
                                                <Radio.Group value={this.props.partyData.form.isLocal}
                                                             onChange={this.onChange.bind(this, 'isLocal')}>
                                                    <Radio.Button style={{marginBottom: "0px"}} value="是"/>
                                                    <Radio.Button style={{marginBottom: "0px"}} value="否"/>
                                                </Radio.Group>
                                            </Form.Item>

                                            <Form.Item label="是否农行员工">
                                                <Radio.Group value={this.props.partyData.form.abcstuffflag}
                                                             onChange={this.onChange.bind(this, 'form', 'abcstuffflag')}>
                                                    <Radio.Button style={{marginBottom: "0px"}} value="是"/>
                                                    <Radio.Button style={{marginBottom: "0px"}} value="否"/>
                                                </Radio.Group>
                                            </Form.Item>
                                            <Form.Item label="是否私人银行客户">
                                                <Radio.Group value={this.props.partyData.form.isyhzh}
                                                             onChange={this.onChange.bind(this, 'isyhzh')}>
                                                    <Radio.Button style={{marginBottom: "0px"}} value="是"/>
                                                    <Radio.Button style={{marginBottom: "0px"}} value="否"/>
                                                </Radio.Group>
                                            </Form.Item>
                                            <Form.Item label="人行涉农个人客户类别">
                                                <Radio.Group value={this.props.partyData.form.perclienttype}
                                                             onChange={this.onChange.bind(this, 'perclienttype')}>
                                                    <Radio.Button style={{marginBottom: "0px"}} value="非农户"/>
                                                    <Radio.Button style={{marginBottom: "0px"}} value="农户"/>
                                                    <Radio.Button style={{marginBottom: "0px"}} value="未认定"/>

                                                </Radio.Group>
                                            </Form.Item>
                                            <Form.Item label="长期居住地地址">
                                                <Input value={this.props.partyData.form.settleaddr} placeholder=""
                                                       onChange={this.onChange.bind(this, 'settleaddr')}></Input>
                                            </Form.Item>
                                        </div>
                                    </div>
                                </Form>
                            </Tabs.Pane>
                            <Tabs.Pane label="职业信息" name="2">
                                <Form labelPosition="left" model={this.props.partyData.form} labelWidth="170"
                                      onSubmit={this.onSubmit.bind(this)}>
                                    <div class="form_content">
                                        <div class="form_lf">

                                            <Form.Item label="单位全称">
                                                <Input value={this.props.partyData.form.corpname} placeholder=""
                                                       onChange={this.onChange.bind(this, 'corpname')}></Input>
                                            </Form.Item>
                                            <Form.Item label="单位地址">
                                                <Input value={this.props.partyData.form.dwdz} placeholder=""
                                                       onChange={this.onChange.bind(this, 'dwdz')}></Input>
                                            </Form.Item>
                                            <Form.Item label="职称">
                                                <Radio.Group value={this.props.partyData.form.title}
                                                             onChange={this.onChange.bind(this, 'title')}>
                                                    <Radio.Button style={{marginBottom: "0px"}} value="初级"/>
                                                    <Radio.Button style={{marginBottom: "0px"}} value="中级"/>
                                                    <Radio.Button style={{marginBottom: "0px"}} value="高级"/>
                                                    <Radio.Button style={{marginBottom: "0px"}} value="其他"/>
                                                </Radio.Group>
                                            </Form.Item>
                                            <Form.Item label="单位固定电话">
                                                <Input value={this.props.partyData.form.dwgddh} placeholder=""
                                                       onChange={this.onChange.bind(this, 'dwgddh')}></Input>
                                            </Form.Item>
                                            <Form.Item label="单位国标行业分类 ">
                                                <Radio.Group value={this.props.partyData.form.corpstdtype}
                                                             onChange={this.onChange.bind(this, 'corpstdtype')}>
                                                    <Radio.Button style={{marginBottom: "0px"}} value="其他"/>
                                                </Radio.Group>
                                            </Form.Item>
                                            <Form.Item label="个人信贷对象">
                                                <Radio.Group value={this.props.partyData.form.careertype}
                                                             onChange={this.onChange.bind(this, 'careertype')}>
                                                    <Radio.Button value="公务员"/>
                                                    <Radio.Button value="企事业职工"/>
                                                    <Radio.Button value="私营业主"/>
                                                    <Radio.Button value="农户"/>
                                                    <Radio.Button value="更多"/>
                                                </Radio.Group>
                                            </Form.Item>
                                        </div>
                                        <div class="form_rt">
                                            <Form.Item label="单位性质">
                                                <Radio.Group value={this.props.partyData.form.corpchar}
                                                             onChange={this.onChange.bind(this, 'corpchar')}
                                                             appendix="更多"
                                                             onAppendixClick={this.onCorpcharAppendClick.bind(this)}>
                                                    {
                                                        this.state.corpcharList.map(function (item, i) {
                                                            return (
                                                                i < showLength + 1 ?
                                                                    <Radio.Button key={i} value={item}/> : ''

                                                            )
                                                        })

                                                    }
                                                    <Radio.Button style={{marginBottom: "0px"}} value="更多"/>
                                                </Radio.Group>
                                                <Dialog
                                                    size="small"
                                                    visible={this.state.selectDialog3Visible}
                                                    title='对话框'
                                                    // onCancel={ () => this.setState({ selectDialogVisible: false,types:this.state.types}) }
                                                    onCancel={() => this.setState({selectDialog3Visible: false})}

                                                    lockScroll={false}
                                                    className='mmpsc-select-list-dialog'
                                                >
                                                    <Dialog.Body>
                                                        <SelectList ref="educationSL"
                                                                    visible={this.state.selectDialog3Visible}
                                                                    value={this.props.partyData.form.corpchar}
                                                                    multiple={false} onChange={(val) => {
                                                            this.removeByValue(this.state.corpcharList, val)
                                                            this.state.corpcharList.unshift(val)
                                                            this.onChange('corpchar', val)
                                                            this.setState({selectDialog3Visible: false})
                                                            this.refs.educationSL.setState({selected: null});
                                                        }}>
                                                            {
                                                                this.state.corpcharList.map(function (item, i) {
                                                                    return i > showLength ?
                                                                        <SelectList.Option key={i} label={item}
                                                                                           value={item}/> : ''
                                                                })
                                                            }

                                                        </SelectList>
                                                    </Dialog.Body>
                                                </Dialog>


                                            </Form.Item>
                                            <Form.Item label="职务状况">
                                                <Radio.Group value={this.props.partyData.form.dutysta}
                                                             onChange={this.onChange.bind(this, 'dutysta')}>
                                                    <Radio.Button style={{marginBottom: "0px"}} value="其他"/>
                                                </Radio.Group>
                                            </Form.Item>
                                            <Form.Item label="职业经营类别">
                                                <Radio.Group value={this.props.partyData.form.manageRadio}
                                                             onChange={this.onChange.bind(this, 'manageRadio')}>
                                                    <Radio.Button style={{marginBottom: "0px"}} value="工薪供职"/>
                                                </Radio.Group>
                                            </Form.Item>
                                            <Form.Item label="国标职业分类">
                                                <Radio.Group value={this.props.partyData.form.stdjobtype}
                                                             onChange={this.onChange.bind(this, 'stdjobtype')}>
                                                    <Radio.Button value="专业技术人员"/>
                                                    <Radio.Button value="商业、服务业人员"/>
                                                    <Radio.Button value="办事人员和有关人员"/>
                                                    <Radio.Button value="更多"/>
                                                </Radio.Group>
                                            </Form.Item>
                                        </div>
                                    </div>
                                </Form>
                            </Tabs.Pane>
                            <Tabs.Pane label="财务信息" name="3">
                                <Form labelPosition="left" model={this.props.partyData.form} labelWidth="170"
                                      onSubmit={this.onSubmit.bind(this)}>
                                    <div class="form_content">
                                        <div class="form_lf">
                                            <Form.Item label="资产合计">
                                                <Input value={this.props.partyData.form.asssum} placeholder=""
                                                       onChange={this.onChange.bind(this, 'asssum')}></Input>
                                            </Form.Item>
                                            <Form.Item label="家庭对外担保额">
                                                <Input value={this.props.partyData.form.guaramt} placeholder=""
                                                       onChange={this.onChange.bind(this, 'guaramt')}></Input>
                                            </Form.Item>
                                        </div>
                                        <div class="form_rt">
                                            <Form.Item label="负债合计">
                                                <Input value={this.props.partyData.form.debtsum} placeholder=""
                                                       onChange={this.onChange.bind(this, 'debtsum')}></Input>
                                            </Form.Item>
                                            <Form.Item label="家庭其他年收入">
                                                <Input value={this.props.partyData.form.othincpm} placeholder=""
                                                       onChange={this.onChange.bind(this, 'othincpm')}></Input>
                                            </Form.Item>
                                        </div>
                                    </div>
                                    <div class="form_content">
                                        <div class="form_lf" style={{paddingTop: "0px"}}>
                                            <Form.Item label="本人年债务性支出">
                                                <Input value={this.props.partyData.form.debtexpd} placeholder=""
                                                       onChange={this.onChange.bind(this, 'debtexpd')}></Input>
                                            </Form.Item>

                                        </div>
                                        <div class="form_rt" style={{paddingTop: "0px"}}>
                                            <Form.Item label="本人年生活保障支出">
                                                <Input value={this.props.partyData.form.debtexpd} placeholder=""
                                                       onChange={this.onChange.bind(this, 'debtexpd')}></Input>
                                            </Form.Item>
                                        </div>
                                    </div>
                                    <div class="form_content">
                                        <div class="form_lf" style={{paddingTop: "0px"}}>
                                            <Form.Item label="配偶年债务性支出">
                                                <Input value={this.props.partyData.form.pardebtexpd} placeholder=""
                                                       onChange={this.onChange.bind(this, 'pardebtexpd')}></Input>
                                            </Form.Item>

                                        </div>
                                        <div class="form_rt">

                                        </div>
                                    </div>
                                </Form>
                            </Tabs.Pane>
                            <Tabs.Pane label="联系信息" name="4">
                                <Form labelPosition="left" model={this.props.partyData.form} labelWidth="170"
                                      onSubmit={this.onSubmit.bind(this)}>
                                    <div class="form_content">
                                        <div class="form_lf">
                                            <Form.Item label="通信地址">
                                                <Radio.Group value={this.props.partyData.form.addr}
                                                             onChange={this.onChange.bind(this, 'addr')}>
                                                    <Radio.Button style={{marginBottom: "0px"}} value="居住地址"/>
                                                    <Radio.Button style={{marginBottom: "0px"}} value="单位地址"/>

                                                </Radio.Group>
                                            </Form.Item>
                                            <Form.Item label="固定电话">
                                                <Input value={this.props.partyData.form.teliprefix} placeholder=""
                                                       onChange={this.onChange.bind(this, 'teliprefix')}></Input>
                                            </Form.Item>
                                        </div>
                                        <div class="form_rt">

                                            <Form.Item label="电子邮箱">
                                                <Input value={this.props.partyData.form.email} placeholder=""
                                                       onChange={this.onChange.bind(this, 'email')}></Input>
                                            </Form.Item>

                                        </div>
                                    </div>
                                </Form>
                            </Tabs.Pane>
                        </Tabs>
                    </div>

                </SupplePage>
                {/*卡片点击新增联系人*/}
                <SupplePage style={{display: this.state.isAddParty === false ? "none" : "block"}}>
                    <NavBar
                        title={this.state.isLookorAdd === 1 ? "关系人信息 " : "新增关系人"}
                        lName={"取消"}
                        rName={this.state.isLookorAdd === 1 ? "删除" : ""}

                        lClick={() => this.setState({isAddParty: !this.state.isAddParty})}
                        rClick={() => {
                            this.setState({isAddParty: !this.state.isAddParty})
                            if (this.state.isLookorAdd === 1) {
                                // eslint-disable-next-line
                                mmspc.bridge.get(function (data) {
                                    that.props.partyActions.deleteRelated(data, JSON.parse("{\"clientId\":\"dc01db22-a682-4fee-\"}"));
                                })
                            }
                        }
                        }
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
                    <div style={{
                        height: window.innerHeight - this.getHeight(100),
                        overflowY: "auto",
                        overflowX: "hidden"
                    }}>
                        <div class="main_contanier">
                            <TabTitle title="证件信息" class="tabTitle orangeTabTitle"/>
                            <div class="form_content">
                                <div class="three_box">
                                    <div class="three_child_lf">
                                        <Form labelPosition="left" model={this.state.form} labelWidth="80"
                                              onSubmit={this.onSubmit.bind(this)}>
                                            <Form.Item label="证件类型">
                                                <Radio.Group value={this.state.radio3}
                                                             onChange={this.onChange.bind(this, 'radio3')}>
                                                    <Radio.Button value="身份证"/>
                                                </Radio.Group>
                                            </Form.Item>
                                            <Form.Item label="证件号码">
                                                <Input type="text" placeholder="请输入证件号码" value={this.state.cardNumber}
                                                       onChange={this.onChange.bind(this, 'cardNumber')}/>
                                                <button type="button" className="loading-button" onClick={() => {
                                                    // eslint-disable-next-line
                                                    mmspc.abcDevice.initDevice();
                                                    // eslint-disable-next-line
                                                    mmspc.abcDevice.readIDCardInfo("0", function (json) {
                                                        that.setState({
                                                            cardNumber: json.identityCardNumber,
                                                            cardName: json.fullName
                                                        });
                                                    }, function (error) {

                                                    }, 30000);

                                                }
                                                }>读取
                                                </button>

                                            </Form.Item>
                                            <Form.Item label="客户姓名">
                                                <Input id="card_name" type="text" size="small"
                                                       value={this.state.cardName}
                                                       onChange={this.onChange.bind(this, 'cardName')}></Input>
                                            </Form.Item>
                                        </Form>
                                    </div>
                                    <div class="three_child_rt">
                                        <ul class="img_box">
                                            <li>
                                                <div class="camera_box">
                                                    <img
                                                        src={this.state.frontImage ? this.state.frontImage : frontImage}
                                                        onClick={() => {
                                                            if (this.state.frontDisplay == "none") {
                                                                this.showImageViewer(this.state.frontImage, () => {
                                                                    navigator.camera.getPicture((data) => {
                                                                        this.setState({
                                                                            frontImage: "data:image/png;base64," + data,
                                                                            frontDisplay: "none"
                                                                        });
                                                                        this.state.frontDisplay = "none";
                                                                        this.setCheckState();
                                                                    }, (data) => {
                                                                    }, {quality: 50, destinationType: 0});
                                                                }, () => {
                                                                    this.setState({frontImage: null});
                                                                    this.state.frontDisplay = "inline";
                                                                    this.setCheckState()
                                                                });
                                                            }
                                                        }}/>
                                                    <p>
                                                        <img src={require("../../images/camera.png")}
                                                             style={{display: this.state.frontDisplay}} onClick={() => {
                                                            // eslint-disable-next-line
                                                            navigator.camera.getPicture((data) => {
                                                                this.setState({
                                                                    frontImage: "data:image/png;base64," + data,
                                                                    frontDisplay: "none"
                                                                });
                                                                this.state.frontDisplay = "none";
                                                                this.setCheckState();
                                                            }, (data) => {
                                                            }, {quality: 50, destinationType: 0});
                                                        }}/>
                                                    </p>
                                                </div>
                                                <p>请上传身份证头像面</p>

                                            </li>
                                            <li>
                                                <div class="camera_box">
                                                    <img src={this.state.backImage ? this.state.backImage : backImage}
                                                         onClick={() => {
                                                             if (this.state.backDisplay == "none") {
                                                                 this.showImageViewer(this.state.backImage, () => {
                                                                     navigator.camera.getPicture(function (data) {
                                                                         that.setState({
                                                                             backImage: "data:image/png;base64," + data,
                                                                             backDisplay: "none"
                                                                         });
                                                                         that.state.backDisplay = "none";
                                                                         that.setCheckState();
                                                                     }, function (data) {
                                                                     }, {quality: 50, destinationType: 0});
                                                                 }, () => {
                                                                     this.setState({backImage: null});
                                                                     this.state.backDisplay = "inline";
                                                                     this.setCheckState()
                                                                 });
                                                             }

                                                         }}/>
                                                    <p>
                                                        <img src={require("../../images/camera.png")}
                                                             style={{display: this.state.backDisplay}} onClick={() => {
                                                            // eslint-disable-next-line
                                                            navigator.camera.getPicture(function (data) {
                                                                that.setState({
                                                                    backImage: "data:image/png;base64," + data,
                                                                    backDisplay: "none"
                                                                });
                                                                that.state.backDisplay = "none";
                                                                that.setCheckState();
                                                            }, function (data) {
                                                            }, {quality: 50, destinationType: 0});

                                                        }}/>
                                                    </p>
                                                </div>
                                                <p>请上传身份证国徽面</p>
                                            </li>

                                        </ul>
                                    </div>
                                </div>
                                <div class="three_box_rt">
                                    <div style={{display: !this.props.instData.netCheck ? "inline" : "none"}}>
                                        <Button type="primary" style={{height: 70, width: 70}}
                                                disabled={!this.state.netCheckState}
                                                textStyle={{fontSize: 18, lineHeight: 1.3, whiteSpace: 'normal'}}
                                                onClick={() => {
                                                    if (reg.test(this.state.cardNumber) == false) {
                                                        // eslint-disable-next-line
                                                        mmspc.dialog.toast("身份证号码格式不正确");
                                                    } else {
                                                        if (this.state.netCheckState) {
                                                            this.setState({
                                                                loadingContent: "联网核查...",
                                                                fullscreen: true
                                                            });
                                                            // eslint-disable-next-line
                                                            mmspc.nativeRequest.init();
                                                            // eslint-disable-next-line
                                                            mmspc.bridge.get((appId) => {
                                                                // this.props.netActions.addCustomer(appId ,JSON.parse("{}"));
                                                                this.props.netActions.addCustomer(appId, "{\"cliname\":" + "\"" + this.state.cardName + "\",\"certno\":" + "\"" + this.state.cardNumber + "\"}");
                                                                // this.props.netActions.netcheck(appId);
                                                                // eslint-disable-next-line
                                                                // mmspc.nativeRequest.get("http://219.142.79.229:8989/mmsp-ps/forward/"+appId+"/rest/pub/access/onlinecheck?clientId=易贤武&userId=360731199110284813"
                                                                //     ,success , fail);
                                                            });

                                                            function success() {
                                                                that.setState({
                                                                    nextBg: "#FFA400",
                                                                    nextBorder: "#FFA400",
                                                                    nextState: true,
                                                                    loadingContent: "联网核查...",
                                                                    fullscreen: false,
                                                                    check: "none",
                                                                    checkSuccess: "inline"
                                                                });
                                                            }

                                                            function fail() {
                                                                this.setState({
                                                                    loadingContent: "联网核查...",
                                                                    fullscreen: false
                                                                });
                                                            }
                                                        }

                                                    }
                                                }}>联网核查</Button>

                                    </div>
                                    <div style={{display: this.props.instData.netCheck ? "inline" : "none"}}>
                                        <img src={require("../../images/success_iocn.png")}
                                             width="75%" height="75%"/>
                                        <p style={{color: "#00CD00"}}>核查通过</p>
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
                                                <img class="whiteTabTitle" src={require("../../images/signature.png")}
                                                     width="100px" height="auto"
                                                     onClick={() => this.setState({
                                                         isJump: !this.state.isJump,
                                                         dialogVisible: false
                                                     })
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
                                                             this.setState({
                                                                 showCreditFinished: "block",
                                                                 dialogVisible: false,
                                                                 isShowPhotoSign: "photo"
                                                             });
                                                         }, errData => {
                                                             alert("error");
                                                         }, {quality: 50, destinationType: 0});
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
                                                         style={{flex: 1, margin: '5% auto 0'}}
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
                                                 <img src={pagePic} width="800px" height="100%"/>
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
                                                            onClick={() => this.setState({
                                                                showQuery: "block",
                                                                isShow: true
                                                            })}>
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
                                            </li>
                                            <li style={{display: this.state.showIdentity}}>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="three_box_rt">
                                    </div>

                                </div>
                            </div>


                            <Tabs activeName="1" onTabClick={(tab) => console.log(tab.props.name)}>
                                <Tabs.Pane label="基本信息" name="1">
                                    <Form labelPosition="left" model={this.props.partyData.form} labelWidth="120"
                                          onSubmit={this.onSubmit.bind(this)}>
                                        <div class="form_content_col">
                                            <ul class="form_content_row">
                                                <li class="form_lf">
                                                    <Form.Item label="是否共同借款人">
                                                        <Radio.Group value={this.props.partyData.form.isrel}
                                                                     onChange={this.onChange.bind(this, 'isrel')}>
                                                            <Radio.Button style={{marginBottom: "0px"}} value="是"/>
                                                            <Radio.Button style={{marginBottom: "0px"}} value="否"/>
                                                        </Radio.Group>
                                                    </Form.Item>
                                                </li>
                                                <li class="form_rt">
                                                    <Form.Item label="关系人类型">
                                                        <Radio.Group value={this.props.partyData.form.reltype}
                                                                     onChange={this.onChange.bind(this, 'reltype')}>
                                                            <Radio.Button value="夫"/>
                                                            <Radio.Button value="妻"/>
                                                            <Radio.Button value="子"/>
                                                            <Radio.Button value="女"/>
                                                            <Radio.Button value="父母"/>
                                                            <Radio.Button value="其他"/>
                                                        </Radio.Group>
                                                    </Form.Item>
                                                </li>

                                            </ul>


                                            <ul class="form_content_row">
                                                <li class="form_lf">
                                                    <Form.Item label="文化程度">
                                                        <Radio.Group value={this.props.partyData.form.edulevel}
                                                                     onChange={this.onChange.bind(this, 'edulevel')}
                                                                     appendix="更多"
                                                                     onAppendixClick={this.onEducateAppendClick.bind(this)}>
                                                            {
                                                                this.state.list.map(function (item, i) {
                                                                    return (
                                                                        i < showLength + 1 ?
                                                                            <Radio.Button key={i} value={item}/> : ''

                                                                    )
                                                                })

                                                            }
                                                            <Radio.Button style={{marginBottom: "0px"}} value="更多"/>
                                                        </Radio.Group>
                                                    </Form.Item>
                                                    <Dialog
                                                        size="small"
                                                        visible={this.state.selectDialogVisible}
                                                        title='对话框'
                                                        // onCancel={ () => this.setState({ selectDialogVisible: false,types:this.state.types}) }
                                                        onCancel={() => this.setState({selectDialogVisible: false})}

                                                        lockScroll={false}
                                                        className='mmpsc-select-list-dialog'
                                                    >
                                                        <Dialog.Body>
                                                            <SelectList ref="educationSL"
                                                                        visible={this.state.selectDialogVisible}
                                                                        value={this.props.partyData.form.edulevel}
                                                                        multiple={false} onChange={(val) => {
                                                                this.removeByValue(this.state.list, val)
                                                                this.state.list.unshift(val)
                                                                this.onChange('edulevel', val)
                                                                this.setState({selectDialogVisible: false})
                                                                this.refs.educationSL.setState({selected: null});
                                                            }}>
                                                                {
                                                                    this.state.list.map(function (item, i) {
                                                                        return i > showLength ?
                                                                            <SelectList.Option key={i} label={item}
                                                                                               value={item}/> : ''
                                                                    })
                                                                }

                                                            </SelectList>
                                                        </Dialog.Body>
                                                    </Dialog>

                                                </li>
                                                <li class="form_rt">
                                                    <Form.Item label="婚姻状况">
                                                        <Radio.Group value={this.props.partyData.form.marrysta}
                                                                     onChange={this.onChange.bind(this, 'marrysta')}>
                                                            <Radio.Button value="已婚"/>
                                                            <Radio.Button value="未婚"/>
                                                            <Radio.Button value="离异"/>
                                                            <Radio.Button value="丧偶"/>
                                                            <Radio.Button value="其他"/>
                                                        </Radio.Group>
                                                    </Form.Item>
                                                </li>
                                            </ul>
                                            <ul class="form_content_row">
                                                <li class="form_lf">
                                                    <Form.Item label="手机号码">
                                                        <Input size="small" value={this.props.partyData.form.mobno}
                                                               placeholder="请输入手机号"
                                                               onChange={this.onChange.bind(this, 'mobno')}></Input>
                                                    </Form.Item>
                                                </li>
                                                <li class="form_rt">
                                                    <Form.Item label="本人年税后收入">
                                                        <Input size="small"
                                                               value={this.props.partyData.form.myselfincpm}
                                                               placeholder="20万"
                                                               onChange={this.onChange.bind(this, 'myselfincpm')}></Input>
                                                    </Form.Item>
                                                </li>

                                            </ul>
                                            <ul class="form_content_row">
                                                <li class="form_lf">
                                                    <Form.Item label="配偶年税后收入">
                                                        <Input size="small" value={this.props.partyData.form.parincpm}
                                                               placeholder="配偶年税后收入"
                                                               onChange={this.onChange.bind(this, 'parincpm')}></Input>
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
                            <div class="footer_content">
                                <div class="footer_content_lf">
                                    <Button plain={true} type="info" size="large"
                                        /* 信息补录时需要set一下isAddParty的状态，不然isInfoShow的状态改变不会立即渲染； 信息补录关闭时需要注意这种情况*/
                                            onClick={() => this.setState({
                                                isInfoShow: !this.state.isInfoShow,
                                                isAddParty: !this.state.isAddParty
                                            })}>信息补录</Button>
                                </div>
                                <div class="footer_content_rt">
                                    <Button type="warning" size="large"
                                            onClick={() => {
                                                this.setState({isAddParty: !this.state.isAddParty})
                                                if (this.state.isLookorAdd) {
                                                    //传递一个当前id。--确认修改
                                                    // eslint-disable-next-line
                                                    mmspc.bridge.get(function (data) {
                                                        that.props.partyActions.postPartyInfo(data, this.state.clickId);
                                                    })
                                                } else {
                                                    // eslint-disable-next-line
                                                    mmspc.bridge.get(function (data) {
                                                        that.props.partyActions.postPartyInfo(data, this.props.partyData.form);
                                                    })
                                                }
                                            }}>
                                        {this.state.isLookorAdd === 1 ? "确认修改" : "新增关系人"}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </SupplePage>
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


        )
    }
}

Party.contextTypes = {
    jumpTo: PropTypes.func,
    getListValue: PropTypes.func
};
export default connect(mapStateToProps, mapDispatchToProps)(Party);