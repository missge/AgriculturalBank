import React from 'react';
import {Component} from '../../components/libs';
import * as homeActions from '../../actions/home';
import * as loginActions from '../../actions/login';
import * as investiAction from '../../actions/investi';
import * as borrowerAction from '../../actions/borrower';
import * as loanAction from '../../actions/loan';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Map} from 'immutable';
import Head from '../../ma-ui/Head'
import {Link} from 'react-router-dom';
import TabTitle from '../../components/src/TabTitle'
import {Form, Input, Button, Layout, Tabs, Select, Radio} from "../../components/index";
import '../publicCss/public.css'
import {MessageBox} from "../../components";
import E from 'wangeditor';

const actions = [
    homeActions, loginActions, investiAction, borrowerAction, loanAction
];

function mapStateToProps(state) {
    const {investi} = state;
    const {home} = state;
    const {client} = state;
    return {
        investi, home, client
    };
}

function mapDispatchToProps(dispatch) {

    const creators = Map()
        .merge(...actions)
        .filter(value => typeof value === 'function')
        .toObject();
    return {
        investiAction: bindActionCreators(creators, dispatch)

    };
}

/*@connect(
        state => ({...state.home}),
    dispatch => bindActionCreators({showIdCard}, dispatch)
)*/
class Investigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            investigateExplain: '',//调查说明
            investigateIdea: '',//调查意见
            containerHeight: window.innerHeight - this.getHeight(100),
        }

    }

    componentDidMount() {
        const elem = this.refs.investigation;
        const editor = new E(elem);
        editor.create();
    }

    onMesageBoxClick(key) {
        MessageBox.confirm(
            '提交审批', '温馨提示', {
                cancelButtonText: '新增贷款办理',
                confirmButtonText: '关闭贷款办理',
                showClose: false
            }).then(() => {
            // eslint-disable-next-line
            mmspc.button.backPress()
        }).catch(() => {

        });
    }

    onChange(key, value) {
        this.state[key] = value;
        this.forceUpdate();
    }

    onSubmit(e) {
        e.preventDefault();
    }

    render() {
        return (
            <div style={{height: this.state.containerHeight}}>
                <div style={{overflow: "auto", height: '100%'}}>
                    <div class="main_contanier">
                        <TabTitle title="调查报告" class="tabTitle blueTabTitle"/>
                        <div class="form_bg">
                            <Form labelWidth="80" onSubmit={this.onSubmit.bind(this)}>
                                <Form.Item label="调查意见">
                                    <Radio.Group value={this.state.investigateIdea}
                                                 onChange={this.onChange.bind(this, 'investigateIdea')}>
                                        <Radio.Button value="同意"/>
                                        <Radio.Button value="不同意"/>
                                    </Radio.Group>
                                </Form.Item>
                                <Form.Item label="调查说明">
                                    <Input type="textarea" value={this.state.investigateExplain}
                                           placeholder="请输入调查意见示例：经调查贷款信息无误，同意贷款申请。"
                                           onChange={this.onChange.bind(this, 'investigateExplain')}></Input>
                                </Form.Item>
                                <div className="investiBox">
                                    <span className="talk_label">调查报告</span>
                                    <div ref="investigation" style={{marginLeft: '80px', background: '#fff'}}>
                                        {this.props.investi.reportInfo}
                                        {/*  <ul>
                                            <li>
                                                &nbsp;&nbsp;&nbsp;&nbsp;借款人#客户姓名#，共同借款人#共同借款人姓名#，因购房#房屋地址及房号#，拟向我行申请#业务品种#贷款人民币#贷款金额#万元整，期限#贷款期限#，采取#还款方式#还款方式。经本岗与借款人面谈及调查核实，该笔贷款资料完整、真实和有效，调查情况具体报告如下：
                                            </li>
                                            <li>
                                                <h5>（一）借款人基本情况</h5>
                                            </li>
                                            <li>
                                                &nbsp;&nbsp;&nbsp;&nbsp;1、借款人#客户姓名#，性别#性别#，户籍地为#户籍（学生家庭）信息地址#，出生于#出生日期#，婚姻状况为#婚姻状况#，已核真实。
                                            </li>
                                            <li>
                                                借款人#客户姓名#任职于#单位全称#与（征信显示#确认/不#一致），单位性质为#单位性质#，税后约收入约人民币#本人年税后收入12#元，结合本地区经济及借款人情况，认定其收入真实合理。
                                            </li>
                                            <li>
                                                &nbsp;&nbsp;&nbsp;&nbsp;2、人行征信系统及我行XMS系统反映，借款人#客户姓名#目前名下@有/无#贷款记录；名下目前#有/无#到期未还的金融债务（包括逾期贷款、信用卡透支等）；#有/无#对外担保记录。
                                            </li>
                                            <li>
                                                &nbsp;&nbsp;&nbsp;&nbsp;3、经我行个人客户信用评级认定借款人#客户姓名#为#评分结果#分，本岗认定真实。
                                            </li>
                                            <li>
                                                <h5>（二）共同借款人家庭基本情况</h5>
                                            </li>
                                            <li>
                                                &nbsp;&nbsp;&nbsp;&nbsp;1、共同借款人#共同借款人姓名#，性别#性别#，户籍地为#共同借款人户籍（学生家庭）详细地址#，出生于#出生日期#，婚姻状况为#婚姻状况已核真实。
                                            </li>
                                            <li>
                                                借款人#客户姓名#任职于#单位全称#与（征信显示#确认/不#一致），单位性质为#单位性质#，税后约收入约人民币#本人年税后收入12#元，结合本地区经济及借款人情况，认定其收入真实合理。
                                            </li>
                                            <li>
                                                &nbsp;&nbsp;&nbsp;&nbsp;2、人行征信系统及我行XMS系统反映，借款人#客户姓名#目前名下@有/无#贷款记录；名下目前#有/无#到期未还的金融债务（包括逾期贷款、信用卡透支等）；#有/无#对外担保记录。
                                            </li>
                                            <li>
                                                &nbsp;&nbsp;&nbsp;&nbsp;3、经我行个人客户信用评级认定借款人#客户姓名#为#评分结果#分，本岗认定真实。
                                            </li>
                                        </ul>*/}
                                    </div>
                                </div>
                            </Form>
                        </div>
                        <div class="loan_footer">
                            <div class="footer_content">

                                <Button type="warning" size="large" style={{marginLeft: '5%', width: '400px'}}
                                        onClick={() => {
                                            //获取调查报告接口(失败)
                                            this.props.investiAction.getInvtreport(JSON.parse("{\"req_id\":\""+this.props.client.procsId+"\" , \"optkind\":\"A5101\" , \"bussrc\":\"02\"}"));
                                            //更新作业接口(成功)
                                            //alert("procsId："+this.props.client.procsId+"investigateExplain："+this.state.investigateExplain);
                                            //this.props.investiAction.updateWork("{\"req_id\":" + "\"" + this.props.client.procsId + "\",\"invt_adv\":" + "\"1\" , \"invtadv_info\":" + "\"" + this.state.investigateExplain + "\"}");
                                            //调查报告上传接口(暂时不知道哪个接口)
                                            //人员选择接口(失败)
                                            // this.props.investiAction.queryObject(JSON.parse("{\"currentPageNum\":\"1\" , \"rowsOfPage\":\"10\"}"));
                                            // this.props.investiAction.queryObject("currentPageNum=1&rowsOfPage=10");
                                            //提交作业接口(成功)
                                            // this.props.investiAction.commitWork(this.props.client.procsId ,"{\"sbmtActId\":\"02\",\"sbmtIstnId\":\"同意\" , \"sbmtIstnName\":\"农村产业与城镇化金融部 \" , \"sbmtUserId\":\"110102195910150515 \" ,\"sbmtUserName\":\"用户0515\"}");

                                            // this.props.investiAction.getLoadnerInfo(JSON.parse("{\"clientId\":\""+this.props.client.clientId+"\"}"));
                                            // this.props.investiAction.getAssetInfo(JSON.parse("{\"req_id\":" + "\"" + this.props.client.procsId + "\"}"));
                                            //this.props.investiAction.queryList(JSON.parse("{\"cert_no\":\"\" ,\"client_name\":"+"\"\" ,\"optkind\":\"A5101\" , \"state\":\"2\" , \"act_id\":\"0\" , \"pageNum\":\"1\" ,\"pageSize\":\"10\"}"));
                                            // this.props.investiAction.queryWork(JSON.parse("{\"req_id\":\""+this.props.client.procsId+"\"}"));
                                        }}>更新作业</Button>
                                <Button type="warning" size="large" style={{marginLeft: '5%', width: '400px'}}
                                        onClick={() => {
                                            this.props.investiAction.queryObject(JSON.parse("{\"currentPageNum\":\"1\" , \"rowsOfPage\":\"10\"}"));
                                        }}
                                >上传档案</Button>

                            </div>
                        </div>
                    </div>
                </div>

            </div>

        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Investigation);