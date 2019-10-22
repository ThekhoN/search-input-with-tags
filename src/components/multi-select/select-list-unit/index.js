import React from "react";
import styled from "styled-components/macro";

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
    const { label } = this.props;
    return (
      <SelectListUnitWrapper
        onClick={this.updateSelection}
        onKeyDown={this.onKeyDownHandler}
        role="option"
        tabIndex="0"
        aria-label={label}
        className={`${this.handleActiveClass()}`}
        aria-selected={this.props.isSelected}
      >
        {label}
      </SelectListUnitWrapper>
    );
  }
}

const SelectListUnitWrapper = styled.li`
  /* margin-bottom: 0.6rem; */
  position: relative;
  padding-left: 22px;
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;
  border: 1px solid transparent;
  display: flex;
  align-items: center;

  &:focus {
    box-shadow: 0 0 4px var(--color-active-muted);
    border: 1px solid var(--color-active-muted);
  }

  &:after {
    content: "";
    display: block;
    width: 10px;
    height: 10px;
    border: 1px solid rgba(0, 0, 0, 0.25);
    border-radius: 2px;
    position: absolute;
    left: 3px;
    top: 6px;
  }

  &.isSelected:after {
    content: "";
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAQAAAADpb+tAAAAaElEQVR4Xl3PIQoCQQCF4Y8JW42D1bDZ4iVEjDbxFpstYhC7eIVBZHkXFGw734sv/TqDQQ8Xb1udja/I8igeIm7Aygj2IpoKTGZnVRNxAHYi4iPiDlA9xX+aNQDFySziqDN6uSp6y7ofEMwZ05uUZRkAAAAASUVORK5CYII=);
    background-size: 100% 100%;
    display: block;
    width: 8px;
    height: 8px;
    position: absolute;
    left: 5px;
    top: 8px;
  }
`;
