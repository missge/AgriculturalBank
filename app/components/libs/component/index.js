import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
const dWin ={width:1920,height:1200};
export default class Component extends React.Component {
  classNames(...args) {
    return classnames(args);
  }

  className(...args) {
    return this.classNames.apply(this, args.concat([this.props.className]));
  }

  style(args) {
    return Object.assign({}, args, this.props.style)
  }
    getHeight(args) {
        return args*window.innerHeight/dWin.height
    }
    getWidth(args) {
        return args*window.innerWidth/dWin.width
    }
}

Component.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object
};

