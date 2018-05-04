import React, { Component } from 'react';
import Home from "./home";
import Modal from  "./modal";
import {Loading} from "../../components";
import * as homeActions from '../../actions/home';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {Map} from "immutable";
// import Supple from  "./supple";

const actions = [
    homeActions
]
function mapStateToProps(state) {
    const {head}=state;
    const {home}=state;
    const {load}=state;
    return {
        head,home,load
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
class MainPage extends Component {
  render() {
    return (
        <div>
            <Home/>
         </div>
           )

  }
}
export default connect(mapStateToProps , mapDispatchToProps)(MainPage)
