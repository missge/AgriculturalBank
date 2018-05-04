import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import { Component, PropTypes } from '../utils/';
import './style/buttons-group.less';

var ButtonGroup = function (_Component) {
  _inherits(ButtonGroup, _Component);

  function ButtonGroup() {
    _classCallCheck(this, ButtonGroup);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  ButtonGroup.prototype.render = function render() {
    var _classNames;

    var _props = this.props,
        prefixCls = _props.prefixCls,
        vertical = _props.vertical,
        children = _props.children,
        className = _props.className,
        resetProps = _objectWithoutProperties(_props, ['prefixCls', 'vertical', 'children', 'className']);

    var cls = this.classNames((_classNames = {}, _classNames[prefixCls + '-group'] = true, _classNames[prefixCls + '-group-vertical'] = vertical, _classNames[className] = className, _classNames));

    return React.createElement(
      'div',
      _extends({ className: cls }, resetProps),
      children
    );
  };

  return ButtonGroup;
}(Component);

export default ButtonGroup;


ButtonGroup.propTypes = {
  prefixCls: PropTypes.string,
  vertical: PropTypes.bool
};
ButtonGroup.defaultProps = {
  prefixCls: 'w-btn',
  vertical: false
};