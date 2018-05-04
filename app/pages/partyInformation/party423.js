import React from 'react';
import {Component}from '../../components/libs'
import * as homeActions from '../../actions/home';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {Map} from 'immutable';
// import Head from '../../ma-ui/Head'
import {Link}  from 'react-router-dom';
// import TabTitle from '../../components/src/TabTitle'
// import {  Form, Icon, Input, Button, Checkbox } from 'antd';
// import 'antd/dist/antd.css';
// import 'element-theme-default';
// import { Form,Input,Button,Layout,Tabs,Select } from 'element-react';
import {Form,Input,Button,Layout,Tabs,Select,TabTitle,Head,Dialog,Radio,SelectList} from "../../components/index";

import '../publicCss/public.css'
// import '../loanInformation/style/loan.css'
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
			form:{
				name: '',
		        region: '',
		        date1: null,
		        date2: null,
		        delivery: false,
		        type: [],
		        resource: '',
		        desc: ''
			},
			isShow:false,
			types:'配偶',
			selectDialogVisible:false,
			list:['配偶','子女','父母','祖父母','兄弟','姐妹',"测试1","测试2"],
			selectKey:''
		}
	}
	onSubmit(e) {
	    e.preventDefault();
	}

	// onChange(key, value) {
	// 	console.log(key)
	// 	console.log(value)

	    // this.state.form[key] = value;
	    // this.forceUpdate();
	// }
	 // var a = [1,4,6,43,5,9,0,23,45];
	 //替换当前位置
 	seatChange(arr,k,j) {
        var c = arr[k];
        arr[k] = arr[j];
        arr[j] = c;
        console.log(arr);
    }
    // console.log(a.length);
    // change(a,3,a.length-1);
	onChange(key, value) {
		this.setState({
            [key]: value,
        });
        ((value=="更多")&&(key=="types"))?this.setState({selectDialogVisible:true}): this.setState({selectDialogVisible:false})
		console.log(this.state.selectKey)
       
    }
	 onIsShow = () =>{
	    this.setState({
	        isShow:!this.state.isShow,
		})
	}
	render(){
 		let that = this ;
 		let showLength=4;
		return(
			<div style={{height:window.innerHeight-this.getHeight(100)}}>
				{this.state.isShow==false?
					<div class="showTab1" >
					    <div class="main_contanier">
			             	{/*<TabTitle title="证件信息" class="tabTitle orangeTabTitle"/>
			            	<div class="form_content">
			            		<div class="three_box">
			            			<div class="three_child_lf">
			            				<Form labelPosition="left" model={this.state.form} labelWidth="80" onSubmit={this.onSubmit.bind(this)}>
		            					    <Form.Item label="证件类型">
		                                        <Radio.Group value={this.state.radio3} onChange={this.onChange.bind(this, 'radio3')}>
		                                            <Radio.Button value="身份证" />
		                                          </Radio.Group>
		                                    </Form.Item>
		            					    <Form.Item label="证件号码">
		                                        <Input  size="small" value={this.state.form.name} onChange={this.onChange.bind(this, 'name')}></Input>
		                                    </Form.Item>
		                                    <Form.Item label="客户姓名">
		                                        <Input  size="small" value={this.state.form.name} onChange={this.onChange.bind(this, 'name')}></Input>
		                                    </Form.Item>
			            				</Form>
			            			</div>
		            				<div class="three_child_rt">
										<ul class="img_box">
											<li>
												<img src={require("./img/img.png")}  />
												<p>请上传身份证头像面</p>
											</li>
											<li>
												<img src={require("./img/img.png")}  />
												<p>请上传身份证头像面</p>
											</li>

										</ul>
					            	</div>
			            		</div>
			            		<div class="three_box_rt">
									<div>
										<input type="button" class="grayButton" value="联网核查"/>

									</div>
			            		</div>	
			            	</div>
			             	<TabTitle title="征信授权" class="tabTitle blueTabTitle"/>
			             	<div class="form_content">
			             		<div class="three_child_rt">
									<ul class="img_box">
										<li>
											<img src={require("./img/face_recognition.png")}  />
											<p>请上传身份证头像面</p>
										</li>
										<li>
											<img src={require("./img/credit_authorizatio.png")}  />
											<p>请上传身份证头像面</p>
										</li>


									</ul>
				            	</div>
				            	<div class="three_box_rt">
									<div>
										<input type="button" class="grayButton" value="联网核查"/>

									</div>
			            		</div>	
			             	</div>
							<TabTitle title="征信报告" class="tabTitle greenTabTitle"/>
							*/}
							<div class="form_content">
			             		<div class="three_child_rt">
									<ul class="img_box">
										<li>
											<img src={require("./img/credit_certificate.png")}  />
											<p>请上传身份证头像面</p>
										</li>
										<li>
										</li>
									</ul>
				            	</div>
				            	<div class="three_box_rt">
			            		</div>	
			             	</div>
							<TabTitle title="基本信息" class="tabTitle grayTabTitle"/>
							<Form labelPosition="left" model={this.state.form} labelWidth="120" onSubmit={this.onSubmit.bind(this)}>
								<div class="form_content_col">
									<ul class="form_content_row">
		                                <li class="form_lf">
		                                	<Form.Item label="关系人类型">
		                                        <Radio.Group value={this.state.typess} onChange={this.onChange.bind(this, 'typess')} >
		                                            <Radio.Button value="配偶" />
		                                            <Radio.Button value="子女" />
		                                            <Radio.Button value="父母" />
		                                            <Radio.Button value="祖父母" />
		                                            <Radio.Button value="兄弟姐妹" />
		                                            <Radio.Button value="更多" />
		                                          </Radio.Group>
		                                    </Form.Item>
		                                 </li>
		                                <li class="form_rt">  
											<Form.Item label="关系人角色">
		                                        <Radio.Group value={this.state.radio3} onChange={this.onChange.bind(this, 'radio3')}>
		                                            <Radio.Button value="借款人配偶" />
		                                            <Radio.Button value="共同借款人" />
		                                            <Radio.Button value="待定" />
		                                          </Radio.Group>
		                                    </Form.Item>
		                               </li>
		                            </ul> 
								    {this.state.selectKey}

		                           <Dialog
								        size="small"
								        visible={ this.state.selectDialogVisible }
								        title='对话框'
								        onCancel={ () => this.setState({ selectDialogVisible: false}) }
								        lockScroll={ false }
								        className='mmpsc-select-list-dialog'
								    >
								    	<Dialog.Body>
								          <SelectList value={this.state.types} multiple={false} onChange={(val)=>{
								                console.log(val)
								                  this.state.list.map(function(item,i){
								                  	if(val==item){
								                  		that.setState({selectKey:i,selectDialogVisible: false})
														that.seatChange(that.state.list,showLength,i);
														that.setState({types:val})
								                  	}
								                  })
												

								                // this.setState({selectedValue: val, selectDialogVisible: false })
								              }}>
								            {
								              this.state.list.map(function(item,i){
								                return i>showLength? <SelectList.Option key={i} label={item} value={item} /> :''
								              })
								            }
								            
								          </SelectList>
								        </Dialog.Body>
								    </Dialog>
		                            <ul class="form_content_row">
		                                <li class="form_lf">
		                                	<Form.Item label="文化程度">
		                                        <Radio.Group value={this.state.types} onChange={this.onChange.bind(this, 'types')}>
													{
														this.state.list.map(function(item,i){
															return(
																i<showLength+1?
																<Radio.Button key={i} value={item} /> :''
															)
														})

													}
													<Radio.Button value="更多" />
		                                       </Radio.Group>
		                                    </Form.Item>
		                                </li>
		                                 <li class="form_rt">  
											<Form.Item label="婚姻状况">
		                                        <Radio.Group value={this.state.radio3} onChange={this.onChange.bind(this, 'radio3')}>
		                                            <Radio.Button value="已婚" />
		                                            <Radio.Button value="未婚" />
		                                            <Radio.Button value="离异" />
		                                            <Radio.Button value="丧偶" />
		                                          </Radio.Group>
		                                    </Form.Item>
										 </li>
		                            </ul>
		                            <ul class="form_content_row">
		                             	<li class="form_lf">
		                             		<Form.Item label="手机号码">
		                                      <Input  size="small" value={this.state.form.name} onChange={this.onChange.bind(this, 'name')}></Input>
		                                    </Form.Item>
		                             	</li>
		                             	<li class="form_rt">
		                                    <Form.Item label="本人年税后收入">
		                                      <Input  size="small" value={this.state.form.name} onChange={this.onChange.bind(this, 'name')}></Input>
		                                    </Form.Item>
		                             	</li>
		                            </ul>
								</div>
		                    </Form>
			            </div>
			             <div class="loan_footer">
		                    <div class="footer_content" >
		                        <div class="footer_content_lf">
		                            <Button plain={true} type="info" size="large" onClick={this.onIsShow}>信息补录</Button>
		                        </div>
		                         <div class="footer_content_rt">
		                              <Button type="warning" size="large">新增关系人</Button>
		                        </div>
		                    </div>
		                </div>
					</div>
					:
					<div class="showTab2">	
						<div class="main_contanier">
							<Tabs activeName="1" onTabClick={(tab) => console.log(tab.props.name) }>
	                            <Tabs.Pane label="合作品种编号" name="1">
									<Form labelPosition="left"  model={this.state.form} labelWidth="170" onSubmit={this.onSubmit.bind(this)}>
			                               <div class="form_content">
			                                    <div class="form_lf">
			                                        <Form.Item label="国家">
			                                           <Input value={this.state.form.name} onChange={this.onChange.bind(this, 'name')}></Input>
			                                        </Form.Item>
				                                    <Form.Item label="性别">
				                                         <Radio.Group value={this.state.radio3} onChange={this.onChange.bind(this, 'radio3')}>
				                                            <Radio.Button value="女" />
				                                            <Radio.Button value="男" />
				                                        </Radio.Group>
				                                    </Form.Item>
			                                          <Form.Item label="出生日期">
			                                           <Input value={this.state.form.name} onChange={this.onChange.bind(this, 'name')}></Input>
			                                        </Form.Item>
				                                    <Form.Item label="职业经营类别">
					                                     <Radio.Group value={this.state.radio3} onChange={this.onChange.bind(this, 'radio3')}>
					                                        <Radio.Button value="工薪供职" />
					                                        <Radio.Button value="个体私营" />
					                                        <Radio.Button value="农业经营" />
					                                        <Radio.Button value="学生" />
					                                    </Radio.Group>
				                                    </Form.Item>
				                                    <Form.Item label="职业经营类别">
				                                         <Radio.Group value={this.state.radio3} onChange={this.onChange.bind(this, 'radio3')}>
				                                            <Radio.Button value="父母同住" />
				                                            <Radio.Button value="集体宿舍" />
				                                            <Radio.Button value="租住" />
				                                            <Radio.Button value="共有住宅" />
				                                            <Radio.Button value="其他" />
				                                            <Radio.Button value="更多" />
				                                        </Radio.Group>
				                                    </Form.Item>
			                                        <Form.Item label="本地居住年限">
			                                           <Input value={this.state.form.name} onChange={this.onChange.bind(this, 'name')}></Input>
			                                        </Form.Item>
			                                        <Form.Item label="长期居住地地址">
			                                           <Input value={this.state.form.name} onChange={this.onChange.bind(this, 'name')}></Input>
			                                        </Form.Item>
			                                    </div>
			                                    <div class="form_rt">
			                                  		<Form.Item label="证件类型">
			                                           <Input value={this.state.form.name} onChange={this.onChange.bind(this, 'name')}></Input>
			                                        </Form.Item>
			                                        <Form.Item label="是否长期有效">
			                                             <Radio.Group value={this.state.radio3} onChange={this.onChange.bind(this, 'radio3')}>
			                                                <Radio.Button value="是" />
			                                                <Radio.Button value="否" />
			                                            </Radio.Group>
			                                        </Form.Item>
			                                        <Form.Item label="证件有效终止日">
			                                           <Input value={this.state.form.name} onChange={this.onChange.bind(this, 'name')}></Input>
			                                        </Form.Item>
			                                        <Form.Item label="是否本地常住户口">
			                                             <Radio.Group value={this.state.radio3} onChange={this.onChange.bind(this, 'radio3')}>
			                                                <Radio.Button value="是" />
			                                                <Radio.Button value="否" />
			                                            </Radio.Group>
			                                        </Form.Item>
			                                        <Form.Item label="是否本地户籍">
			                                         <Radio.Group value={this.state.radio3} onChange={this.onChange.bind(this, 'radio3')}>
			                                            <Radio.Button value="是" />
			                                            <Radio.Button value="否" />
			                                        </Radio.Group>
				                                    </Form.Item>
			                                         <Form.Item label="是否农行员工">
			                                             <Radio.Group value={this.state.radio3} onChange={this.onChange.bind(this, 'radio3')}>
			                                                <Radio.Button value="是" />
			                                                <Radio.Button value="否" />
			                                            </Radio.Group>
			                                        </Form.Item>
			                                        <Form.Item label="是否私人银行客户">
			                                             <Radio.Group value={this.state.radio3} onChange={this.onChange.bind(this, 'radio3')}>
			                                                <Radio.Button value="是" />
			                                                <Radio.Button value="否" />
			                                            </Radio.Group>
			                                        </Form.Item>
			                                        <Form.Item label="是否有共同借款人">
			                                             <Radio.Group value={this.state.radio3} onChange={this.onChange.bind(this, 'radio3')}>
			                                                <Radio.Button value="是" />
			                                                <Radio.Button value="否" />
			                                            </Radio.Group>
			                                        </Form.Item>
			                                 		<Form.Item label="长期居住地城乡属性">
			                                           <Input value={this.state.form.name} onChange={this.onChange.bind(this, 'name')}></Input>
			                                        </Form.Item>

			                                    </div>
			                                </div>
			                        </Form>
			                    </Tabs.Pane>
			                </Tabs>
			            </div>
					</div>
				}
			</div>	
		)
	}
}
export default connect (mapStateToProps,mapDispatchToProps)(Party); 