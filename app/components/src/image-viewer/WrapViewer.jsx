import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ListContainer from './ListContainer';
import Pointer from './Pointer';

const screenWidth = typeof document !== 'undefined' && document.documentElement.clientWidth;
const screenHeight = typeof document !== 'undefined' && document.documentElement.clientHeight;

class WrapViewer extends Component {
  static propTypes = {
    index: PropTypes.number.isRequired, // 当前显示图片的序号
    src: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ]).isRequired,// 需要预览的图片http链接列表, // 需要预览的图片http链接列表
    maxZoomNum: PropTypes.number.isRequired, // 最大放大倍数
    zIndex: PropTypes.number.isRequired, // 组件图层深度
    gap: PropTypes.number.isRequired, // 间隙
    speed: PropTypes.number.isRequired, // Duration of transition between slides (in ms)
  }

  state = {
    index: 0,
  }

  componentWillMount() {
    const {
      index,
      src,
    } = this.props;

    this.setState({
      index,
      src,
    });
  }
  componentWillReceiveProps(nextProps: any){
    let newSrc = this.state.src;
    if (this.props.src !== nextProps.src) {
      newSrc = nextProps.src
     }
     this.setState({src:newSrc,index:nextProps.index});
  }

  changeIndex = (index) => {
    this.setState({
      index,
    });
    console.info('wrap view index'+index);
    this.props.onChangeIndex&&this.props.onChangeIndex(index);
  }

  showPageIndicater = (src) =>{
    if(Array.isArray(src)&&src.length>1){
      console.log("index"+this.state.index)
      return (
        <div className='mmspc-image-viewer__indicator'>
          {this.state.index+1}/{src.length}
        </div>
      );
    }else{
      return null;
    }
  }
  render() {
    const {
      zIndex,
      maxZoomNum,
      gap,
      speed,
    } = this.props;

    const {
      index,
      src,
    } = this.state;

    return (
      <div className="mmspc-image-viewer" style={{ zIndex }}>{/* root */}
        <div className="viewer-cover" />
        <ListContainer
          screenWidth={screenWidth}
          screenHeight={screenHeight}
          changeIndex={this.changeIndex}
          src={src}
          maxZoomNum={maxZoomNum}
          gap={gap}
          speed={speed}
          index={index}
        />
        {
          this.showPageIndicater(src)          
        }
        {/* <Pointer length={Array.isArray(src)?src.length:1} index={index} changeIndex={this.changeIndex} /> */}
      </div>
    );
  }
}

export default WrapViewer;
