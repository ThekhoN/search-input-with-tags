import React from "react";
import styled from "styled-components/macro";

const widthOffset = 100;
const maxWidth = 300;
const minWidth = 100;

export default class TagInput extends React.Component {
  state = {
    editable: false,
    isFocused: false,
    tagInputWrapperWidth: 100
  };
  makeEditable = e => {
    e.preventDefault();
    if (e.target === this.btnRef) {
      return;
    }
    this.setState({
      editable: true
    });
  };
  removeTag = () => {
    this.props.removeTag(this.props.label);
    this.props.nextTabbableRef.current.focus();
  };
  getWidthCalcContent = () => {
    return this.props.tagInputValue;
  };
  getUpdatedTagInputWrapperWidth = () => {
    if (!this.widthCalcRef || !this.widthCalcRef.offsetWidth) {
      return minWidth;
    }
    const calculatedWidth = this.widthCalcRef.offsetWidth + widthOffset;
    console.log("calculatedWidth: ", calculatedWidth);
    if (calculatedWidth > minWidth && calculatedWidth < maxWidth) {
      return calculatedWidth;
    } else if (calculatedWidth > maxWidth) {
      return maxWidth;
    } else {
      return minWidth;
    }
  };
  render() {
    const getShouldShowInputClass = () => {
      if (this.state.isFocused) {
        return true;
      } else if (
        (this.inputRef && this.inputRef.value) ||
        this.props.tagInputValue
      ) {
        return true;
      } else {
        return false;
      }
    };

    const shouldShowInputClass = getShouldShowInputClass()
      ? "should-show-input"
      : "";
    const isFocusedClass = this.state.isFocused ? "is-focused" : "";
    const tagInputWrapperStyle = {
      width: `${this.state.tagInputWrapperWidth}px`
    };
    const labelStyle = {};
    return (
      <TagInputOuterWrapper className="flex">
        <TagInputWrapper
          style={tagInputWrapperStyle}
          href="#"
          ref={tagInputWrapper => (this.tagInputWrapper = tagInputWrapper)}
          data-tag-length={this.props.dataTagLen}
          data-index={this.props.dataIndex}
          onFocus={() => {
            this.setState(
              {
                isFocused: true
              },
              () => {
                // this.inputRef.focus();
              }
            );

            if (!this.props.tagInputValue) {
              this.setState({
                tagInputWrapperWidth: 200
              });
            }
          }}
          onBlur={() => {
            if (!this.props.tagInputValue) {
              this.setState({
                tagInputWrapperWidth: minWidth,
                isFocused: false
              });
            } else {
              this.setState({
                tagInputWrapperWidth: this.getUpdatedTagInputWrapperWidth(),
                isFocused: false
              });
            }
          }}
          className={`tag-input-wrapper ${isFocusedClass} ${shouldShowInputClass}`}
          onClick={this.makeEditable}
        >
          <label style={labelStyle}>
            <span>{this.props.label}:</span>
            <input
              value={this.props.tagInputValue}
              onChange={e => {
                this.props.onTagInputValueChange({
                  key: this.props.label,
                  value: e.target.value
                });
              }}
              ref={inputRef => (this.inputRef = inputRef)}
              onBlur={() => {
                this.setState({
                  tagInputWrapperWidth: this.getUpdatedTagInputWrapperWidth()
                });
              }}
            />
          </label>

          <WidthCalcContentWrapper
            ref={widthCalcRef => (this.widthCalcRef = widthCalcRef)}
          >
            {this.getWidthCalcContent()}
          </WidthCalcContentWrapper>
        </TagInputWrapper>
        <button
          onClick={this.removeTag}
          ref={btnRef => (this.btnRef = btnRef)}
          onBlur={() => {
            this.setState({
              editable: false
            });
          }}
        >
          ×
        </button>
      </TagInputOuterWrapper>
    );
  }
}

const WidthCalcContentWrapper = styled.span`
  visibility: hidden;
  position: absolute;
  border: 1px solid red;
  top: -9999px;
  left: -9999px;
`;

const TagInputOuterWrapper = styled.div`
  display: flex;
  margin-right: 0.3rem;
`;

const TagInputWrapper = styled.a`
  text-decoration: none;
  background: #f2f2f2;
  transition: width 0.3s ease;
  display: flex;
  height: var(--input-height);
  align-items: center;
  border-radius: var(--form-border-radius);
  min-width: 130px;

  &.is-focused {
    box-shadow: 0 0 4px var(--color-active-muted);
    border: 1px solid var(--color-active-muted);
  }

  & + button {
    margin-left: auto;
    margin-right: 0;
    height: var(--input-height);
    width: var(--input-height);
    border-radius: var(--form-border-radius);
    border: 1px solid var(--color-separator);
  }

  & + button:focus {
    box-shadow: 0 0 4px var(--color-active-muted);
    border: 1px solid var(--color-active-muted);
  }

  & label {
    display: flex;
    align-items: center;
    transition: width 0.3s ease;
    // width: calc(100% - 30px);
    width: 100%;

    span {
      padding-left: 10px;
      padding-right: 10px;
      color: var(--color-active);
    }
  }

  & input {
    opacity: 0;
    width: 0;
    height: var(--input-height);
    border: 1px solid var(--color-separator);
    border-right: none;
    outline: 0;
    padding-left: 5px;
    font-size: inherit;

    &:focus {
      box-shadow: 0 0 4px var(--color-active-muted);
      border: 1px solid var(--color-active-muted);
    }
  }

  &.should-show-input input {
    opacity: 1;
    width: 100%;
  }
`;
