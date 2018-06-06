import React from 'react';
import {Component}from '../../components/libs'
// import TabTitle from '../../ma-ui/TabTitle'
import "./style/card.css"
import PropTypes from 'prop-types';
import lazyLoadComponent from 'lazy-load-component';
// import Radio from '../../ma-ui/radio';
// import 'element-theme-default';
// import '../loanInformation/style/loan.css'
import {Form,Input,Button,Layout,Tabs,Select,Radio,TabTitle ,Dialog ,SelectList ,Loading,ImageViewer} from "../../components/index";
import '../publicCss/public.css'
import * as homeActions from '../../actions/home';
import * as loginActions from '../../actions/login';
import * as borrowerActions from '../../actions/borrower';
import * as loanActions from '../../actions/loan';
import * as fileActions from '../../actions/file';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {Map} from "immutable";

var qs = require("querystring");
var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
var frontImage = require("../../images/certificate_front.png");
var backImage = require("../../images/certificate_back.png");
let optkind = ["{\"name\":\"一手房贷款\" , \"code\":\"A5101\"}" ,"{\"name\":\"二手房贷款\" , \"code\":\"A5102\"}" , "{\"name\":\"一手农民安家贷\" , \"code\":\"A5103\"}" ,"{\"name\":\"二手农民安家贷\" , \"code\":\"A5104\"}"]; // 业务品种
let optkindcode = ["A5101" , "A5102" , "A5103" , "A5104"];   // 业务品种对应的编号
var that='';

const actions = [
    homeActions,loginActions,borrowerActions,loanActions,fileActions
]
function mapStateToProps(state) {
    const {instData} = state;
    const {head} = state;
    const {client} = state;
    return {
        instData,head,client
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

function regexString(value) {
    if (value!=undefined&&value!=null&&value.length!=0&&value!=""){
        return true;
    }else {
        return false;
    }
}


class NetCheck extends Component{
    constructor(props) {
        super(props);
        this.state = {
            form: {
                name: '',

            },
            container_height:window.innerHeight-this.getHeight(100),
            optkindName:"一手房贷款",
            modelName:"不使用模板",
            sceneName:"",
            sceneId:"",
            optkindCode:"A5101",
            radio3:"身份证",
            selectDialogVisible: false,
            selectedValue2:true,
            loadingContent:"登录中...",
            fullscreen:false,
            netCheckState:false,
            cardNumber:"",
            cardName:"",
            frontImage:frontImage,
            backImage:backImage,
            frontDisplay:"inline",
            backDisplay:"inline",
            nextBg:"#999999",
            nextBorder:"#999999",
            nextState:false,
            check:"inline",
            checkSuccess:"none",
            position:0,
            tmplt_id:"",
            backFile:{
                imageBase64:"",
                oprId:"",
                pageId:"",
                pageName:"身份证背面",
                pageType:"png",
            },
            frontFile:{
                imageBase64:"",
                oprId:"",
                pageId:"",
                pageName:"身份证正面",
                pageType:"png",
            },
            processVO:{
                acpt_date:"1",
                acpt_opr_id:"1",
                acpt_opr_inst_id:"1",
                acpt_opr_inst_name:"1",
                acpt_opr_name:"1",
                act_id:"1",
                altn1:"1",
                altn2:"1",
                altn3:"1",
                altn4:"1",
                altn5:"1",
                aply_date:"1",
                aply_id:"1",
                aply_src:"1",
                asset_val:"1",
                buss_rc:"02",
                cert_no:"1",
                cert_type:"1",
                client_name:"1",
                coprj_name:"1",
                cur_step:"1",
                finish_step:"1",
                invt_adv:"1",
                invt_opr_id:"1",
                invt_opr_inst_id:"1",
                invt_opr_inst_name:"1",
                invt_opr_name:"1",
                invtadv_info:"1",
                is_track:"1",
                loan_sum:"1",
                opr_date:"1",
                opr_id:"1",
                opr_inst_id:"1",
                opr_inst_name:"1",
                opr_name:"1",
                opr_time:"1",
                optkind:"A5101",
                phone_num:"1",
                req_id:"1",
                sale_opr_id_1:"1",
                sale_opr_id_2:"1",
                sale_opr_inst_id_1:"1",
                sale_opr_inst_id_2:"1",
                sale_opr_inst_name_1:"1",
                sale_opr_inst_name_2:"1",
                sale_opr_name_1:"1",
                sale_opr_name_2:"1",
                state:"1",
                tmplt_id:"1",
                tmplt_type:"1",


            }
        }
    }

    onChange(key, value) {
        this.setState({
            [key]:value
        },()=>{
            this.setCheckState();
        })
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
    onSubmit(e) {
        e.preventDefault();
    }

    componentDidMount(){
        that=this;

    }
    setCheckState(){
        if (regexString(this.state.cardNumber)&&regexString(this.state.cardName) &&this.state.frontDisplay=="none" && this.state.backDisplay=="none"){
            this.setState({netCheckState:true})
        } else {
            this.setState({netCheckState:false})
        }

    }
    setComplete(cur){
        let value = this.context.getListValue();
        value[cur] = 2;
        return value;
    }
    optkindSelect(key , value){

    }

    showImageViewer(src,onRetake,onDelete){
        ImageViewer.show(src).then((action) => {
            switch (action) {
              case 'retake':
                  if (!this.props.instData.netCheck){
                      onRetake();
                  }
                  break;
              case 'delete':
                  if (!this.props.instData.netCheck){
                      onDelete();
                  }
                  return;
              default:
                break;
            }
          }).catch(() => {
          });
    }
    render(){
        return(

            <div style={{height:this.state.container_height}}>

                <div class="scrollContent">
                     <TabTitle title="业务信息" class="tabTitle blueTabTitle"/>
                        <Form labelPosition="left" model={this.state.form} labelWidth="80" onSubmit={this.onSubmit.bind(this)}>
                        <div className="form_content">
                            <div className="form_lf">
                                <Form.Item label="业务品种" >
                                    <Radio.Group value={this.state.optkindName} onChange={(value)=>{
                                        var code = "";
                                        optkind.map((option ,position)=>{
                                            if (JSON.parse(option).name == value){
                                                code = JSON.parse(option).code;
                                                this.props.netActions.setOpt(code);
                                                this.props.netActions.getModelList(code);
                                                if (position==0|| position==2){
                                                    this.props.netActions.setOptKind("1");
                                                } else {
                                                    this.props.netActions.setOptKind("2");
                                                }
                                                this.props.netActions.getSceneList(JSON.parse("{\"pdts_cod\":\""+code+"\"}"));
                                            }
                                        })
                                        this.setState({optkindName:value ,optkindCode:code})
                                    }}>
                                        {
                                            optkind.map((option)=>{
                                                return <Radio.Button disabled={this.props.instData.netCheck?(JSON.parse(option).name == this.state.optkindName?false:true):false} value={JSON.parse(option).name}/>
                                            })
                                        }
                                    </Radio.Group>
                                </Form.Item>
                            </div>
                            <div className="form_rt">
                                <Form.Item label="参考模板">
                                    <Radio.Group value={this.state.modelName} onChange={(value)=>{
                                        var id = "";
                                        this.props.instData.modelList.map((option)=>{
                                            if (option.tmplt_name == value){
                                                id = option.tmplt_id;
                                            }
                                        })
                                        this.setState({modelName:value,tmplt_id:id})
                                        if (this.props.head.instName==""){
                                            // eslint-disable-next-line
                                            mmspc.dialog.toast("请选择机构");
                                        } else {
                                            // this.props.netActions.addWork(JSON.parse("{\"optkind\":\""+this.state.optkindCode+"\" ,\"acpt_opr_inst_id\":"+"\""+this.props.head.instCode+"\" , \"acpt_opr_inst_name\":"+"\""+this.props.head.instName+"\" ,\"tmplt_id\":\""+this.state.tmplt_id+"\" , \"scene_id\":\"70dc0cbc-9817-4dbd-\"}"));
                                        }
                                    }}>
                                        {
                                            this.props.instData.modelList==null?[]:this.props.instData.modelList.map((option)=>{
                                                return <Radio.Button disabled={this.props.instData.netCheck?(option.tmplt_name == this.state.modelName?false:true):false} value={option.opt == this.state.optKind?option.tmplt_name:""}/>
                                            })
                                        }
                                    </Radio.Group>
                                </Form.Item>
                            </div>

                            <div className="form_rt">
                                <Form.Item label="场景选择">
                                    <Radio.Group value={this.state.sceneName} onChange={(value)=>{
                                        var id = "";
                                        this.props.instData.sceneList.map((option)=>{
                                            if (option.name == value){
                                                id = option.scene_id;
                                            }
                                        })
                                        this.setState({sceneName:value,sceneId:id})
                                        this.props.netActions.addWork(JSON.parse("{\"optkind\":\""+this.state.optkindCode+"\" ,\"acpt_opr_inst_id\":"+"\""+this.props.head.instCode+"\" , \"acpt_opr_inst_name\":"+"\""+this.props.head.instName+"\" ,\"tmplt_id\":\""+this.state.tmplt_id+"\" , \"scene_id\":\"70dc0cbc-9817-4dbd-\"}"));

                                    }}>
                                        {
                                            this.props.instData.sceneList==null?[]:this.props.instData.sceneList.map((option)=>{
                                                return <Radio.Button disabled={this.props.instData.netCheck?(this.state.sceneName == option.name?false:true):false} value={option.name}/>
                                            })
                                        }
                                    </Radio.Group>
                                </Form.Item>
                            </div>
                        </div>
                    </Form>
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
                                                    <img src={this.state.frontImage?this.state.frontImage:frontImage} onClick={()=>{
                                                        if (this.state.frontDisplay=="none"){
                                                            this.showImageViewer(this.state.frontImage,()=>{
                                                                // eslint-disable-next-line
                                                                mmspc.customCamera.openRectCamera(data=>{
                                                                this.state.frontFile.imageBase64 = data;
                                                                this.state.frontFile.oprId = "R";
                                                                this.props.netActions.updateFile("{\"fileDesp\":\"借款人有效证件\",\"groupId\":\"010101\",\"workId\":\""+this.props.client.procsId+"\",\"uploadPageList\":["+JSON.stringify(this.state.frontFile)+"]}",
                                                                (successData)=>{
                                                                    this.props.netActions.loading(false);
                                                                    this.setState({frontImage:"data:image/png;base64," + data , frontDisplay:"none"});
                                                                    this.state.frontFile.imageBase64 = data;
                                                                    this.state.frontDisplay = "none";
                                                                    this.setCheckState();
                                                                },()=>{
                                                                    this.props.netActions.loading(false);
                                                                });

                                                            },function(data){
                                                            },"/"+this.props.client.procsId+"/借款人影像/借款人有效证件/0001.jpg");
                                                            },()=>{
                                                                this.state.frontFile.oprId = "D";
                                                                this.props.netActions.updateFile("{\"fileDesp\":\"借款人有效证件\",\"groupId\":\"010101\",\"workId\":\""+this.props.client.procsId+"\",\"uploadPageList\":["+JSON.stringify(this.state.frontFile)+"]}",
                                                                (successData)=>{
                                                                    this.props.netActions.loading(false);
                                                                    this.setState({frontImage:null});
                                                                    this.state.frontDisplay = "inline";
                                                                    this.setCheckState()},
                                                                ()=>{
                                                                    this.props.netActions.loading(false);
                                                                });
                                                                });

                                                        }
                                                    }} />
                                                  <p>
                                                     <img  src={require("../../images/camera.png")} style={{display:this.state.frontDisplay}} onClick={()=>{
                                                         // eslint-disable-next-line
                                                         mmspc.customCamera.openRectCamera(data=>{
                                                             this.props.netActions.loading(true);
                                                             this.state.frontFile.imageBase64 = data;
                                                             this.props.netActions.uploadFile("{\"fileDesp\":\"借款人有效证件\",\"groupId\":\"010101\",\"workId\":\""+this.props.client.procsId+"\",\"uploadPageList\":["+JSON.stringify(this.state.frontFile)+"]}",
                                                                 (successData)=>{
                                                                    this.props.netActions.loading(false);
                                                                     this.setState({frontImage:"data:image/png;base64," + data , frontDisplay:"none"});
                                                                     this.state.frontDisplay = "none";
                                                                     if (JSON.parse(successData).data.length != 0){
                                                                         this.state.frontFile.pageId = JSON.parse(successData).data[0].pageId;
                                                                     }
                                                                     this.setCheckState();
                                                                 },()=>{
                                                                    this.props.netActions.loading(false);
                                                             });


                                                         },function(data){

                                                         },"/"+this.props.client.procsId+"/借款人影像/借款人有效证件/0001.jpg");
                                                     }}/>
                                                  </p>
                                                </div>
                                                <p>请上传身份证头像面</p>

                                            </li>
                                            <li>
                                                <div class="camera_box">
                                                    <img src={this.state.backImage?this.state.backImage:backImage} onClick={()=>{
                                                        if (this.state.backDisplay=="none"){
                                                            this.showImageViewer(this.state.backImage,()=>{
                                                                // eslint-disable-next-line
                                                                mmspc.customCamera.openRectCamera(data=>{
                                                                this.state.backFile.imageBase64 = data;
                                                                this.state.backFile.oprId = "R";
                                                                this.props.netActions.updateFile("{\"fileDesp\":\"借款人有效证件\",\"groupId\":\"010101\",\"workId\":\""+this.props.client.procsId+"\",\"uploadPageList\":["+JSON.stringify(this.state.backFile)+"]}",
                                                                (successData)=>{
                                                                    this.props.netActions.loading(false);
                                                                    this.setState({backImage:"data:image/png;base64," + data , backDisplay:"none" });
                                                                    this.state.backDisplay = "none";
                                                                    this.setCheckState();
                                                                },()=>{
                                                                    this.props.netActions.loading(false);
                                                                });
                                                            },function(data){
                                                            },"/"+this.props.client.procsId+"/借款人影像/借款人有效证件/0002.jpg");
                                                            },()=>{
                                                                this.state.backFile.oprId = "D";
                                                                this.props.netActions.updateFile("{\"fileDesp\":\"借款人有效证件\",\"groupId\":\"010101\",\"workId\":\""+this.props.client.procsId+"\",\"uploadPageList\":["+JSON.stringify(this.state.backFile)+"]}",
                                                                (successData)=>{
                                                                    this.props.netActions.loading(false);
                                                                    this.setState({backImage:null}) ;
                                                                    this.state.backDisplay = "inline";
                                                                    this.setCheckState()},
                                                                ()=>{
                                                                    this.props.netActions.loading(false);
                                                                });
                                                                });
                                                        }

                                                    }}/>
                                                   <p>
                                                     <img src={require("../../images/camera.png")} style={{display:this.state.backDisplay}} onClick={()=>{
                                                         // eslint-disable-next-line
                                                         mmspc.customCamera.openRectCamera(data=>{
                                                             this.state.backFile.imageBase64 = data;
                                                             this.state.backFile.pageType = "png";
                                                             // this.props.netActions.uploadFile("{\"fileDesp\":\身份证图片\",\"groupId\":\"0101\",\"workId\":\""+this.props.client.procsId+"\",\"uploadPageList\":\"["+this.state.backFile+"]\"}");
                                                             // this.props.netActions.uploadFile("{\"fileDesp\":\"身份证图片\",\"groupId\":\"0101\",\"workId\":\"001802A5100000026\",\"uploadPageList\":["+JSON.stringify(this.state.backFile)+"]}");
                                                             this.props.netActions.uploadFile("{\"fileDesp\":\"借款人有效证件\",\"groupId\":\"010101\",\"workId\":\""+this.props.client.procsId+"\",\"uploadPageList\":["+JSON.stringify(this.state.backFile)+"]}",
                                                             (successData)=>{
                                                                 this.props.netActions.loading(false);
                                                                 this.setState({backImage:"data:image/png;base64," + data , backDisplay:"none" });
                                                                 this.state.backDisplay = "none";
                                                                 if (JSON.parse(successData).data.length != 0){
                                                                     this.state.backFile.pageId = JSON.parse(successData).data[0].pageId
                                                                 }
                                                                 this.setCheckState();
                                                             },()=>{
                                                                 this.props.netActions.loading(false);
                                                             });

                                                         },function(data){
                                                         },"/"+this.props.client.procsId+"/借款人影像/借款人有效证件/0002.jpg");

                                                     }}/>
                                                  </p>
                                                </div>
                                                <p>请上传身份证国徽面</p>
                                            </li>

                                        </ul>
                                    </div>
                                </div>
                                <div class="three_box_rt" >

                                    <div style={{display:!this.props.instData.netCheck?"inline":"none"}}>
                                        <Button type="primary" style={{height:70,width:70}}disabled={!this.state.netCheckState} textStyle={{fontSize:18,lineHeight:1.3,whiteSpace:'normal'}}
                                                onClick={()=>{
                                                    if (reg.test(this.state.cardNumber)==false){
                                                        // eslint-disable-next-line
                                                        mmspc.dialog.toast("身份证号码格式不正确");
                                                    } else {
                                                        if (this.state.netCheckState){
                                                            this.setState({loadingContent:"联网核查..." , fullscreen:true});

                                                            this.props.netActions.addCustomer("{\"cliname\":"+"\""+this.state.cardName+"\",\"certno\":"+"\""+this.state.cardNumber+"\" , \"req_id\":\""+this.props.client.procsId+"\" , " +
                                                                "\"self\":\"1\" , \"certtype\":\"110001\"}");
                                                        }else {
                                                            this.setState({loadingContent:"联网核查..." , fullscreen:true});

                                                            this.props.netActions.addCustomer("{\"cliname\":"+"\""+this.state.cardName+"\",\"certno\":"+"\""+this.state.cardNumber+"\" , \"req_id\":\""+this.props.client.procsId+"\" , " +
                                                                "\"self\":\"1\" , \"certtype\":\"110001\"}");
                                                        }

                                                    }
                                                }}>联网核查</Button>

                                    </div>
                                    <div style={{display:this.props.instData.netCheck?"inline":"none"}}>
                                        <img src={require("../../images/success_iocn.png")}
                                             width="75%" height="75%"/>
                                        <p style={{color:"#00CD00"}}>核查通过</p>
                                    </div>
                                </div>

                            </div>
                         </div>
                        <div class="loan_footer">
                            <div class="footer_content" >
                                <div class="footer_content_lf">
                                    <Button id="resetMsg" plain={true} type="info" size="large" onClick={()=>{
                                        if (!this.props.instData.netCheck){
                                            this.setState({radio1:"一手房贷款", radio2:"不使用模板",netCheckState:false,cardNumber:"", cardName:"",
                                                frontImage:frontImage, backImage:backImage,frontDisplay:"inline", backDisplay:"inline",});
                                            this.props.netActions.uploadPdf();
                                        }
                                    }}>重置</Button>
                                </div>
                                 <div class="footer_content_rt">
                                      <Button  id="nextStep" style={{backgroundColor:this.props.instData.netCheck?"#FFA400":"#999999" ,borderColor:this.props.instData.netCheck?"#FFA400":"#999999"}} type="warning" size="large" onClick={()=>{
                                          if(this.props.instData.netCheck){
                                                  this.context.jumpTo(1, this.setComplete.bind(this)(0));
                                                  this.props.netActions.pageSelected(1);
                                              //     this.props.netActions.deteleInfo(data , "{\"clientId\":\""+this.props.client.clientId+"\",\"_method\":\"delete\"}");

                                          }else {
                                              // this.context.jumpTo(1, this.setComplete.bind(this)(0));
                                              // this.props.netActions.pageSelected(1);
                                              //    this.state.processVO.req_id = this.props.client.procsId
                                              //     this.props.netActions.updateWork(data , this.state.processVO);
                                              // this.props.netActions.downloadFile(JSON.parse("{\"workId\":\""+this.props.client.procsId+"\",\"groupId\":\"01\"}"));

                                          }
                                      }}>下一步</Button>
                                </div>
                            </div>
                        </div>

                    </div>

            </div>

        );
    }

}
NetCheck.contextTypes = {
    jumpTo: PropTypes.func,
    getListValue:PropTypes.func
};
export default connect(mapStateToProps ,mapDispatchToProps)(NetCheck);