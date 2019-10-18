import React from "react";

export default class SelectListUnit extends React.Component {
  state = {
    selected: false
  };
  updateState = (value, allSelected) => {
    if (this.props.value === "ALL") {
      console.log(this.props);
      if (this.props.dataLen - 1 === this.props.allSelected.length) {
        this.setState({
          selected: true
        });
      } else {
        this.setState({
          selected: false
        });
      }
    } else {
      const isSelected = allSelected.filter(e => e.value === value).length > 0;
      if (isSelected) {
        this.setState({
          selected: true
        });
      } else {
        this.setState({
          selected: false
        });
      }
    }
  };
  componentDidMount() {
    const { value, allSelected } = this.props;
    this.updateState(value, allSelected);
  }
  componentWillReceiveProps(nextProps) {
    const { value } = this.props;
    const { allSelected } = nextProps;
    this.updateState(value, allSelected);
  }
  handleActiveClass = () => {
    const { selected } = this.state;
    const activeClass = selected ? "selected" : "";
    return activeClass;
  };
  dispatchSelectValue = () => {
    const { value } = this.props;
    this.props.updateAllSelected({ value });
  };
  onKeyDownHandler = e => {
    if (e.which === 32 || e.which === 13) {
      const { value } = this.props;
      this.props.updateAllSelected({ value });
    }
  };
  render() {
    this.handleActiveClass();
    const { selected } = this.state;
    const { label } = this.props;
    return (
      <li
        onClick={this.dispatchSelectValue}
        onKeyDown={this.onKeyDownHandler}
        role="option"
        tabIndex="0"
        aria-label={label}
        className={`custom-list-box__option ${this.handleActiveClass()}`}
        aria-selected={selected}
      >
        {label}
      </li>
    );
  }
}
