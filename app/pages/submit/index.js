import React from 'react';
import {Component} from "./../../components/libs"
import * as homeActions from '../../actions/home';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {Map} from 'immutable';
import {Link}  from 'react-router-dom';
import {TabTitle} from '../../components'
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
class Submit extends Component {
  render() {
    return (
        <div style={{width:"100%",height:"100%",padding:this.getWidth(20)}}>
            <TabTitle title={"调查意见"} color={"red"}/>
        </div>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Submit);
