import React from 'react';
import {Component} from '../../components/libs'
// import 'element-theme-default';
// import { Form,Input,Button,Layout,Tabs,Select,DatePicker } from 'element-react';
import {
    Form,
    Input,
    Button,
    Layout,
    Tabs,
    Select,
    DatePicker,
    Dialog,
    ImageViewer,
    MessageBox
} from "../../components/index";
import './style/collect.css'
import '../publicCss/public.css'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {Map} from "immutable";
import * as loanActions from "../../actions/loan";
import * as homeActions from "../../actions/home";
import * as fileActions from "../../actions/file";
import * as borrowerActions from "../../actions/borrower";
import * as loginActions from "../../actions/login";

var loanerList = "";  //贷款人影像
var relateList = "";  // 关系人影像
var loanInfoFirstList = ""; // 贷款信息影像  ---一手房
var loanInfoSecondList = ""; // 贷款信息影像  --- 二手房
var userDefineList ="";//自定义资料
var userDefineShowList = ""; //自定义资料
var loanerShowList = ""; // 贷款人影像是否显示
var relateShowList = "";  // 关系人影像是否显示
var loanInfoFirstShowList = ""; // 贷款影像是否显示 ---一手房
var loanInfoSecondShowList = ""; // 贷款影像是否显示 ---二手房
var imageList = "";
var image = require("../../images/certificate_back.png");
var userDefineImage = require("../../images/add.png");
var loanPicList = ["借款人有效证件", "征信查询授权书", "户籍证明", "还款能力证明", "婚姻状态证明"];
var relatePicList = ["关系人有效证件", "征信查询授权书", "户籍证明", "还款能力证明", "婚姻状态证明"];
// 一手房
var loanInfoPicFirstList = ["电子业务申请书", "纸质业务申请书", "购房合同", "首付款证明", "购房资格查询文件", "还款账户", "公积金贷款资料", "面谈笔录"];
// 二手房
var loanInfoPicSecondList = ["电子业务申请书", "纸质业务申请书", "购房合同", "首付款证明", "购房资格查询文件", "所购房屋产权证件", "租房人及房屋公有权人相关资料", "收款账号", "还款账号", "个人二手房购房担保借款授权书", "同意抵押承诺书", "评估报告", "面谈目录", "公积金贷款资料"];
var loanerPageIdList = [[] , [] , [] , [] , []];
var relatePageIdList = [[] , [] , [] , [] , []];
var loanPageIdFirstList = [[] , [] , [] , [] , [] ,[] , [] , []];
var loanPageIdSecondList = [[] , [] , [] , [] , [] ,[] , [] , [] , [] , [] ,[] , [] , [] , [] ];
var customList = [];
var pageList = ["借款人影像", "关系人影像", "贷款资料影像", "其他自定义资料"];

var userDefinePicList = [];
var userDefinePageIdList = [[] , [] , [] , [] , [] , [] , [] , [] , [] , [] ,[] ];

const actions = [
    homeActions, loginActions, borrowerActions, loanActions, fileActions
]

function mapStateToProps(state) {
    const {home} = state;
    const {client} = state;
    return {
        home, client
    };
}

function mapDispatchToProps(dispatch) {
    const creators = Map()
        .merge(...actions)
        .filter(value => typeof value === 'function')
        .toObject();
    return {
        picActions: bindActionCreators(creators, dispatch)
    };
}


class Collect extends Component {
    constructor(props) {
        super(props);

        this.state = {
            addUserDefineDialog: false,
            infoName: '',
            showUserDefine: false,
            collectInfo:false,
            dialogVisible: false, // 要不要show
            // 借款人
            certImage1: image,
            creditImage1: image,
            houseHoldImage1: image,
            repayImage1: image,
            marryImage1: image,

            show11: false,
            show12: false,
            show13: false,
            show14: false,
            show15: false,


            // 关系人影像
            certImage2: image,
            creditImage2: image,
            houseHoldImage2: image,
            repayImage2: image,
            marryImage2: image,

            show21: false,
            show22: false,
            show23: false,
            show24: false,
            show25: false,


            // 贷款资料影像 一手房
            eleBusinessFirstImage: image, // 电子业务申请书
            pageBusinessFirstImage: image, // 纸质业务申请书
            contractFirstImage: image, // 购房合同
            firstPayFirstImage: image, // 首付款证明
            houseAccessFirstImage: image, //购房资格查询文件
            repayAccountFirstImage: image, // 还款账户
            fundLoanFirstImage: image,// 公积金贷款资料
            recordImageFirst: image, // 面谈笔录

            // 贷款资料影像 一手房
            eleBusinessSecondImage: image, // 电子业务申请书
            pageBusinessSecondImage: image, // 纸质业务申请书
            contractSecondImage: image,// 购房合同
            firstPaySecondImage: image,// 首付款证明
            houseAccessSecondImage: image, //购房资格查询文件
            housePropertySecondIMage: image, // 所购房屋产权证件
            relateSecondImage: image, // 租房人及房屋公有权人相关资料
            acceptAccountSecondImage: image, // 收款账号
            repayAccountSecondImage: image, // 还款账号
            guarAuthSecondImage: image, // 个人二手房购房担保借款授权书
            acceptMortgageSecondImage: image, //同意抵押承诺书
            evaluateReportSecondImage: image, // 评估报告
            recordSecondImage: image, // 面谈目录
            fundLoanSecondImage: image, // 公积金贷款资料


            show31: false,
            show32: false,
            show33: false,
            show34: false,
            show35: false,
            show36: false,
            show37: false,
            show38: false,
            // 自定义资料
            userDefine1: image,
            userDefine2: image,
            userDefine3: image,
            userDefine4: image,
            userDefine5: image,
            userDefine6: image,
            userDefine7: image,
            userDefine8: image,
            userDefine9: image,
            userDefine10: image,

            show55: false,
            show56: false,
            show57: false,
            show58: false,
            show59: false,
            show60: false,
            show61: false,
            show62: false,
            show63: false,
            show64: false,

            // 图片上传对应的类字段
            file: {
                imageBase64: "",
                oprId: "",
                pageId: "",
                pageName: "图片",
                pageType: "jpg",
            }
        }
    }

    componentDidMount() {
        userDefineList = [
            "userDefine1",
            "userDefine2",
            "userDefine3",
            "userDefine4",
            "userDefine5",
            "userDefine6",
            "userDefine7",
            "userDefine8",
            "userDefine9",
            "userDefine10",
        ]
        userDefineShowList = [
            this.state.show55,
            this.state.show56,
            this.state.show57,
            this.state.show58,
            this.state.show59,
            this.state.show60,
            this.state.show61,
            this.state.show62,
            this.state.show63,
            this.state.show64,
        ]
        loanerList = [
            "certImage1",
            "creditImage1",
            "houseHoldImage1",
            "repayImage1",
            "marryImage1",
        ]
        loanInfoFirstList = [
            "eleBusinessFirstImage", // 电子业务申请书
            "pageBusinessFirstImage", // 纸质业务申请书
            "contractFirstImage", // 购房合同
            "firstPayFirstImage", // 首付款证明
            "houseAccessFirstImage", //购房资格查询文件
            "repayAccountFirstImage", // 还款账户
            "fundLoanFirstImage",// 公积金贷款资料
            "recordImageFirst", // 面谈笔录
        ]
        loanInfoSecondList = [
            "eleBusinessSecondImage", // 电子业务申请书
            "pageBusinessSecondImage", // 纸质业务申请书
            "contractSecondImage",// 购房合同
            "firstPaySecondImage",// 首付款证明
            "houseAccessSecondImage", //购房资格查询文件
            "housePropertySecondImage", // 所购房屋产权证件
            "relateSecondImage", // 租房人及房屋公有权人相关资料
            "acceptAccountSecondImage", // 收款账号
            "repayAccountSecondImage", // 还款账号
            "guarAuthSecondImage", // 个人二手房购房担保借款授权书
            "acceptMortgageSecondImage", //同意抵押承诺书
            "evaluateReportSecondImage", // 评估报告
            "recordSecondImage", // 面谈目录
            "fundLoanSecondImage", // 公积金贷款资料
        ]
        relateList = [
            "certImage2",
            "creditImage2",
            "houseHoldImage2",
            "repayImage2",
            "marryImage2",
        ]
        loanerShowList = [
            this.state.show11,
            this.state.show12,
            this.state.show13,
            this.state.show14,
            this.state.show15,
        ]
        relateShowList = [
            this.state.show21,
            this.state.show22,
            this.state.show23,
            this.state.show24,
            this.state.show25,
        ]
        loanInfoFirstShowList = [
            this.state.show31,
            this.state.show32,
            this.state.show33,
            this.state.show34,
            this.state.show35,
            this.state.show36,
            this.state.show37,
            this.state.show38,
        ]
        loanInfoSecondShowList = [
            this.state.show41,
            this.state.show42,
            this.state.show43,
            this.state.show44,
            this.state.show45,
            this.state.show46,
            this.state.show47,
            this.state.show48,
            this.state.show49,
            this.state.show50,
            this.state.show51,
            this.state.show52,
            this.state.show53,
            this.state.show54,
        ]

    }

    showImageViewer(src, onRetake, onDelete) {
        ImageViewer.show(src).then((action) => {
            switch (action) {
                case 'retake':
                    onRetake();
                    break;
                case 'delete':
                    onDelete();
                    break;
                default:
                    break;
            }
        }).catch(() => {
        });
    }

    showMultiImageViewer(src, config, onRetake, onDelete, onAdd) {
        let props = Object.assign(config, {
            onRetakeButtonClick: onRetake,
            onDeleteButtonClick: onDelete,
            onAddButtonClick: onAdd
        });
        ImageViewer.showMultiple(src, props);
    }

    setComplete(cur) {
        let value = this.context.getListValue();
        value[cur] = 2;
        return value;
    }

    onChange(key, value) {
        this.state[key] = value;
        this.setState({
            [key]: value,
        });
    }

    // 第一个参数是选择的position ，第二个参数是page的页码
    onSelected(id, page) {
        var imageList = null;
        var clickList = null;
        var picNameList = null;
        var groupId = "";
        var pageIdList = [];
        if (page == 1) {
            imageList = loanerList;
            clickList = loanerShowList;
            picNameList = loanPicList;
            pageIdList = loanerPageIdList;
            groupId = "0101";
        } else if (page == 2) {
            imageList = relateList;
            clickList = relateShowList;
            picNameList = relatePicList;
            pageIdList = relatePageIdList;
            groupId = "0201";
        } else if (page == 3) {
            imageList = this.props.home.optkind == "1" ? loanInfoFirstList : loanInfoSecondList;
            clickList = this.props.home.optkind == "1" ? loanInfoFirstShowList : loanInfoSecondShowList;
            picNameList = this.props.home.optkind == "1" ? loanInfoPicFirstList : loanInfoPicSecondList;
            pageIdList = this.props.home.optkind == "1" ? loanPageIdFirstList : loanPageIdSecondList;
            groupId = "0301";
        } else if (page == 4) {
            //        imageList = userDefineList;
            //        clickList = userDefineShowList;
            picNameList = userDefinePicList;
            pageIdList = userDefinePageIdList;
            groupId = "0401";
        }
        if (id <= 9) {
            groupId = groupId + "0" + (id + 1);
        } else {
            groupId += id;
        }
        if (clickList[id]) {
            this.showMultiImageViewer(this.state[imageList[id]], {showActionButtons: true, showAdd: true},
                (callback , position) => {
                    this.state.file.pageId = pageIdList[id][position];
                    var fileDesp = picNameList[id];
                    // eslint-disable-next-line
                    mmspc.customCamera.openRectCamera(
                        (data) => {
                            // 替换图片
                            this.state.file.imageBase64 = data;
                            this.state.file.oprId = "R";
                            this.props.picActions.updateFile("{\"fileDesp\":\"" + fileDesp + "\",\"groupId\":\"" + groupId + "\",\"workId\":\"" + this.props.client.procsId + "\",\"uploadPageList\":[" + JSON.stringify(this.state.file) + "]}",
                                (successData) => {
                                    this.props.picActions.loading(false);
                                    clickList[id] = true;
                                    let newSrc = callback("data:image/png;base64," + data);
                                    this.setState({[imageList[id]]: newSrc});
                                    if (JSON.parse(successData).data.length != 0) {
                                        pageIdList[id][position] = JSON.parse(successData).data[0].pageId;
                                    }
                                }, () => {
                                    this.props.picActions.loading(false);
                                });

                        },
                        function (data) {
                        }, "/"+this.props.client.procsId+ "/" + pageList[page-1] + "/" + fileDesp + "/" + groupId + position + ".jpg");
                },//重拍
                (callback , position) => {
                    this.state.file.imageBase64 = "image";
                    this.state.file.oprId = "D";
                    this.state.file.pageId = pageIdList[id][position];
                    var fileDesp = picNameList[id];
                    this.props.picActions.updateFile("{\"fileDesp\":\"" + fileDesp + "\",\"groupId\":\"" + groupId + "\",\"workId\":\"" + this.props.client.procsId + "\",\"uploadPageList\":[" + JSON.stringify(this.state.file) + "]}",
                        (successData) => {
                            this.props.picActions.loading(false);
                            let newSrc = callback();
                            this.setState({[imageList[id]]: newSrc});
                            if (newSrc == null || Array.isArray(newSrc) && newSrc.length < 1) clickList[id] = false;
                            pageIdList[id].splice(position , 1);

                        }, () => {
                            this.props.picActions.loading(false);
                        });

                },//删除
                (callback ,position) => {
                    var fileDesp = picNameList[id];
                    // eslint-disable-next-line
                    mmspc.customCamera.openRectCamera(
                        (data) => {
                            this.state.file.imageBase64 = data;
                            this.state.file.oprId = "";
                            this.props.picActions.uploadFile("{\"fileDesp\":\"" + fileDesp + "\",\"groupId\":\"" + groupId + "\",\"workId\":\"" + this.props.client.procsId + "\",\"uploadPageList\":[" + JSON.stringify(this.state.file) + "]}",
                                (successData) => {
                                    this.props.picActions.loading(false);
                                    clickList[id] = true;
                                    let newSrc = callback("data:image/png;base64," + data);
                                    this.setState({[imageList[id]]: newSrc});
                                    if (JSON.parse(successData).data.length != 0) {
                                        pageIdList[id][position] = JSON.parse(successData).data[0].pageId;
                                    }
                                }, () => {
                                    this.props.picActions.loading(false);
                                });
                        }, function (data) {
                        }, "/"+this.props.client.procsId+"/" + pageList[page-1] + "/" + fileDesp + "/" + groupId + position + ".jpg");
                }//添加
            );

        } else {
            var fileDesp = picNameList[id];
            // eslint-disable-next-line
            mmspc.customCamera.openRectCamera(data => {
                // 上传图片
                this.state.file.imageBase64 = data;
                this.state.file.oprId = "";
                this.state.file.pageId = pageIdList[id][0];

                this.props.picActions.uploadFile("{\"fileDesp\":\"" + fileDesp + "\",\"groupId\":\"" + groupId + "\",\"workId\":\"" + this.props.client.procsId + "\",\"uploadPageList\":[" + JSON.stringify(this.state.file) + "]}",
                    (successData) => {
                        this.props.picActions.loading(false);
                        clickList[id] = true;
                        this.setState({[imageList[id]]: "data:image/png;base64," + data});
                        if (JSON.parse(successData).data.length != 0) {
                            pageIdList[id][0] = JSON.parse(successData).data[0].pageId;
                        }
                    }, () => {
                        this.props.picActions.loading(false);
                    });


            }, () => {

            }, "/"+this.props.client.procsId+"/" + pageList[page-1] + "/" + fileDesp + "/" + groupId+ "0.jpg")
        }

    }

    onMessageBox() {
        MessageBox.confirm('资料名称', '新增自定义资料', {showClose: false, showInput: true}).then(() => {
            this.setState({showUserDefine: true});
        }).catch(() => {

        });
    }

    render() {
        return (
            <div style={{height: window.innerHeight - this.getHeight(100)}}>
                <div className={"tabPan scrollauto"}>

                    <div>
                        {
                            this.props.home.pageSelected==5&&
                            !this.state.collectInfo&&
                            // eslint-disable-next-line
                            mmspc.bridge.get((appId)=>{
                                this.state.collectInfo = true;
                                this.props.picActions.downloadFile(JSON.parse("{\"workId\":\""+this.props.client.procsId+"\"}"),(data)=>{
                                        this.props.picActions.loading(false);
                                        var returnList = JSON.parse(data).data;
                                        returnList.map((option , position)=>{
                                            if (option.groupId.startsWith("01")){
                                                var imageList = loanerList;
                                                loanPicList.map((name , index)=>{
                                                    var fileList = [];
                                                    option.pageReturnList.map((image , i)=>{
                                                        fileList[i] = "data:image/png;base64," + image.file;
                                                    })
                                                    if (name == option.fileDesp){
                                                        this.setState({[imageList[index]]:fileList});
                                                        loanerShowList[index] = true;
                                                    }
                                                });

                                            }else if (option.groupId.startsWith("02")){
                                                var imageList = relateList;
                                                relatePicList.map((name , index)=>{
                                                    var fileList = [];
                                                    option.pageReturnList.map((image , i)=>{
                                                        fileList[i] = "data:image/png;base64," + image.file;
                                                    })
                                                    if (name == option.fileDesp){
                                                        this.setState({[imageList[index]]:fileList});
                                                        relateShowList[index]= true;
                                                    }
                                                });
                                            }else if (option.groupId.startsWith("03")){
                                                var imageList = this.props.home.optkind == "1" ? loanInfoFirstList : loanInfoSecondList;
                                                (this.props.home.optkind == "1" ? loanInfoPicFirstList : loanInfoPicSecondList).map((name , index)=>{
                                                    var fileList = [];
                                                    option.pageReturnList.map((image , i)=>{
                                                        fileList[i] = "data:image/png;base64," + image.file;
                                                    })
                                                    if (name == option.fileDesp){
                                                        this.setState({[imageList[index]]:fileList});
                                                        (this.props.home.optkind == "1" ? loanInfoFirstShowList : loanInfoSecondShowList)[index] = true;
                                                    }
                                                });
                                            }else{

                                            }
                                        });
                                    },
                                    ()=>{
                                        this.props.picActions.loading(false);
                                    });
                            })
                        }
                    </div>
                    <Tabs activeName="1" onTabClick={(tab) => console.log(tab.props.name)}>
                        <Tabs.Pane label="借款人影像" name="1">
                            <div class="collectBox">

                                <Layout.Row gutter="12" style={{marginTop: "8px"}}>
                                    {
                                        loanPicList.map((option, position) => {
                                            return <Layout.Col span="6">
                                                <div className="grid-content bg-purple layoutBoxs">
                                                    <img id="tab11" style={{marginTop: "8px", height: "100px"}}
                                                         src={(this.state[loanerList[position]]) ? (Array.isArray(this.state[loanerList[position]]) ? this.state[loanerList[position]][0] : this.state[loanerList[position]]) : image}
                                                         class="collect_img" onClick={() => {
                                                        this.onSelected(position, 1)
                                                    }}></img>

                                                    <span class="collect_span"
                                                          style={{marginTop: "8px"}}>{option}</span>

                                                </div>
                                            </Layout.Col>
                                        })
                                    }


                                </Layout.Row>

                            </div>
                            <div className="loan_footer">
                                <div className="footer_content">
                                    <div className="footer_content_rt">
                                        <Button type="warning" size="large" onClick={() => {
                                            // this.context.jumpTo(6, this.setComplete.bind(this)(5));
                                            // eslint-disable-next-line
                                            mmspc.pdf.build("用户0815 412801198304100815", this.props.client.procsId ,() => {
                                                // eslint-disable-next-line
                                                mmspc.dialog.toast("PDF创建成功！");
                                            }, () => {

                                            });
                                        }}>{pageList[0]}</Button>
                                    </div>
                                </div>
                            </div>
                        </Tabs.Pane>
                        <Tabs.Pane label="关系人影像" name="2">
                            <div class="collectBox">

                                {/*<span style={{fontSize:"13px"}}>关小明</span>*/}
                                <Layout.Row gutter="12" style={{marginTop: "8px"}}>
                                    {
                                        relatePicList.map((option, position) => {
                                            return <Layout.Col span="6">
                                                <div className="grid-content bg-purple layoutBoxs">
                                                    <img style={{marginTop: "8px", height: "100px"}}
                                                         src={(this.state[relateList[position]]) ? (Array.isArray(this.state[relateList[position]]) ? this.state[relateList[position]][0] : this.state[relateList[position]]) : image}
                                                         class="collect_img" onClick={() => {
                                                        this.onSelected(position, 2)
                                                    }}></img>
                                                    <span class="collect_span"
                                                          style={{marginTop: "8px"}}>{option}</span>

                                                </div>
                                            </Layout.Col>
                                        })
                                    }

                                </Layout.Row>
                            </div>
                            <div className="loan_footer">
                                <div className="footer_content">
                                    <div className="footer_content_rt">
                                        <Button type="warning" size="large" onClick={() => {
                                            this.context.jumpTo(6, this.setComplete.bind(this)(5));
                                            // eslint-disable-next-line
                                            mmspc.pdf.build("用户0815 412801198304100815", this.props.client.procsId ,() => {
                                                // eslint-disable-next-line
                                                mmspc.dialog.toast("PDF创建成功！");
                                            }, () => {

                                            });
                                        }}>{pageList[1]}</Button>
                                    </div>
                                </div>
                            </div>
                        </Tabs.Pane>
                        <Tabs.Pane label="贷款资料影像" name="3">
                            <div class="collectBox">

                                <Layout.Row gutter="12" style={{marginTop: "8px"}}>
                                    {
                                        (this.props.home.optkind == "1" ? loanInfoPicFirstList : loanInfoPicSecondList).map((option, position) => {
                                            return <Layout.Col span="6">
                                                <div className="grid-content bg-purple layoutBoxs">
                                                    <img id="tab11" style={{marginTop: "8px", height: "100px"}}
                                                         src={(this.state[(this.props.home.optkind == "1" ? loanInfoFirstList : loanInfoSecondList)[position]]) ? (Array.isArray(this.state[(this.props.home.optkind == "1" ? loanInfoFirstList : loanInfoSecondList)[position]]) ? this.state[(this.props.home.optkind == "1" ? loanInfoFirstList : loanInfoSecondList)[position]][0] : this.state[(this.props.home.optkind == "1" ? loanInfoFirstList : loanInfoSecondList)[position]]) : image}

                                                         class="collect_img" onClick={() => {
                                                        this.onSelected(position, 3)
                                                    }}></img>

                                                    <span class="collect_span"
                                                          style={{marginTop: "8px"}}>{option}</span>

                                                </div>
                                            </Layout.Col>
                                        })
                                    }
                                </Layout.Row>
                            </div>
                            <div className="loan_footer">
                                <div className="footer_content">
                                    <div className="footer_content_rt">
                                        <Button type="warning" size="large" onClick={() => {
                                            this.context.jumpTo(6, this.setComplete.bind(this)(5));
                                            // eslint-disable-next-line
                                            mmspc.pdf.build("用户0815 412801198304100815", this.props.client.procsId ,() => {
                                                // eslint-disable-next-line
                                                mmspc.dialog.toast("PDF创建成功！");
                                            }, () => {

                                            });
                                        }}>{pageList[2]}</Button>
                                    </div>
                                </div>
                            </div>
                        </Tabs.Pane>
                        <Tabs.Pane label="其他自定义资料" name="4">
                            <div class="collectBox"
                                 style={{display: this.state.showUserDefine != true ? "none" : "block"}}>

                                {/*<span style={{fontSize:"13px"}}>关小明</span>*/}
                                <Layout.Row gutter="12" style={{marginTop: "8px"}}>
                                    {
                                        userDefinePicList.map((option, position) => {
                                            return <Layout.Col span="6">
                                                <div className="grid-content bg-purple layoutBoxs">
                                                    {
                                                        <img style={{marginTop: "8px", height: "100px"}}
                                                             src={position == (userDefinePicList.length - 1) ? userDefineImage : image}
                                                             class="collect_img" onClick={() => {
                                                                 if(position == (userDefinePicList.length - 1)){
                                                                     this.setState({addUserDefineDialog: true})
                                                                 }else{
                                                                     this.onSelected(position, 4)
                                                                 }
                                                        }}></img>
                                                    }
                                                    <span class="collect_span"
                                                          style={{marginTop: "8px"}}>{option}</span>
                                                </div>
                                            </Layout.Col>
                                        })
                                    }

                                </Layout.Row>
                            </div>

                            <div class="form_content "
                                 style={{display: this.state.showUserDefine != true ? "block" : "none"}}>
                                <div class="center_box">
                                    <div class="addcontact">
                                        <div>
                                            {/*<img src={require("../../images/add.png")} width="58px" height="58px" onClick={this.onMessageBox.bind(this)}/>*/}
                                            <img src={require("../../images/add.png")} width="58px" height="58px"
                                                 onClick={() => {
                                                     this.setState({addUserDefineDialog: true})
                                                 }}/>
                                            <p>新增自定义资料</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="loan_footer">
                                <div className="footer_content">
                                    <div className="footer_content_rt">
                                        <Button type="warning" size="large" onClick={() => {
                                            this.context.jumpTo(6, this.setComplete.bind(this)(5));
                                            // eslint-disable-next-line
                                            mmspc.pdf.build("用户0815 412801198304100815", this.props.client.procsId ,() => {
                                                // eslint-disable-next-line
                                                mmspc.dialog.toast("PDF创建成功！");
                                            }, () => {

                                            });
                                        }}>{pageList[3]}</Button>
                                    </div>
                                </div>
                            </div>
                        </Tabs.Pane>


                    </Tabs>
                </div>
                <Dialog
                    title="新增自定义资料"
                    visible={this.state.addUserDefineDialog}
                    onCancel={() => this.setState({addUserDefineDialog: false})}
                >
                    <Dialog.Body>
                        <Form>
                            <Form.Item label="资料名称" labelWidth="120">
                                <Input value={this.state.infoName}
                                       onChange={this.onChange.bind(this, 'infoName')}></Input>
                            </Form.Item>
                        </Form>
                    </Dialog.Body>
                    <Dialog.Footer>
                        <Button onClick={() => this.setState({addUserDefineDialog: false})}>取 消</Button>
                        <Button type="primary" onClick={() => {
                            if (userDefinePicList.indexOf("新增自定义资料") > -1) {
                                var length = userDefinePicList.length;
                                userDefinePicList.splice(length - 1, 0, this.state.infoName);
                                this.setState({addUserDefineDialog: false, showUserDefine: true});
                            } else {
                                var length = userDefinePicList.length;
                                userDefinePicList.splice(length, 0, this.state.infoName);
                                userDefinePicList.push("新增自定义资料");
                                this.setState({addUserDefineDialog: false, showUserDefine: true});
                            }
                        }
                        }>
                            确 定
                        </Button>
                    </Dialog.Footer>
                </Dialog>
            </div>
        );

    }
}

Collect.contextTypes = {
    jumpTo: PropTypes.func,
    getListValue: PropTypes.func
};
export default connect(mapStateToProps, mapDispatchToProps)(Collect);