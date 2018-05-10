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
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {Map} from "immutable";

var qs = require("querystring");

var frontImage = require("../../images/certificate_front.png");
var backImage = require("../../images/certificate_back.png");

var that='';

const actions = [
    homeActions,loginActions
]
function mapStateToProps(state) {
    const {instData} = state;
    const {head} = state;
    return {
        instData,head
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

/*
function loginNew() {
    // eslint-disable-next-line
    mmspc.bridge.get(function (data) {
        appId = data;
        that.props.netActions.login(data);
        // that.props.netActions.getInst(data);
    },
    function () {

    })

}*/

class NetCheck extends Component{
    constructor(props) {
        super(props);
        this.state = {
            form: {
                name: '',

            },

            radio1:"一手房贷款",
            radio2:"不使用模板",
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

            processVO:{
                acpt_data:"1",
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
                buss_rc:"1",
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
                optkind:"1",
                phone_num:"1",
                rep_id:"1",
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
    onChangeRadio(key, value) {
        if ("radio2"==key){
            // eslint-disable-next-line
            mmspc.bridge.get((appId)=>{
                // this.props.netActions.addWork(appId,JSON.parse("{\"acpt_opr_inst_id\":"+"\""+this.props.head.instCode+"\"}"));
                this.props.netActions.addWork(appId,this.state.processVO);
                // $.ajax("http://10.230.155.49:9083/mmsp-ps/forward/vEwQVohB/rest/hl/process",{
                //     async:false,
                //     cache:false,
                //     method:"POST",
                //     dataType:"json",
                //     headers:{"dnfl-token":$("#dnflToken").val()
                //     },
                //     data:"acpt_opr_inst_id=000000603"
                //
                // })
            })
        }
        this.setState({
            [key]:value
        })

    }
    onChange(key, value) {
        this.setState({
            [key]:value
        },()=>{
            this.setCheckState();
        })
        // setTimeout(this.setState({
        //     [key]: value
        // }),0);
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
        // this.setState({loadingContent:"登录中..." , fullscreen:true});
        // this.props.netActions.loading(true);
        // setTimeout(loginNew , 2000);
        // loginNew();
        // initData();
        // this.props.netActions.loginLoading(true);
        // setTimeout(this.props.netActions.loginLoading(false) , 3000);
        // setTimeout(login , 1000);

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
    render(){
        return(

            <div style={{height:window.innerHeight-this.getHeight(100)}}>

                <div class="scrollContent">
                   {/* <div>
                        {
                            this.props.instData.loading&&<Loading fullscreen={true} text={this.props.instData.text} style={{backgroundColor: 'rgba(0, 0, 0, 0)'}}/>
                        }
                    </div>*/}
                     <TabTitle title="业务信息" class="tabTitle blueTabTitle"/>
                        <Form labelPosition="left" model={this.state.form} labelWidth="120" onSubmit={this.onSubmit.bind(this)}>
                        <div className="form_content">
                            <div className="form_lf">
                                <Form.Item label="业务品种" >
                                    <Radio.Group value={this.state.radio1} onChange={this.onChangeRadio.bind(this, 'radio1')}>
                                        <Radio.Button value="一手房贷款"/>
                                        <Radio.Button value="二手房贷款"/>
                                        <Radio.Button value="一手农民安家贷"/>
                                        <Radio.Button value="二手农民安家贷"/>
                                        <Radio.Button value="其他住房贷款"/>
                                    </Radio.Group>
                                </Form.Item>
                            </div>
                            <div className="form_rt">
                                <Form.Item label="参考模板">
                                    <Radio.Group value={this.state.radio2} onChange={this.onChangeRadio.bind(this, 'radio2')}>
                                        <Radio.Button value="不使用模板"/>
                                        <Radio.Button value="一手房模板"/>
                                        <Radio.Button value="二手房模板"/>
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
                                                        this.showImageViewer(this.state.frontImage,()=>{navigator.camera.getPicture(function(data){
                                                            that.setState({frontImage:"data:image/png;base64," + data , frontDisplay:"none"});
                                                            that.state.frontDisplay = "none";
                                                            that.setCheckState();
                                                        },function(data){
                                                        },{quality:50,destinationType:0});
                                                    },()=>{this.setState({frontImage:null});
                                                            this.state.frontDisplay = "inline";
                                                            this.setCheckState()});
                                                    }} />
                                                  <p>
                                                     <img  src={require("../../images/camera.png")} style={{display:this.state.frontDisplay}} onClick={()=>{
                                                         // eslint-disable-next-line
                                                         navigator.camera.getPicture(function(data){
                                                             that.setState({frontImage:"data:image/png;base64," + data , frontDisplay:"none"});
                                                             that.state.frontDisplay = "none";
                                                             that.setCheckState();
                                                         },function(data){
                                                         },{quality:50,destinationType:0});
                                                     }}/>
                                                  </p>
                                                </div>
                                                <p>请上传身份证头像面</p>

                                            </li>
                                            <li>
                                                <div class="camera_box">
                                                    <img src={this.state.backImage?this.state.backImage:backImage} onClick={()=>{
                                                        this.showImageViewer(this.state.backImage,()=>{navigator.camera.getPicture(function(data){
                                                            that.setState({backImage:"data:image/png;base64," + data , backDisplay:"none"});
                                                            that.state.backDisplay = "none";
                                                            that.setCheckState();
                                                        },function(data){
                                                        },{quality:50,destinationType:0});
                                                    },()=>{this.setState({backImage:null}) ;
                                                            this.state.backDisplay = "inline";
                                                            this.setCheckState()});
                                                    }}/>
                                                   <p>
                                                     <img src={require("../../images/camera.png")} style={{display:this.state.backDisplay}} onClick={()=>{
                                                         // eslint-disable-next-line
                                                         navigator.camera.getPicture(function(data){
                                                             that.setState({backImage:"data:image/png;base64," + data  , backDisplay:"none"});
                                                             that.state.backDisplay = "none";
                                                             that.setCheckState();
                                                         },function(data){
                                                         },{quality:50,destinationType:0});

                                                     }}/>
                                                  </p>
                                                </div>
                                                <p>请上传身份证国徽面</p>
                                            </li>

                                        </ul>
                                    </div>
                                </div>
                                <div class="three_box_rt" >
                                    <div style={{display:!(this.props.instData.netCheck)}}>
                                        <input type="button" class={(this.state.netCheckState)?"orangeButton":"grayButton"} value="联网核查" onClick={()=>{
                                            if (this.state.netCheckState){
                                                this.setState({loadingContent:"联网核查..." , fullscreen:true});
                                                // eslint-disable-next-line
                                                mmspc.nativeRequest.init();
                                                // eslint-disable-next-line
                                                mmspc.bridge.get((appId)=>{
                                                    this.props.netActions.addCustomer(appId ,JSON.parse("{}"));
                                                    // this.props.netActions.addCustomer(appId , "{\"clientVO\":{\"cliname\":"+"\""+this.state.cardName+"\",\"certno\":"+"\""+this.state.cardNumber+"\"}}");
                                                    // this.props.netActions.netcheck(appId);
                                                    // eslint-disable-next-line
                                                    // mmspc.nativeRequest.get("http://219.142.79.229:8989/mmsp-ps/forward/"+appId+"/rest/pub/access/onlinecheck?clientId=易贤武&userId=360731199110284813"
                                                    //     ,success , fail);
                                                });

                                                function success() {
                                                    that.setState({nextBg:"#FFA400" , nextBorder:"#FFA400" ,
                                                        nextState:true,loadingContent:"联网核查..." , fullscreen:false,
                                                        check:"none" ,checkSuccess:"inline"});
                                                }
                                                function fail() {
                                                    this.setState({loadingContent:"联网核查..." , fullscreen:false});
                                                }
                                            }
                                        }}/>

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
                                        if (!this.state.nextState){
                                            this.setState({radio1:"一手房贷款", radio2:"不使用模板",netCheckState:false,cardNumber:"", cardName:"",
                                                frontImage:frontImage, backImage:backImage,frontDisplay:"inline", backDisplay:"inline",});
                                        }
                                    }}>重置</Button>
                                </div>
                                 <div class="footer_content_rt">
                                      <Button  id="nextStep" style={{backgroundColor:this.state.nextBg ,borderColor:this.state.nextBorder}} type="warning" size="large" onClick={()=>{
                                          if(this.state.nextState){
                                                  this.context.jumpTo(1, this.setComplete.bind(this)(0))
                                          }else {
                                              // this.context.jumpTo(1,[2,0,0,0,0,0,0,0])
                                          }
                                      }}>下一步</Button>
                                </div>
                            </div>
                        </div>

                    </div>
                   {/* <div>

                        <Dialog
                            size="small"
                            visible={ this.props.instData.showList }
                            title='请选择机构'
                            onCancel={ () => this.props.netActions.showList(false) }
                            lockScroll={ false }
                            className='mmpsc-select-list-dialog'
                        >
                            <Dialog.Body>
                                <SelectList value={this.state.selectedValue2} multiple={false} onChange={val=>{
                                    this.props.netActions.changeName(val);
                                    this.setState({selectedValue2: true})
                                    this.props.netActions.showList(false)
                                }}>
                                    {
                                        this.props.instData.getInstResult==null?[]:JSON.parse(this.props.instData.getInstResult).data
                                        .map(option => {
                                            return <SelectList.Option key={option.instname} label={option.instname} value={option.instname} />
                                        })
                                    }
                                </SelectList>
                            </Dialog.Body>
                        </Dialog>

                    </div>*/}
            </div>

        );
    }

}
NetCheck.contextTypes = {
    jumpTo: PropTypes.func,
    getListValue:PropTypes.func
};
export default connect(mapStateToProps ,mapDispatchToProps)(NetCheck);