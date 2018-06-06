/* @flow */

import React from 'react';
import { Component, PropTypes, Transition, View } from '../../libs';
import Button from '../button';
import {default as MessageBox} from "../message-box";
import Message from "../message";

import WrapViewer from './WrapViewer';


type State = {
  visible: boolean,
};

export default class ImageViewer extends Component {
  state: State;

  constructor(props: Object) {
    super(props);

    this.state = {
      visible: false,
      index: 0,
      src: props.src,
    };
  }

  componentDidMount() {
    this.setState({
      visible: true,

    })
    document.activeElement && document.activeElement.blur()
  }

  static childContextTypes = {
    onClose: PropTypes.func,
    hasActionBar: PropTypes.bool,
  };
  getChildContext() {
    return { onClose:this.handleAction.bind(this, 'cancel'), hasActionBar:this.props.showActionButtons};
  }

  handleAction(action: string): void {
    const { modal, promise, showInput } = this.props;

    switch (action) {
      case 'cancel':
        if(promise){promise.reject();}
        this.close();
        break;
      case 'retake':
        MessageBox.confirm('是否重新拍摄?', null, {showClose:false}).then(() => {
          if(promise){
            promise.resolve(action);
            this.close();
          }else{
            this.props.onRetakeButtonClick(this.retakeImage,this.state.index);
          }
        }).catch(() => {
        });
        break;
      case 'delete':
        MessageBox.confirm('是否删除图片?', null, {showClose:false}).then(() => {
          if(promise){
            promise.resolve(action);
            this.close();
          }else{
            this.props.onDeleteButtonClick(this.deleteImage,this.state.index);
          }
        }).catch(() => {
        });
        break;
      case 'add':        
        this.props.onAddButtonClick(this.addImage,Array.isArray(this.state.src)?this.state.src.length:1);
        break;
      default:
        break;
    }

  }
  deleteImage = ()=>{
    let oldSrc = this.state.src;
    let newSrc = null;
    let index = this.state.index;
    if(Array.isArray(oldSrc)&&oldSrc.length>1){
      newSrc = [...oldSrc];
      newSrc.splice(index,1);
      let newIndex = newSrc.length
      newIndex = index>=newIndex ? newIndex-1 : index;
      this.setState({src:newSrc, index:newIndex});
    }else{
      this.close();
    }
    return newSrc;
  }

  retakeImage = (newData)=>{   
    let oldSrc = this.state.src;
    let newSrc = null;
    if(Array.isArray(oldSrc)){
      newSrc = [...oldSrc];
      let index = this.state.index
      newSrc.splice(index,1,newData);
    }else{
      newSrc = newData;
    }
    this.setState({src:newSrc});
    return newSrc;
  }
  addImage = (newImage)=>{     
    let oldSrc = this.state.src; 
    let newSrc = [].concat(oldSrc).concat(newImage);
    let newIndex = newSrc.length-1;
    this.setState({src:newSrc, index:newIndex});
    return newSrc;
  }

  changeIndex = (value) => {
    this.setState({
      index:value,
    });
    console.info('ImageViewer changeIndex index'+value);
  }
  close(): void {
    this.setState({
      visible: false
    });
  }

  render(): React.Element<any> {
    const {willUnmount, showActionButtons,retakeButtonClass, deleteButtonClass,
      retakeButtonText,deleteButtonText,addButtonClass,showAdd,addButtonText, inputType, src,index, ...other} = this.props;
    const { visible, editorErrorMessage } = this.state;
    return (
      <div>
        <div style={{ position: 'absolute', zIndex: 2001 }}>
          <Transition
            name="msgbox-fade"
            onAfterLeave={() => {willUnmount && willUnmount() }}
          >
            <View show={visible}>
              <div className="mmspc-image-viewer__wrapper">
                <div className="mmspc-image-viewer">
                  
                  {
                      <div className="mmspc-image-viewer__content" >
                        <WrapViewer className="mmspc-image-viewer__image"  onClose={this.handleAction.bind(this, 'cancel')}
                         onChangeIndex={this.changeIndex.bind(this)} src={this.state.src} index = {this.state.index}
                          {...other}
                        />
                      </div>
                  }
                  <div className="mmspc-image-viewer__btns" style={{display:showActionButtons?'flex':'none'}}>
                      <div className={this.classNames('mmspc-image-viewer__button', retakeButtonClass)}
                       onClick={this.handleAction.bind(this, 'retake')}>
                        <img className="mmspc-image-viewer__btns_image" src={require('./images/shoot_again.png')}/>
                        {retakeButtonText}
                      </div>
                    
                      <div className={this.classNames('mmspc-image-viewer__button', deleteButtonClass)}
                       onClick={this.handleAction.bind(this, 'delete')}>
                        <img className="mmspc-image-viewer__btns_image" src={require('./images/delete_photo.png')}/>
                        {deleteButtonText}
                      </div>
                      {showAdd&&<div className={this.classNames('mmspc-image-viewer__button', addButtonClass)}
                       onClick={this.handleAction.bind(this, 'add')}>
                        <img className="mmspc-image-viewer__btns_image" src={require('./images/shoot_more.png')}/>
                        {addButtonText}
                      </div>}
                      
                  </div>
                </div>
              </div>
            </View>
          </Transition>
        </div>
      </div>
    )
  }
}

ImageViewer.propTypes = {
  src: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),// 需要预览的图片http链接列表
  showActionButtons: PropTypes.bool,
  deleteButtonText: PropTypes.string,
  retakeButtonText: PropTypes.string,
  retakeButtonClass: PropTypes.string,
  deleteButtonClass: PropTypes.string,
  onDeleteButtonClick: PropTypes.func, //事件监听回调
  onRetakeButtonClick: PropTypes.func,
  onAddButtonClick: PropTypes.func,
  addButtonClass: PropTypes.string,
  showAdd: PropTypes.bool,
  promise: PropTypes.object, //promise形式回调
  maxZoomNum: PropTypes.number, // 最大放大倍数
  zIndex: PropTypes.number, // 组件图层深度
  index: PropTypes.number, // 
  gap: PropTypes.number, // 间隙
  speed: PropTypes.number, // Duration of transition between slides (in ms)
}

ImageViewer.defaultProps = {
  showActionButtons: true,
  deleteButtonText:'删除',
  retakeButtonText:'重拍',
  addButtonText:'添加',
  showAdd: false,
  maxZoomNum: 4,
  zIndex: 2001,
  index: 0,
  gap: 10,
  speed: 300,
}
