import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import { Component, PropTypes } from '../utils/';
import './style/index.less';
import Icon from '../icon/';

var Button = function (_Component) {
  _inherits(Button, _Component);

  function Button() {
    _classCallCheck(this, Button);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  Button.prototype.render = function render() {
    var _classNames;

    var _props = this.props,
        prefixCls = _props.prefixCls,
        type = _props.type,
        size = _props.size,
        icon = _props.icon,
        active = _props.active,
        disabled = _props.disabled,
        block = _props.block,
        className = _props.className,
        loading = _props.loading,
        children = _props.children,
        htmlType = _props.htmlType,
        others = _objectWithoutProperties(_props, ['prefixCls', 'type', 'size', 'icon', 'active', 'disabled', 'block', 'className', 'loading', 'children', 'htmlType']);

    var types = type;
    switch (type) {
      case 'error':
        types = 'danger';break;
      default:
        types = type;break;
    }
    var cls = this.classNames(prefixCls, (_classNames = {
      'w-transition-base': type !== 'link'
    }, _classNames[prefixCls + '-size-' + size] = size, _classNames[prefixCls + '-' + types] = types, _classNames[prefixCls + '-loading'] = loading, _classNames.disabled = disabled || loading, _classNames.active = active, _classNames.block = block, _classNames[className] = className, _classNames));
    return React.createElement(
      'button',
      _extends({}, others, { disabled: disabled || loading, type: htmlType, className: cls }),
      icon && React.createElement(Icon, { type: icon }),
      children && React.createElement(
        'span',
        null,
        children
      )
    );
  };

  return Button;
}(Component);

export default Button;


Button.defaultProps = {
  disabled: false,
  active: false,
  loading: false,
  block: false,
  htmlType: 'button',
  type: 'default',
  size: 'default',
  prefixCls: 'w-btn'
};
Button.propTypes = {
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  icon: PropTypes.string,
  htmlType: PropTypes.string,
  active: PropTypes.bool,
  size: PropTypes.oneOf(['large', 'default', 'small', 'mini']),
  type: PropTypes.oneOf(['default', 'primary', 'success', 'info', 'warn', 'error', 'danger', 'link'])
};