import React from "react";

export default class SelectListUnit extends React.Component {
  handleActiveClass = () => {
    const { isSelected } = this.props;
    const activeClass = isSelected ? "isSelected" : "";
    return activeClass;
  };
  updateSelection = () => {
    const { value } = this.props;
    this.props.updateSelection({ value });
  };
  onKeyDownHandler = e => {
    if (e.which === 32 || e.which === 13) {
      const { value } = this.props;
      this.props.updateSelection({ value });
    }
  };
  render() {
    this.handleActiveClass();
    // const { isSelected } = this.props;
    const isSelected = false;
    const { label } = this.props;
    return (
      <li
        onClick={this.updateSelection}
        onKeyDown={this.onKeyDownHandler}
        role="option"
        tabIndex="0"
        aria-label={label}
        className={`custom-list-box__option ${this.handleActiveClass()}`}
        aria-selected={isSelected}
      >
        {label}
      </li>
    );
  }
}
