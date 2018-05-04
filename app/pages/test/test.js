import React from 'react';
import {Component}from '../../components/libs'
import * as homeActions from '../../actions/home';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {Map} from 'immutable';
import {Form,Input,Button,Layout,Tabs,Select,Radio,TabTitle,DatePicker,TimePicker} from "../../components/index";
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
class test extends Component{
   /* constructor(props) {
        super(props);
        this.state = {
            list: [{
             'id':'1',
             'title':'123',
             'time':'2017',
             'person':'cheny0815',
             'type':'type',
             'operation':'operation'
           },{
             'id':'2',
             'title':'456',
             'time':'2017',
             'person':'cheny0815',
             'type':'type',
             'operation':'operation'
           },{
             'id':'3',
             'title':'789',
             'time':'2017',
             'person':'cheny0815',
             'type':'type',
             'operation':'operation'
           }]

        }

    }

    render(){
        return(
            <div>   
                <table>
                    <tbody>
                        <tr className="first_tr">
                          <td>内容</td>
                          <td>发起人</td>
                          <td>类型</td>
                          <td>时间</td>
                          <td>操作</td>
                        </tr>
                        {
                          this.state.list.map(function(name){
                            return (
                                <tr key={name.id}>
                                  <td>{name.title}</td>
                                  <td>{name.person}</td>
                                  <td>{name.type}</td>
                                  <td>{name.time}</td>
                                  <td>{name.operation}</td>
                               </tr>
                            )
                          })
                        }
                    </tbody>
                </table>
            </div>
        );
    }
   */



   constructor(props) {
  super(props);

  this.state = {
    form: {
      name: '',
      region: '',
      date1: null,
      date2: null,
      delivery: false,
      type: [],
      resource: '',
      desc: ''
    }
  };
}

onSubmit(e) {
  e.preventDefault();
  alert(JSON.stringify(this.state.form))
}

onChange(key, value) {
  this.state.form[key] = value;
  this.forceUpdate();
}

render() {
  return (
    <Form model={this.state.form} labelWidth="80" onSubmit={this.onSubmit.bind(this)}>
      <Form.Item label="活动名称">
        <Input value={this.state.form.name} onChange={this.onChange.bind(this, 'name')}></Input>
      </Form.Item>
      <Form.Item label="活动区域">
        <Select value={this.state.form.region} placeholder="请选择活动区域">
          <Select.Option label="区域一" value="shanghai"></Select.Option>
          <Select.Option label="区域二" value="beijing"></Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="活动时间">
        <Layout.Col span="11">
          <Form.Item prop="date1" labelWidth="0px">
            <DatePicker
              value={this.state.form.date1}
              placeholder="选择日期"
              onChange={this.onChange.bind(this, 'date1')}
            />
          </Form.Item>
        </Layout.Col>
        <Layout.Col className="line" span="2">-</Layout.Col>
        <Layout.Col span="11">
          <Form.Item prop="date2" labelWidth="0px">
            <TimePicker
              value={this.state.form.date2}
              selectableRange="18:30:00 - 20:30:00"
              placeholder="选择时间"
              onChange={this.onChange.bind(this, 'date2')}
            />
          </Form.Item>
        </Layout.Col>
      </Form.Item>


      <Form.Item label="特殊资源">
        <Radio.Group value={this.state.form.resource}>
          <Radio value="线上品牌商赞助"></Radio>
          <Radio value="线下场地免费"></Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="活动形式">
        <Input type="textarea" value={this.state.form.desc} onChange={this.onChange.bind(this, 'desc')}></Input>
      </Form.Item>
      <Form.Item>
        <Button type="primary" nativeType="submit">立即创建</Button>
        <Button>取消</Button>
      </Form.Item>
    </Form>
  )
}
}

export default connect (mapStateToProps,mapDispatchToProps)(test); 