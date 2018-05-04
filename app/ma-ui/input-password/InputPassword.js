import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import { PropTypes } from '../utils/';
import Input from '../TextInput/';

var InputPassword = function (_Input) {
  _inherits(InputPassword, _Input);

  function InputPassword(props) {
    _classCallCheck(this, InputPassword);

    var _this = _possibleConstructorReturn(this, _Input.call(this, props));

    _this.state = {
      toggle: false
    };
    return _this;
  }

  InputPassword.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props,
        prefixCls = _props.prefixCls,
        value = _props.value,
        _onIconClick = _props.onIconClick,
        onChange = _props.onChange,
        other = _objectWithoutProperties(_props, ['prefixCls', 'value', 'onIconClick', 'onChange']);

    var toggle = this.state.toggle;

    var cls = this.classNames(prefixCls, {
      'password-show': toggle
    });

    return React.createElement(Input, _extends({}, other, {
      className: cls,
      type: toggle ? 'text' : 'password',
      value: value,
      onIconClick: function onIconClick() {
        _this2.setState({ toggle: !toggle }, _onIconClick);
      },
      onChange: onChange
    }));
  };

  return InputPassword;
}(Input);

export default InputPassword;


InputPassword.propTypes = {
  prefixCls: PropTypes.string,
  value: PropTypes.string
};

InputPassword.defaultProps = {
  prefixCls: 'w-TextInput-password',
  icon: 'eye-o',
  value: ''
};