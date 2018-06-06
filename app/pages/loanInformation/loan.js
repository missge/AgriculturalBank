import React from 'react';
import * as homeActions from '../../actions/home';
import * as loginActions from '../../actions/login';
import {Component, unshiftArrs} from '../../components/libs'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Map} from 'immutable';
import Head from '../../ma-ui/Head'
import {Link} from 'react-router-dom';
import * as loanActions from '../../actions/loan';
import TabTitle from '../../components/src/TabTitle'

import {
    Form,
    Input,
    Button,
    Tabs,
    DatePicker,
    NavBar,
    SupplePage,
    Dialog,
    SelectList,
    Loading,
} from "../../components/index";
import '../publicCss/public.css'
import Radio from '../../components/src/radio';
import {postLoan} from "../../actions/loan";
import {MessageBox} from "../../components";
import {loading} from "../../actions/login";


var appId;
var that = "";
let showLength = 2;
let showLengthTwo = 1;
let showSixLength = 5;

const actions = [
    loanActions, loginActions,homeActions
];

function mapStateToProps(state) {
    const {loan} = state;
    const {client} = state;
    const {home} = state;
    return {
        loan, client, home
    };
}

function mapDispatchToProps(dispatch) {
    const creators = Map()
        .merge(...actions)
        .filter(value => typeof value === 'function')
        .toObject();
    return {
        loanActions: bindActionCreators(creators, dispatch)

    };
}

/*@connect(
        state => ({...state.home}),
    dispatch => bindActionCreators({showIdCard}, dispatch)
)*/

const style = {
    margin: 12,
};

class Loan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                region: '',
                date1: null,
                date2: null,
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
            containerHeight: window.innerHeight - this.getHeight(100),
            isShow: false,
            //loan页面是否已查询
            isQueryLoan: false,
            //控制下一步按钮是否显示
            nextJump: "none",
            //控制生成电子申请表按钮是否显示
            generateForm: "block",
            //新增产权人
            newProperty: false,

            isCommonasst: '',//是否普通住宅 onChangeHouse
            isLocal: '',//借款人是否本地信息
            divorceDate: '',//借款人离婚证明登记日期

            //押品缺少2个字段
            iseval: '',//是否评估流程
            evaldat: '',//评估价值认定日期

            //房屋类型 点击更多弹窗
            houseDialogVisible: false,
            //特色产品 点击更多弹窗
            spepdctDialogVisible: false,
            //房贷结清情况 点击更多弹窗
            husloclinfoDialog: false,
            //建筑物规划用途 点击更多弹窗
            archusageDialog: false,

            spepdctList: ['非特色', '接力贷款', '连心贷', '行内交易转按贷款', '置换贷款', '非交易转按贷款',
                '车库（位）贷款', '自建房贷款', '集资建房贷款', '直客式贷款', '跨行交易转按贷款',],
            houseTypeList: ['商品房', '经济适用房', '限价房', '房改房', '军队经济适用房', '军队安置房'],
            husloclIist: ['名下无住房贷款记录', '已结清名下住房贷款', '有一笔住房贷款未结清', '有两笔及以上住房贷款未结清'],
            archusageList: ['普通商品房', '别墅', '高档公寓', '房改房', '经济房', '限价房', '其他保障住房', '自建房', '其他类居住用房'],
        };
    }

    onGetInterest(key, value) {
        this.props.loan.rateInfo[key] = value;
        this.setState({
            [key]: value
        })
    }

    onSubmit(e) {
        e.preventDefault();
    }

    onChange(key, value) {
        this.state[key] = value;
        this.forceUpdate();
    }

    onChangeHouse(key, value) {
        this.props.loan.houseInfo[key] = value;
        this.forceUpdate();
    }

    onChangeLoan(key, value) {
        this.props.loan.loanInfo[key] = value;
        this.forceUpdate();
    }

    onChangeRate(key, value) {
        this.props.loan.rateInfo[key] = value;
        this.forceUpdate();
    }

    onChangeAsst(key, value) {
        this.props.loan.asstInfo[key] = value;
        this.forceUpdate();
    }

    onChangeGuar(key, value) {
        this.props.loan.guarInfo[key] = value;
        this.forceUpdate();
    }

    /* onMesageBoxClick(key) {
         MessageBox.confirm(
             '您确定要删除产权人吗？', '温馨提示', {
                 cancelButtonText: '取消',
                 confirmButtonText: '确定',
                 showClose: false
             }).then(() => {
             // eslint-disable-next-line
             mmspc.button.backPress()
         }).catch(() => {

         });
     }*/

    //房屋类型 更多点击事件
    onHouseAppendClick() {
        this.setState({houseDialogVisible: true});
    }

    //特色产品 更多点击事件
    onSpepdctAppendClick() {
        this.setState({spepdctDialogVisible: true});
    }

    //房贷结清情况 更多点击事件
    onHusloclinfoAppendClick() {
        this.setState({husloclinfoDialog: true});
    }

    //建筑物规划用途 更多点击事件
    onArchusageAppendClick() {
        this.setState({archusageDialog: true});
    }

    removeByValue(arr, val) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == val) {
                arr.splice(i, 1);
                break;
            }
        }
    }

    setComplete(cur) {
        let value = this.context.getListValue();
        value[cur] = 2;
        return value;
    }

    componentDidMount() {
        that = this;

        unshiftArrs(this.state.spepdctList, this.props.loan.loanInfo.spepdct, (data) => {
            this.props.loan.loanInfo['spepdct'] = data
            this.refs.spepdctSL.setState({selected: null})
        }, showLength);

        unshiftArrs(this.state.houseTypeList, this.props.loan.houseInfo.hustype, (data) => {
            this.props.loan.houseInfo['hustype'] = data
            this.refs.houseTypeSL.setState({selected: null})
        }, showLength);

        unshiftArrs(this.state.archusageList, this.props.loan.asstInfo.archusage, (data) => {
            this.props.loan.asstInfo['archusage'] = data
            this.refs.archusageSL.setState({selected: null})
        }, showLength);

    }

//重置Loan页面信息
    clearLoanInfo() {
        this.setState({
            //loan页面是否已查询
            isQueryLoan: false,
            //控制下一步按钮是否显示
            nextJump: "none",
            //控制生成电子申请表按钮是否显示
            generateForm: "block",
        })
        //重置props贷款信息
        this.props.loanActions.clearPropsLoan();
    }

    render() {
        return (
            <div style={{height: this.state.containterHeight}}>
                <div style={{overflow: 'auto', height: '100%'}}>
                    <div class="showTab1">

                        <div>
                            {/*查询接口*/}
                            {
                                this.props.home.pageSelected == 4 &&
                                !this.state.isQueryLoan &&
                                // eslint-disable-next-line
                                mmspc.bridge.get((data) => {
                                    this.state.isQueryLoan = true;
                                    // this.setState({isQueryLoan: true});
                                    /*this.props.loanActions.getLoanInfo(data, JSON.parse("{\"req_id\":\"111111\"}"));
                                    this.props.loanActions.getRateInfo(data, JSON.parse("{\"req_id\":\"111111\"}"));
                                    this.props.loanActions.getHouseInfo(data, JSON.parse("{\"req_id\":\"111111\"}"));
                                    this.props.loanActions.getAssetInfo(data, JSON.parse("{\"req_id\":\"111111\"}"));
                                    this.props.loanActions.getGuarInfo(data, JSON.parse("{\"req_id\":\"111111\"}"));*/
                                    //查询贷款信息
                                    this.props.loanActions.getLoanInfo(JSON.parse("{\"req_id\":" + "\"" + this.props.client.procsId + "\",\"loanorder\":\"11111\"}"));
                                    //查询利率信息
                                    this.props.loanActions.getRateInfo(JSON.parse("{\"req_id\":" + "\"" + this.props.client.procsId + "\"}"));
                                    //查询用途信息
                                    this.props.loanActions.getHouseInfo(JSON.parse("{\"req_id\":" + "\"" + this.props.client.procsId + "\"}"));
                                    //查询押品信息
                                    this.props.loanActions.getAssetInfo(JSON.parse("{\"req_id\":" + "\"" + this.props.client.procsId + "\"}"));//作业Id 押品Id
                                    //查询担保信息
                                    this.props.loanActions.getGuarInfo(JSON.parse("{\"req_id\":" + "\"" + this.props.client.procsId + "\"}")); //作业Id 担保信息Id
                                })
                            }
                        </div>

                        <div class="main_contanier">
                            <TabTitle title="贷款信息" class="tabTitle blueTabTitle"/>
                            <Form labelPosition="left" model={this.state.form} labelWidth="120"
                                  onSubmit={this.onSubmit.bind(this)}>
                                <div class="form_content">
                                    <div class="form_lf">
                                        <Form.Item label="贷款金额">
                                            <Input size="small" value={this.props.loan.loanInfo.loansum}
                                                   placeholder="50万"
                                                   onChange={this.onChangeLoan.bind(this, 'loansum')}></Input>
                                        </Form.Item>
                                        <Form.Item label="首付金额">
                                            <Input size="small" value={this.props.loan.loanInfo.firstpaysum}
                                                   placeholder="15万"
                                                   onChange={this.onChangeLoan.bind(this, 'firstpaysum')}></Input>
                                        </Form.Item>
                                        <Form.Item label="还款方式">
                                            <Radio.Group value={this.props.loan.loanInfo.f_repayment}
                                                         onChange={this.onChangeLoan.bind(this, 'f_repayment')}>
                                                <Radio.Button value="等额本金"/>
                                                <Radio.Button value="等额本息"/>
                                            </Radio.Group>
                                        </Form.Item>
                                        <Form.Item label="是否公积金组合">
                                            <Radio.Group value={this.props.loan.loanInfo.isfund}
                                                         onChange={this.onChangeLoan.bind(this, 'isfund')}>
                                                <Radio.Button value="是"/>
                                                <Radio.Button value="否"/>
                                            </Radio.Group>
                                        </Form.Item>

                                    </div>
                                    <div class="form_rt">
                                        <Form.Item label="贷款期限">
                                            <Input size="small" value={this.props.loan.loanInfo.loanterm}
                                                   placeholder="10年"
                                                   onChange={this.onChangeLoan.bind(this, 'loanterm')}></Input>
                                        </Form.Item>
                                        <Form.Item label="房屋交易总价">
                                            <Input size="small" value={this.props.loan.loanInfo.price}
                                                   placeholder="150万"
                                                   onChange={this.onChangeLoan.bind(this, 'price')}></Input>
                                        </Form.Item>
                                        <Form.Item label="利率浮动幅度">
                                            <Input size="small" value={this.props.loan.rateInfo.floatrange}
                                                   readonly></Input>
                                        </Form.Item>
                                        <Form.Item>
                                            <Radio.Group value={this.props.loan.rateInfo.floatrange}
                                                         onChange={this.onGetInterest.bind(this, 'floatrange')}>
                                                <Radio.Button value="0%"/>
                                                <Radio.Button value="5%"/>
                                                <Radio.Button value="10%"/>
                                                <Radio.Button value="15%"/>
                                                <Radio.Button value="20%"/>
                                            </Radio.Group>

                                        </Form.Item>
                                    </div>
                                </div>
                                <TabTitle title="押品信息" class="tabTitle orangeTabTitle"/>
                                <div class="form_content">
                                    <div class="form_lf">
                                        <Form.Item label="房屋建筑面积">
                                            <Input size="small" value={this.props.loan.asstInfo.buildarea}
                                                   placeholder="92平方"
                                                   onChange={this.onChangeAsst.bind(this, 'buildarea')}></Input>
                                        </Form.Item>
                                    </div>
                                    <div class="form_rt">
                                        <Form.Item label="详细地址">
                                            <Input size="small" value={this.props.loan.asstInfo.houseaddr}
                                                   placeholder="北京北路102号"
                                                   onChange={this.onChangeAsst.bind(this, 'houseaddr')}></Input>
                                        </Form.Item>
                                    </div>
                                </div>
                            </Form>
                        </div>
                        <div class="loan_footer">
                            <div class="footer_content">
                                <div class="footer_content_lf">
                                    <Button plain={true} type="info" size="large"
                                            onClick={
                                                () => this.setState({isShow: !this.state.isShow})
                                            }>
                                        信息补录
                                    </Button>
                                    {/*   <Button plain={true} type="info" size="large"
                                            onClick={
                                                () => this.clearLoanInfo()
                                            }>
                                        重置
                                    </Button>*/}
                                </div>
                                <div class="footer_content_rt">
                                    <Button type="warning" size="large" style={{width:'90%'}}
                                            onClick={
                                                () => {
                                                    this.props.loan.loanInfo.req_id = this.props.client.procsId;
                                                    this.props.loan.houseInfo.req_id = this.props.client.procsId;
                                                    this.props.loan.guarInfo.req_id = this.props.client.procsId;
                                                    this.props.loan.rateInfo.req_id = this.props.client.procsId;
                                                    this.props.loan.asstInfo.req_id = this.props.client.procsId;
                                                    //      alert("贷款信息："+JSON.stringify(this.props.loan.loanInfo));
                                                    //      alert("房屋信息："+JSON.stringify(this.props.loan.houseInfo));
                                                    //      alert("利率信息："+JSON.stringify(this.props.loan.rateInfo));
                                                    //      alert("押品信息：" + JSON.stringify(this.props.loan.asstInfo));
                                                    //      alert("担保信息："+JSON.stringify(this.props.loan.guarInfo));
                                                    //    that.props.loanActions.postLoanInfo(data, that.state.loanInfo, that.props.loan.houseInfo);
                                                    //保存贷款信息
                                                    this.props.loanActions.postLoanInfo(this.props.loan.loanInfo);
                                                    //保存用途信息
                                                    this.props.loanActions.postHouseInfo(this.props.loan.houseInfo);
                                                    //保存利率信息
                                                    this.props.loanActions.postRateInfo(this.props.loan.rateInfo);
                                                    //保存押品信息
                                                    this.props.loanActions.postAssetInfo(this.props.loan.asstInfo);
                                                    // this.props.loanActions.postAssetInfo("{\"assttype\":\"2030104\",\"req_id\":\""+this.props.client.procsId+"\"}");
                                                    // this.props.loanActions.loginout("");
                                                    //保存担保信息
                                                    this.props.loanActions.postGuarInfo(this.props.loan.guarInfo);
                                                    //显示下一步按钮，隐藏生成电子申请表按钮
                                                    //this.setState({nextJump: "block", generateForm: "none"})
                                                }
                                            }>保存贷款信息</Button>
                                </div>
                                <div class="footer_content_rt">
                                    <Button type="warning" size="large" style={{width:'90%'}}
                                            onClick={
                                                () => {
                                                    //下载申请表 6c7bObbc-e5da-4d1b-
                                                    this.props.loanActions.downloadAppForm(JSON.parse("{\"req_id\":" + "\"" + this.props.client.procsId + "\",\"bussrc\":\"02\"}"));
                                                    this.context.jumpTo(5, this.setComplete.bind(this)(4));
                                                    this.props.loanActions.pageSelected(5);
                                                }
                                            }>
                                        生成电子申请表
                                    </Button>

                                </div>
                            </div>
                        </div>
                    </div>

                    <SupplePage style={{display: this.state.isShow === false ? "none" : "block"}}>
                        <NavBar
                            title={"贷款信息补录"}
                            lName={"取消"}
                            rName={"确定"}
                            lClick={() => this.setState({isShow: !this.state.isShow})}
                            rClick={() => this.setState({isShow: !this.state.isShow})}
                        >
                        </NavBar>
                        <div class="showTab2">
                            <div class="main_contanier">
                                <Tabs activeName="1" onTabClick={(tab) => console.log(tab.props.name)}>
                                    <Tabs.Pane label="贷款基本信息" name="1">
                                        <Form labelPosition="left" model={this.state.form} labelWidth="170"
                                              onSubmit={this.onSubmit.bind(this)}>
                                            <div class="form_content">
                                                <div class="form_lf">
                                                    <Form.Item label="贷款性质">
                                                        <Radio.Group value={this.props.loan.loanInfo.charkind}
                                                                     onChange={this.onChangeLoan.bind(this, 'charkind')}>
                                                            <Radio.Button value="自营常规贷款"/>
                                                            <Radio.Button value="公积金委托贷款"/>
                                                        </Radio.Group>
                                                    </Form.Item>
                                                    <Form.Item label="合作项目名称">
                                                        <Input value={this.props.loan.loanInfo.coprjname}
                                                               placeholder="合作项目 "
                                                               onChange={this.onChangeLoan.bind(this, 'coprjname')}></Input>
                                                    </Form.Item>
                                                    <Form.Item label="首付款比例">
                                                        <Input value={this.props.loan.loanInfo.firstpayrate}
                                                               placeholder="15% "
                                                               onChange={this.onChangeLoan.bind(this, 'firstpayrate')}></Input>
                                                    </Form.Item>
                                                    <Form.Item label="执行利率政策">
                                                        <Radio.Group value={this.props.loan.rateInfo.execratekind}
                                                                     onChange={this.onChangeRate.bind(this, 'execratekind')}>
                                                            <Radio.Button value="首套利率"/>
                                                            <Radio.Button value="二套利率"/>
                                                        </Radio.Group>
                                                    </Form.Item>
                                                    <Form.Item label="执行利率">
                                                        <Input value={this.props.loan.rateInfo.execrate}
                                                               placeholder="5% "
                                                               onChange={this.onChangeRate.bind(this, 'execrate')}></Input>
                                                    </Form.Item>
                                                    <Form.Item label="还款账号">
                                                        <Input value={this.props.loan.loanInfo.account1}
                                                               placeholder="请输入还款账号"
                                                               onChange={this.onChangeLoan.bind(this, 'account1')}></Input>
                                                    </Form.Item>
                                                    <Form.Item label="收款人账号">
                                                        <Input value={this.props.loan.loanInfo.payeedepacc}
                                                               placeholder="请输入收款人账号"
                                                               onChange={this.onChangeLoan.bind(this, 'payeedepacc')}></Input>
                                                    </Form.Item>
                                                    <Form.Item label="每月房屋费用支出">
                                                        <Input value={this.props.loan.rateInfo.houseexp}
                                                               onChange={this.onChangeRate.bind(this, 'houseexp')}></Input>
                                                    </Form.Item>
                                                    <Form.Item label="是否信用方式">
                                                        <Radio.Group value={this.props.loan.loanInfo.iscredit}
                                                                     onChange={this.onChangeLoan.bind(this, 'iscredit')}>
                                                            <Radio.Button value="是"/>
                                                            <Radio.Button value="否"/>
                                                        </Radio.Group>
                                                    </Form.Item>
                                                    <Form.Item label="公积金网点号">
                                                        <Input value={this.props.loan.loanInfo.fundno}
                                                               placeholder="A40051008 "
                                                               onChange={this.onChangeLoan.bind(this, 'fundno')}></Input>
                                                    </Form.Item>
                                                </div>
                                                <div class="form_rt">
                                                    <Form.Item label="特色产品">
                                                        <Radio.Group value={this.props.loan.loanInfo.spepdct}
                                                                     onChange={this.onChangeLoan.bind(this, 'spepdct')}
                                                                     appendix="更多"
                                                                     onAppendixClick={this.onSpepdctAppendClick.bind(this)}>
                                                            {
                                                                this.state.spepdctList.map(function (item, i) {
                                                                    return (
                                                                        i < showLength + 1 ?
                                                                            <Radio.Button key={i} value={item}/> : ''
                                                                    )
                                                                })
                                                            }
                                                            <Radio.Button style={{marginBottom: "0px"}} value="更多"/>
                                                        </Radio.Group>
                                                    </Form.Item>
                                                    {/*特色产品点击更多弹窗*/}
                                                    <Dialog
                                                        size="small"
                                                        visible={this.state.spepdctDialogVisible}
                                                        // onCancel={ () => this.setState({ selectDialogVisible: false,types:this.state.types}) }
                                                        onCancel={() => this.setState({spepdctDialogVisible: false})}

                                                        lockScroll={false}
                                                        className='mmpsc-select-list-dialog'
                                                    >
                                                        <Dialog.Body>
                                                            <SelectList ref="spepdctSL"
                                                                        visible={this.state.spepdctDialogVisible}
                                                                        value={this.props.loan.loanInfo.spepdct}
                                                                        multiple={false} onChange={(val) => {
                                                                this.removeByValue(this.state.spepdctList, val)
                                                                this.state.spepdctList.unshift(val)
                                                                this.onChangeLoan('spepdct', val)
                                                                this.setState({spepdctDialogVisible: false})
                                                                this.refs.spepdctSL.setState({selected: null});
                                                            }}>
                                                                {
                                                                    this.state.spepdctList.map(function (item, i) {
                                                                        return i > showLength ?
                                                                            <SelectList.Option key={i} label={item}
                                                                                               value={item}/> : ''
                                                                    })
                                                                }

                                                            </SelectList>
                                                        </Dialog.Body>
                                                    </Dialog>
                                                    <Form.Item label="合作品种编号">
                                                        <Input value={this.props.loan.loanInfo.cobreno}
                                                               placeholder="A2018040101 "
                                                               onChange={this.onChangeLoan.bind(this, 'cobreno')}></Input>
                                                    </Form.Item>
                                                    <Form.Item label="贷款用途">
                                                        <Radio.Group value={this.props.loan.loanInfo.loanusekind}
                                                                     onChange={this.onChangeLoan.bind(this, 'loanusekind')}>
                                                            <Radio.Button value="购买住房"/>
                                                        </Radio.Group>
                                                    </Form.Item>
                                                    <Form.Item label="利率浮动周期">
                                                        <Radio.Group value={this.props.loan.rateInfo.adjrateflag}
                                                                     onChange={this.onChangeRate.bind(this, 'adjrateflag')}>
                                                            <Radio.Button value="次年1月1日"/>
                                                            <Radio.Button value="1年"/>
                                                            <Radio.Button value="6个月"/>
                                                            <Radio.Button value="3个月"/>
                                                            <Radio.Button value="1个月"/>
                                                        </Radio.Group>
                                                    </Form.Item>
                                                    <Form.Item label="收款人户名">
                                                        <Input value={this.props.loan.loanInfo.payeename}
                                                               placeholder="请输入收款人户名"
                                                               onChange={this.onChangeLoan.bind(this, 'payeename')}></Input>
                                                    </Form.Item>
                                                    <Form.Item label="还款类型">
                                                        <Radio.Group value={this.props.loan.rateInfo.repaykind}
                                                                     onChange={this.onChangeRate.bind(this, 'repaykind')}>
                                                            <Radio.Button value="对日还款"/>
                                                            <Radio.Button value="定日还款"/>
                                                        </Radio.Group>
                                                    </Form.Item>
                                                    <Form.Item label="是否收取提前还款违约金">
                                                        <Radio.Group value={this.props.loan.rateInfo.isgetbreaksum}
                                                                     onChange={this.onChangeRate.bind(this, 'isgetbreaksum')}>
                                                            <Radio.Button value="是"/>
                                                            <Radio.Button value="否"/>
                                                        </Radio.Group>
                                                    </Form.Item>
                                                    <Form.Item label="公积金贷款合同编号">
                                                        <Input value={this.props.loan.loanInfo.fundcontno}
                                                               placeholder="A8898012B1 "
                                                               onChange={this.onChangeLoan.bind(this, 'fundcontno')}></Input>
                                                    </Form.Item>
                                                </div>
                                            </div>
                                        </Form>
                                    </Tabs.Pane>
                                    <Tabs.Pane label="贷款房屋信息" name="2">
                                        <Form labelPosition="left" model={this.state.form} labelWidth="170"
                                              onSubmit={this.onSubmit.bind(this)}>
                                            <div class="form_content">
                                                <div class="form_lf">
                                                    <Form.Item label="开发商名称">
                                                        <Input value={this.props.loan.houseInfo.dlpname}
                                                               placeholder="请输入开发商名称 "
                                                               onChange={this.onChangeHouse.bind(this, 'dlpname')}></Input>
                                                    </Form.Item>
                                                    <Form.Item label="销(预)售许可证编号">
                                                        <Input value={this.props.loan.houseInfo.sellno}
                                                               placeholder="请输入销(预)售许可证编号 "
                                                               onChange={this.onChangeHouse.bind(this, 'sellno')}></Input>
                                                    </Form.Item>
                                                    <Form.Item label="购房目的">
                                                        <Radio.Group value={this.props.loan.houseInfo.bhusaim}
                                                                     onChange={this.onChangeHouse.bind(this, 'bhusaim')}>
                                                            <Radio.Button value="自主"/>
                                                            <Radio.Button value="经营"/>
                                                            <Radio.Button value="投资"/>
                                                        </Radio.Group>
                                                    </Form.Item>
                                                    {/* 房屋类型点击更多弹窗*/}
                                                    <Dialog
                                                        size="small"
                                                        visible={this.state.houseDialogVisible}
                                                        // onCancel={ () => this.setState({ selectDialogVisible: false,types:this.state.types}) }
                                                        onCancel={() => this.setState({houseDialogVisible: false})}
                                                        lockScroll={false}
                                                        className='mmpsc-select-list-dialog'
                                                    >
                                                        <Dialog.Body>
                                                            <SelectList ref="houseTypeSL"
                                                                        visible={this.state.houseDialogVisible}
                                                                        value={this.props.loan.houseInfo.hustype}
                                                                        multiple={false} onChange={(val) => {
                                                                this.removeByValue(this.state.houseTypeList, val)
                                                                this.state.houseTypeList.unshift(val)
                                                                this.onChangeHouse('hustype', val)
                                                                this.setState({houseDialogVisible: false})
                                                                this.refs.houseTypeSL.setState({selected: null});
                                                            }}>
                                                                {
                                                                    this.state.houseTypeList.map(function (item, i) {
                                                                        return i > showLength ?
                                                                            <SelectList.Option key={i} label={item}
                                                                                               value={item}/> : ''
                                                                    })
                                                                }

                                                            </SelectList>
                                                        </Dialog.Body>
                                                    </Dialog>
                                                    <Form.Item label="房屋类型">
                                                        <Radio.Group value={this.props.loan.houseInfo.hustype}
                                                                     onChange={this.onChangeHouse.bind(this, 'hustype')}
                                                                     appendix="更多"
                                                                     onAppendixClick={this.onHouseAppendClick.bind(this)}>
                                                            {
                                                                this.state.houseTypeList.map(function (item, i) {
                                                                    return (
                                                                        i < showLength + 1 ?
                                                                            <Radio.Button key={i} value={item}/> : ''
                                                                    )
                                                                })
                                                            }
                                                            <Radio.Button style={{marginBottom: "0px"}} value="更多"/>
                                                        </Radio.Group>

                                                    </Form.Item>
                                                    <Form.Item label="房屋建造年份">
                                                        <Input value={this.props.loan.houseInfo.buildyear}
                                                               placeholder="请输入房屋建造年份 "
                                                               onChange={this.onChangeHouse.bind(this, 'buildyear')}></Input>
                                                    </Form.Item>
                                                    <Form.Item label="房屋是否已经出租">
                                                        <Radio.Group value={this.props.loan.houseInfo.ishired}
                                                                     onChange={this.onChangeHouse.bind(this, 'ishired')}>
                                                            <Radio.Button value="是"/>
                                                            <Radio.Button value="否"/>
                                                        </Radio.Group>
                                                    </Form.Item>

                                                    <Form.Item label="借款人是否本地户籍">
                                                        <Radio.Group value={this.state.isLocal}
                                                                     onChange={this.onChange.bind(this, 'isLocal')}>
                                                            <Radio.Button value="是"/>
                                                            <Radio.Button value="否"/>
                                                        </Radio.Group>
                                                    </Form.Item>

                                                </div>
                                                <div class="form_rt">
                                                    <Form.Item label="楼盘名称">
                                                        <Input value={this.props.loan.houseInfo.bldname}
                                                               placeholder="请输入楼盘名称 "
                                                               onChange={this.onChangeHouse.bind(this, 'bldname')}></Input>
                                                    </Form.Item>
                                                    <Form.Item label="是否普通住宅">
                                                        <Radio.Group value={this.state.isCommonasst}
                                                                     onChange={this.onChange.bind(this, 'isCommonasst')}>
                                                            <Radio.Button value="是"/>
                                                            <Radio.Button value="否"/>
                                                            <Radio.Button value="其他"/>
                                                        </Radio.Group>
                                                    </Form.Item>
                                                    <Form.Item label="本套房属于第几套">
                                                        <Radio.Group value={this.props.loan.houseInfo.housesum}
                                                                     onChange={this.onChangeHouse.bind(this, 'housesum')}>
                                                            <Radio.Button value="第一套"/>
                                                            <Radio.Button value="第二套"/>
                                                            <Radio.Button value="第三套"/>
                                                            <Radio.Button value="三套以上"/>
                                                        </Radio.Group>
                                                    </Form.Item>
                                                    <Form.Item label="房屋形式">
                                                        <Radio.Group value={this.props.loan.houseInfo.husform}
                                                                     onChange={this.onChangeHouse.bind(this, 'husform')}>
                                                            <Radio.Button value="期房"/>
                                                            <Radio.Button value="现房"/>
                                                        </Radio.Group>
                                                    </Form.Item>
                                                    <Form.Item label="房贷结清情况">
                                                        <Radio.Group value={this.props.loan.houseInfo.husloclinfo}
                                                                     onChange={this.onChangeHouse.bind(this, 'husloclinfo')}
                                                                     appendix="更多"
                                                                     onAppendixClick={this.onHusloclinfoAppendClick.bind(this)}>
                                                            {
                                                                this.state.husloclIist.map(function (item, i) {
                                                                    return (
                                                                        i < showLengthTwo + 1 ?
                                                                            <Radio.Button key={i} value={item}/> : ''
                                                                    )
                                                                })
                                                            }
                                                            <Radio.Button style={{marginBottom: "0px"}} value="更多"/>
                                                        </Radio.Group>
                                                    </Form.Item>
                                                    {/*房贷结清情况点击更多弹窗*/}
                                                    <Dialog
                                                        size="small"
                                                        visible={this.state.husloclinfoDialog}
                                                        // onCancel={ () => this.setState({ selectDialogVisible: false,types:this.state.types}) }
                                                        onCancel={() => this.setState({husloclinfoDialog: false})}

                                                        lockScroll={false}
                                                        className='mmpsc-select-list-dialog'
                                                    >
                                                        <Dialog.Body>
                                                            <SelectList ref="husloclinfoSL"
                                                                        visible={this.state.husloclinfoDialog}
                                                                        value={this.props.loan.houseInfo.husloclinfo}
                                                                        multiple={false} onChange={(val) => {
                                                                this.removeByValue(this.state.husloclIist, val)
                                                                this.state.husloclIist.unshift(val)
                                                                this.onChangeHouse('husloclinfo', val)
                                                                this.setState({husloclinfoDialog: false})
                                                                this.refs.husloclinfoSL.setState({selected: null});
                                                            }}>
                                                                {
                                                                    this.state.husloclIist.map(function (item, i) {
                                                                        return i > showLengthTwo ?
                                                                            <SelectList.Option key={i} label={item}
                                                                                               value={item}/> : ''
                                                                    })
                                                                }

                                                            </SelectList>
                                                        </Dialog.Body>
                                                    </Dialog>
                                                    <Form.Item label="借款人离婚证明登记日期">
                                                        <DatePicker
                                                            value={this.state.divorceDate}
                                                            placeholder="选择日期"
                                                            onChange={this.onChange.bind(this, 'divorceDate')}
                                                        />
                                                    </Form.Item>
                                                </div>
                                            </div>
                                        </Form>
                                    </Tabs.Pane>
                                    <Tabs.Pane label="押品基本信息" name="3">
                                        <Form labelPosition="left" model={this.state.form} labelWidth="120"
                                              onSubmit={this.onSubmit.bind(this)}>
                                            <div class="form_content">
                                                <div class="form_lf">
                                                    <Form.Item label="押品分类">
                                                        <Radio.Group value={this.props.loan.asstInfo.assttype}
                                                                     onChange={this.onChangeAsst.bind(this, 'assttype')}>
                                                            <Radio.Button value="商品房住宅"/>
                                                            <Radio.Button value="完全产权保障住房"/>
                                                            <Radio.Button value="别墅"/>
                                                            <Radio.Button value="其他居住用房"/>
                                                            <Radio.Button value="不完全产权保障住房"/>
                                                        </Radio.Group>
                                                    </Form.Item>
                                                    <Form.Item label="押品名称">
                                                        <Input value={this.props.loan.asstInfo.asstname}
                                                               placeholder="请输入押品地址信息"
                                                               onChange={this.onChangeAsst.bind(this, 'asstname')}></Input>
                                                    </Form.Item>
                                                    <Form.Item label="房屋实际用途">
                                                        <Radio.Group value={this.props.loan.asstInfo.houseusage}
                                                                     onChange={this.onChangeAsst.bind(this, 'houseusage')}>
                                                            <Radio.Button value="居住"/>
                                                        </Radio.Group>
                                                    </Form.Item>
                                                    <Form.Item label="土地取得方式">
                                                        <Radio.Group value={this.props.loan.asstInfo.landgetmetho}
                                                                     onChange={this.onChangeAsst.bind(this, 'landgetmetho')}>
                                                            <Radio.Button value="拍卖出让"/>
                                                            <Radio.Button value="转让"/>
                                                            <Radio.Button value="其他"/>
                                                        </Radio.Group>
                                                    </Form.Item>
                                                    <Form.Item label="产权人客户代码"
                                                               style={{display: (this.state.newProperty != false ? "none" : "block")}}>
                                                        <Input value={this.props.loan.asstInfo.ownercode}
                                                               placeholder="请输入产权人客户代码"
                                                               onChange={this.onChangeAsst.bind(this, 'ownercode')}></Input>
                                                    </Form.Item>
                                                    <Form.Item label="产权人客户代码1"
                                                               style={{display: (this.state.newProperty != false ? "block" : "none")}}>
                                                        <Input value={this.props.loan.asstInfo.ownercode}
                                                               placeholder="请输入产权人客户代码1"
                                                               onChange={this.onChangeAsst.bind(this, 'ownercode')}></Input>
                                                    </Form.Item>
                                                    <Form.Item label="产权人客户代码2"
                                                               style={{display: (this.state.newProperty != false ? "block" : "none")}}>
                                                        <Input value={this.props.loan.asstInfo.ownercode}
                                                               placeholder="请输入产权人客户代码2"
                                                               onChange={this.onChangeAsst.bind(this, 'ownercode')}></Input>
                                                    </Form.Item>

                                                </div>
                                                <div class="form_rt">
                                                    <Form.Item label="建筑结构">
                                                        <Radio.Group value={this.props.loan.asstInfo.archstruc}
                                                                     onChange={this.onChangeAsst.bind(this, 'archstruc')}>
                                                            <Radio.Button value="钢混"/>
                                                            <Radio.Button value="砖混"/>
                                                            <Radio.Button value="砖木"/>
                                                            <Radio.Button value="框架"/>
                                                            <Radio.Button value="钢结构"/>
                                                            <Radio.Button value="其他"/>
                                                        </Radio.Group>
                                                    </Form.Item>
                                                    <Form.Item label="建筑物规划用途">
                                                        <Radio.Group value={this.props.loan.asstInfo.archusage}
                                                                     onChange={this.onChangeAsst.bind(this, 'archusage')}
                                                                     appendix="更多"
                                                                     onAppendixClick={this.onArchusageAppendClick.bind(this)}>
                                                            {
                                                                this.state.archusageList.map(function (item, i) {
                                                                    return (
                                                                        i < showLength + 1 ?
                                                                            <Radio.Button key={i} value={item}/> : ''
                                                                    )
                                                                })
                                                            }
                                                            <Radio.Button style={{marginBottom: "0px"}} value="更多"/>
                                                        </Radio.Group>
                                                    </Form.Item>
                                                    {/*建筑物规划用途点击更多弹窗*/}
                                                    <Dialog
                                                        size="small"
                                                        visible={this.state.archusageDialog}
                                                        onCancel={() => this.setState({archusageDialog: false})}
                                                        lockScroll={false}
                                                        className='mmpsc-select-list-dialog'
                                                    >
                                                        <Dialog.Body>
                                                            <SelectList ref="archusageSL"
                                                                        visible={this.state.archusageDialog}
                                                                        value={this.props.loan.asstInfo.archusage}
                                                                        multiple={false} onChange={(val) => {
                                                                this.removeByValue(this.state.archusageList, val)
                                                                this.state.archusageList.unshift(val)
                                                                this.onChangeAsst('archusage', val)
                                                                this.setState({archusageDialog: false})
                                                                this.refs.archusageSL.setState({selected: null});
                                                            }}>
                                                                {
                                                                    this.state.archusageList.map(function (item, i) {
                                                                        return i > showLength ?
                                                                            <SelectList.Option key={i} label={item}
                                                                                               value={item}/> : ''
                                                                    })
                                                                }

                                                            </SelectList>
                                                        </Dialog.Body>
                                                    </Dialog>
                                                    <Form.Item label="土地用途">
                                                        <Radio.Group value={this.props.loan.asstInfo.landusage}
                                                                     onChange={this.onChangeAsst.bind(this, 'landusage')}>
                                                            <Radio.Button value="住宅"/>
                                                        </Radio.Group>
                                                    </Form.Item>
                                                    <Form.Item label="产权类型">
                                                        <Radio.Group value={this.props.loan.asstInfo.ownershiptype}
                                                                     onChange={this.onChangeAsst.bind(this, 'ownershiptype')}>
                                                            <Radio.Button value="所有权"/>
                                                            <Radio.Button value="使用权"/>
                                                        </Radio.Group>
                                                    </Form.Item>
                                                    <Form.Item label="产权份额">
                                                        <Input value={this.props.loan.asstInfo.ownerprop}
                                                               placeholder="请输入产权份额"
                                                               onChange={this.onChangeAsst.bind(this, 'ownerprop')}></Input>
                                                    </Form.Item>
                                                    <Form.Item label="产权份额"
                                                               style={{display: (this.state.newProperty != false ? "block" : "none")}}>
                                                        <Input placeholder="请输入产权份额"></Input>
                                                        <img src={require("../../images/yijujue.png")}
                                                             style={{height: '4%', width: '4%'}} onClick={() => {
                                                            this.setState({newProperty: false});
                                                        }}/>
                                                    </Form.Item>
                                                </div>
                                            </div>

                                        </Form>

                                        <Button type="warning" size="large"
                                                style={{marginBottom: '3%', marginLeft: '42%'}}
                                                onClick={() => {
                                                    this.setState({newProperty: true});
                                                }}
                                        >
                                            新增产权人
                                        </Button>

                                    </Tabs.Pane>
                                    <Tabs.Pane label="押品评估信息" name="4">
                                        <Form labelPosition="left" model={this.state.form} labelWidth="150"
                                              onSubmit={this.onSubmit.bind(this)}>
                                            <div class="form_content">
                                                <div class="form_lf">
                                                    <Form.Item label="是否流程评估">
                                                        <Radio.Group value={this.state.iseval}
                                                                     onChange={this.onChange.bind(this, 'iseval')}>
                                                            <Radio.Button value="否"/>
                                                        </Radio.Group>
                                                    </Form.Item>
                                                    <Form.Item label="评估基准日">
                                                        <DatePicker
                                                            value={this.state.evaldate}
                                                            placeholder="请选择日期"
                                                            onChange={this.onChange.bind(this, 'evaldate')}
                                                        />
                                                    </Form.Item>
                                                    <Form.Item label="确认价值">
                                                        <Input value={this.props.loan.asstInfo.confval}
                                                               placeholder="请输入确认价值"
                                                               onChange={this.onChangeAsst.bind(this, 'confval')}></Input>
                                                    </Form.Item>
                                                    <Form.Item label="评估结果来源">
                                                        <Radio.Group value={this.props.loan.asstInfo.evalmethod}
                                                                     onChange={this.onChangeAsst.bind(this, 'evalmethod')}>
                                                            <Radio.Button value="直接评估"/>
                                                            <Radio.Button value="内部评估"/>
                                                            <Radio.Button value="外部评估"/>
                                                        </Radio.Group>
                                                    </Form.Item>
                                                    <Form.Item label="评估方法1">
                                                        <Radio.Group value={this.props.loan.asstInfo.evalmeth1}
                                                                     onChange={this.onChangeAsst.bind(this, 'evalmeth1')}>
                                                            <Radio.Button value="市场法"/>
                                                            <Radio.Button value="收益法"/>
                                                            <Radio.Button value="成本法"/>
                                                            <Radio.Button value="现行市价"/>
                                                            <Radio.Button value="其他"/>
                                                        </Radio.Group>
                                                    </Form.Item>
                                                </div>
                                                <div class="form_rt">
                                                    <Form.Item label="评估价值">
                                                        <Input value={this.props.loan.asstInfo.evalval}
                                                               placeholder="请输入评估价值"
                                                               onChange={this.onChangeAsst.bind(this, 'evalval')}></Input>
                                                    </Form.Item>
                                                    <Form.Item label="评估有效期到期日">
                                                        <DatePicker
                                                            value={this.props.loan.asstInfo.validdate}
                                                            placeholder="请选择日期"
                                                            onChange={this.onChangeAsst.bind(this, 'validdate')}
                                                        />
                                                    </Form.Item>
                                                    <Form.Item label="确认日期">
                                                        <DatePicker
                                                            value={this.props.loan.asstInfo.evaldat}
                                                            placeholder="请选择日期"
                                                            onChange={this.onChangeAsst.bind(this, 'evaldat')}
                                                        />
                                                    </Form.Item>
                                                    <Form.Item label="外部评估机构代码">
                                                        <Input value={this.props.loan.asstInfo.evalinst}
                                                               placeholder="请输入外部评估机构代码"
                                                               onChange={this.onChangeAsst.bind(this, 'evalinst')}></Input>
                                                    </Form.Item>
                                                    <Form.Item label="评估师姓名1">
                                                        <Input value={this.props.loan.asstInfo.evalname1}
                                                               placeholder="请输入评估师姓名"
                                                               onChange={this.onChangeAsst.bind(this, 'evalname1')}></Input>
                                                    </Form.Item>
                                                    <Form.Item label="评估师姓名2">
                                                        <Input value={this.props.loan.asstInfo.evalname2}
                                                               placeholder="请输入评估师姓名"
                                                               onChange={this.onChangeAsst.bind(this, 'evalname2')}></Input>
                                                    </Form.Item>
                                                </div>
                                            </div>
                                        </Form>
                                    </Tabs.Pane>
                                    <Tabs.Pane label="担保信息" name="5">
                                        <Form labelPosition="left" model={this.state.form} labelWidth="120"
                                              onSubmit={this.onSubmit.bind(this)}>
                                            <TabTitle title="法人保证担保" class="blackTabTitle"/>
                                            <div class="form_content">
                                                <div class="form_lf">
                                                    <Form.Item label="担保人ID">
                                                        <Input value={this.props.loan.guarInfo.guarcode}
                                                               placeholder="请输入担保人ID"
                                                               onChange={this.onChangeGuar.bind(this, 'guarcode')}></Input>
                                                    </Form.Item>
                                                    <Form.Item label="拟定担保方式">
                                                        <Radio.Group value={this.props.loan.guarInfo.guarway}
                                                                     onChange={this.onChangeGuar.bind(this, 'guarway')}>
                                                            <Radio.Button value="单人担保"/>
                                                            <Radio.Button value="多人分保"/>
                                                            <Radio.Button value="多人联保"/>
                                                        </Radio.Group>
                                                    </Form.Item>
                                                </div>
                                                <div class="form_rt">
                                                    <Form.Item label="担保人名称">
                                                        <Input value={this.props.loan.guarInfo.guarname}
                                                               placeholder="请输入担保人名称"
                                                               onChange={this.onChangeGuar.bind(this, 'guarname')}></Input>
                                                    </Form.Item>
                                                    <Form.Item label="是否阶段性担保">
                                                        <Radio.Group value={this.props.loan.guarInfo.isphase}
                                                                     onChange={this.onChangeGuar.bind(this, 'isphase')}>
                                                            <Radio.Button value="是"/>
                                                            <Radio.Button value="否"/>
                                                        </Radio.Group>
                                                    </Form.Item>
                                                </div>
                                            </div>
                                            <TabTitle title="个人保证担保" class="blackTabTitle"/>
                                            <div class="form_content">
                                                <div class="form_lf">
                                                    <Form.Item label="担保人名称">
                                                        <Input value={this.props.loan.guarInfo.guarname}
                                                               placeholder="请输入担保人名称"
                                                               onChange={this.onChangeGuar.bind(this, 'guarname')}></Input>
                                                    </Form.Item>
                                                    <Form.Item label="拟定担保方式">
                                                        <Radio.Group value={this.props.loan.guarInfo.guarway}
                                                                     onChange={this.onChangeGuar.bind(this, 'guarway')}>
                                                            <Radio.Button value="单人担保"/>
                                                            <Radio.Button value="多人分保"/>
                                                            <Radio.Button value="多人联保"/>
                                                        </Radio.Group>
                                                    </Form.Item>
                                                </div>
                                                <div class="form_rt">
                                                    <Form.Item label="是否阶段性担保">
                                                        <Radio.Group value={this.props.loan.guarInfo.isphase}
                                                                     onChange={this.onChangeGuar.bind(this, 'isphase')}>
                                                            <Radio.Button value="是"/>
                                                            <Radio.Button value="否"/>
                                                        </Radio.Group>
                                                    </Form.Item>
                                                </div>
                                            </div>
                                        </Form>
                                    </Tabs.Pane>
                                </Tabs>
                            </div>
                        </div>
                    </SupplePage>
                </div>

            </div>
        )
    }
}

Loan.contextTypes = {
    jumpTo: PropTypes.func,
    getListValue: PropTypes.func
};
export default connect(mapStateToProps, mapDispatchToProps)(Loan);
