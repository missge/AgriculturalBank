
import React,{Component} from 'react';
import Item from "../../../components/src/iconBar/item";
import PropTypes from 'prop-types';
import {SupplePage} from './../../../components';
import Second from '../second'
export default class first extends Component{
componentWillMount(){
    let a=1;
}

    render() {
        return (
            <div>
            <div onClick={()=>{this.context.jumpTo(1,[2,0,0,0,0,0,0,0])}} style={styles.first}/>
                <SupplePage style={{display:"inline"}}>
<Second/>
                </SupplePage>
            </div>
        )
    }



};
first.contextTypes = {
    jumpTo: PropTypes.func
};
const styles = {
    first: {
        height: "80%",
        width:"50%",
        backgroundColor:"green"
    },
};