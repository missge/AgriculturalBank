/* @flow */

import React from 'react';
import { Component, PropTypes, Transition, View } from '../../libs';
import Button from '../button';
import {default as MessageBox} from "../message-box";
import Message from "../message";

type State = {
  visible: boolean,
};

export default class ImageViewer extends Component {
  state: State;

  constructor(props: Object) {
    super(props);

    this.state = {
      visible: false,
    };
  }

  componentDidMount() {
    this.setState({
      visible: true
    })
    document.activeElement && document.activeElement.blur()
  }


  handleAction(action: string): void {
    const { modal, promise, showInput } = this.props;

    switch (action) {
      case 'cancel':
        promise.reject();
        this.close();
        break;
      case 'retake':
        MessageBox.confirm('是否重新拍摄?', null, {showClose:false}).then(() => {
          promise.resolve(action);
          this.close();
        }).catch(() => {
        });
        break;
      case 'delete':
        MessageBox.confirm('是否删除图片?', null, {showClose:false}).then(() => {
          promise.resolve(action);
          this.close();
        }).catch(() => {
        });
        break;
      default:
        break;
    }

  }

  close(): void {
    this.setState({
      visible: false
    });
  }

  render(): React.Element<any> {
    const { willUnmount, src, showActionButtons,retakeButtonClass, deleteButtonClass, inputType } = this.props;
    const { visible, editorErrorMessage } = this.state;

    return (
      <div>
        <div style={{ position: 'absolute', zIndex: 2001 }}>
          <Transition
            name="msgbox-fade"
            onAfterLeave={() => { willUnmount && willUnmount() }}
          >
            <View show={visible}>
              <div className="mmspc-image-viewer__wrapper">
                <div className="mmspc-image-viewer">
                  
                  {
                    src && (
                      <div className="mmspc-image-viewer__content" onClick={this.handleAction.bind(this, 'cancel')}>
                      <img className="mmspc-image-viewer__image" src={src} />
                      </div>
                    )
                  }
                  <div className="mmspc-image-viewer__btns" style={{display:showActionButtons?'flex':'none'}}>
                      <div className={this.classNames('mmspc-image-viewer__button', retakeButtonClass)}
                       onClick={this.handleAction.bind(this, 'retake')}>
                        <img className="mmspc-image-viewer__btns_image" src={require('../../../images/shoot_again.png')}/>
                        {this.props.retakeButtonText}
                      </div>
                    
                      <div className={this.classNames('mmspc-image-viewer__button', deleteButtonClass)}
                       onClick={this.handleAction.bind(this, 'delete')}>
                        <img className="mmspc-image-viewer__btns_image" src={require('../../../images/delete_photo.png')}/>
                        {this.props.deleteButtonText}
                      </div>
                   
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
  src: PropTypes.string,
  showActionButtons: PropTypes.bool,
  deleteButtonText: PropTypes.string,
  retakeButtonText: PropTypes.string,
  retakeButtonClass: PropTypes.string,
  deleteButtonClass: PropTypes.string,
  promise: PropTypes.object,
}

ImageViewer.defaultProps = {
  showActionButtons: true,
  deleteButtonText:'删除',
  retakeButtonText:'重拍',
}
