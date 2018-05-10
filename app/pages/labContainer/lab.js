import React from 'react';
import {Component} from '../../components/libs';

import './style/index.css';
import {connect} from 'react-redux';
import {Map} from 'immutable';
import {Link}  from 'react-router-dom';
import {Form,Input,Layout,Tabs,Select,DatePicker,Dialog,Radio,Button,
  TabTitle, Loading,Steps,SelectList,MessageBox,Message,InputNumber,Footer,Collapse,ImageViewer } from '../../components';
const style = {
    margin: 12,
};
const activeName = "1";
class Lab extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      value:0,
      value1:0,
      value2: null,
      radio3: '一手房贷款',
      options: [{
        value: '选项1',
        label: '工薪'
      }, {
        value: '选项2',
        label: '个体'
      }, {
        value: '选项3',
        label: '务农'
      }, {
        value: '选项4',
        label: '待业'
      }],
      selectedValue: '',
      dialogVisible: false,
      form: {
        name: '',
        date1:null,
        date2:null
      },
      rules: {
        name: [
          { required: true, message: '请录入信息', trigger: 'blur' }
        ]
      },
      isLoading:false,
      options2: [{
        value: '选项1',
        label: '工薪'
      }, {
        value: '选项2',
        label: '个体'
      }, {
        value: '选项3',
        label: '务农'
      }, {
        value: '选项4',
        label: '待业'
      }],
      selectedValue2: '选项2',
      selectDialogVisible: false,
    }
  }
  render() {
      var iconList = ["客户信息核查","客户征信查询","借款人信息录入","关系人信息录入","贷款人信息录入","押品信息录入","申请表生成","影像采集","贷款报告调查"];
      var listValue =[0,2,0,1,0,1,0,1,0];
      const value1={};
    return (

      <Loading text='身份证读取中...' loading={this.state.isLoading} style={{background:'#0000'}} >
      
      <div style={{height:window.innerHeight-this.getHeight(100)}}>
    <div className='container' >
      <div className='block'>
        <Button type='primary' size='large' >点击</Button>
      </div>
    <div>
      <Button>默认按钮</Button>
      <Button type="primary">主要按钮</Button>
      <Button type="text">文字按钮</Button>
    </div>
    <div className='block'>
      <Input
        type="textarea"
        autosize={{ minRows: 2, maxRows: 4}}
        placeholder="请输入内容"
      />
    </div>
      <div className='block'>
        <Input placeholder="请输入内容" append={<Button type="primary" icon="search">搜索</Button>} />
      </div>
      <div className='block'>
        <Radio.Group value={this.state.radio3} onChange={this.onChange.bind(this, 'radio3')}>
        <Radio.Button value="一手房贷款" />
        <Radio.Button value="二手房贷款" />
        <Radio.Button value="一手农民安家贷" />
        <Radio.Button value="二手农民安家贷" />
        <Radio.Button value="一手农安家贷1" />
        <Radio.Button value="二手安家贷2" />
        <Radio.Button value="一手农民安家贷34" />
        <Radio.Button value="二手农民安家贷4" />
        <Radio.Button value="一手农民安家贷5" />
        <Radio.Button value="二手家贷" />
      </Radio.Group>
      </div>
    <div className='block'>
      <Button type="text" onClick={this.onMesageBoxClick.bind(this)}>点击打开 Message Box</Button>
      <Button type="text" onClick={this.onImageViewClick.bind(this)}>点击查看图片</Button>
      <Button type="text" onClick={this.open.bind(this)}>打开消息提示</Button>
      <Button type="text" onClick={ () => this.setState({ dialogVisible: true }) }>点击打开 Dialog</Button>
      <Button type="text" onClick={ () => this.setState({ selectDialogVisible: true }) }>点击打开选择Dialog</Button>
      <span style={{marginLeft:10}}>选择Dialog结果:{this.state.selectedValue2}</span>
      <Dialog
        size="tiny"
        visible={ this.state.dialogVisible }
        title='对话框'
        onCancel={ () => this.setState({ dialogVisible: false }) }
        lockScroll={ false }
      >
        <Dialog.Body style={{height:200}}>
          <span >这是一段信息</span>
        </Dialog.Body>
        <Dialog.Footer className="dialog-footer">
          <Button onClick={ () => this.setState({ dialogVisible: false }) }>取消</Button>
          <Button type="primary" onClick={ () => this.setState({ dialogVisible: false }) }>确定</Button>
        </Dialog.Footer>
      </Dialog>
      <Dialog
        size="small"
        visible={ this.state.selectDialogVisible }
        title='对话框'
        onCancel={ () => this.setState({ selectDialogVisible: false }) }
        lockScroll={ false }
        className='mmpsc-select-list-dialog'
      >
        <Dialog.Body>
          <SelectList value={this.state.selectedValue2} multiple={false} onChange={val=>{
                console.debug('SelectList changed: ', val)
                this.setState({selectedValue2: val, selectDialogVisible: false })
              }}>
            {
              this.state.options2.map(option => {
                return <SelectList.Option key={option.value} label={option.label} value={option.value} />
              })
            }
          </SelectList>
        </Dialog.Body>
      </Dialog>
    </div>
      <div className='block'>        
      <Tabs activeName="2" onTabClick={ (tab) => console.log(tab.props.name) }>
        <Tabs.Pane label="贷款基本信息" name="1">贷款基本信息</Tabs.Pane>
        <Tabs.Pane label="贷款房屋信息" name="2">贷款房屋信息</Tabs.Pane>
        <Tabs.Pane label="押品基本信息" name="3">押品基本信息</Tabs.Pane>
        <Tabs.Pane label="押品评估信息" name="4">押品评估信息</Tabs.Pane>
      </Tabs>
      </div>
      <div className='block'>
        <Button.Group>
          <Button type="primary" icon="arrow-left">上一页</Button>
          <Button type="primary">下一页<i className="mmspc-icon-arrow-right mmspc-icon-right"></i></Button>
        </Button.Group>
      </div>
      <div  className='block'>
        <Button.Group>
          <Button type="primary" icon="edit"></Button>
          <Button type="primary" icon="share"></Button>
          <Button type="primary" icon="delete"></Button>
        </Button.Group>
      </div>
      <div className='block'>
        <Button type="primary" loading={true}>加载中</Button>
      </div>
      <div className="block">
        <span className="demonstration">默认</span>
        <DatePicker
          value={this.state.value1}
          placeholder="选择日期"
          onChange={date=>{
            console.debug('DatePicker1 changed: ', date)
            this.setState({value1: date})
          }}
          disabledDate={time=>time.getTime() < Date.now() - 8.64e7}
          />
      </div>
      <div className='block'>
      <InputNumber defaultValue={this.state.value} onChange={this.onChange.bind(this)} min="1" max="10"></InputNumber>
      </div>
      
      <div className='block'>
        <i className="mmspc-icon-edit"></i>
        <i className="mmspc-icon-share"></i>
        <i className="mmspc-icon-delete"></i>
        <Button type="primary" icon="search">搜索</Button>
      </div>
    
      <div className='block'>
      <Select value={this.state.selectedValue}>
        {
          this.state.options.map(option => {
            return <Select.Option key={option.value} label={option.label} value={option.value} />
          })
        }
      </Select>
      </div> 
    <div className='block'style={{background:'#EEE'}} >
      <Form ref="form" model={this.state.form} rules={this.state.rules} labelWidth="80" onSubmit={this.onSubmit.bind(this)}>
        <Form.Item label="录入信息" prop="name">
          <Input value={this.state.form.name} onChange={this.onFormChange.bind(this, 'name')}></Input>
        </Form.Item>
        
      <Form.Item label="起止日期">
        <Layout.Col span="11">
          <Form.Item prop="date1" labelWidth="0px">
            <DatePicker
              value={this.state.form.date1}
              placeholder="选择日期"
              onChange={this.onFormChange.bind(this, 'date1')}
            />
          </Form.Item>
        </Layout.Col>
        <Layout.Col className="line" span="2">-</Layout.Col>
        <Layout.Col span="11">
          <Form.Item prop="date2" labelWidth="0px">
            <DatePicker
              value={this.state.form.date2}
              placeholder="选择日期"
              onChange={this.onFormChange.bind(this, 'date2')}
            />
          </Form.Item>
        </Layout.Col>
      </Form.Item>
        <Form.Item>
          <Button type="primary" nativeType="submit">提交</Button>
          <Button>取消</Button>
      </Form.Item>
      </Form>
    </div>
    <div className='block'>
    <Steps space={100} active={1}>
      <Steps.Step title="步骤 1" icon="edit"></Steps.Step>
      <Steps.Step title="步骤 2" icon="upload"></Steps.Step>
      <Steps.Step title="步骤 3" icon="picture"></Steps.Step>
    </Steps>
    </div>
    
    <div className='block'>
    <Steps space={200} active={3}>
      <Steps.Step title="已完成贷款受理" description="2018.03.20 17:15" titleStyle = {{fontWeight:500,fontSize:10}} checkedImage={<img style={{width:24,height:24}} src={require('../../images/step_1_checked.png')}/>}
       uncheckedImage={<img style={{width:24,height:24}} src={require('../../images/step_1_unchecked.png')}/>}></Steps.Step>
      <Steps.Step title="已完成贷款审批" description="2018.03.20 18:15" titleStyle = {{fontWeight:500,fontSize:10}} checkedImage={<img style={{width:24,height:24}} src={require('../../images/step_2_checked.png')}/>}
       uncheckedImage={<img style={{width:24,height:24}} src={require('../../images/step_2_unchecked.png')}/>}></Steps.Step>
      <Steps.Step title="已完成用信审核" description="2018.03.20 19:15" titleStyle = {{fontWeight:500,fontSize:10}} checkedImage={<img style={{width:24,height:24}} src={require('../../images/step_3_checked.png')}/>}
       uncheckedImage={<img style={{width:24,height:24}} src={require('../../images/step_3_unchecked.png')}/>}></Steps.Step>
      <Steps.Step title="已完成放款" description="2018.03.20 20:15" titleStyle = {{fontWeight:500,fontSize:10}} checkedImage={<img style={{width:24,height:24}} src={require('../../images/step_finish_checked.png')}/>}
       uncheckedImage={<img style={{width:24,height:24}} src={require('../../images/step_finish_unchecked.png')}/>}></Steps.Step>
    </Steps>
    
    </div>
    <div className='block' >
    <Collapse value={activeName}>
      <Collapse.Item title={
            <div style={{padding:10}}>
              <Layout.Row gutter="24">
                  <Layout.Col span="11">
                    <ul className="grid-content bg-purple box2">
                      <li>
                        客户姓名：<span>关小明</span>
                      </li>
                      <li>
                        证件号码：<span>100110198801011234</span>
                      </li>
                    </ul>
                  </Layout.Col>
                    <Layout.Col span="11">
                    <ul className="grid-content bg-purple box2">
                      <li>
                        业务品种：<span>一手房贷款</span>
                      </li>
                      <li>
                        项目名称：<span>万达丰台项目</span>
                      </li>
                    </ul>
                  </Layout.Col>      
                  <Layout.Col span="2">
                  <i className="mmspc-collapse-item__header__arrow_180 mmspc-icon-arrow-down" />
                  </Layout.Col>                     
              </Layout.Row>
            </div>
        } name="1">
        <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
      </Collapse.Item>
      <Collapse.Item title="反馈 Feedback" name="2">
        <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
        <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
      </Collapse.Item>
      <Collapse.Item title="效率 Efficiency" name="3">
        <div>简化流程：设计简洁直观的操作流程；</div>
        <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
        <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
      </Collapse.Item>
      <Collapse.Item title="可控 Controllability" name="4">
        <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
        <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
      </Collapse.Item>
    </Collapse>
      </div>
      <div className='block'>
        <Layout.Row gutter="20">
          <Layout.Col span="6"><div style={{height:40,backgroundColor:'#CCC'}}></div></Layout.Col>
          <Layout.Col span="6"><div style={{height:40,backgroundColor:'#CCC'}}></div></Layout.Col>
          <Layout.Col span="6"><div style={{height:40,backgroundColor:'#CCC'}}></div></Layout.Col>
          <Layout.Col span="6"><div style={{height:40,backgroundColor:'#CCC'}}></div></Layout.Col>
        </Layout.Row>
      </div>
      <Footer/>
    </div>
    </div>
    </Loading>
    );
  }
  onChange(key, value) {
    this.setState({
      [key]: value
    });
  }
  onFormChange(key, value) {
    this.state.form[key] = value;
    this.forceUpdate();
  }
  onSubmit(e) {
    e.preventDefault();
    clearTimeout(this.timeout);

  this.timeout = setTimeout(() => {
    this.setState({
      isLoading: false
    });
  }, 3000);
    this.setState({ isLoading: true }) 
  }
  
  onMesageBoxClick() {
    // MessageBox.alert('这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容', '标题名称');
    MessageBox.confirm('您正在办理贷款业务,是否继续?', '温馨提示',{showClose:false}).then(() => {
      Message({
        type: 'success',
        message: '成功!'
      });
    }).catch(() => {
      Message({
        type: 'info',
        message: '已取消'
      });
    });
  }
  onImageViewClick() {
    // MessageBox.alert('这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容', '标题名称');
    ImageViewer.show(require('../../images/camera.png')).then((action) => {
      switch (action) {
        case 'retake':
          Message({
            type: 'success',
            message: '成功!'
          });
          break;
        case 'delete':        
          Message({
            type: 'success',
            message: '删除成功!'
          });
          return;
        default:
          break;
      }
    }).catch(() => {
      Message({
        type: 'info',
        message: '已取消'
      });
    });
  }
  open() {
    Message('这是一条消息提示');
  }
}

export default Lab;
