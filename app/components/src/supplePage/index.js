import {Component} from "../../../components/libs";
import React from 'react';
export default class supplePage extends Component {
    render() {
        return (
            <div style={this.style(styles.supplePage)}>
                {this.props.children}
            </div>
        )
    }
};
const styles={
    supplePage:{
        position:"fixed",
        left:0,
        right:0,
        bottom:0,
        top:0,

        backgroundColor:"#ffffff",
    }
}