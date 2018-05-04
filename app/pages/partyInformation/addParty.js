import React from 'react';
import {Component}from '../../components/libs'
import * as homeActions from '../../actions/home';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {Map} from 'immutable';
import {Link}  from 'react-router-dom';
import {Head,TabTitle,Radio} from "../../components/index";
import '../publicCss/public.css'
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
class addParty extends Component{
	constructor(props){
		super(props);
		this.state={
		
		}
	}

	render(){
		return(
			<div  style={{height:window.innerHeight-this.getHeight(100)}}>
				<div class="main_contanier scrollauto">
					<TabTitle title="关系人信息" class="tabTitle blueTabTitle"/>
					<div class="form_content">
						<ul class="addParty_box">
							<li>
								<ul class="addParty_title">
									<li>
										<span class="addParty_title_key">
											姓名：
										</span>
										<span class="addParty_title_value">
											关小明
										</span>
									</li>
									<li>
										<span class="addParty_title_key">
											证件号码：
										</span>
										<span class="addParty_title_value">
											100101001010101010000
										</span>
									</li>
									<li>
										<span class="addParty_title_key">
											角色：
										</span>
										<span class="addParty_title_value">
											借款人配偶
										</span>
									</li>
									<li >
										<span class="addParty_title_key">
											类型：
										</span>
										<span class="addParty_title_value">
										  配偶
										</span>
									</li>
								</ul>
								<div class="addParty_footer">
									<span class="greenFont">
										已信息核查
									</span>
									<span class="grayFont">
										未征信查询
									</span>
								</div>
							</li>
							<div class="addcontact">
								<div>
									<img src={require("./img/add.png")} width="58px" height="58px" />
									<p>新增关系人</p>
								</div>
							</div>
						</ul>
					</div>
				</div>	
			</div>	

		)
	}
}
export default connect (mapStateToProps,mapDispatchToProps)(addParty); 