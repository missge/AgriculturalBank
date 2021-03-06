
import './style/image-viewer.css';
import ImageViewer from './ImageViewer';
import React from 'react';
import ReactDOM from 'react-dom';


function show(src, props) {
  props = Object.assign({ src}, props);

  return next(props);
}

function next(props) {
  return new Promise((resolve, reject) => {
    const div = document.createElement('div');

    document.body.appendChild(div);

    // if (props.lockScroll != false) {
    //   document.body.style.setProperty('overflow', 'hidden');
    // }

    const component = React.createElement(ImageViewer, Object.assign({}, props, {
      promise: { resolve, reject },
      willUnmount: () => {
        ReactDOM.unmountComponentAtNode(div);
        document.body.removeChild(div);
        document.body.style.removeProperty('overflow');
      }
    }));

    ReactDOM.render(component, div);
  });
}

function showMultiple(src, props) {
  props = Object.assign({ src}, props);

  const div = document.createElement('div');

  document.body.appendChild(div);

  const component = React.createElement(ImageViewer, Object.assign({}, props, {
    willUnmount: () => {
      ReactDOM.unmountComponentAtNode(div);
      document.body.removeChild(div);
      document.body.style.removeProperty('overflow');
    }
  }));

  ReactDOM.render(component, div);
}
export default {show,showMultiple};
