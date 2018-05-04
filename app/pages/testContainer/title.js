import React, { Component } from 'react';
import  './style/style.css';
//  <TabTitle title="贷款信息" class="tabTitle blueTabTitle"/>
export default class TabTitle extends Component {
	constructor(props) {
		super(props);
	}
	render(){
		return(
		    <div class={this.props.class} >
	           {this.props.title}
	        </div>

		)
	}
}