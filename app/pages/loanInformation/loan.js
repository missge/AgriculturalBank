import React from 'react';
import * as homeActions from '../../actions/home';
import {Component,unshiftArrs}from '../../components/libs'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {Map} from 'immutable';
import Head from '../../ma-ui/Head'
import {Link}  from 'react-router-dom';
import * as loanActions from '../../actions/loan';
import TabTitle from '../../components/src/TabTitle'
import {Form,Input,Button,Tabs,DatePicker,NavBar,SupplePage,Dialog,SelectList,Loading} from "../../components/index";
import '../publicCss/public.css'
import Radio from '../../components/src/radio';

var qs = require("querystring");

var appId;
var that="";
let showLength=4;

const actions = [
    loanActions
];

function mapStateToProps(state) {
  const {loan}=state;
  return {
      loan
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
        containerHeight:window.innerHeight - this.getHeight(100),
        isShow:false,
        selectDialogVisible:false,

        //贷款房屋信息
        houseInfo:{
            dlpname:'',//开发商名称
            bldname:'',//楼盘名称
            sellno:'',//销
            bhusaim:'',//购房目的
            housesum:'',//本套房屋属于第几套
            hustype:'',//房屋类型
            husform:'',//房屋形式
            buildyear:'',//房屋建造年份
            husloclinfo:'',//房贷结清情况
            ishired:'',//房屋是否已经出租
        },

        isCommonasst : '',//是否普通住宅 onChangeHouse
        isLocal:'',//借款人是否本地信息
        divorceDate:'',//借款人离婚证明登记日期

        //贷款信息
        loanInfo:{
            loansum: '',//贷款金额
            firstpaysum:'',//首付金额
            loanterm:'',//贷款期限
            price:'',//房屋交易总价
            isfund:'是',//是否公积金组合
            cobreno:'',//合作品种编号
            coprjname:'',//合作项目名称
            firstpayrate:'',//首付款比例
            fundno:'',//公积金网点号
            fundcontno:'',//公积金贷款相关合同编号
            loanusekind:'购买住房',//贷款用途
            charkind:'自营常规贷款',//贷款性质
            spepdct:'',//特色产品
            iscredit:'是',//是否信用方式
            account1:'', //     还款结算账号一
            payeedepacc:'',//     收款人账号
            payeename:'',//     收款人户名
        },

        //利率信息
        rateInfo:{
            execrate:'',//执行利率
            isgetbreaksum:'是',//是否收取提前还款违约金
            repaykind:'',//还款类型
            adjrateflag:'',//利率浮动周期
            floatrange:'0%',//利率浮动幅度
            houseexp:'',//每月房屋其他费用支出（单位：元）
            execratekind:'',//执行利率类别
        },
        //利率信息与原型 不一致的2个字段
       // monHousPay:'',//每月房屋费用支出
       // f_ratePol:'',//执行利率政策

        //押品信息
        asstInfo:{
            buildarea :'',//房屋建筑面积
            houseaddr :'',//详细地址
            assttype:'',//押品分类
            asstname:'',//押品名称
            hususe:'',//房屋实际用途
            landgetmetho:'',//土地取得方式
            ownercode:'',//产权人客户代码
            archstruc:'',//建筑结构
            landuse:'',//土地用途
            evaldate:'',//评估基准日
            confval:'',//确认价值
            evalressrc:'',//评估结果来源
            evalmeth1:'',//评估方法1
            evalname2:'',//评估师姓名2
            evalval:'',//评估价值
            validdate:'',//评估有效期到期日
            evaldat:'',//评估价值认定日期
            evaluinstcode:'',//外部评估机构代码
            evalname1:'',//评估师姓名1
            ownerprop:'',//产权份额
            ownershiptype:'',//产权类型
            archusage:'',//建筑物规划用途
        },

        //缺少1个字段
        iseval:'',//是否评估流程

        //担保信息
        guarInfo:{
            guarcode:'',//保证人代码
         //   guaranteeID:'',//担保人ID
            guarname:'',//担保人名称
            guarway:'',//拟定担保方式
            isphase:'',//是否阶段性担保
        //    guarcalway:'',//担保能力测算方法
        //    guarsum:'',//可用担保额度（原型）与担保额度
        },

        houseTypeList:['商品房','经济适用房','限价房','房改房','军队经济适用房','军队安置房'],
        loanIds:{
            procsId:'',//作业Id
            loanorder:'',//贷款流程号
        },
    };
  }
    onGetInterest(key,value){
        this.state.rateInfo[key] = value;
        this.setState({
            [key]:value
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
      this.state.houseInfo[key] = value;
      this.forceUpdate();
  }
  onChangeLoan(key, value) {
    this.state.loanInfo[key] = value;
    this.forceUpdate();
  }
  onChangeRate(key, value) {
      this.state.rateInfo[key] = value;
      this.forceUpdate();
  }
   onChangeAsst(key, value) {
        this.state.asstInfo[key] = value;
        this.forceUpdate();
  }
    onChangeGuar(key, value) {
        this.state.guarInfo[key] = value;
        this.forceUpdate();
    }
    onEducateAppendClick(){
        this.setState({selectDialogVisible:true});
    }
    removeByValue(arr, val) {
        for(var i=0; i<arr.length; i++) {
            if(arr[i] == val) {
                arr.splice(i, 1);
                break;
            }
        }
    }

    setComplete(cur){
        let value = this.context.getListValue();
        value[cur] = 2;
        return value;
    }

    componentDidMount(){
      that = this;
        // eslint-disable-next-line
       /*  mmspc.bridge.get(function (data) {
            that.props.loanActions.getLoanInfo(data, that.state.loanIds);
            that.props.loanActions.getRateInfo(data, that.state.loanIds.procsId);
            that.props.loanActions.getHouseInfo(data, that.state.loanIds.procsId);
            that.props.loanActions.getAssetInfo(data, that.state.loanIds.procsId, "");//作业Id 押品Id
            that.props.loanActions.getGuarInfo(data, that.state.loanIds.procsId, ""); //作业Id 担保信息Id
        });*/
    }


  render() {
    return (
       <div  style={{height: this.state.containterHeight}}>
           <div class="showTab1">
               <div>
                   {
                       this.props.loan.loading&&<Loading fullscreen={true} text={this.props.loan.text} style={{backgroundColor: 'rgba(0, 0, 0, 0.3)'}}/>
                   }
               </div>
                    <div class="main_contanier">
                          <TabTitle title="贷款信息" class="tabTitle blueTabTitle"/>
                           <Form labelPosition="left" model={this.state.form} labelWidth="120" onSubmit={this.onSubmit.bind(this)}>
                                <div class="form_content">
                                    <div class="form_lf">
                                        <Form.Item label="贷款金额">
                                          <Input  size="small" value={this.state.loanInfo.loansum} placeholder="50万" onChange={this.onChangeLoan.bind(this, 'loansum')}></Input>
                                        </Form.Item>
                                        <Form.Item label="首付金额">
                                          <Input  size="small" value={this.state.loanInfo.firstpaysum} placeholder="15万" onChange={this.onChangeLoan.bind(this, 'firstpaysum')}></Input>
                                        </Form.Item>
                                        <Form.Item label="还款方式">
                                            <Radio.Group value={this.state.loanInfo.f_repayment} onChange={this.onChangeLoan.bind(this, 'f_repayment')}>
                                                <Radio.Button value="等额本金" />
                                                <Radio.Button value="等额本息" />
                                              </Radio.Group>
                                        </Form.Item>
                                        <Form.Item label="是否公积金组合">
                                             <Radio.Group value={this.state.loanInfo.isfund} onChange={this.onChangeLoan.bind(this, 'isfund')}>
                                                <Radio.Button value="是" />
                                                <Radio.Button value="否" />
                                            </Radio.Group>
                                        </Form.Item>
                                      
                                    </div>
                                    <div class="form_rt">
                                            <Form.Item label="贷款期限">
                                              <Input  size="small" value={this.state.loanInfo.loanterm} placeholder="10年" onChange={this.onChangeLoan.bind(this, 'loanterm')}></Input>
                                            </Form.Item>
                                            <Form.Item label="房屋交易总价">
                                              <Input  size="small" value={this.state.loanInfo.price} placeholder="150万" onChange={this.onChangeLoan.bind(this, 'price')}></Input>
                                            </Form.Item>
                                            <Form.Item label="利率浮动幅度">
                                              <Input  size="small" value={this.state.rateInfo.floatrange} readonly></Input>
                                            </Form.Item>
                                            <Form.Item >
                                            <Radio.Group value={this.state.rateInfo.floatrange} onChange={this.onGetInterest.bind(this, 'floatrange')}>
                                                <Radio.Button value="0%" />
                                                <Radio.Button value="5%" />
                                                <Radio.Button value="10%" />
                                                <Radio.Button value="15%" />
                                                <Radio.Button value="20%" />
                                            </Radio.Group>

                                        </Form.Item>
                                    </div>
                                </div>
                                 <TabTitle title="押品信息" class="tabTitle orangeTabTitle"/>
                                <div class="form_content">
                                    <div class="form_lf">
                                        <Form.Item label="房屋建筑面积">
                                            <Input  size="small" value={this.state.asstInfo.buildarea} placeholder="92平方" onChange={this.onChangeAsst.bind(this, 'buildarea')}></Input>
                                        </Form.Item>
                                    </div>
                                    <div class="form_rt">
                                        <Form.Item label="详细地址">
                                          <Input  size="small" value={this.state.asstInfo.houseaddr} placeholder="北京北路102号" onChange={this.onChangeAsst.bind(this, 'houseaddr')}></Input>
                                        </Form.Item>
                                    </div>
                                </div>
                             </Form>
                    </div>
                    <div class="loan_footer">
                        <div class="footer_content" >
                            <div class="footer_content_lf">
                                <Button plain={true} type="info" size="large"
                                        onClick={() => this.setState({ isShow:!this.state.isShow})}>信息补录</Button>
                            </div>
                             <div class="footer_content_rt">
                                  <Button type="warning" size="large"
                                          onClick={
                                              () => {
                                                //    alert("贷款信息："+JSON.stringify(this.state.loanInfo));
                                                //    alert("房屋信息："+JSON.stringify(this.state.houseInfo));
                                                //    alert("利率信息："+JSON.stringify(this.state.rateInfo));
                                                //    alert("押品信息："+JSON.stringify(this.state.asstInfo));
                                                //    alert("担保信息："+JSON.stringify(this.state.guarInfo));
                                               //   alert("贷款查询传的参数："+JSON.stringify(this.state.loanIds.procsId));
                                                  // eslint-disable-next-line
                                                  mmspc.bridge.get(function (data) {
                                                  //    that.props.loanActions.postLoanInfo(data ,that.state.loanInfo, that.state.houseInfo);
                                                      that.props.loanActions.postLoanInfo(data ,that.state.loanInfo);
                                                      that.props.loanActions.postHouseInfo(data ,that.state.houseInfo);
                                                      that.props.loanActions.postRateInfo(data ,that.state.rateInfo);
                                                      that.props.loanActions.postAssetInfo(data ,that.state.asstInfo);
                                                      that.props.loanActions.postGuarInfo(data ,that.state.guarInfo);

                                                  });

                                                  // eslint-disable-next-line
                                                  // mmspc.fileConversion.getApplicationFrom();
                                                  //  this.context.jumpTo(5, this.setComplete.bind(this)(4));
                                               }
                                          }>生成电子申请表</Button>
                            </div>
                        </div>
                    </div>
                </div>

           <SupplePage style={{display: this.state.isShow === false ? "none" : "block"}}>
               <NavBar
                   title={"贷款信息补录"}
                   lName={"取消"}
                   rName={"确定"}
                   lClick={() => this.setState({ isShow:!this.state.isShow})}
                   rClick={() => this.setState({ isShow:!this.state.isShow})}
               >
               </NavBar>
                <div class="showTab2">
                   <div class="main_contanier">
                        <Tabs activeName="1" onTabClick={(tab) => console.log(tab.props.name) }>
                            <Tabs.Pane label="贷款基本信息" name="1">
                                <Form labelPosition="left"  model={this.state.form} labelWidth="170" onSubmit={this.onSubmit.bind(this)}>
                                   <div class="form_content">
                                        <div class="form_lf">
                                            <Form.Item label="贷款性质">
                                                <Radio.Group value={this.state.loanInfo.charkind} onChange={this.onChangeLoan.bind(this, 'charkind')}>
                                                    <Radio.Button value="自营常规贷款"/>
                                                    <Radio.Button value="公积金委托贷款"/>
                                                </Radio.Group>
                                            </Form.Item>
                                            <Form.Item label="合作项目名称">
                                                <Input value={this.state.loanInfo.coprjname} placeholder="合作项目 " onChange={this.onChangeLoan.bind(this, 'coprjname')}></Input>
                                            </Form.Item>
                                            <Form.Item label="首付款比例">
                                                <Input value={this.state.loanInfo.firstpayrate} placeholder="15% " onChange={this.onChangeLoan.bind(this, 'firstpayrate')}></Input>
                                            </Form.Item>
                                            <Form.Item label="执行利率政策">
                                                <Radio.Group value={this.state.rateInfo.execratekind} onChange={this.onChangeRate.bind(this, 'execratekind')}>
                                                    <Radio.Button value="首套利率"/>
                                                    <Radio.Button value="二套利率"/>
                                                </Radio.Group>
                                            </Form.Item>
                                            <Form.Item label="执行利率">
                                                <Input value={this.state.rateInfo.execrate} placeholder="5% " onChange={this.onChangeRate.bind(this, 'execrate')}></Input>
                                            </Form.Item>
                                            <Form.Item label="还款账号">
                                                <Input value={this.state.loanInfo.account1} placeholder="请输入还款账号" onChange={this.onChangeLoan.bind(this, 'account1')}></Input>
                                            </Form.Item>
                                            <Form.Item label="收款人账号">
                                                <Input value={this.state.loanInfo.payeedepacc} placeholder="请输入收款人账号" onChange={this.onChangeLoan.bind(this, 'payeedepacc')}></Input>
                                            </Form.Item>
                                            <Form.Item label="每月房屋费用支出">
                                                <Input value={this.state.rateInfo.houseexp} onChange={this.onChangeRate.bind(this, 'houseexp')}></Input>
                                            </Form.Item>
                                            <Form.Item label="是否信用方式">
                                                <Radio.Group value={this.state.loanInfo.iscredit} onChange={this.onChangeLoan.bind(this, 'iscredit')}>
                                                    <Radio.Button value="是" />
                                                    <Radio.Button value="否" />
                                                </Radio.Group>
                                            </Form.Item>
                                            <Form.Item label="公积金网点号">
                                                <Input value={this.state.loanInfo.fundno}  placeholder="A40051008 "onChange={this.onChangeLoan.bind(this, 'fundno')}></Input>
                                            </Form.Item>
                                        </div>
                                        <div class="form_rt">
                                            <Form.Item label="特色产品">
                                                <Radio.Group value={this.state.loanInfo.spepdct} onChange={this.onChangeLoan.bind(this, 'spepdct')}>
                                                    <Radio.Button value="非特色"/>
                                                    <Radio.Button value="接力贷款"/>
                                                    <Radio.Button value="连心贷"/>
                                                    <Radio.Button value="更多"/>
                                                </Radio.Group>
                                            </Form.Item>
                                            <Form.Item label="合作品种编号">
                                                <Input value={this.state.loanInfo.cobreno} placeholder="A2018040101 " onChange={this.onChangeLoan.bind(this, 'cobreno')}></Input>
                                            </Form.Item>
                                           <Form.Item label="贷款用途">
                                               <Radio.Group value={this.state.loanInfo.loanusekind} onChange={this.onChangeLoan.bind(this, 'loanusekind')}>
                                                   <Radio.Button value="购买住房"/>
                                               </Radio.Group>
                                            </Form.Item>
                                            <Form.Item label="利率浮动周期">
                                                <Radio.Group value={this.state.rateInfo.adjrateflag} onChange={this.onChangeRate.bind(this, 'adjrateflag')}>
                                                    <Radio.Button value="次年1月1日"/>
                                                    <Radio.Button value="1年"/>
                                                    <Radio.Button value="6个月"/>
                                                    <Radio.Button value="3个月"/>
                                                    <Radio.Button value="1个月"/>
                                                </Radio.Group>
                                            </Form.Item>
                                            <Form.Item label="收款人户名">
                                                <Input value={this.state.loanInfo.payeename} placeholder="请输入收款人户名" onChange={this.onChangeLoan.bind(this, 'payeename')}></Input>
                                            </Form.Item>
                                            <Form.Item label="还款类型">
                                                <Radio.Group value={this.state.rateInfo.repaykind} onChange={this.onChangeRate.bind(this, 'repaykind')}>
                                                    <Radio.Button value="对日还款" />
                                                    <Radio.Button value="定日还款" />
                                                </Radio.Group>
                                            </Form.Item>
                                            <Form.Item label="是否收取提前还款违约金">
                                                 <Radio.Group value={this.state.rateInfo.isgetbreaksum} onChange={this.onChangeRate.bind(this, 'isgetbreaksum')}>
                                                    <Radio.Button value="是" />
                                                    <Radio.Button value="否" />
                                                </Radio.Group>
                                            </Form.Item>
                                            <Form.Item label="公积金贷款合同编号">
                                                <Input value={this.state.loanInfo.fundcontno} placeholder="A8898012B1 " onChange={this.onChangeLoan.bind(this, 'fundcontno')}></Input>
                                            </Form.Item>
                                        </div>
                                    </div>
                              </Form>
                            </Tabs.Pane>
                            <Tabs.Pane label="贷款房屋信息" name="2">
                                <Form labelPosition="left"  model={this.state.form} labelWidth="170" onSubmit={this.onSubmit.bind(this)}>
                                   <div class="form_content">
                                        <div class="form_lf">
                                            <Form.Item label="开发商名称">
                                                <Input value={this.state.houseInfo.dlpname} placeholder="请输入开发商名称 " onChange={this.onChangeHouse.bind(this, 'dlpname')}></Input>
                                            </Form.Item>
                                            <Form.Item label="销(预)售许可证编号">
                                                <Input value={this.state.houseInfo.sellno} placeholder="请输入销(预)售许可证编号 " onChange={this.onChangeHouse.bind(this, 'sellno')}></Input>
                                            </Form.Item>
                                             <Form.Item label="购房目的">
                                                 <Radio.Group value={this.state.houseInfo.bhusaim} onChange={this.onChangeHouse.bind(this, 'bhusaim')}>
                                                     <Radio.Button value="自主" />
                                                     <Radio.Button value="经营" />
                                                     <Radio.Button value="投资" />
                                                 </Radio.Group>
                                            </Form.Item>
                                            <Dialog
                                                size="small"
                                                visible={ this.state.selectDialogVisible }
                                                title='对话框'
                                                onCancel={ () => this.setState({ selectDialogVisible: false,hustype:this.state.hustype}) }
                                                lockScroll={ false }
                                                className='mmpsc-select-list-dialog'
                                            >
                                                <Dialog.Body>
                                                    <SelectList ref ="houseType"
                                                                visible={ this.state.selectDialogVisible }
                                                                value={this.state.houseInfo.hustype} multiple={false} onChange={(val)=>{
                                                        this.removeByValue(this.state.houseTypeList,val)
                                                        this.state.houseTypeList.unshift(val)
                                                        this.setState({selectDialogVisible: false,hustype:val})
                                                        this.refs.houseType.setState({selected:null});
                                                    }}>
                                                        {
                                                            this.state.houseTypeList.map(function(item,i){
                                                                return i>showLength? <SelectList.Option key={i} label={item} value={item} /> :''
                                                            })
                                                        }

                                                    </SelectList>
                                                </Dialog.Body>
                                            </Dialog>
                                            <Form.Item label="房屋类型">
                                                <Radio.Group value={this.state.houseInfo.hustype} onChange={this.onChangeHouse.bind(this, 'hustype')} appendix="更多"
                                                             onAppendixClick={this.onEducateAppendClick.bind(this)}>
                                                    {
                                                        this.state.houseTypeList.map(function(item,i){
                                                            return(
                                                                i<showLength+1?
                                                                    <Radio.Button key={i} value={item} /> :''

                                                            )
                                                        })

                                                    }
                                                    <Radio.Button value="更多" />
                                                </Radio.Group>
                                            </Form.Item>
                                            <Form.Item label="房屋建造年份">
                                               <Input value={this.state.houseInfo.buildyear} placeholder="请输入房屋建造年份 " onChange={this.onChangeHouse.bind(this, 'buildyear')}></Input>
                                            </Form.Item>
                                            <Form.Item label="房屋是否已经出租">
                                                 <Radio.Group value={this.state.houseInfo.ishired} onChange={this.onChangeHouse.bind(this, 'ishired')}>
                                                    <Radio.Button value="是" />
                                                    <Radio.Button value="否" />
                                                </Radio.Group>
                                            </Form.Item>

                                            <Form.Item label="借款人是否本地户籍">
                                                <Radio.Group value={this.state.isLocal} onChange={this.onChange.bind(this, 'isLocal')}>
                                                    <Radio.Button value="是" />
                                                    <Radio.Button value="否" />
                                                </Radio.Group>
                                            </Form.Item>

                                        </div>
                                        <div class="form_rt">
                                            <Form.Item label="楼盘名称">
                                                <Input value={this.state.houseInfo.bldname} placeholder="请输入楼盘名称 " onChange={this.onChangeHouse.bind(this, 'bldname')}></Input>
                                            </Form.Item>
                                            <Form.Item label="是否普通住宅">
                                                 <Radio.Group value={this.state.isCommonasst} onChange={this.onChange.bind(this, 'isCommonasst')}>
                                                    <Radio.Button value="是" />
                                                    <Radio.Button value="否" />
                                                     <Radio.Button value="其他" />
                                                </Radio.Group>
                                            </Form.Item>
                                            <Form.Item label="本套房属于第几套">
                                                <Radio.Group value={this.state.houseInfo.housesum} onChange={this.onChangeHouse.bind(this, 'housesum')}>
                                                    <Radio.Button value="第一套" />
                                                    <Radio.Button value="第二套" />
                                                    <Radio.Button value="第三套" />
                                                    <Radio.Button value="三套以上" />
                                                </Radio.Group>
                                            </Form.Item>
                                            <Form.Item label="房屋形式">
                                                 <Radio.Group value={this.state.houseInfo.husform} onChange={this.onChangeHouse.bind(this, 'husform')}>
                                                    <Radio.Button value="期房" />
                                                    <Radio.Button value="现房" />
                                                </Radio.Group>
                                            </Form.Item>
                                            <Form.Item label="房贷结清情况">
                                                <Radio.Group value={this.state.houseInfo.husloclinfo} onChange={this.onChangeHouse.bind(this, 'husloclinfo')}>
                                                    <Radio.Button value="名下无住房贷款记录" />
                                                    <Radio.Button value="已结清名下住房贷款" />
                                                    <Radio.Button value="更多" />
                                                </Radio.Group>
                                            </Form.Item>
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
                                <Form labelPosition="left"  model={this.state.form} labelWidth="120" onSubmit={this.onSubmit.bind(this)}>
                                   <div class="form_content">
                                        <div class="form_lf">
                                             <Form.Item label="押品分类">
                                                 <Radio.Group value={this.state.asstInfo.assttype} onChange={this.onChangeAsst.bind(this, 'assttype')}>
                                                     <Radio.Button value="商品房住宅" />
                                                     <Radio.Button value="完全产权保障住房" />
                                                     <Radio.Button value="别墅" />
                                                     <Radio.Button value="其他居住用房" />
                                                     <Radio.Button value="不完全产权保障住房" />
                                                 </Radio.Group>
                                            </Form.Item>
                                              <Form.Item label="押品名称">
                                               <Input value={this.state.asstInfo.asstname} placeholder="请输入押品地址信息" onChange={this.onChangeAsst.bind(this, 'asstname')}></Input>
                                            </Form.Item>
                                              <Form.Item label="房屋实际用途">
                                                  <Radio.Group value={this.state.asstInfo.hususe} onChange={this.onChangeAsst.bind(this, 'hususe')}>
                                                      <Radio.Button value="居住" />
                                                  </Radio.Group>
                                            </Form.Item>
                                              <Form.Item label="土地取得方式">
                                                  <Radio.Group value={this.state.asstInfo.landgetmetho} onChange={this.onChangeAsst.bind(this, 'landgetmetho')}>
                                                      <Radio.Button value="拍卖出让" />
                                                      <Radio.Button value="转让" />
                                                      <Radio.Button value="其他" />
                                                  </Radio.Group>
                                            </Form.Item>
                                              <Form.Item label="产权人客户代码">
                                               <Input value={this.state.asstInfo.ownercode} placeholder="请输入产权人客户代码" onChange={this.onChangeAsst.bind(this, 'ownercode')}></Input>
                                            </Form.Item>
                                        </div>
                                        <div class="form_rt">
                                           <Form.Item label="建筑结构">
                                               <Radio.Group value={this.state.asstInfo.archstruc} onChange={this.onChangeAsst.bind(this, 'archstruc')}>
                                                   <Radio.Button value="钢混" />
                                                   <Radio.Button value="砖混" />
                                                   <Radio.Button value="砖木" />
                                                   <Radio.Button value="框架" />
                                                   <Radio.Button value="钢结构" />
                                                   <Radio.Button value="其他" />
                                               </Radio.Group>
                                            </Form.Item>
                                            <Form.Item label="建筑物规划用途">
                                                <Radio.Group value={this.state.asstInfo.archusage} onChange={this.onChangeAsst.bind(this, 'archusage')}>
                                                    <Radio.Button value="普通商品房" />
                                                    <Radio.Button value="别墅" />
                                                    <Radio.Button value="高档公寓" />
                                                    <Radio.Button value="房改房" />
                                                    <Radio.Button value="经济房" />
                                                    <Radio.Button value="限价房" />
                                                    <Radio.Button value="更多" />
                                                </Radio.Group>
                                            </Form.Item>
                                              <Form.Item label="土地用途">
                                                  <Radio.Group value={this.state.asstInfo.landuse} onChange={this.onChangeAsst.bind(this, 'landuse')}>
                                                      <Radio.Button value="住宅" />
                                                  </Radio.Group>
                                            </Form.Item>
                                            <Form.Item label="产权类型">
                                                 <Radio.Group value={this.state.asstInfo.ownershiptype} onChange={this.onChangeAsst.bind(this, 'ownershiptype')}>
                                                    <Radio.Button value="所有权" />
                                                    <Radio.Button value="使用权" />
                                                </Radio.Group>
                                            </Form.Item>
                                            <Form.Item label="产权份额">
                                                <Input value={this.state.asstInfo.ownerprop} placeholder="请输入产权份额" onChange={this.onChangeAsst.bind(this, 'ownerprop')}></Input>
                                            </Form.Item>
                                        </div>
                                    </div>
                                </Form>
                            </Tabs.Pane>
                            <Tabs.Pane label="押品评估信息" name="4">
                                 <Form labelPosition="left"  model={this.state.form} labelWidth="150" onSubmit={this.onSubmit.bind(this)}>
                                   <div class="form_content">
                                        <div class="form_lf">
                                            <Form.Item label="是否流程评估">
                                                 <Radio.Group value={this.state.iseval} onChange={this.onChange.bind(this, 'iseval')}>
                                                    <Radio.Button value="否" />
                                                </Radio.Group>
                                            </Form.Item>
                                             <Form.Item label="评估基准日">
                                                     <DatePicker
                                                         value={this.state.asstInfo.evaldate}
                                                         placeholder="请选择日期"
                                                         onChange={this.onChangeAsst.bind(this, 'evaldate')}
                                                     />
                                            </Form.Item>
                                              <Form.Item label="确认价值">
                                               <Input value={this.state.asstInfo.confval}  placeholder="请输入确认价值" onChange={this.onChangeAsst.bind(this, 'confval')}></Input>
                                            </Form.Item>
                                            <Form.Item label="评估结果来源">
                                                <Radio.Group value={this.state.asstInfo.evalressrc} onChange={this.onChangeAsst.bind(this, 'evalressrc')}>
                                                    <Radio.Button value="直接评估" />
                                                    <Radio.Button value="内部评估" />
                                                    <Radio.Button value="外部评估" />
                                                </Radio.Group>
                                            </Form.Item>
                                              <Form.Item label="评估方法1">
                                                  <Radio.Group value={this.state.asstInfo.evalmeth1} onChange={this.onChangeAsst.bind(this, 'evalmeth1')}>
                                                      <Radio.Button value="市场法" />
                                                      <Radio.Button value="收益法" />
                                                      <Radio.Button value="成本法" />
                                                      <Radio.Button value="现行市价" />
                                                      <Radio.Button value="其他" />
                                                  </Radio.Group>
                                            </Form.Item>
                                        </div>
                                        <div class="form_rt">
                                            <Form.Item label="评估价值">
                                               <Input value={this.state.asstInfo.evalval} placeholder="请输入评估价值" onChange={this.onChangeAsst.bind(this, 'evalval')}></Input>
                                            </Form.Item>
                                           <Form.Item label="评估有效期到期日">
                                               <DatePicker
                                                   value={this.state.asstInfo.validdate}
                                                   placeholder="请选择日期"
                                                   onChange={this.onChangeAsst.bind(this, 'validdate')}
                                               />
                                            </Form.Item>
                                            <Form.Item label="确认日期">
                                                <DatePicker
                                                    value={this.state.asstInfo.evaldat}
                                                    placeholder="请选择日期"
                                                    onChange={this.onChangeAsst.bind(this, 'evaldat')}
                                                />
                                            </Form.Item>
                                            <Form.Item label="外部评估机构代码">
                                                <Input value={this.state.asstInfo.evaluinstcode} placeholder="请输入外部评估机构代码" onChange={this.onChangeAsst.bind(this, 'evaluinstcode')}></Input>
                                            </Form.Item>
                                            <Form.Item label="评估师姓名1">
                                               <Input value={this.state.asstInfo.evalname1} placeholder="请输入评估师姓名" onChange={this.onChangeAsst.bind(this, 'evalname1')}></Input>
                                            </Form.Item>
                                            <Form.Item label="评估师姓名2">
                                                <Input value={this.state.asstInfo.evalname2} placeholder="请输入评估师姓名" onChange={this.onChangeAsst.bind(this, 'evalname2')}></Input>
                                            </Form.Item>
                                        </div>
                                    </div>
                                </Form>
                            </Tabs.Pane>
                            <Tabs.Pane label="担保信息" name="5">
                                <Form labelPosition="left"  model={this.state.form} labelWidth="120" onSubmit={this.onSubmit.bind(this)}>
                                    <TabTitle title="法人保证担保" class="blackTabTitle"/>
                                    <div class="form_content">
                                        <div class="form_lf">
                                            <Form.Item label="担保人ID">
                                                <Input value={this.state.guarInfo.guarcode} placeholder="请输入担保人ID" onChange={this.onChangeGuar.bind(this, 'guarcode')}></Input>
                                            </Form.Item>
                                            <Form.Item label="拟定担保方式">
                                                <Radio.Group value={this.state.guarInfo.guarway} onChange={this.onChangeGuar.bind(this, 'guarway')}>
                                                    <Radio.Button value="单人担保" />
                                                    <Radio.Button value="多人分保" />
                                                    <Radio.Button value="多人联保" />
                                                </Radio.Group>
                                            </Form.Item>
                                        </div>
                                        <div class="form_rt">
                                            <Form.Item label="担保人名称">
                                                <Input value={this.state.guarInfo.guarname} placeholder="请输入担保人名称" onChange={this.onChangeGuar.bind(this, 'guarname')}></Input>
                                            </Form.Item>
                                            <Form.Item label="是否阶段性担保">
                                                <Radio.Group value={this.state.guarInfo.isphase} onChange={this.onChangeGuar.bind(this, 'isphase')}>
                                                    <Radio.Button value="是" />
                                                    <Radio.Button value="否" />
                                                </Radio.Group>
                                            </Form.Item>
                                        </div>
                                    </div>
                                    <TabTitle title="个人保证担保" class="blackTabTitle"/>
                                    <div class="form_content">
                                        <div class="form_lf">
                                            <Form.Item label="担保人名称">
                                                <Input value={this.state.guarInfo.guarname} placeholder="请输入担保人名称" onChange={this.onChangeGuar.bind(this, 'guarname')}></Input>
                                            </Form.Item>
                                            <Form.Item label="拟定担保方式">
                                                <Radio.Group value={this.state.guarInfo.guarway} onChange={this.onChangeGuar.bind(this, 'guarway')}>
                                                    <Radio.Button value="单人担保" />
                                                    <Radio.Button value="多人分保" />
                                                    <Radio.Button value="多人联保" />
                                                </Radio.Group>
                                            </Form.Item>
                                        </div>
                                        <div class="form_rt">
                                            <Form.Item label="是否阶段性担保">
                                                <Radio.Group value={this.state.guarInfo.isphase} onChange={this.onChangeGuar.bind(this, 'isphase')}>
                                                    <Radio.Button value="是" />
                                                    <Radio.Button value="否" />
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
    )
  }
}
Loan.contextTypes = {
    jumpTo: PropTypes.func,
    getListValue:PropTypes.func
};
export default connect(mapStateToProps,mapDispatchToProps)(Loan);
