import React from 'react';
import {Component}from '../../components/libs'
import * as homeActions from '../../actions/home';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {Map} from 'immutable';
import {Form,Input,Button,Layout,Tabs,Select,Radio,TabTitle} from "../../components/index";
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
    constructor(props) {
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
   
}

export default connect (mapStateToProps,mapDispatchToProps)(test); 