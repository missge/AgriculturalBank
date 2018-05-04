import React from 'react';
import {Component}from '../../components/libs'
import * as homeActions from '../../actions/home';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {Map} from 'immutable';
import {Form,Input,Layout,Radio,Icon} from "../../components/index";

import './style/style.css'
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
class Party extends Component{
	constructor(props){
		super(props);
		this.state={
			form:{},
			radio1:'全部业务',
			isShow:false
		}
	}
	onSubmit(e) {
  	  e.preventDefault();
	}
	onIsShow = () =>{
	    this.setState({
	        isShow:!this.state.isShow
		})
	}
	render(){
		return(
			<div>
				{this.state.isShow==false?
					<div class="tab1">
						<div class="contanterBox">	
							<div class="titleBox">
								<div class="greenfonts">
									待办列表
								</div>
								<div class="titleBoxrt">
									当前共<span class="redfonts">3</span>笔代办业务
								</div>
							</div>
							<div class="listRediao">
								<Layout.Row gutter="24">
							       <Layout.Col span="20">
								      	<div className="grid-content bg-purple">
								      		<Form labelPosition="left" model={this.state.form} labelWidth="80" onSubmit={this.onSubmit.bind(this)}>
			            					    <Form.Item label="业务品种">
			                                        <Radio.Group value={this.state.radio1} >
			                                            <Radio.Button value="全部业务" />
			                                            <Radio.Button value="一手房贷款" />
			                                            <Radio.Button value="二手房贷款" />
			                                            <Radio.Button value="一手农民安家贷" />
			                                            <Radio.Button value="二手农民安家贷" />
			                                        </Radio.Group>
			                                    </Form.Item>
					                        </Form>
								      	</div>
							       </Layout.Col>
							       <Layout.Col span="4">
								      	<div className="grid-content bg-purple">
											<div onClick={this.onIsShow} class="search_bg_box">
												<img src={require("./img/search.png")} />
												<span>搜索</span>
												<i className="mmspc-icon-search"></i>

											</div>
								      	</div>
							      	</Layout.Col>
							    </Layout.Row>
							</div>
							<ul class="writeList">
								<li>
									<Layout.Row gutter="24">
								       <Layout.Col span="2">
								       		<div className="grid-content bg-purple">
												<div class="box1">
													<img src={require("./img/icon1.png")} />
									       			<p class="greenfonts">
									       				已完成25%
									       			</p>
												</div>
								       		</div>
								       </Layout.Col>
									   <Layout.Col span="18">
									   		<div className="grid-content bg-purple">
												<Layout.Row gutter="24">
											        <Layout.Col span="8">
										        		<ul className="grid-content bg-purple box2">
										        			<li>
										        				客户姓名：<span>关小明</span>
										        			</li>
										        			<li>
										        				证件号码：<span>100110198801011234</span>
										        			</li>
										        		</ul>
										        	</Layout.Col>
											         <Layout.Col span="8">
										        		<ul className="grid-content bg-purple box2">
										        			<li>
										        				业务品种：<span>一手房贷款</span>
										        			</li>
										        			<li>
										        				项目名称：<span>万达丰台项目</span>
										        			</li>
										        		</ul>
										        	</Layout.Col>
										        	 <Layout.Col span="8">
										        		<ul className="grid-content bg-purple box2">
										        			<li>
										        				办理进度：<span>借款人信息录入未完成</span>
										        			</li>
										        			<li>
										        				申请日期：<span>2018.03.19 09:30</span>
										        			</li>
										        		</ul>
										        	</Layout.Col>
											        
											    </Layout.Row>
												
									   		</div>
									    </Layout.Col>
									    <Layout.Col span="2">
									   		<div className="grid-content bg-purple">
												<div class="box1">
													<img src={require("./img/icon2.png")} />
									       			<p class="redfonts">
									       				终止贷款
									       			</p>
												</div>
									 		</div>
									    </Layout.Col>
									    <Layout.Col span="2">
									   		<div className="grid-content bg-purple">
									   		 	<div class="box1">
													<img src={require("./img/icon3.png")} />
									       			<p class="greenfonts">
									       				继续办理
									       			</p>
												</div>
									   		</div>
									   	</Layout.Col>
								   </Layout.Row>
								</li>
									<li>
									<Layout.Row gutter="24">
								       <Layout.Col span="2">
								       		<div className="grid-content bg-purple">
												<div class="box1">
													<img src={require("./img/icon1.png")} />
									       			<p class="greenfonts">
									       				已完成25%
									       			</p>
												</div>
								       		</div>
								       </Layout.Col>
									   <Layout.Col span="18">
									   		<div className="grid-content bg-purple">
												<Layout.Row gutter="24">
											        <Layout.Col span="8">
										        		<ul className="grid-content bg-purple box2">
										        			<li>
										        				客户姓名：<span>关小明</span>
										        			</li>
										        			<li>
										        				证件号码：<span>100110198801011234</span>
										        			</li>
										        		</ul>
										        	</Layout.Col>
											         <Layout.Col span="8">
										        		<ul className="grid-content bg-purple box2">
										        			<li>
										        				业务品种：<span>一手房贷款</span>
										        			</li>
										        			<li>
										        				项目名称：<span>万达丰台项目</span>
										        			</li>
										        		</ul>
										        	</Layout.Col>
										        	 <Layout.Col span="8">
										        		<ul className="grid-content bg-purple box2">
										        			<li>
										        				办理进度：<span>借款人信息录入未完成</span>
										        			</li>
										        			<li>
										        				申请日期：<span>2018.03.19 09:30</span>
										        			</li>
										        		</ul>
										        	</Layout.Col>
											        
											    </Layout.Row>
												
									   		</div>
									    </Layout.Col>
									    <Layout.Col span="2">
									   		<div className="grid-content bg-purple">
												<div class="box1">
													<img src={require("./img/icon2.png")} />
									       			<p class="redfonts">
									       				终止贷款
									       			</p>
												</div>
									 		</div>
									    </Layout.Col>
									    <Layout.Col span="2">
									   		<div className="grid-content bg-purple">
									   		 	<div class="box1">
													<img src={require("./img/icon3.png")} />
									       			<p class="greenfonts">
									       				继续办理
									       			</p>
												</div>
									   		</div>
									   	</Layout.Col>
								   </Layout.Row>
								</li>
							</ul>
						</div>
					</div>
					:
					<div class="tab2">
						<div class="search_box">
						    <Layout.Row gutter="24">
								<Layout.Col span="2">
									<div class="serarch_box_lf" onClick={this.onIsShow}>
										<i className="mmspc-icon-arrow-left"></i>
									</div>
								</Layout.Col>
								<Layout.Col span="20">
									<Input placeholder="请输入内容" />
								</Layout.Col>
								<Layout.Col span="2">
									<div class="serarch_box_rt">搜索</div>
								</Layout.Col>
						    </Layout.Row>
						</div>
						<div class="search_result">
							<h3 class="search_title" >
								<span>
									搜索记录
								</span>
								<i className="mmspc-icon-delete"></i>
							</h3>
							<ul class="search-hotkey">
								<li>
									关小明
								</li>
								<li>
									关小明
								</li>
							</ul>
						</div>
					</div>
				}
			</div>
		)
	}
}
export default connect (mapStateToProps,mapDispatchToProps)(Party); 