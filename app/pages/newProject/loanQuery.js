import React from 'react';
import {Component}from '../../components/libs'
import * as homeActions from '../../actions/home';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {Map} from 'immutable';
import {Form,Input,Layout,Radio,Icon,Collapse,Steps} from "../../components/index";

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
		const activeName = "1";
		return(
			<div>
				{this.state.isShow==false?
					<div class="tab1">
						<div class="contanterBox">	
							<div class="titleBox">
								<div class="greenfonts">
									待办列表
								</div>
							</div>
							<div class="listRediao">
								<Layout.Row gutter="24">
							       <Layout.Col span="20">
								      	<div className="grid-content bg-purple">
								      		<Form labelPosition="left" model={this.state.form} labelWidth="80" onSubmit={this.onSubmit.bind(this)}>
			            					    <Form.Item label="贷款状态">
			                                        <Radio.Group value={this.state.radio1} >
			                                            <Radio.Button value="全部状态" />
			                                            <Radio.Button value="已受理" />
			                                            <Radio.Button value="已审批" />
			                                            <Radio.Button value="已审核" />
			                                            <Radio.Button value="已放款" />
			                                            <Radio.Button value="已拒绝" />

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
							<div class="listRediao">
						      	<div className="grid-content bg-purple">
						      		<Form labelPosition="left" model={this.state.form} labelWidth="80" onSubmit={this.onSubmit.bind(this)}>
	            					    <Form.Item label="查询日期">
	                                        <Radio.Group value={this.state.radio1} >
	                                            <Radio.Button value="当日" />
	                                            <Radio.Button value="昨日" />
	                                            <Radio.Button value="本周" />
	                                            <Radio.Button value="本月" />
	                                            <Radio.Button value="近三个月" />
	                                            <Radio.Button value="选择区间" />
	                                        </Radio.Group>
	                                    </Form.Item>
			                        </Form>
						      	</div>
							</div>
							<ul class="writeList1">
								<li>
									<Collapse value={activeName} accordion>
										<Collapse.Item title={
												<Layout.Row gutter="24">
											       <Layout.Col span="2">
											       		<div className="grid-content bg-purple">
															<div class="box1">
																<img src={require("./img/icon1.png")} />
												       			<p class="greenfonts">
												       				已放款
												       			</p>
															</div>
											       		</div>
											       </Layout.Col>
												   <Layout.Col span="19">
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
												    <Layout.Col span="3">
										        		<div class="collapse_icon4">
										        			<p>
											        			2.18.3.19
											        		</p>
											        		<p>
											        			<i className="mmspc-collapse-item__header__arrow_180 mmspc-icon-arrow-down" />
											        		</p>
										        		</div>
												    </Layout.Col>
											   </Layout.Row>
											} name="1">
											<div>
										 	<div class="stepsBoxs">
										 		<Steps space={200} active={2}>
											   
													 <Steps.Step title="已完成贷款受理" description="2018.03.20 17:15" titleStyle = {{fontWeight:500,fontSize:14}}
													  checkedImage={<img style={{width:24,height:24}} src={require('../../images/step_1_checked.png')}/>}
  														 uncheckedImage={<img style={{width:24,height:24}} src={require('../../images/step_1_unchecked.png')}/>}>
  													 </Steps.Step>
  													
													 <Steps.Step title="已完成贷款受理" description="2018.03.20 17:15" titleStyle = {{fontWeight:500,fontSize:14}}
													  checkedImage={<img style={{width:24,height:24}} src={require('../../images/step_2_unchecked.png')}/>}
  														 uncheckedImage={<img style={{width:24,height:24}} src={require('../../images/step_2_unchecked.png')}/>}>
  													 </Steps.Step>

													 <Steps.Step title="已完成贷款受理" description="2018.03.20 17:15" titleStyle = {{fontWeight:500,fontSize:14}}
													  checkedImage={<img style={{width:24,height:24}} src={require('../../images/step_3_unchecked.png')}/>}
  														 uncheckedImage={<img style={{width:24,height:24}} src={require('../../images/step_3_unchecked.png')}/>}>
  													 </Steps.Step>
														<Steps.Step title="已完成贷款受理" description="2018.03.20 17:15" titleStyle = {{fontWeight:500,fontSize:14}}
													  checkedImage={<img style={{width:24,height:24}} src={require('../../images/step_finish_checked.png')}/>}
  														 uncheckedImage={<img style={{width:24,height:24}} src={require('../../images/step_finish_unchecked.png')}/>}>
  													 </Steps.Step>



											    </Steps>
										 	</div>
										 </div>
	      								</Collapse.Item>
	      								<Collapse.Item title={
												<Layout.Row gutter="24">
											       <Layout.Col span="2">
											       		<div className="grid-content bg-purple">
															<div class="box1">
																<img src={require("./img/icon1.png")} />
												       			<p class="greenfonts">
												       				已放款
												       			</p>
															</div>
											       		</div>
											       </Layout.Col>
												   <Layout.Col span="19">
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
												    <Layout.Col span="3">
										        		<div class="collapse_icon4">
										        			<p>
											        			2.18.3.19
											        		</p>
											        		<p>
											        			<i className="mmspc-collapse-item__header__arrow_180 mmspc-icon-arrow-down" />
											        		</p>
										        		</div>
												    </Layout.Col>
											   </Layout.Row>
											} name="2">
											<div>
										 	<div class="stepsBoxs">
										 		<Steps space={200} active={2}>
											   
													 <Steps.Step title="已完成贷款受理" description="2018.03.20 17:15" titleStyle = {{fontWeight:500,fontSize:14}}
													  checkedImage={<img style={{width:24,height:24}} src={require('../../images/step_1_checked.png')}/>}
  														 uncheckedImage={<img style={{width:24,height:24}} src={require('../../images/step_1_unchecked.png')}/>}>
  													 </Steps.Step>
  													
													 <Steps.Step title="已完成贷款受理" description="2018.03.20 17:15" titleStyle = {{fontWeight:500,fontSize:14}}
													  checkedImage={<img style={{width:24,height:24}} src={require('../../images/step_2_unchecked.png')}/>}
  														 uncheckedImage={<img style={{width:24,height:24}} src={require('../../images/step_2_unchecked.png')}/>}>
  													 </Steps.Step>

													 <Steps.Step title="已完成贷款受理" description="2018.03.20 17:15" titleStyle = {{fontWeight:500,fontSize:14}}
													  checkedImage={<img style={{width:24,height:24}} src={require('../../images/step_3_unchecked.png')}/>}
  														 uncheckedImage={<img style={{width:24,height:24}} src={require('../../images/step_3_unchecked.png')}/>}>
  													 </Steps.Step>
														<Steps.Step title="已完成贷款受理" description="2018.03.20 17:15" titleStyle = {{fontWeight:500,fontSize:14}}
													  checkedImage={<img style={{width:24,height:24}} src={require('../../images/step_finish_checked.png')}/>}
  														 uncheckedImage={<img style={{width:24,height:24}} src={require('../../images/step_finish_unchecked.png')}/>}>
  													 </Steps.Step>



											    </Steps>
										 	</div>
										 </div>
	      								</Collapse.Item>
      								</Collapse>
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