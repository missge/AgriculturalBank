import {Component} from "../../components/libs";
import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {Dialog,Button,SupplePage} from '../../components/index';
import './style/authorization.css';
import '../publicCss/public.css';
import Credit from './credit';
import Borrower from '../borrowerInfo/borrower';

class Authorization extends Component {

    constructor(props){
        super(props);
        this.state={
            signDialog: false,
            usedNameDialog:false,
            jumpToCredit:false
        }
    }
    render() {
        return(
            <div style={{width:"100%",height:"100%"}}>
                <div style={{marginLeft:"5%",marginRight:"5%",height:window.innerHeight-this.getHeight(100)}}>
                    {/*授权书*/}
                    <html lang="en">
                    <head>
                        <title>授权书</title>
                    </head>

                    <body>
                    <p> <img class="whiteTabTitle" src={require("../../images/close.png")}
                             width="30px" height="auto" style={{marginLeft:"90%",marginTop:"1%"}}
                             onClick={() => this.setState({jumpToCredit: !this.state.jumpToCredit})}/></p>

                    <h2 align="center">授&nbsp;&nbsp;&nbsp;&nbsp;权&nbsp;&nbsp;&nbsp;&nbsp;书</h2>

                    <p align="center">（个人征信业务）</p>

                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>重要提示：</b></p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <b>尊敬的客户：为了维护您的权益，请在签署本授权书前，仔细阅读本授权书各条款（特别是黑体字条款），关注您在授权书中的权利、义务。如有任何疑问，请向经办行咨询。</b>
                    </p>
                    <p>中国农业银行股份有限公司：</p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 一、本人同意并不可撤销地授权：
                        <b>贵行（包括贵行各分支机构）按照国家相关规定采集并向金融信用信息基础数据库提供本人个人信息和包括信贷信息在内的信用信息，包含但不限于本人因未及时履行合同义务产生的不良信息。</b>
                    </p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 二、本人同意并不可撤销地授权：
                        <b>贵行（包括贵行各分支机构）根据国家有关规定，在办理涉及本人的业务时，有权通过金融信用信息基础数据库查询、打印、保存、使用符合相关规定的本人信用报告、个人信息和包括信贷信息在内的信用信息，并用于以下用途：</b>
                    </p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        □1.审核本人授信业务或用信申请，进行贷后风险管理。
                    </p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        □ 2.审核本人为他人（含自然人、法人、其他组织）提供担保，进行贷后等风险管理。
                    </p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        □ 3.审核本人担任法定代表人、负责人或出资人的法人或其他组织（或该法人、其他组织作为担保人）的授信和用信申请，进行相关风险管理。
                    </p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        □ 4.审核本人担任法定代表人、负责人或出资人的法人、商户或其他组织的特约商户开户申请，进行相关风险管理。
                    </p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        □ 5.用于                         业务。
                    </p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <b>三、如果贵行超出本授权范围进行查询使用，则贵行应承担与此相关的法律责任。</b>
                    </p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <b>四、若相关业务未获批准办理，本人同意本授权书及本人信用报告等资料由贵行留存，无须退还。</b>
                    </p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <b>五、本授权书有效期自签署之日起至本人约定用途的授信到期或业务结清之日止。</b>
                    </p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <b>授权人声明：贵行已依法向本人提示了相关条款（特别是黑体字条款），应本人要求对相关条款的概念、内容及法律效果做了说明，本人已经知悉并理解上述条款。</b>
                    </p>

                    <div class="authorization_content">
                        <div  onClick={ () => this.setState({ signDialog: true })}>授权人（签字）：</div>
                    </div>
                    <div class="authorization_content">
                        <div  onClick={ () => this.setState({ usedNameDialog: true })}>曾用名（签字）：</div>
                    </div>
                    <p>证件名称：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; □ 居民身份证 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; □ 其他              </p>
                    <p>证件号码：</p>
                    </body>
                    </html>
                    {/* 授权人签名*/}
                    <div>
                        <Dialog
                            title="请手写签名"
                            size="small"
                            visible={ this.state.signDialog }
                            onCancel={ () => this.setState({ signDialog: false }) }
                            lockScroll={ false }
                            style={{textAlign:"center"}}
                        >
                            <Dialog.Body style={{height:"200px"}}>
                                <span>假装有一个授权人签名</span>
                            </Dialog.Body>
                            <Dialog.Footer className="dialog-footer">
                                <Button style={{float:"left"}} onClick={ () => this.setState({ signDialog: false })}>清除签名</Button>
                                <Button style={{float:"right"}} type="primary" onClick={ () => this.setState({ signDialog: false }) }>确定签名</Button>
                            </Dialog.Footer>
                        </Dialog>
                    </div>
                    {/* 曾用名签名*/}
                    <div >
                        <Dialog
                            title="请手写签名"
                            size="small"
                            visible={ this.state.usedNameDialog }
                            onCancel={ () => this.setState({ usedNameDialog: false }) }
                            lockScroll={ false }
                            style={{textAlign:"center"}}
                            showClose={true}
                        >
                            <Dialog.Body style={{height:"200px"}}>
                                <span>假装有一个曾用名签名</span>
                            </Dialog.Body>
                            <Dialog.Footer className="dialog-footer">
                                <Button style={{float:"left"}} onClick={ () => this.setState({ usedNameDialog: false })}>清除签名</Button>
                                <Button style={{float:"right"}} type="primary" onClick={ () => this.setState({ usedNameDialog: false }) }>确定签名</Button>
                            </Dialog.Footer>
                        </Dialog>
                    </div>
                </div>
            </div>
        )
    }

}
export default (Authorization);