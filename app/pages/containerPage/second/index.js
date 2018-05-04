
import React,{Component} from 'react';
import first from "../first";
import PropTypes from 'prop-types';
export default class second extends Component{
    componentWillMount(){
        let a=1;
    }
    render() {
        return (
            <div onClick={()=>{this.context.jumpTo(2,[2,2,0,0,0,0,0,0])}} style={styles.first}/>
        )

    }



};
const styles = {
    first: {
        height: "100%",
        width:"100%",
        backgroundColor:"gray"
    },

};
second.contextTypes = {
    jumpTo: PropTypes.func
};