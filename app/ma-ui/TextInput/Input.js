import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import { Component, PropTypes } from '../utils/';
import Icon from '../icon';

var Input = function (_Component) {
  _inherits(Input, _Component);

  function Input(props) {
    _classCallCheck(this, Input);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.state = {
      value: props.value,
      placeholder: props.placeholder
    };
    return _this;
  }

  Input.prototype.componentWillReceiveProps = function componentWillReceiveProps() {
    for (var _len = arguments.length, props = Array(_len), _key = 0; _key < _len; _key++) {
      props[_key] = arguments[_key];
    }

    this.setState(_extends({}, props));
  };

  Input.prototype.handleKeyUp = function handleKeyUp(e) {
    var _props = this.props,
        onSearch = _props.onSearch,
        onKeyUp = _props.onKeyUp;

    if (e.key === 'Enter') {
      onSearch(e, e.target.value);
    }
    onKeyUp(e);
  };
  // Input-Number 等其它组件使用的方法


  Input.prototype.focus = function focus() {
    (this.input || this.textarea).focus();
  };

  Input.prototype.blur = function blur() {
    (this.input || this.textarea).blur();
  };

  Input.prototype.handleChange = function handleChange(e) {
    var _props2 = this.props,
        onChange = _props2.onChange,
        length = _props2.length;

    var val = e.target.value;
    if (val.length > length) {
      val = val.slice(0, length);
      e.target.value = val;
    }
    this.setState({ value: val });
    onChange(e, val);
  };

  Input.prototype.handleClick = function handleClick(type, e) {
    if (this.props[type]) {
      this.props[type](e, this.state.value);
    }
  };

  Input.prototype.renderIcon = function renderIcon(type) {
    var _this2 = this,
        _classNames;

    var _props3 = this.props,
        prefixCls = _props3.prefixCls,
        preIcon = _props3.preIcon,
        icon = _props3.icon,
        onIconClick = _props3.onIconClick,
        onPreIconClick = _props3.onPreIconClick,
        onIconMouseOut = _props3.onIconMouseOut,
        onPreIconMouseOut = _props3.onPreIconMouseOut,
        onIconMouseOver = _props3.onIconMouseOver,
        onPreIconMouseOver = _props3.onPreIconMouseOver;

    var icons = void 0;

    if (type === 'icon' && typeof icon === 'string') icons = icon;
    if (type === 'preIcon' && typeof preIcon === 'string') icons = preIcon;

    var renderIcon = function renderIcon() {
      if (typeof preIcon === 'string' && icons || typeof icon === 'string' && icons) {
        return React.createElement(Icon, {
          className: 'w-TextInput-icon-inner',
          type: icons,
          onClick: _this2.handleClick.bind(_this2, type === 'icon' ? 'onIconClick' : 'onPreIconClick'),
          onMouseOver: _this2.handleClick.bind(_this2, type === 'icon' ? 'onIconMouseOver' : 'onPreIconMouseOver'),
          onMouseOut: _this2.handleClick.bind(_this2, type === 'icon' ? 'onIconMouseOut' : 'onPreIconMouseOut')
        });
      }
      return type === 'icon' ? icon : preIcon;
    };
    return React.createElement(
      'div',
      { className: this.classNames((_classNames = {}, _classNames[prefixCls + '-icon-left'] = type === 'preIcon' && preIcon, _classNames[prefixCls + '-icon-right'] = type === 'icon' && icon, _classNames.event = type === 'preIcon' && onPreIconClick || type === 'icon' && onIconClick || type === 'preIcon' && onPreIconMouseOut || type === 'icon' && onIconMouseOut || type === 'preIcon' && onPreIconMouseOut || type === 'icon' && onIconMouseOver || type === 'preIcon' && onPreIconMouseOver, _classNames))
      },
      renderIcon()
    );
  };

  Input.prototype.render = function render() {
    var _this3 = this,
        _classNames2,
        _classNames3;

    var _props4 = this.props,
        prefixCls = _props4.prefixCls,
        className = _props4.className,
        style = _props4.style,
        type = _props4.type,
        size = _props4.size,
        length = _props4.length,
        preIcon = _props4.preIcon,
        icon = _props4.icon,
        value = _props4.value,
        onSearch = _props4.onSearch,
        onIconClick = _props4.onIconClick,
        onPreIconClick = _props4.onPreIconClick,
        onIconMouseOut = _props4.onIconMouseOut,
        onPreIconMouseOut = _props4.onPreIconMouseOut,
        onIconMouseOver = _props4.onIconMouseOver,
        onPreIconMouseOver = _props4.onPreIconMouseOver,
        addonBefore = _props4.addonBefore,
        addonAfter = _props4.addonAfter,
        other = _objectWithoutProperties(_props4, ['prefixCls', 'className', 'style', 'type', 'size', 'length', 'preIcon', 'icon', 'value', 'onSearch', 'onIconClick', 'onPreIconClick', 'onIconMouseOut', 'onPreIconMouseOut', 'onIconMouseOver', 'onPreIconMouseOver', 'addonBefore', 'addonAfter']);

    var cls = this.classNames('' + prefixCls, className, {
      textarea: type === 'textarea',
      'w-disabled': this.props.disabled
    });

    if (type === 'textarea') {
      return React.createElement('textarea', _extends({
        className: this.classNames(cls, prefixCls + '-inner')
      }, other, {
        value: value,
        placeholder: !value ? this.state.placeholder : '',
        ref: function ref(elm) {
          _this3.textarea = elm;
        },
        type: type,
        style: style,
        onChange: this.handleChange.bind(this)
      }));
    }

    return React.createElement(
      'div',
      {
        style: style,
        className: this.classNames(cls, (_classNames2 = {}, _classNames2[prefixCls + '-' + size] = size, _classNames2[prefixCls + '-icon'] = preIcon || icon, _classNames2[prefixCls + '-addon'] = addonBefore || addonAfter, _classNames2))
      },
      addonBefore && React.createElement(
        'span',
        { className: prefixCls + '-addon-before' },
        addonBefore
      ),
      preIcon && this.renderIcon.bind(this)('preIcon'),
      icon && this.renderIcon.bind(this)('icon'),
      React.createElement('input', _extends({}, other, {
        type: type,
        ref: function ref(elm) {
          _this3.input = elm;
        },
        className: this.classNames(prefixCls + '-inner', (_classNames3 = {}, _classNames3[prefixCls + '-p-left'] = preIcon, _classNames3[prefixCls + '-p-right'] = icon, _classNames3['addon-before'] = addonBefore, _classNames3['addon-after'] = addonAfter, _classNames3)),
        value: value,
        placeholder: !value ? this.state.placeholder : '',
        onChange: this.handleChange.bind(this),
        onKeyUp: this.handleKeyUp.bind(this)
      })),
      addonAfter && React.createElement(
        'span',
        { className: prefixCls + '-addon-after' },
        addonAfter
      )
    );
  };

  return Input;
}(Component);

Input.defaultProps = {
  prefixCls: 'w-TextInput',
  type: 'text',
  autoComplete: 'off',
  onChange: function onChange() {},
  onSearch: function onSearch() {},
  onKeyUp: function onKeyUp() {}
};
export default Input;


Input.propTypes = {
  prefixCls: PropTypes.string,
  type: PropTypes.string,
  autoComplete: PropTypes.string,
  size: PropTypes.oneOf(['large', 'small', 'mini']),
  length: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  preIcon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  onChange: PropTypes.func,
  onSearch: PropTypes.func,
  onKeyUp: PropTypes.func,
  addonBefore: PropTypes.node,
  addonAfter: PropTypes.node
};