/* @flow */

import React from 'react';
import ReactDOM from 'react-dom';
import ClickOutside from 'react-click-outside';
import debounce from 'throttle-debounce/debounce';
import StyleSheet from '../../libs/utils/style';
import { Component, PropTypes, Transition, View } from '../../libs';

import { Scrollbar } from '../scrollbar';

import Tag from '../tag';
import i18n from '../locale';

StyleSheet.reset(`
  .el-select-list-dropdown {
    position: absolute !important;
  }
`)

type State = {
  options: Array<Object>,
  isSelect: boolean,
  filteredOptionsCount: number,
  optionsCount: number,
  hoverIndex: number,
  bottomOverflowBeforeHidden: number,
  cachedPlaceHolder: string,
  currentPlaceholder: string,
  selectedLabel: string,
  value: any,
  selected: any,
  valueChangeBySelected: boolean,
  selectedInit: boolean,
  dropdownUl?: HTMLElement
};

const sizeMap: {[size: string]: number} = {
  'large': 42,
  'small': 30,
  'mini': 22
};

class SelectList extends Component {
  state: State;

  constructor(props: Object) {
    super(props);

    this.state = {
      options: [],
      isSelect: true,
      filteredOptionsCount: 0,
      optionsCount: 0,
      hoverIndex: -1,
      bottomOverflowBeforeHidden: 0,
      cachedPlaceHolder: props.placeholder || i18n.t('el.SelectList.placeholder'),
      currentPlaceholder: props.placeholder || i18n.t('el.SelectList.placeholder'),
      selectedLabel: '',
      selectedInit: false,
      selected: undefined,
      value: props.value,
      valueChangeBySelected: false,
    };

    if (props.multiple) {
      this.state.selectedInit = true;
      this.state.selected = [];
    }
  }

  getChildContext(): Object {
    return {
      component: this
    };
  }

  componentDidMount() {
    this.reference = ReactDOM.findDOMNode(this.refs.reference);

    this.handleValueChange();
  }

  componentWillReceiveProps(props: Object) {
    if (props.placeholder != this.props.placeholder) {
      this.setState({
        currentPlaceholder: props.placeholder
      });
    }

    if (props.value != this.props.value) {
      this.setState({
        value: props.value
      }, () => {
        this.handleValueChange();
      });
    }
  }

  componentWillUpdate(props: Object, state: Object) {
    if (state.value != this.state.value) {
      this.onValueChange(state.value);
    }
    if (state.visible != this.state.visible) {
      if (this.props.onVisibleChange) {
        this.props.onVisibleChange(state.visible);
      }

      this.onVisibleChange(state.visible);
    }

    if (Array.isArray(state.selected)) {
      if (state.selected.length != this.state.selected.length) {
        this.onSelectedChange(state.selected);
      }
    }
  }

  componentDidUpdate() {
  }

  componentWillUnmount() {
  }

  debounce(): number {
    return 0;
  }

  handleValueChange() {
    const { multiple } = this.props;
    const { value, options } = this.state;

    if (multiple && Array.isArray(value)) {
      this.setState({
        selected: options.reduce((prev, curr) => {
          return value.indexOf(curr.props.value) > -1 ? prev.concat(curr) : prev;
        }, [])
      }, () => {
        this.onSelectedChange(this.state.selected, false);
      });
    } else {
      const selected = options.filter(option => {
         return option.props.value === value
       })[0];
       if (selected) {
         this.state.selectedLabel = selected.props.label || selected.props.value;
       }else{
        this.setState({selected:null});
        this.state.selectedLabel = null;
       }
    }
  }
 onVisibleChange(visible: boolean) {
    const { multiple } = this.props;
    let {selected, selectedLabel } = this.state;

    if (!visible) {
      if (this.refs.root.querySelector('.el-input__icon')) {
        const elements = this.refs.root.querySelector('.el-input__icon');

        for (let i = 0; i < elements.length; i++) {
          elements[i].classList.remove('is-reverse');
        }
      }
      this.resetHoverIndex();

      if (!multiple) {
        if (selected && selected.props) {
          if (selected.props.value) {
            selectedLabel = selected.currentLabel();
          }
        }

        this.setState({ selectedLabel });
      }
    }
  }
  
  onValueChange(val: mixed) {
    const { multiple } = this.props;

    let {
      options,
      valueChangeBySelected,
      selectedInit,
      selected,
      selectedLabel,
      currentPlaceholder,
      cachedPlaceHolder
    } = this.state;

    if (valueChangeBySelected) {
      return this.setState({
        valueChangeBySelected: false
      });
    }

    if (multiple && Array.isArray(val)) {

      selectedInit = true;
      selected = [];
      currentPlaceholder = cachedPlaceHolder;

      val.forEach(item => {
        let option = options.filter(option => option.props.value === item)[0];
        if (option) {
          this.addOptionToValue(option);
        }
      });

      this.forceUpdate();
    }

    if (!multiple) {
      let option = options.filter(option => option.props.value === val)[0];

      if (option) {
        this.addOptionToValue(option);
        this.setState({ selectedInit, currentPlaceholder });
      } else {
        selected = {};
        selectedLabel = '';
        this.setState({ selectedInit, selected, currentPlaceholder, selectedLabel }, () => {
          this.resetHoverIndex();
        });
      }
    }
  }

  onSelectedChange(val: any, bubble: boolean = true) {
    const { form } = this.context;
    const { multiple, onChange } = this.props;
    let { hoverIndex, selectedInit, currentPlaceholder, cachedPlaceHolder, valueChangeBySelected } = this.state;

    if (multiple) {

      valueChangeBySelected = true;

      if (bubble) {
        onChange && onChange(val.map(item => item.props.value), val);
        form && form.onFieldChange();
      }

      // this.dispatch('form-item', 'el.form.change', val);

      this.setState({ valueChangeBySelected, hoverIndex });
    } else {
      if (selectedInit) {
        return this.setState({
          selectedInit: false
        });
      }

      if (bubble) {
        onChange && onChange(val.props.value, val);
        form && form.onFieldChange();
      }
    }
  }


  optionsAllDisabled(options: []): boolean {
     return options.length === (options.filter(item => item.props.disabled === true).length);
  }

  emptyText(): mixed {
    const { options } = this.state;
    
    if (options.length === 0) {
      return i18n.t('el.SelectList.noData');
    }

    return null;
  }

  toggleLastOptionHitState(hit?: boolean): any {
    const { selected } = this.state;

    if (!Array.isArray(selected)) return;

    const option = selected[selected.length - 1];

    if (!option) return;

    if (hit === true || hit === false) {
      return option.hitState = hit;
    }

    option.hitState = !option.hitState;

    return option.hitState;
  }

  deletePrevTag(e: Object) {
    if (e.target.value.length <= 0 && !this.toggleLastOptionHitState()) {
      const { selected } = this.state;

      selected.pop();

      this.setState({ selected });
    }
  }

  addOptionToValue(option: any, init?: boolean) {
    const { multiple } = this.props;
    let { selected, selectedLabel, hoverIndex, value } = this.state;

    if (multiple) {
      if (selected.indexOf(option) === -1) {
        this.selectedInit = !!init;

        selected.push(option);

        this.resetHoverIndex();
      }
    } else {
      this.selectedInit = !!init;

      selected = option;
      selectedLabel = option.currentLabel();
      hoverIndex = option.index;

      this.setState({ selected, selectedLabel, hoverIndex });
    }
  }


  resetHoverIndex() {
    const { multiple } = this.props;
    let { hoverIndex, options, selected } = this.state;

    setTimeout(() => {
      if (!multiple) {
        hoverIndex = options.indexOf(selected);
      } else {
        if (selected.length > 0) {
          hoverIndex = Math.min.apply(null, selected.map(item => options.indexOf(item)));
        } else {
          hoverIndex = -1;
        }
      }

      this.setState({ hoverIndex });
    }, 300);
  }

  navigateOptions(direction: string) {
    let { hoverIndex, options } = this.state;

    let skip;

    if (options.length != options.filter(item => item.props.disabled === true).length) {
      if (direction === 'next') {
        hoverIndex++;

        if (hoverIndex === options.length) {
          hoverIndex = 0;
        }

        if (options[hoverIndex].props.disabled === true ||
            options[hoverIndex].props.groupDisabled === true ||
           !options[hoverIndex].state.visible ) {
          skip = 'next';
        }
      }

      if (direction === 'prev') {
        hoverIndex--;

        if (hoverIndex < 0) {
          hoverIndex = options.length - 1;
        }

        if (options[hoverIndex].props.disabled === true ||
            options[hoverIndex].props.groupDisabled === true ||
           !options[hoverIndex].state.visible ) {
          skip = 'prev';
        }
      }
    }

    this.setState({ hoverIndex, options }, () => {
      if (skip) {
        this.navigateOptions(skip);
      }

      this.resetScrollTop();
    });
  }

  resetScrollTop() {
    const element: any = ReactDOM.findDOMNode(this.state.options[this.state.hoverIndex]);
    const bottomOverflowDistance = element.getBoundingClientRect().bottom;
    const topOverflowDistance = element.getBoundingClientRect().top;

    if (this.state.dropdownUl) {
      if (bottomOverflowDistance > 0) {
        this.state.dropdownUl.scrollTop += bottomOverflowDistance;
      }
      if (topOverflowDistance < 0) {
        this.state.dropdownUl.scrollTop += topOverflowDistance;
      }
    }
  }

  selectOption() {
    let { hoverIndex, options } = this.state;

    if (options[hoverIndex]) {
      this.onOptionClick(options[hoverIndex]);
    }
  }

  deleteSelected() {

    if (this.state.selectedLabel != '') {
      this.setState({
        selected: {},
        selectedLabel: ''
      });

      this.context.form && this.context.form.onFieldChange();
    }
  }

  deleteTag(tag: any) {
    const index = this.state.selected.indexOf(tag);

    if (index > -1 && !this.props.disabled) {
      const selected = this.state.selected.slice(0);

      selected.splice(index, 1);

      this.setState({ selected }, () => {
        if (this.props.onRemoveTag) {
          this.props.onRemoveTag(tag.props.value);
        }
      });
    }
  }

  onOptionCreate(option: any) {
    this.state.options.push(option);
    this.state.optionsCount++;

    this.forceUpdate();
    this.handleValueChange();
  }

  onOptionDestroy(option: any) {
    this.state.optionsCount--;

    const index = this.state.options.indexOf(option);

    if (index > -1) {
      this.state.options.splice(index, 1);
    }

    this.state.options.forEach(el => {
      if (el != option) {
        el.resetIndex();
      }
    });

    this.forceUpdate();
    this.handleValueChange();
  }

  onOptionClick(option: any) {
    const { multiple } = this.props;
    let { selected, selectedLabel } = this.state;

    if (!multiple) {
      selected = option;
      selectedLabel = option.currentLabel();
    } else {
      let optionIndex = -1;

      selected = selected.slice(0);

      selected.forEach((item, index) => {
        if (item === option || item.props.value === option.props.value) {
          optionIndex = index;
        }
      });

      if (optionIndex > -1) {
        selected.splice(optionIndex, 1);
      } else {
        selected.push(option);
      }
    }

    this.setState({ selected, selectedLabel }, () => {
      if (!multiple) {
        this.onSelectedChange(this.state.selected);
      }
    });
  }

 

  render() {
    const { multiple, size, disabled } = this.props;
    const { selected, selectedLabel,  options, currentPlaceholder } = this.state;

    return (
      <div ref="root" style={this.style()} className={this.className('el-select-list')}>
        
        <View show={options.length > 0}>
                <Scrollbar
                  viewComponent="ul"
                  wrapClass="el-select-list-dropdown__wrap"
                  viewClass="el-select-list-dropdown__list"
                >
                  {this.props.children}
                </Scrollbar>
              </View>
      </div>
    )
  }
}

SelectList.childContextTypes = {
  component: PropTypes.any
};

SelectList.contextTypes = {
  form: PropTypes.any
}

SelectList.propTypes = {
  value: PropTypes.any,
  size: PropTypes.string,
  disabled: PropTypes.bool,
  multiple: PropTypes.bool,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onVisibleChange: PropTypes.func,
  onRemoveTag: PropTypes.func,
  onClear: PropTypes.func
}

export default SelectList;
