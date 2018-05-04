import React, { Component } from 'react';
import './style/check.css';
import * as homeActions from '../../actions/home';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {Map} from 'immutable';
import Banner from '../../ma-ui/Banner/banner.js'
const actions = [
    homeActions
];
function mapStateToProps(state) {
    const {home}=state;
    return {
        home
    };
}

function mapDispatchToProps(dispatch) {

    const creators = Map()
        .merge(...actions)
        .filter(value => typeof value === 'function')
        .toObject();
    return {
        homeActions: bindActionCreators(creators, dispatch)

    };
}
/*@connect(
 state => ({...state.home}),
 dispatch => bindActionCreators({showIdCard}, dispatch)
 )*/
class Check extends Component {
    render() {
        return (
            <div style={{height:window.innerHeight-this.getHeight(100)}}>
                <Banner/>
                < div
                    class
                        ="blank-box-group">
                    <div class="blank-box-title">
                        <span>业务信息</span>
                    </div>
                    < div
                        class
                            ="blank-box-main">
            <span class="blank-box-main-span">
                <span class="red-point">*</span>
                业务品种
            </span>

                        < div class="input-group">
                            <select class="blank-box-input">
                                <option>请选择</option>
                                <option selected>一手房贷款</option>
                            </select>

                            < div class="right-button"><img src={require("../../images/triangle_down.png")} height="15" width="auto"/>
                            </div>
                        </div>
            <span class="blank-box-main-span" style={{marginLeft:120}}>
                场景选择
            </span>

                        <div class="input-group">
                            <select class="blank-box-input">
                                <option>请选择</option>
                                <option selected>个人购房</option>
                            </select>

                            <div class="right-button"><img src={require("../../images/triangle_down.png")} height="15" width="auto"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="blank-box-group">
                    <div class="blank-box-title">
                        <span>证件信息</span>
                    </div>
                    <div class="blank-box-main">
                        <div class="card-msg">
                            <div class="card-msg-row">
                    <span class="blank-box-main-span">
                        <span class="red-point">*</span>
                        证件类型
                    </span>

                                <div class="input-group">
                                    <input class="blank-box-input" placeholder="身份证"/>
                                </div>
                            </div>
                            <div class="card-msg-row">
                    <span class="blank-box-main-span">
                        <span class="red-point">*</span>
                        证件号码
                    </span>

                                <div class="input-group">
                                    <input class="blank-box-input" placeholder="请输入证件号码"/>

                                    <div class="input-group-load-btn">读取</div>
                                </div>
                                <div class="wrong-msg">
                                    <img src={require("../../images/error.png")}/>
                                    <span>请输入正确的身份证号码</span>
                                </div>
                            </div>
                            <div class="card-msg-row">
                    <span class="blank-box-main-span">
                        <span class="red-point">*</span>
                        客户姓名
                    </span>

                                <div class="input-group">
                                    <input class="blank-box-input" placeholder="请输入客户姓名"/>
                                </div>
                            </div>
                        </div>
                        <div class="card-front">
                            <div class="card-front-img" style ={{background:`url(${require("../../images/certificate_front.png")}) no-repeat`}}>
                                <img src={require("../../images/camera.png")} width="100px" height="auto"/>
                            </div>
                            <p><span class="red-point">*</span>请上传身份证照片</p>
                        </div>
                        <div class="card-back">
                            <div class="card-back-img" style ={{background:`url(${require("../../images/certificate_back.png")}) no-repeat`}}>
                                <img src={require("../../images/camera.png")} width="100px" height="auto"/>
                            </div>
                            <p><span class="red-point">*</span>请上传身份证国徽面照片</p>
                        </div>
                        <div class="card-button "  style ={{background:`url(${require("../../images/button_gray.png")}) no-repeat`}}>
                            <button type="button" class="hidden">信息核查</button>
                            <div class="card-audit-success">
                                <img src={require("../../images/success_iocn.png")} width="130" height="auto"/>

                                <p>核查通过</p>
                            </div>
                        </div>
                        <div class="clearfix"></div>
                    </div>
                </div>
                < footer >
                    <button type="button" class="reset-info-btn"  style ={{background:`url(${require("../../images/button_blue.png")}) no-repeat`}} >重置信息</button>
                    < button type="button" class="next-step-btn" style ={{background:`url(${require("../../images/button_gray.png")}) no-repeat`}}> 下一步</button >
                </footer>
                <div class="modal-loading">
                    <img src={require("../../images/loading_white.png")} width="120" height="auto"/>

                    <p>身份证读取中...</p>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Check);
