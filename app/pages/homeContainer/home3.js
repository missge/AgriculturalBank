import React, { Component } from 'react';
import './style/home2.css';
import * as homeActions from '../../actions/home';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {Map} from 'immutable';
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
class Home extends Component {
  render() {
    return (
        <div>
          <div className="step-state">
            <ul>
              <li>
                <img className="step-img-point" src={require("../../images/green01.png")}/>
                <p>客户信息核查</p>
                <img className="step-img-line" src={require("../../images/strip.png")}/>
              </li>
              <li>
                <img className="step-img-point" src={require("../../images/blue02.png")}/>
                <p>客户征信查询</p>
              </li>
              <li>
                <img className="step-img-point" src={require("../../images/gray03.png")}/>
                <p>借款人信息录入</p>
              </li>
              <li>
                <img className="step-img-point" src={require("../../images/gray04.png")}/>
                <p>关系人信息录入</p>
              </li>
              <li>
                <img className="step-img-point" src={require("../../images/gray05.png")}/>
                <p>贷款人信息录入</p>
              </li>
              <li>
                <img className="step-img-point" src={require("../../images/gray06.png")}/>
                <p>押品信息录入</p>
              </li>
              <li>
                <img className="step-img-point" src={require("../../images/gray07.png")}/>
                <p>申请表生成</p>
              </li>
              <li>
                <img className="step-img-point" src={require("../../images/gray08.png")}/>
                <p>影像采集</p>
              </li>
              <li>
                <img className="step-img-point" src={require("../../images/gray09.png")}/>
                <p>贷款报告调查</p>
              </li>
            </ul>
          </div>
          <div className="gray-bg">
            <div className="base-info-title">
              <span>基本信息</span>
            </div>
            <div className="base-info-box">
              <div className="container-fluid">
                <div className="row">
                  <span className="text-left">业务名称</span>
                  <select className="input-left">
                    <option>请选择</option>
                    <option>一手房贷款</option>
                  </select>
                  <div className="select-icon">
                    <img src={require("../../images/triangle_down.png")} />
                  </div>
                  <span className="text-right">证件类型</span>
                  <input className="input-right" value="身份证" disabled/>
                  <button className="read-id" onClick={()=>this.props.homeActions.showIdCard("inline")}>
                    <p>读取</p>
                    <p>身份证</p>
                  </button>
                </div>
                <div className="row">
                  <span className="text-left">证件号码</span>
                  <input className="input-left" placeholder="请输入证件号码" value=""/>
                  <span className="text-right">客户姓名</span>
                  <input className="input-right" placeholder="请输入客户姓名" value=""/>
                </div>
              </div>
            </div>
            <div className="base-info-title">
              <span>证件信息</span>
            </div>
            <div className="id-info-box">
              <div className="id-front-div">
                <div className="id-front-img">
                  <img src={require("../../images/camera.png")}/>
                </div>
                <p>请上传身份证头像面照片</p>
              </div>
              <div className="id-back-div">
                <div className="id-back-img">
                  <img src={require("../../images/camera.png")}/>
                </div>
                <p>请上传身份证国徽面照片</p>
              </div>
              <div className="id-text-div">
                <p>上传须知</p>
                <p>1、身份证为本人持有的二代身份证；</p>
                <p>2、请确保身份证边框完整，内容清晰。</p>
                <div>
                  <img src={require("../../images/example01.png")}/>
                  <p>正确示例</p>
                </div>
                <div>
                  <img src={require("../../images/example02.png")}/>
                  <p>缺少边角</p>
                </div>
                <div>
                  <img src={require("../../images/example03.png")}/>
                  <p>字迹模糊</p>
                </div>
              </div>
            </div>
          </div>
          <div className="id-check-modal" style = {{display:this.props.home.readIdCard}}>
            <div className="id-check-main">
              <p>身份证信息读取中</p>
              <img src={require("../../images/loading.png")}/>
              <button type="button" onClick={()=>this.props.homeActions.showIdCard("none")}>取消读取</button>
            </div>
          </div>
          <footer>
            <button type="button" class="online-check-btn">联网审查</button>
          </footer>
        </div>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);
