import React, { Component } from 'react';
import './style/home.css';
import * as homeActions from '../../actions/home';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {Map} from 'immutable';
import Banner from './../commonComponents/banner/banner.js'
import {Link}  from 'react-router-dom';
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
            <Banner/>
            <div class="gray-bg">
              <div class="base-info-title">
                <span>基本信息</span>
              </div>
              <div class="base-info-box">
                <div class="container-fluid" style={{position:'relative'}}>
                  <div class="row">
                    <span class="text-left">业务名称</span>
                    <select class="input-left">
                      <option>请选择</option>
                      <option>一手房贷款</option>
                    </select>
                    <div class="select-icon">
                      <img src={require("../../images/triangle_down.png")}/>
                    </div>
                    <span class="text-right">证件类型</span>
                    <input class="input-right" value="身份证" disabled/>
                    <button class="read-id"
                            style = {{background:`url(${require("../../images/duqushenfenzheng.png")}) no-repeat`}}
                            onClick={()=>this.props.homeActions.showIdCard("inline")}
                        >
                      <p>读取</p>
                      <p>身份证</p>
                    </button>
                  </div>
                  <div class="row">
                    <span class="text-left">证件号码</span>
                    <input class="input-left" placeholder="请输入证件号码" value=""/>
                    <span class="text-right">客户姓名</span>
                    <input class="input-right" placeholder="请输入客户姓名" value=""/>
                  </div>
                </div>
              </div>
              <div class="base-info-title">
                <span>证件信息</span>
              </div>
              <div class="id-info-box">
                <div class="id-front-div">
                  <div class="id-front-img" style ={{background:`url(${require("../../images/certificate_front.png")}) no-repeat`}}>
                    <img src={require("../../images/camera.png")}/>
                  </div>
                  <p>请上传身份证头像面照片</p>
                </div>
                <div class="id-back-div">
                  <div class="id-back-img" style ={{background:`url(${require("../../images/certificate_back.png")}) no-repeat`}}>
                    <img src={require("../../images/camera.png")}/>
                  </div>
                  <p>请上传身份证国徽面照片</p>
                </div>
                <div class="id-text-div">
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
        <Link to="check" type="button"
                class="online-check-btn"
                style ={{background:`url(${require("../../images/button_green.png")}) no-repeat`}}>
          联网审查
        </Link>
         </footer>
        </div>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);
