/* @flow */

import React from 'react';
import { Component, PropTypes } from '../../libs';

export default class RadioGroup extends Component {
  getChildContext(): { component: RadioGroup } {
    return {
      component: this
    };
  }

  onChange(value: mixed) {
    if (this.props.onChange) {
      this.props.onChange(value)
    }
  }
  onAppendixClick(){
    if (this.props.onAppendixClick) {
      this.props.onAppendixClick()
    }
  }
  render() {
    return (
      <div ref="RadioGroup" style={this.style()} className={this.className('el-radio-group')}>
        {
          React.Children.map(this.props.children, element => {
            if (!element) {
              return null;
            }

            const { elementType } = element.type;
            if (elementType !== 'Radio' && elementType !== 'RadioButton') {
              return null;
            }
            let elementIsAppendix = this.props.appendix && this.props.appendix===element.props.value;
            return React.cloneElement(element, Object.assign({}, element.props, {
              onChange: elementIsAppendix?null:this.onChange.bind(this),
              model: this.props.value,
              size: this.props.size,
              isAppendix: elementIsAppendix,
              onAppendixClick: elementIsAppendix?this.onAppendixClick.bind(this):null
            }))
          })
        }
      </div>
    )
  }
}

RadioGroup.childContextTypes = {
  component: PropTypes.any
};

RadioGroup.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  size: PropTypes.string,
  textColor: PropTypes.string,
  fill: PropTypes.string,
  onChange: PropTypes.func,
  appendix:PropTypes.string,
  onAppendixClick: PropTypes.func,
}
