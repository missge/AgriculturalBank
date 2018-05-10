import React from 'react';
import {Component}from '../../components/libs';
import PropTypes from 'prop-types';
import * as borrowerActions from '../../actions/borrower';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {Map} from 'immutable';
import {DatePicker}  from '../../components/src/date-picker';
import {Radio,Button,Dialog,Tabs,Input,Form,TabTitle,NavBar,SupplePage,SelectList,Loading} from '../../components/index';
import '../publicCss/public.css';
import first from "../containerPage/first";
var qs = require("querystring");
let showLength=4;
const actions = [
    borrowerActions
];

function callback(key) {
    console.log(key);
}

function onChange(e) {
    console.log(`radio checked:${e.target.value}`);
}


function mapStateToProps(state) {
    const {borrower}=state;
    const {client} = state;
    return {
        borrower,client
    };
}



function mapDispatchToProps(dispatch) {

    const creators = Map()
        .merge(...actions)
        .filter(value => typeof value === 'function')
        .toObject();
    return {
        borrowerActions: bindActionCreators(creators, dispatch)

    };
}

/*@connect(
 state => ({...state.home}),
 dispatch => bindActionCreators({showIdCard}, dispatch)
 )*/
class Borrower extends Component {
    state = { visible: false }

    onIsShow = () =>{
        this.setState({
            isShow:!this.state.isShow
        })
    }

    onSubmit(e) {
        e.preventDefault();
    }
    onChange(key, value) {
        this.state.clientVO[key] = value;
        this.setState({
            clientVO: {[key]:value}
        });
    }
    onChangeRadio(key, value) {
        this.state.clientVO[key] = value;
        this.setState({
            clientVO: {[key]:value}
        });
    }
    setComplete(cur){
        let value = this.context.getListValue();
        value[cur] = 2;
        return value;
    }

    componentDidMount() {
        if (2==this.context.select){
            // eslint-disable-next-line
            mmspc.bridge.get((appId)=>{
                this.props.borrowerActions.getLoadnerInfo(appId , JSON.parse("{\"clientId\":\"1111\"}"));
            });
        }

    }

    constructor(props) {
        super(props);

        this.state = {
            form: {
                name: '',
                region: '',
                date1: null,
                date2: null,
                date3: null,
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
            radio1: '本科',
            radio2: '已婚',
            radio3: '事业单位',
            radio4:'',
            radio5:'',
            radio6:'',
            radio7:'',
            radio8:'是',
            radio9:'是',
            radio10:'否',
            radio11:'',
            radio12:'是',
            radio13:'',
            radio14:'',
            radio15:'',
            radio16:'单位地址',
            isShow:false,
            dialogVisible:false,
            nextButton:false,

            edulevel:"本科",//文化程度
            fendcent:"4",//供养人口
            corpchar:"其他",//单位性质
            cultureList:['本科','硕士','博士','大专','高中','中专','初中'],
            fendcentList:['0','1','2','3','4','5','6','7','8','9','10'],
            corpcharList:['事业单位','国家机关','无','个体','其他','国资委或省国资委直属企业','优质上市公司','经营规范、效益一般的企业','小企业'],
            selectDialogVisible:false,
            selectFendcentDialog:false,
            selectCorpcharDialog:false,

            clientVO:{
                // 主页面字段
                // cliname:"",//客户姓名
                //
                // settleaddr:"",//长期居住地地址
                // corpname:"",//单位全称
                // corpadd:"",//单位注册地址  // 单位地址
                // myselfincpm:"",//本人年税后收入
                // mobno:"",//手机号码
                // certno:"",//证件号码
                // marrysta:"已婚",//婚姻状况
                //
                //
                //              //配偶税后年收入 暂无
                // // 基本信息字段
                // country:"",//国家/地区
                // gender:"男",//性别
                // birthday:"" , //出生日期
                // housesta:"父母同住",//居住状况
                //          // 本地居住年限  暂无
                // addagrflag:"", // 长期居住地城乡属性
                // // perclienttype:"",//人行涉农个人客户类别
                // certtype:"",//证件类型
                //              //是否长期有效 暂无
                //             //证件有效终止日  暂无
                //             //是否本地常住户口
                //             //是否本地户籍
                // abcstuffflag:"否",  //是否农行员工
                //              //是否私人银行客户
                //             //离婚证明登记日期
                //
                // //职业信息字段
                // careertype:"公务员",//个人信贷对象
                // title:"",//职称
                //             //单位固定电话
                // corpstdtype:"",//单位国标行业分类
                // stdjobtype:"国家机关",//国标职业分类
                // dutysta:"",//职务状况
                //             // 职业经营类别
                //
                // //财务信息字段
                // asssum:"" , //资产合计
                // guaramt:"",//家庭对外担保额
                // pardebtexpd:"",//配偶年债务性支出
                // exppm:"",//家庭年其他收入
                // debtsum:"",//负债合计
                // debtexpd:"",//本人年债务性支出
                // protexpd:"",//本人年生活保障支出
                //
                // //联系信息字段
                // email:"",//电子邮箱
                // teliprefix:"",//固定电话
                //             //通信地址
                //
                // procsId:"",
                // clientId:"",//客户唯一id

                housesta:"",
                corpchar:"",
                busiscale:"",
                emptype:"",
                clicode:"",
                othflag:"",
                opdate:"",
                busiloanbal:"",
                opinstcode:"",
                corpflag:"",
                addrdist:"",
                othdebtbal:"",
                othincpm:"",
                carvalue:"",
                contact:"",
                qq:"",
                f21:"",
                f22:"",
                position:"",
                asssum:"",
                isrel:"",
                corpname:"",
                offsite:"",
                jobno:"",
                abcstuffflag:"",
                jobexp:"",
                clientId:"",
                corpdist:"",
                housevalue:"",
                reltype:"",
                title:"",
                parincpm:"",
                req_id:"",
                certtype:"",
                perclienttype:"",
                myselfincpm:"",
                engname:"",
                settledist:"",
                agrflag:"",
                jobyear:"",
                birthday:"",
                faxiprefix:"",
                othass:"",
                remark:"",
                stkvalue:"",
                msn:"",
                dutysta:"",
                f1:"",
                oprid:"",
                f2:"",
                postcode:"",
                f3:"",
                edulevel:"",
                f4:"",
                f5:"",
                f6:"",
                agflag:"",
                country:"",
                busista:"",
                othloanbal:"",
                pardebtexpd:"",
                email:"",
                myguaramt:"",
                depbal:"",
                f61:"",
                f62:"",
                sumexpend:"",
                cliname:"",
                manchar:"",
                hujidist:"",
                corpadd:"",
                addagrflag:"",
                careertype:"",
                settleaddr:"",
                teliprefix:"",
                gender:"",
                mobno:"",
                carloanbal:"",
                guaramt:"",
                degree:"",
                protexpd:"",
                f103:"",
                f105:"",
                orgcode:"",
                f106:"",
                f107:"",
                jobbegdate:"",
                debtsum:"",
                exppm:"",
                marrysta:"",
                fendcent:"",
                certno:"",
                sumincpm:"",
                addr:"",
                corpstdtype:"",
                stdjobtype:"",
                cdobj:"",
                delflag:"",
                debtexpd:"",
                houseloanbal:"",
                hujiaddr:""
                // _method:"",
                // addr:"",   // 常用通信地址
                // addrdist:"" ,// 常用通信地址区划
                // agflag:"" ,// 预留字段  三农客户标志
                // area:"" , //信息区块
                //
                //
                // busiloanbal:"",//经营性贷款余额
                // busiscale:"",//单位企业规模
                // busista:"",//单位经营状况
                //
                // carloanbal:"",//车贷余额
                // carvalue:"",//汽车价值
                // cdobj:"",//信贷对象
                //
                //
                //
                // clicode:"",//客户ID
                // clientId:"",//客户唯一id
                //
                // contact:"",//联系人
                //
                // corpdist:"",//单位注册地行政区划
                // corpflag:"",//乡镇企业标志
                //
                //
                //
                //
                //
                // degree:"",//最高学位
                // delflag:"",//删除标志
                // depbal:"",//存款余额
                //
                //
                //
                // emptype:"",//乡镇企业供职关系
                // engname:"",//英文姓名
                //
                // faxiprefix:"",//传真号码
                //
                //
                //
                // houseloanbal:"",//房贷余额
                //
                // housevalue:"",//房产价值
                // hujiaddr:"",//户籍(学生家庭)详细地址
                // hujidist:"",//户籍(学生家庭)地址区划
                // jobbegdate:"",//本单位工作起始日期
                // jobexp:"",//近3年工作经历
                // jobno:"",//序号
                // jobyear:"",//连修工作年限
                // manchar:"",//管理特征
                //
                //
                // msn:"",//MSN号码
                // myguaramt:"",//本人非我行对外担保额
                // offsite:"",//官方网址
                // opdate:"",//操作日期
                // opinstcode:"",//机构编码
                // oprid:"",//操作员编码
                // orgcode:"",//单位组织机构代码
                // othass:"",//其他资产价值
                // othdebtbal:"",//其他贷款余额
                //
                //
                // position:"",//职业分类2
                // postcode:"",//长期居住地邮政编码
                // procsId:"",//作业Id
                //
                // qq:"",//qq号码
                // relrole:"",//角色
                // reltype:"",//关系人类型
                // remark:"",//个性描述
                // reqno:"",//
                // settledist:"",//长期居住地区划
                //
                // stkvalue:"",//证券价值
                // sumexpend:"",//家庭年支出合计
                // sumincpm:"",//家庭年收入合计



            }
        }

    }

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

    onEducateAppendClick(){
        this.setState({selectDialogVisible:true});
    }
    onFendcentAppendClick(){
        this.setState({selectFendcentDialog:true});
    }
    onCorpcharAppendClick(){
        this.setState({selectCorpcharDialog:true});
    }

    removeByValue(arr, val) {
        for(var i=0; i<arr.length; i++) {
            if(arr[i] == val) {
                arr.splice(i, 1);
                break;
            }
        }
    }
    render() {
        return (
            <div  style={{height:window.innerHeight-this.getHeight(100)}}>

                <div class="showTab1">
                    <div>
                        {
                            this.props.borrower.postSuccess&&
                            this.props.borrowerActions.postSuccess(false) &&
                            this.context.jumpTo(3, this.setComplete.bind(this)(2))

                        }
                    </div>
                    <div>
                        {   this.props.borrower.state&&
                            this.props.borrowerActions.getLoanerInfoState(false)&&
                            this.setState({clientVO:this.props.borrower.loanerInfo})

                        }
                    </div>
                    <TabTitle title="借款人信息" class="tabTitle blueTabTitle"/>
                    <Form model={this.state.clientVO} labelWidth="110" labelPosition="left" onSubmit={this.onSubmit.bind(this)}>
                        <div class="form_content">
                            <div class="form_lf">
                                <Form.Item label="客户姓名">
                                    <Input value={this.state.clientVO.cliname} placeholder="关小明" onChange={this.onChange.bind(this, 'cliname')}></Input>
                                </Form.Item>
                                <Dialog
                                    size="small"
                                    visible={ this.state.selectDialogVisible }
                                    onCancel={ () => this.setState({ selectDialogVisible: false,edulevel:this.state.edulevel}) }
                                    lockScroll={ false }
                                    className='mmpsc-select-list-dialog'
                                >
                                    <Dialog.Body>
                                        <SelectList ref ="educationSL"
                                                    visible={ this.state.selectDialogVisible }
                                                    value={this.state.edulevel} multiple={false} onChange={(val)=>{
                                            this.removeByValue(this.state.cultureList,val)
                                            this.state.cultureList.unshift(val)
                                            this.setState({selectDialogVisible: false,edulevel:val})
                                            this.refs.educationSL.setState({selected:null});
                                        }}>
                                            {
                                                this.state.cultureList.map(function(item,i){
                                                    return i>showLength? <SelectList.Option key={i} label={item} value={item} /> :''
                                                })
                                            }

                                        </SelectList>
                                    </Dialog.Body>
                                </Dialog>
                                <Form.Item label="文化程度">
                                    <Radio.Group value={this.state.clientVO.edulevel} onChange={this.onChangeRadio.bind(this, 'edulevel')} appendix="更多"
                                                 onAppendixClick={this.onEducateAppendClick.bind(this)}>
                                        {
                                            this.state.cultureList.map(function(item,i){
                                                return(
                                                    i<showLength+1?
                                                        <Radio.Button key={i} value={item} /> :''

                                                )
                                            })

                                        }
                                        <Radio.Button value="更多" />
                                    </Radio.Group>
                                </Form.Item>
                                <Dialog
                                    size="tiny"
                                    visible={ this.state.dialogVisible }
                                    onCancel={ () => this.setState({ dialogVisible: false }) }
                                    lockScroll={ false }
                                >
                                    <Dialog.Body>
                                        <span>这是一段信息</span>
                                    </Dialog.Body>
                                </Dialog>
                                <Form.Item label="长期居住地">
                                    <Input value={this.state.clientVO.settleaddr}  placeholder="北京" onChange={this.onChange.bind(this, 'settleaddr')}></Input>
                                </Form.Item>
                                <Form.Item label="单位全称">
                                    <Input value={this.state.clientVO.corpname}  placeholder="xxxxx单位" onChange={this.onChange.bind(this, 'corpname')}></Input>
                                </Form.Item>
                                {/*暂无*/}
                                <Form.Item label="单位地址">
                                    <Input value={this.state.clientVO.corpadd}   placeholder="人民东路1号" onChange={this.onChange.bind(this, 'corpadd')}></Input>
                                </Form.Item>
                                <Form.Item label="本人年税后收入">
                                    <Input value={this.state.clientVO.myselfincpm}  placeholder="20万" onChange={this.onChange.bind(this, 'myselfincpm')}></Input>
                                </Form.Item>
                                <Form.Item label="手机号码">
                                    <Input value={this.state.clientVO.mobno}  placeholder="13366541498" onChange={this.onChange.bind(this, 'mobno')}></Input>
                                </Form.Item>
                            </div>
                            <div class="form_rt">
                                <Form.Item label="证件号码">
                                    <Input value={this.state.clientVO.certno}  placeholder="321320199905010203" onChange={this.onChange.bind(this, 'certno')}></Input>
                                </Form.Item>
                                <Form.Item label="婚姻状况">
                                    <Radio.Group value={this.state.clientVO.marrysta} onChange={this.onChangeRadio.bind(this, 'marrysta')}>
                                        <Radio.Button value="已婚"/>
                                        <Radio.Button value="未婚"/>
                                        <Radio.Button value="离异"/>
                                        <Radio.Button value="丧偶"/>
                                        <Radio.Button value="其他"/>
                                    </Radio.Group>
                                </Form.Item>
                                <Dialog
                                    size="small"
                                    visible={ this.state.selectFendcentDialog }
                                    onCancel={ () => this.setState({ selectFendcentDialog: false,fendcent:this.state.fendcent}) }
                                    lockScroll={ false }
                                    className='mmpsc-select-list-dialog'
                                >
                                    <Dialog.Body>
                                        <SelectList ref ="fendcentSL"
                                                    visible={ this.state.selectFendcentDialog }
                                                    value={this.state.fendcent} multiple={false} onChange={(val)=>{
                                            this.removeByValue(this.state.fendcentList,val)
                                            this.state.fendcentList.unshift(val)
                                            this.setState({selectFendcentDialog: false,fendcent:val})
                                            this.refs.fendcentSL.setState({selected:null});
                                        }}>
                                            {
                                                this.state.fendcentList.map(function(item,i){
                                                    return i>showLength? <SelectList.Option key={i} label={item} value={item} /> :''
                                                })
                                            }

                                        </SelectList>
                                    </Dialog.Body>
                                </Dialog>
                                <Form.Item label="供养人口">
                                    <Radio.Group value={this.state.clientVO.fendcent} onChange={this.onChangeRadio.bind(this, 'fendcent')} appendix="更多"
                                                 onAppendixClick={this.onFendcentAppendClick.bind(this)}>
                                        {
                                            this.state.fendcentList.map(function(item,i){
                                                return(
                                                    i<showLength+1?
                                                        <Radio.Button key={i} value={item} /> :''

                                                )
                                            })

                                        }
                                        <Radio.Button value="更多" />
                                    </Radio.Group>
                                </Form.Item>
                                <Dialog
                                    size="small"
                                    visible={ this.state.selectCorpcharDialog }
                                    onCancel={ () => this.setState({ selectCorpcharDialog: false,corpchar:this.state.corpchar}) }
                                    lockScroll={ false }
                                    className='mmpsc-select-list-dialog'
                                >
                                    <Dialog.Body>
                                        <SelectList ref ="corpcharSL"
                                                    visible={ this.state.selectCorpcharDialog }
                                                    value={this.state.corpchar} multiple={false} onChange={(val)=>{
                                            this.removeByValue(this.state.corpcharList,val)
                                            this.state.corpcharList.unshift(val)
                                            this.setState({selectCorpcharDialog: false,corpchar:val})
                                            this.refs.corpcharSL.setState({selected:null});
                                        }}>
                                            {
                                                this.state.corpcharList.map(function(item,i){
                                                    return i>showLength? <SelectList.Option key={i} label={item} value={item} /> :''
                                                })
                                            }

                                        </SelectList>
                                    </Dialog.Body>
                                </Dialog>
                                <Form.Item label="单位性质">
                                    <Radio.Group value={this.state.clientVO.corpchar} onChange={this.onChangeRadio.bind(this, 'corpchar')} appendix="更多"
                                                 onAppendixClick={this.onCorpcharAppendClick.bind(this)}>
                                        {
                                            this.state.corpcharList.map(function(item,i){
                                                return(
                                                    i<showLength+1?
                                                        <Radio.Button key={i} value={item} /> :''

                                                )
                                            })

                                        }
                                        <Radio.Button value="更多" />
                                    </Radio.Group>
                                </Form.Item>
                                {/*暂无*/}
                                <Form.Item label="配偶税后年收入">
                                    <Input value={this.state.clientVO.pardebtexpd}  placeholder="18万" onChange={this.onChange.bind(this, 'name')}></Input>
                                </Form.Item>
                            </div>
                        </div>
                    </Form>
                    <div class="loan_footer">
                        <div class="footer_content" >
                            <div class="footer_content_lf">
                                <Button plain={true} type="info" size="large" onClick={this.onIsShow}>信息补录</Button>
                            </div>
                            <div class="footer_content_rt">
                                <Button type="warning" size="large"  onClick={() => {
                                    // alert(JSON.stringify(this.state.clientVO));
                                    // this.context.jumpTo(3, this.setComplete.bind(this)(2))
                                    // eslint-disable-next-line
                                    mmspc.bridge.get((data)=> {
                                        this.state.clientVO.clientId = this.props.client.clientId;
                                        this.state.clientVO.procsId = this.props.client.procsId;
                                        this.props.borrowerActions.postLoanerInfo(data , this.state.clientVO);
                                        // "{\"clientVO\":"+"\""+that.state.clientVO+"\""+"}"

                                    });

                                    }}>下一步</Button>

                            </div>
                        </div>

                    </div>
                    {/*< footer>
                        <Button plain={true} type="info" size="large" onClick={this.onIsShow}>信息补录</Button>
                        <button type="button" class="next-step-btn" style={{background: `url(${require("../../images/button_gray.png")}) no-repeat`}}> 下一步</button>
                    </footer>*/}
                </div>

                <SupplePage style={{display:this.state.isShow === false ? "none" : "block"}}>
                    <NavBar title={"借款人信息补录"}
                            lName={"取消"}
                            rName={"确定"}
                            lClick={this.onIsShow}
                            rClick={this.onIsShow}
                    >
                    </NavBar>
                    <div class="showTab2">
                        <div>
                     {/*   <div class="head" style={{background:"#07B8AC",textAlign:"center",height:"50px"}}>
                            <Button plain={true} type="info" style={{background:"#07B8AC",float:"left",marginTop:"5px"}} onClick={this.onIsShow}>取消</Button>
                            <span style={{color:"#fff",float:"left",marginTop:"10px"}}>取消</span>
                            <span style={{color:"#fff",fontSize:"larger"}}>借贷人信息补录</span>
                            <Button plain={true} type="info" style={{background:"#07B8AC",float:"right",marginTop:"5px"}} onClick={this.onIsShow}>确定</Button>
                            <span style={{color:"#fff",float:"right",marginTop:"10px"}}>确定</span>
                        </div>*/}
                        <Tabs activeName="1" onTabClick={ (tab) => console.log(tab.props.name) }>
                            <Tabs.Pane label="基本信息" name="1">
                                <Form model={this.state.clientVO} labelWidth="155" labelPosition="left" onSubmit={this.onSubmit.bind(this)}>
                                    <div class="form_content">
                                        <div class="form_lf">
                                            <Form.Item label="国家">
                                                <Input value={this.state.clientVO.country} placeholder="中国 "  onChange={this.onChange.bind(this, 'country')}></Input>
                                            </Form.Item>
                                            <Form.Item label="性别">
                                                <Radio.Group value={this.state.clientVO.gender} onChange={this.onChangeRadio.bind(this, 'gender')}>
                                                    <Radio.Button value="男"/>
                                                    <Radio.Button value="女"/>
                                                </Radio.Group>
                                            </Form.Item>
                                            <Form.Item label="出生日期">
                                                <DatePicker
                                                    value={this.state.clientVO.birthday}
                                                    placeholder="选择日期"
                                                    onChange={this.onChange.bind(this, 'birthday')}
                                                />
                                            </Form.Item>
                                            <Form.Item label="居住状况">
                                                <Radio.Group value={this.state.clientVO.housesta} onChange={this.onChangeRadio.bind(this, 'housesta')}>
                                                    <Radio.Button value="父母同住"/>
                                                    <Radio.Button value="集体宿舍"/>
                                                    <Radio.Button value="租住"/>
                                                    <Radio.Button value="共有住宅"/>
                                                    <Radio.Button value="其他"/>
                                                    <Radio.Button value="更多"/>
                                                </Radio.Group>
                                            </Form.Item>
                                            {/*暂无*/}
                                            <Form.Item label="本地居住年限">
                                                <Input value={this.state.form.name}  placeholder="10年 " onChange={this.onChange.bind(this, 'name')}></Input>
                                            </Form.Item>
                                            <Form.Item label="长期居住地城乡属性">
                                                <Input value={this.state.clientVO.addagrflag}   placeholder="城市 " onChange={this.onChange.bind(this, 'addagrflag')}></Input>
                                            </Form.Item>
                                            <Form.Item label="人行涉农个人客户类别">
                                                <Radio.Group value={this.state.clientVO.perclienttype} onChange={this.onChangeRadio.bind(this, 'perclienttype')}>
                                                    <Radio.Button value="非农户"/>
                                                    <Radio.Button value="农户"/>
                                                    <Radio.Button value="不定"/>
                                                </Radio.Group>
                                            </Form.Item>
                                        </div>
                                        <div class="form_rt">
                                            <Form.Item label="证件类型">
                                                <Input value={this.state.clientVO.certtype} placeholder="身份证 " onChange={this.onChange.bind(this, 'certttype')}></Input>
                                            </Form.Item>
                                            {/*暂无*/}
                                            <Form.Item label="是否长期有效">
                                                <Radio.Group value={this.state.radio8} onChange={this.onChangeRadio.bind(this, 'radio8')}>
                                                    <Radio.Button value="是"/>
                                                    <Radio.Button value="否"/>
                                                </Radio.Group>
                                            </Form.Item>
                                            {/*暂无*/}
                                            <Form.Item label="证件有效终止日">
                                                <DatePicker
                                                    value={this.state.clientVO.opdate}
                                                    placeholder="选择日期"
                                                    onChange={this.onChange.bind(this, 'date2')}
                                                />
                                            </Form.Item>
                                            {/*暂无*/}
                                            <Form.Item label="是否本地常住户口">
                                                <Radio.Group value={this.state.radio9} onChange={this.onChangeRadio.bind(this, 'radio9')}>
                                                    <Radio.Button value="是"/>
                                                    <Radio.Button value="否"/>
                                                </Radio.Group>
                                            </Form.Item>
                                            {/*暂无*/}
                                            <Form.Item label="是否本地户籍">
                                                <Radio.Group value={this.state.radio10} onChange={this.onChangeRadio.bind(this, 'radio10')}>
                                                    <Radio.Button value="是"/>
                                                    <Radio.Button value="否"/>
                                                </Radio.Group>
                                            </Form.Item>
                                            <Form.Item label="是否农行员工">
                                                <Radio.Group value={this.state.clientVO.abcstuffflag} onChange={this.onChangeRadio.bind(this, 'abcstuffflag')}>
                                                    <Radio.Button value="是"/>
                                                    <Radio.Button value="否"/>
                                                </Radio.Group>
                                            </Form.Item>
                                            {/*暂无*/}
                                            <Form.Item label="是否私人银行客户">
                                                <Radio.Group value={this.state.radio12} onChange={this.onChangeRadio.bind(this, 'radio12')}>
                                                    <Radio.Button value="是"/>
                                                    <Radio.Button value="否"/>
                                                </Radio.Group>
                                            </Form.Item>
                                            {/*暂无*/}
                                            <Form.Item label="离婚证明登记日期">
                                                <DatePicker
                                                    value={this.state.form.date3}
                                                    placeholder="非必输"
                                                    onChange={this.onChange.bind(this, 'date3')}
                                                />
                                            </Form.Item>
                                        </div>
                                    </div>
                                </Form>
                            </Tabs.Pane>
                            <Tabs.Pane label="职业信息" name="2">
                                <Form model={this.state.clientVO} labelWidth="100" labelPosition="left" onSubmit={this.onSubmit.bind(this)}>
                                    <div class="form_content">
                                        <div class="form_lf">
                                            <Form.Item label="个人信贷对象">
                                                <Radio.Group value={this.state.clientVO.careertype} onChange={this.onChangeRadio.bind(this, 'careertype')}>
                                                    <Radio.Button value="公务员"/>
                                                    <Radio.Button value="企事业职工"/>
                                                    <Radio.Button value="私营业主"/>
                                                    <Radio.Button value="农户"/>
                                                    <Radio.Button value="更多"/>
                                                </Radio.Group>
                                            </Form.Item>
                                            <Form.Item label="职称">
                                                <Input value={this.state.clientVO.title}   placeholder="请输入职称名称" onChange={this.onChange.bind(this, 'title')}></Input>
                                            </Form.Item>
                                            {/*暂无*/}
                                            <Form.Item label="单位固定电话">
                                                <Input value={this.state.form.name}  placeholder="88886687" onChange={this.onChange.bind(this, 'name')}></Input>
                                            </Form.Item>
                                            <Form.Item label="国标行业分类">
                                                <Input value={this.state.clientVO.corpstdtype} onChange={this.onChange.bind(this, 'corpstdtype')}></Input>
                                            </Form.Item>
                                        </div>
                                        <div class="form_rt">
                                            <Form.Item label="国标职业分类">
                                                <Radio.Group value={this.state.clientVO.stdjobtype} onChange={this.onChangeRadio.bind(this, 'stdjobtype')}>
                                                    <Radio.Button value="国家机关"/>
                                                    <Radio.Button value="党群组织"/>
                                                    <Radio.Button value="企业"/>
                                                    <Radio.Button value="事业"/>
                                                    <Radio.Button value="单位负责人"/>
                                                    <Radio.Button value="更多"/>
                                                </Radio.Group>
                                            </Form.Item>
                                            <Form.Item label="职务状况">
                                                <Input value={this.state.clientVO.debtexpd}  onChange={this.onChange.bind(this, 'detysta')}></Input>
                                            </Form.Item>
                                            {/*暂无*/}
                                            <Form.Item label="职业经营类别">
                                                <Radio.Group value={this.state.radio15} onChange={this.onChangeRadio.bind(this, 'radio15')}>
                                                    <Radio.Button value="工薪供职"/>
                                                    <Radio.Button value="个私经营"/>
                                                    <Radio.Button value="农业经营"/>
                                                    <Radio.Button value="学生"/>
                                                </Radio.Group>
                                            </Form.Item>
                                        </div>
                                    </div>
                                </Form>
                            </Tabs.Pane>
                            <Tabs.Pane label="财务信息" name="3">
                                <Form model={this.state.clientVO} labelWidth="125" labelPosition="left" onSubmit={this.onSubmit.bind(this)}>
                                    <div class="form_content">
                                        <div class="form_lf">
                                            <Form.Item label="资产合计">
                                                <Input value={this.state.clientVO.asssum} placeholder="1000万" onChange={this.onChange.bind(this, 'asssum')}></Input>
                                            </Form.Item>
                                            <Form.Item label="家庭对外担保额">
                                                <Input value={this.state.clientVO.guaramt} placeholder="无" onChange={this.onChange.bind(this, 'guaramt')}></Input>
                                            </Form.Item>
                                            <Form.Item label="配偶年债务性支出">
                                                <Input value={this.state.clientVO.pardebtexpd} placeholder="50万" onChange={this.onChange.bind(this, 'pardebtexpd')}></Input>
                                            </Form.Item>
                                            <Form.Item label="家庭其他年收入">
                                                <Input value={this.state.clientVO.exppm} placeholder="非必输" onChange={this.onChange.bind(this, 'exppm')}></Input>
                                            </Form.Item>
                                        </div>
                                        <div class="form_rt">
                                            <Form.Item label="负债合计">
                                                <Input value={this.state.clientVO.debtsum} placeholder="无" onChange={this.onChange.bind(this, 'debtsum')}></Input>
                                            </Form.Item>
                                            <Form.Item label="本人年债务性支出">
                                                <Input value={this.state.clientVO.debtexpd} placeholder="无" onChange={this.onChange.bind(this, 'debtexpd')}></Input>
                                            </Form.Item>
                                            <Form.Item label="本人年生活保障支出">
                                                <Input value={this.state.clientVO.protexpd} placeholder="10万" onChange={this.onChange.bind(this, 'protexpd')}></Input>
                                            </Form.Item>
                                        </div>
                                    </div>
                                </Form>
                            </Tabs.Pane>
                            <Tabs.Pane label="联系信息" name="4">
                                <Form model={this.state.clientVO} labelWidth="80" labelPosition="left" onSubmit={this.onSubmit.bind(this)}>
                                    <div class="form_content">
                                        <div class="form_lf">
                                            <Form.Item label="电子邮箱">
                                                <Input value={this.state.clientVO.email} placeholder="7438492@qq.com" onChange={this.onChange.bind(this, 'email')}></Input>
                                            </Form.Item>
                                            <Form.Item label="固定电话">
                                                <Input value={this.state.clientVO.teliprefix} placeholder="88782567" onChange={this.onChange.bind(this, 'teliprefix')}></Input>
                                            </Form.Item>
                                        </div>
                                        <div class="form_rt">
                                            {/*暂无*/}
                                        <Form.Item label="通信地址">
                                            <Radio.Group value={this.state.radio16} onChange={this.onChangeRadio.bind(this, 'radio16')}>
                                                <Radio.Button value="单位地址"/>
                                                <Radio.Button value="居住地址"/>
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


        );
    }


}

Borrower.contextTypes = {
    jumpTo: PropTypes.func,
    getListValue:PropTypes.func,
    select:PropTypes.number
};



/*export default connect(mapStateToProps, mapDispatchToProps)(Borrower);*/
export default connect(mapStateToProps,mapDispatchToProps)(Borrower);