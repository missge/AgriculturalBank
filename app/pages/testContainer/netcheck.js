import React from 'react';
import {Component}from '../../components/libs'
// import TabTitle from '../../ma-ui/TabTitle'
import "./style/card.css"
// import Radio from '../../ma-ui/radio';
// import 'element-theme-default';
// import '../loanInformation/style/loan.css'
// import { Form,Input,Button,Layout,Tabs,Select } from 'element-react';
import {Form,Input,Button,Layout,Tabs,Select,Radio,TabTitle} from "../../components/index";
import '../publicCss/public.css'
var frontImage = require("../../images/certificate_front.png");
var backImage = require("../../images/certificate_back.png");
class NetCheck extends Component{
    constructor(props) {
        super(props);

        this.state1 = {
            radio1: '一手房贷款',
            radio2: '二手房贷款',
            radio3: '一手农民安家贷'

        }
        this.state2 = {
            radio1: '不使用模板',
            radio2: '一手房模板',
            radio3: '二手房模板'

        }
        this.state = {
            form: {
                name: '',

            },
        }

    }
    onChange(key, value) {
        this.state.form[key] = value;
        this.forceUpdate();
    }
    onSubmit(e) {
        e.preventDefault();
    }

    render(){
        return(
            <div style={{height:window.innerHeight-this.getHeight(100)}}>
                <div class="scrollContent">

                 <TabTitle title="业务信息" class="tabTitle blueTabTitle"/>
                {/*<div className="box-content">*/}
                    {/*<div className="box-content-left">*/}
                        {/*<span>业务品种</span>*/}
                        {/*<div className="variety-choose">*/}
                            {/*<Radio.Group value={this.state1.radio2} onChange={this.onChange.bind(this, 'radio1')}>*/}
                                {/*<Radio.Button value="一手房贷款"/>*/}
                                {/*<Radio.Button value="二手房贷款"/>*/}
                                {/*<Radio.Button value="一手农民安家贷"/>*/}
                                {/*<Radio.Button value="二手农民安家贷"/>*/}
                                {/*<Radio.Button value="其他住房贷款"/>*/}
                            {/*</Radio.Group>*/}
                        {/*</div>*/}
                    {/*</div>*/}
                    {/*<div className="box-content-right">*/}
                        {/*<span>参数模板</span>*/}
                        {/*<div className="modal-choose">*/}
                            {/*<Radio.Group value={this.state2.radio2} onChange={this.onChange.bind(this, 'radio1')}>*/}
                                {/*<Radio.Button value="不使用模板"/>*/}
                                {/*<Radio.Button value="一手房模板"/>*/}
                                {/*<Radio.Button value="二手房模板"/>*/}
                            {/*</Radio.Group>*/}
                        {/*</div>*/}
                    {/*</div>*/}

                    {/*<div className="clearfix"></div>*/}
                {/*</div>*/}
                    <Form labelPosition="left" model={this.state.form} labelWidth="120" onSubmit={this.onSubmit.bind(this)}>
                        <div className="form_content">
                            <div className="form_lf">
                                <Form.Item label="业务品种" >
                                    <Radio.Group value={this.state.radio3} onChange={this.onChange.bind(this, 'radio3')}>
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
                                    <Radio.Group value={this.state.radio3} onChange={this.onChange.bind(this, 'radio3')}>
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
                                            <div className="customer-info-row">
                                                <span className="customer-info-row-left">证件号码</span>
                                                <input id="card_number" placeholder="请输入证件号码"/>
                                                <button type="button" className="loading-button" onClick={()=>
                                                     {
                                                        // eslint-disable-next-line
                                                         mmspc.abcDevice.initDevice();
                                                        // eslint-disable-next-line
                                                         mmspc.abcDevice.readIDCardInfo("0", function(json) {
                                                            document.getElementById("card_number").value=json.identityCardNumber;
                                                            document.getElementById("card_name").value=json.fullName;
                                                         }, function (error){
                                                            alert("error："+JSON.stringify(error));
                                                         }, 30000);

                                                    }
                                                }>读取</button>
                                            </div>
                                            <Form.Item label="客户姓名">
                                                <Input  size="small" value={this.state.form.name} onChange={this.onChange.bind(this, 'name')}></Input>
                                            </Form.Item>
                                        </Form>
                                    </div>
                                    <div class="three_child_rt">
                                        <ul class="img_box">
                                            <li>
                                                <div class="camera_box"  onClick={()=>{
                                                    // eslint-disable-next-line
                                                        navigator.camera.getPicture(function(data){
                                                            frontImage = "data:image/png;base64," + data;
                                                            document.getElementById("front_image").src = frontImage;
                                                            document.getElementById("front_camera").style.display = "none";
                                                        },function(data){
                                                            alert("error");
                                                        },{quality:50,destinationType:0});
                                                    }}>
                                                    <img src={frontImage} />
                                                  <p>
                                                     <img  src={require("../../images/camera.png")}/>
                                                  </p>   
                                                </div>
                                                <p>请上传身份证头像面</p>
                                               
                                            </li>
                                            <li>
                                                <div class="camera_box" onClick={()=>{
                                                        // eslint-disable-next-line
                                                        navigator.camera.getPicture(function(data){
                                                            backImage = "data:image/png;base64," + data;
                                                            document.getElementById("back_image").src = backImage;
                                                            document.getElementById("back_camera").style.display = "none";
                                                        },function(data){
                                                            alert("error");
                                                        },{quality:50,destinationType:0});

                                                    }}>
                                                    <img src={backImage}  />
                                                     <i></i>
                                                   <p>
                                                     <img  src={require("../../images/camera.png")}/>
                                                  </p>   
                                                </div>
                                                <p>请上传身份证国徽面</p>
                                            </li>

                                        </ul>
                                    </div>
                                </div>
                                <div class="three_box_rt">
                                    <div>
                                        <input type="button" class="grayButton" value="联网核查" onClick={()=>{
                                            // if (document.getElementById("card_number").value ==null){
                                            //     alert("身份证号不能为空");
                                            //     return;
                                            // }
                                            // if (document.getElementById("card_name").value == null){
                                            //     alert("姓名不能为空");
                                            //     return;
                                            // }
                                            // eslint-disable-next-line
                                            mmspc.nativeRequest.init();
                                            // eslint-disable-next-line
                                            mmspc.nativeRequest.get("http://219.142.79.229:8989/mmsp-ps/idcheck/networkVerification?userName=易贤武&userId=360731199110284813"
                                            ,success , fail);
                                            function success() {
                                                alert("success");
                                            }
                                            function fail() {
                                                alert("fail");
                                            }
                                            // mmpsc.nativeRequest.get();
                                        }}/>

                                    </div>
                                </div>  
                            </div>
                         </div>
                        <div class="loan_footer">
                            <div class="footer_content" >
                                <div class="footer_content_lf">
                                    <Button id="resetMsg" plain={true} type="info" size="large" onClick={this.onIsShow}>信息补录</Button>
                                </div>
                                 <div class="footer_content_rt">
                                      <Button  id="nextStep" type="warning" size="large">生成电子申请表</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

        );
    }

    onChange(key, value) {
        this.setState({
            [key]: value
        });
    }
}

export default NetCheck;