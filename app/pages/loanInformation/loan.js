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
import {Form,Input,Button,Layout,Tabs,Select,NavBar,SupplePage,Dialog,SelectList} from "../../components/index";
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
        isShow:false,
        selectDialogVisible:false,
        //贷款房屋信息
        devName : '',
        salesLic : '',
        buyHouse : '',
        houseType : '',
        houseYear : '',
        isRent : '',
        buildingsName : '',
        isCommon : '',
        houses : '',
        houseXS : '',
        houseLoan: '',

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

            //缺少四个字段
            dedit:'是',//是否收取提前还款违约金
            rate:'',//执行利率
            f_repayment:'等额本金',//还款方式
            f_setInterest:'5%',//利率浮动幅度
        },


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
               evalname1:'',//评估师姓名1*/

            iseval:'',//是否评估流程
            guaranteeID:'',//担保人ID
            guaranteeName:'',//担保人名称
            guarLimit:'',//可用担保额度
            guarType:'',//拟定担保方式
            isStageGuar:'',//是否阶段性担保
            guarAbility:'',//担保能力测算方法

            ownerper:'',//产权份额
            isCommonasst:'',//是否普通住宅
            archuse:'',//建筑物规划用途
            ownertype:'',//产权类型
        },
        houseTypeList:['商品房','经济适用房','限价房','房改房','军队经济适用房','军队安置房'],
    };
  }
    onGetInterest(key,value){
        this.state.loanInfo[key] = value;
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

  onChangeLoan(key, value) {
    this.state.loanInfo[key] = value;
    this.forceUpdate();
  }
   onChangeAsst(key, value) {
        this.state.asstInfo[key] = value;
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
    }


  render() {
    return (
       <div  style={{height:window.innerHeight-this.getHeight(100)}}>
           <div class="showTab1">
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
                                              <Input  size="small" value={this.state.loanInfo.f_setInterest} readonly></Input>
                                            </Form.Item>
                                            <Form.Item >
                                            <Radio.Group value={this.state.loanInfo.f_setInterest} onChange={this.onGetInterest.bind(this, 'f_setInterest')}>
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
                                                   // alert("贷款信息："+JSON.stringify(this.state.loanInfo));
                                                   // alert("押品信息："+JSON.stringify(this.state.asstInfo))
                                                  // eslint-disable-next-line
                                              /*   mmspc.bridge.get(function (data) {
                                                      that.props.loanActions.postLoanInfo(data ,that.state.loanInfo, that.state.asstInfo);
                                                  });*/
                                                  // eslint-disable-next-line
                                                  // mmspc.fileConversion.getApplicationFrom();
                                                this.context.jumpTo(5, this.setComplete.bind(this)(4))
                                               //
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
                                                <Form.Item label="合作品种编号">
                                                   <Input value={this.state.loanInfo.cobreno} placeholder="A2018040101 " onChange={this.onChangeLoan.bind(this, 'cobreno')}></Input>
                                                </Form.Item>
                                                  <Form.Item label="合作项目名称">
                                                   <Input value={this.state.loanInfo.coprjname} placeholder="合作项目 " onChange={this.onChangeLoan.bind(this, 'coprjname')}></Input>
                                                </Form.Item>
                                                  <Form.Item label="首付款比例">
                                                   <Input value={this.state.loanInfo.firstpayrate} placeholder="15% " onChange={this.onChangeLoan.bind(this, 'firstpayrate')}></Input>
                                                </Form.Item>
                                                  <Form.Item label="执行利率">
                                                   <Input value={this.state.loanInfo.rate} placeholder="5% " onChange={this.onChangeLoan.bind(this, 'rate')}></Input>
                                                </Form.Item>
                                                  <Form.Item label="公积金网点号">
                                                   <Input value={this.state.loanInfo.fundno}  placeholder="A40051008 "onChange={this.onChangeLoan.bind(this, 'fundno')}></Input>
                                                </Form.Item>
                                                  <Form.Item label="公积金贷款合同编号">
                                                   <Input value={this.state.loanInfo.fundcontno} placeholder="A8898012B1 " onChange={this.onChangeLoan.bind(this, 'fundcontno')}></Input>
                                                </Form.Item>
                                        </div>
                                        <div class="form_rt">
                                           <Form.Item label="贷款用途">
                                               <Radio.Group value={this.state.loanInfo.loanusekind} onChange={this.onChangeLoan.bind(this, 'loanusekind')}>
                                                   <Radio.Button value="购买住房"/>
                                                   <Radio.Button value="购买车库"/>
                                                   <Radio.Button value="购买住房和车库"/>
                                                   <Radio.Button value="更多"/>
                                               </Radio.Group>
                                            </Form.Item>
                                            <Form.Item label="贷款性质">
                                                <Radio.Group value={this.state.loanInfo.charkind} onChange={this.onChangeLoan.bind(this, 'charkind')}>
                                                    <Radio.Button value="自营常规贷款"/>
                                                    <Radio.Button value="公积金委托贷款"/>
                                                    <Radio.Button value="其他委托贷款"/>
                                                    <Radio.Button value="特定贷款"/>
                                                </Radio.Group>
                                            </Form.Item>
                                             <Form.Item label="特色产品">
                                                 <Input value={this.state.loanInfo.spepdct} placeholder="非特色产品 " onChange={this.onChangeLoan.bind(this, 'spepdct')}></Input>
                                            </Form.Item>
                                            <Form.Item label="是否信用方式">
                                                 <Radio.Group value={this.state.loanInfo.iscredit} onChange={this.onChangeLoan.bind(this, 'iscredit')}>
                                                    <Radio.Button value="是" />
                                                    <Radio.Button value="否" />
                                                </Radio.Group>
                                            </Form.Item>
                                            <Form.Item label="是否收取提前还款违约金">
                                                 <Radio.Group value={this.state.loanInfo.dedit} onChange={this.onChangeLoan.bind(this, 'dedit')}>
                                                    <Radio.Button value="是" />
                                                    <Radio.Button value="否" />
                                                </Radio.Group>
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
                                                <Input value={this.state.devName} placeholder="请输入开发商名称 " onChange={this.onChange.bind(this, 'devName')}></Input>
                                            </Form.Item>
                                            <Form.Item label="销(预)售许可证编号">
                                                <Input value={this.state.salesLic} placeholder="请输入销(预)售许可证编号 " onChange={this.onChange.bind(this, 'salesLic')}></Input>
                                            </Form.Item>
                                             <Form.Item label="购房目的">
                                                 <Radio.Group value={this.state.buyHouse} onChange={this.onChange.bind(this, 'buyHouse')}>
                                                     <Radio.Button value="自主" />
                                                     <Radio.Button value="经营" />
                                                     <Radio.Button value="投资" />
                                                 </Radio.Group>
                                            </Form.Item>
                                            <Dialog
                                                size="small"
                                                visible={ this.state.selectDialogVisible }
                                                title='对话框'
                                                onCancel={ () => this.setState({ selectDialogVisible: false,houseType:this.state.houseType}) }
                                                lockScroll={ false }
                                                className='mmpsc-select-list-dialog'
                                            >
                                                <Dialog.Body>
                                                    <SelectList ref ="houseType"
                                                                visible={ this.state.selectDialogVisible }
                                                                value={this.state.houseType} multiple={false} onChange={(val)=>{
                                                        this.removeByValue(this.state.houseTypeList,val)
                                                        this.state.houseTypeList.unshift(val)
                                                        this.setState({selectDialogVisible: false,houseType:val})
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
                                                <Radio.Group value={this.state.houseType} onChange={this.onChange.bind(this, 'houseType')} appendix="更多"
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
                                               <Input value={this.state.houseYear} placeholder="请输入房屋建造年份 " onChange={this.onChange.bind(this, 'houseYear')}></Input>
                                            </Form.Item>
                                            <Form.Item label="房屋是否已经出租">
                                                 <Radio.Group value={this.state.isRent} onChange={this.onChange.bind(this, 'isRent')}>
                                                    <Radio.Button value="是" />
                                                    <Radio.Button value="否" />
                                                </Radio.Group>
                                            </Form.Item>
                                        </div>
                                        <div class="form_rt">
                                            <Form.Item label="楼盘名称">
                                                <Input value={this.state.buildingsName} placeholder="请输入楼盘名称 " onChange={this.onChange.bind(this, 'buildingsName')}></Input>
                                            </Form.Item>
                                            <Form.Item label="是否普通住宅">
                                                 <Radio.Group value={this.state.isCommon} onChange={this.onChange.bind(this, 'isCommon')}>
                                                    <Radio.Button value="是" />
                                                    <Radio.Button value="否" />
                                                </Radio.Group>
                                            </Form.Item>
                                            <Form.Item label="本套房属于第几套">
                                                <Radio.Group value={this.state.houses} onChange={this.onChange.bind(this, 'houses')}>
                                                    <Radio.Button value="第一套" />
                                                    <Radio.Button value="第二套" />
                                                    <Radio.Button value="第三套" />
                                                    <Radio.Button value="三套以上" />
                                                </Radio.Group>
                                            </Form.Item>
                                            <Form.Item label="房屋形式">
                                                 <Radio.Group value={this.state.houseXS} onChange={this.onChange.bind(this, 'houseXS')}>
                                                    <Radio.Button value="期房" />
                                                    <Radio.Button value="现房" />
                                                </Radio.Group>
                                            </Form.Item>
                                            <Form.Item label="房贷结清情况">
                                                <Radio.Group value={this.state.houseLoan} onChange={this.onChange.bind(this, 'houseLoan')}>
                                                    <Radio.Button value="名下无住房贷款记录" />
                                                    <Radio.Button value="已结清名下住房贷款" />
                                                    <Radio.Button value="有一笔住房贷款未结清" />
                                                    <Radio.Button value="有两笔以及上住房贷款未结清" />
                                                </Radio.Group>
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
                                                     <Radio.Button value="金融质押品" />
                                                     <Radio.Button value="房地产" />
                                                     <Radio.Button value="应收账款" />
                                                     <Radio.Button value="其他押品" />
                                                 </Radio.Group>
                                            </Form.Item>
                                              <Form.Item label="押品名称">
                                               <Input value={this.state.asstInfo.asstname} placeholder="请输入押品名称" onChange={this.onChangeAsst.bind(this, 'asstname')}></Input>
                                            </Form.Item>
                                              <Form.Item label="房屋实际用途">
                                                  <Radio.Group value={this.state.asstInfo.hususe} onChange={this.onChangeAsst.bind(this, 'hususe')}>
                                                      <Radio.Button value="居住" />
                                                      <Radio.Button value="商业" />
                                                      <Radio.Button value="办公" />
                                                      <Radio.Button value="工业" />
                                                      <Radio.Button value="仓储" />
                                                      <Radio.Button value="其他" />
                                                  </Radio.Group>
                                            </Form.Item>
                                              <Form.Item label="土地取得方式">
                                               <Input value={this.state.asstInfo.landgetmetho} placeholder="请输入土地取得方式" onChange={this.onChangeAsst.bind(this, 'landgetmetho')}></Input>
                                            </Form.Item>
                                              <Form.Item label="产权人客户代码">
                                               <Input value={this.state.asstInfo.ownercode} placeholder="请输入产权人客户代码" onChange={this.onChangeAsst.bind(this, 'ownercode')}></Input>
                                            </Form.Item>
                                              <Form.Item label="产权份额">
                                               <Input value={this.state.asstInfo.ownerper} placeholder="请输入产权份额" onChange={this.onChangeAsst.bind(this, 'ownerper')}></Input>
                                            </Form.Item>
                                        </div>
                                        <div class="form_rt">
                                           <Form.Item label="是否普通住宅">
                                                 <Radio.Group value={this.state.asstInfo.isCommonasst} onChange={this.onChangeAsst.bind(this, 'isCommonasst')}>
                                                    <Radio.Button value="是" />
                                                    <Radio.Button value="否" />
                                                    <Radio.Button value="其他" />
                                                </Radio.Group>
                                            </Form.Item>
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
                                                <Radio.Group value={this.state.asstInfo.archuse} onChange={this.onChangeAsst.bind(this, 'archuse')}>
                                                    <Radio.Button value="居住用房" />
                                                    <Radio.Button value="商业用房" />
                                                    <Radio.Button value="工业用房" />
                                                    <Radio.Button value="办公用房" />
                                                    <Radio.Button value="更多" />
                                                </Radio.Group>
                                            </Form.Item>
                                              <Form.Item label="土地用途">
                                               <Input value={this.state.asstInfo.landuse} placeholder="请输入土地用途" onChange={this.onChangeAsst.bind(this, 'landuse')}></Input>
                                            </Form.Item>
                                            <Form.Item label="产权类型">
                                                 <Radio.Group value={this.state.asstInfo.ownertype} onChange={this.onChangeAsst.bind(this, 'ownertype')}>
                                                    <Radio.Button value="所有权" />
                                                    <Radio.Button value="使用权" />
                                                </Radio.Group>
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
                                                 <Radio.Group value={this.state.asstInfo.iseval} onChange={this.onChangeAsst.bind(this, 'iseval')}>
                                                    <Radio.Button value="是" />
                                                    <Radio.Button value="否" />
                                                </Radio.Group>
                                            </Form.Item>
                                             <Form.Item label="评估基准日">
                                               <Input value={this.state.asstInfo.evaldate}  placeholder="请输入评估基准日" onChange={this.onChangeAsst.bind(this, 'evaldate')}></Input>
                                            </Form.Item>
                                              <Form.Item label="确认价值">
                                               <Input value={this.state.asstInfo.confval}  placeholder="请输入确认价值" onChange={this.onChangeAsst.bind(this, 'confval')}></Input>
                                            </Form.Item>
                                            <Form.Item label="评估结果来源">
                                                <Radio.Group value={this.state.asstInfo.evalressrc} onChange={this.onChangeAsst.bind(this, 'evalressrc')}>
                                                    <Radio.Button value="内部评估" />
                                                    <Radio.Button value="外部评估" />
                                                    <Radio.Button value="直接评估" />
                                                </Radio.Group>
                                            </Form.Item>
                                              <Form.Item label="评估方法1">
                                               <Input value={this.state.asstInfo.evalmeth1} placeholder="请输入评估方法1" onChange={this.onChangeAsst.bind(this, 'evalmeth1')}></Input>
                                            </Form.Item>
                                            <Form.Item label="评估师姓名2">
                                               <Input value={this.state.asstInfo.evalname2} placeholder="请输入评估师姓名" onChange={this.onChangeAsst.bind(this, 'evalname2')}></Input>
                                            </Form.Item>
                                            <Form.Item label="担保人ID">
                                                <Input value={this.state.asstInfo.guaranteeID} placeholder="请输入担保人ID" onChange={this.onChangeAsst.bind(this, 'guaranteeID')}></Input>
                                            </Form.Item>
                                            <Form.Item label="担保人名称">
                                                <Input value={this.state.asstInfo.guaranteeName} placeholder="请输入担保人名称" onChange={this.onChangeAsst.bind(this, 'guaranteeName')}></Input>
                                            </Form.Item>
                                            <Form.Item label="可用担保额度">
                                                <Input value={this.state.asstInfo.guarLimit} placeholder="请输入可用担保额度" onChange={this.onChangeAsst.bind(this, 'guarLimit')}></Input>
                                            </Form.Item>
                                        </div>
                                        <div class="form_rt">
                                            <Form.Item label="评估价值">
                                               <Input value={this.state.asstInfo.evalval} placeholder="请输入评估价值" onChange={this.onChangeAsst.bind(this, 'evalval')}></Input>
                                            </Form.Item>
                                           <Form.Item label="评估有效期到期日">
                                               <Input value={this.state.asstInfo.validdate} placeholder="请输入评估有效期到期日" onChange={this.onChangeAsst.bind(this, 'validdate')}></Input>
                                            </Form.Item>
                                            <Form.Item label="确认日期">
                                               <Input value={this.state.asstInfo.evaldat} placeholder="请输入确认日期" onChange={this.onChangeAsst.bind(this, 'evaldat')}></Input>
                                            </Form.Item>
                                            <Form.Item label="外部评估机构代码">
                                                <Input value={this.state.asstInfo.evaluinstcode} placeholder="请输入外部评估机构代码" onChange={this.onChangeAsst.bind(this, 'evaluinstcode')}></Input>
                                            </Form.Item>
                                            <Form.Item label="评估师姓名1">
                                               <Input value={this.state.asstInfo.evalname1} placeholder="请输入评估师姓名" onChange={this.onChangeAsst.bind(this, 'evalname1')}></Input>
                                            </Form.Item>
                                            <Form.Item label="拟定担保方式">
                                                <Radio.Group value={this.state.asstInfo.guarType} onChange={this.onChangeAsst.bind(this, 'guarType')}>
                                                    <Radio.Button value="法人担保" />
                                                    <Radio.Button value="单人担保" />
                                                    <Radio.Button value="多人分保" />
                                                    <Radio.Button value="多人联保" />
                                                </Radio.Group>
                                            </Form.Item>
                                            <Form.Item label="是否阶段性担保">
                                                 <Radio.Group value={this.state.asstInfo.isStageGuar} onChange={this.onChangeAsst.bind(this, 'isStageGuar')}>
                                                    <Radio.Button value="是" />
                                                    <Radio.Button value="否" />
                                                </Radio.Group>
                                            </Form.Item>
                                            <Form.Item label="担保能力测算方法">
                                                <Input value={this.state.asstInfo.guarAbility} placeholder="请输入担保能力测算方法" onChange={this.onChangeAsst.bind(this, 'guarAbility')}></Input>
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
