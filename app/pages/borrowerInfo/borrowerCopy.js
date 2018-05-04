import React, { Component } from 'react';
import './style/borrower.css';
import * as homeActions from '../../actions/home';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {Map} from 'immutable';
import Banner from '../../ma-ui/Banner/banner.js';

import Radio from '../../ma-ui/radio';
/*import Radio from 'antd/lib/radio';*/
import Button from 'antd/lib/button';
import Modal from 'antd/lib/modal';
import Tabs  from 'antd/lib/tabs';

/*import 'antd/lib/radio/style/css';*/
import 'antd/lib/button/style/css';
import 'antd/lib/modal/style/css';
import 'antd/lib/tabs/style/css';

import color from "../../ma-ui-b/colors/blue";


// const actions = [
//     homeActions
// ];

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const TabPane = Tabs.TabPane;

function callback(key) {
    console.log(key);
}

function onChange(e) {
    console.log(`radio checked:${e.target.value}`);
}


/*function mapStateToProps(state) {
    const {home}=state;
    return {
        home
    };
}*/



/*function mapDispatchToProps(dispatch) {

    const creators = Map()
        .merge(...actions)
        .filter(value => typeof value === 'function')
        .toObject();
    return {
        homeActions: bindActionCreators(creators, dispatch)

    };
}*/

/*@connect(
 state => ({...state.home}),
 dispatch => bindActionCreators({showIdCard}, dispatch)
 )*/
class Borrower extends Component {

    state = { visible: false }

    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    onIsShow = () =>{
        this.setState({
            isShow:!this.state.isShow
        })
    }

    onChange(key, value) {
        this.setState({
            [key]: value
        });
    }
    constructor(props) {
        super(props);

        this.state = {
            radio1: '本科',
            radio2: '已婚',
            radio3: '事业单位',
            isShow:false
        }

    }

  /*  showOtherInfo(){
        document.getElementById("borrowerInfo").style.display="none";
        document.getElementById("otherInfo").style.display="none";
    }*/
    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }
    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }


    render() {
        return (
            <div>{this.state.isShow === false ?
                <div class="showTab1">
                    <Banner/>
                    < div class="blank-box-group">
                        <div class="blank-box-title">
                            <span>借款人信息</span>
                        </div>

                        < div class="blank-box-main">
                            <span class="blank-box-main-span" style={{marginRight: 60}}>客户姓名</span>
                            < div class="input-group">
                                <input class="blank-box-input"/>
                            </div>
                            <span class="blank-box-main-span" style={{marginLeft: 60}}>证件号码</span>
                            <div class="input-group">
                                <input class="blank-box-input"/>
                            </div>
                        </div>


                        < div class="blank-box-main">
                            <span class="blank-box-main-span" style={{marginRight: 80}}>文化程度</span>
                            <Radio.Group value={this.state.radio1} onChange={this.onChange.bind(this, 'radio1')}>
                                <Radio.Button value="本科"/>
                                <Radio.Button value="硕士"/>
                                <Radio.Button value="博士"/>
                                <Radio.Button value="专科"/>
                                <Radio.Button value="高中"/>
                                <Radio.Button value="更多"/>
                            </Radio.Group>

                            <span class="blank-box-main-span" style={{marginRight: 20, marginLeft: 105}}>婚姻状况</span>
                            <Radio.Group value={this.state.radio2} onChange={this.onChange.bind(this, 'radio2')}>
                                <Radio.Button value="已婚"/>
                                <Radio.Button value="未婚"/>
                                <Radio.Button value="离异"/>
                                <Radio.Button value="丧偶"/>
                                <Radio.Button value="其他"/>
                            </Radio.Group>
                        </div>

                        < div class="blank-box-main">
                            <span class="blank-box-main-span" style={{marginRight: 40}}>长期居住地</span>
                            < div class="input-group">
                                <input class="blank-box-input" placeholder="请输入长期居住地"/>
                            </div>
                            <span class="blank-box-main-span" style={{marginLeft: 55}}>供养人口</span>
                            <div class="input-group">
                                <input class="blank-box-input" placeholder="请输入供养人口"/>
                            </div>
                        </div>

                        < div class="blank-box-main">
                            <span class="blank-box-main-span" style={{marginRight: 55}}>单位全称</span>
                            < div class="input-group">
                                <input class="blank-box-input" placeholder="请输入单位全称"/>
                            </div>

                            <span class="blank-box-main-span" style={{marginRight: 20, marginLeft: 60}}>单位性质</span>
                            <Radio.Group value={this.state.radio3} onChange={this.onChange.bind(this, 'radio3')}>
                                <Radio.Button value="事业单位"/>
                                <Radio.Button value="国家机关"/>
                                <Radio.Button value="无"/>
                                <Radio.Button value="个体"/>
                                <Radio.Button value="其他"/>
                                <Radio.Button value="更多"/>
                            </Radio.Group>
                        </div>

                        < div class="blank-box-main">
                            <span class="blank-box-main-span" style={{marginRight: 55}}>单位地址</span>
                            < div class="input-group">
                                <input class="blank-box-input" placeholder="请输入单位地址"/>
                            </div>
                        </div>

                        < div class="blank-box-main">
                            <span class="blank-box-main-span">本人税后年收入</span>
                            < div class="input-group">
                                <input class="blank-box-input" placeholder="请输入本人税后年收入"/>
                            </div>
                            <span class="blank-box-main-span">配偶税后年收入</span>
                            < div class="input-group">
                                <input class="blank-box-input" placeholder="请输入配偶税后年收入"/>
                            </div>
                        </div>

                        < div class="blank-box-main">
                            <span class="blank-box-main-span" style={{marginRight: 55}}>手机号码</span>
                            < div class="input-group">
                                <input class="blank-box-input" placeholder="请输入手机号码"/>
                            </div>
                        </div>

                    </div>

                    < footer>
                          <Button type="primary" onClick={this.showModal}>补录信息</Button>
                           <button type="button" class="next-step-btn" style ={{background:`url(${require("../../images/button_gray.png")}) no-repeat`}}
                             onClick={this.showOtherInfo}> 补录信息</button >
                        <Button plain={true} type="info" size="large" onClick={this.onIsShow}>信息补录</Button>
                        <button type="button" class="next-step-btn"
                                style={{background: `url(${require("../../images/button_gray.png")}) no-repeat`}}> 下一步
                        </button>
                    </footer>

                </div>
                :
                <div class="showTab2">
                    <div>
                        <Modal
                            title="借贷人信息补录"
                            visible={this.state.visible}
                            onOk={this.handleOk}
                            onCancel={this.handleCancel}
                            okText="确认"
                            cancelText="取消"
                            width="100%"
                            closable={true}
                            footer={null}

                        >
                            <Tabs defaultActiveKey="1" onChange={callback}>
                                <TabPane tab="基本信息" key="1">
                                    <span class="blank-box-main-span" style={{marginRight: 10}}>国家</span>
                                    < div class="input-group">
                                        <input class="blank-box-input"/>
                                    </div>
                                    <span class="blank-box-main-span" style={{marginRight: 10}}>证件类型</span>
                                    < div class="input-group">
                                        <input class="blank-box-input"/>
                                    </div>
                                    <span class="blank-box-main-span" style={{marginRight: 10}}>性别</span>
                                    <Radio.Group value={this.state.radio4}
                                                 onChange={this.onChange.bind(this, 'radio4')}>
                                        <Radio.Button value="男"/>
                                        <Radio.Button value="女"/>
                                    </Radio.Group>

                                    <span class="blank-box-main-span" style={{marginRight: 10}}>是否长期有效</span>
                                    <Radio.Group value={this.state.radio5}
                                                 onChange={this.onChange.bind(this, 'radio5')}>
                                        <Radio.Button value="是"/>
                                        <Radio.Button value="否"/>
                                    </Radio.Group>

                                    <span class="blank-box-main-span" style={{marginRight: 10}}>出生日期</span>
                                    < div class="input-group">
                                        <input class="blank-box-input"/>
                                    </div>
                                    <span class="blank-box-main-span" style={{marginRight: 10}}>证件有效终止日</span>
                                    < div class="input-group">
                                        <input class="blank-box-input"/>
                                    </div>

                                </TabPane>
                                <TabPane tab="职业信息" key="2">
                                    <span class="blank-box-main-span" style={{marginRight: 10}}>个人信贷对象</span>
                                    <select class="blank-box-input">
                                        <option>请选择</option>
                                        <option value="公务员">公务员</option>
                                    </select>
                                </TabPane>
                                <TabPane tab="财务信息" key="3">
                                    <span class="blank-box-main-span" style={{marginRight: 0}}>资产合计</span>
                                    < div class="input-group">
                                        <input class="blank-box-input"/>
                                    </div>
                                    <span class="blank-box-main-span" style={{marginRight: 0}}>负债合计</span>
                                    < div class="input-group">
                                        <input class="blank-box-input"/>
                                    </div>
                                </TabPane>
                                <TabPane tab="联系信息" key="4">
                                    <span class="blank-box-main-span" style={{marginRight: 0}}>电子邮箱</span>
                                    < div class="input-group">
                                        <input class="blank-box-input"/>
                                    </div>
                                    <span class="blank-box-main-span" style={{marginRight: 0}}>通信地址</span>
                                    < div class="input-group">
                                        <input class="blank-box-input"/>
                                    </div>
                                    <span class="blank-box-main-span" style={{marginRight: 0}}>固定电话</span>
                                    < div class="input-group">
                                        <input class="blank-box-input"/>
                                    </div>
                                </TabPane>
                            </Tabs>

                        </Modal>
                    </div>
                </div>
            }
            </div>


        );
    }


}



/*export default connect(mapStateToProps, mapDispatchToProps)(Borrower);*/
export default (Borrower);