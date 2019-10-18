import React from "react";
import styled from "styled-components/macro";

const widthOffset = 100;

export default class TagInput extends React.Component {
  state = {
    editable: false,
    isFocused: false,
    tagInputWrapperWidth: 100,
    inputValue: ""
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
    return this.state.inputValue;
  };
  render() {
    const getShouldShowInputClass = () => {
      if (this.state.isFocused) {
        return true;
      } else if (this.inputRef && this.inputRef.value) {
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
    // const labelStyle = {
    //   width: `${this.state.tagInputWrapperWidth - 32}px`
    // };
    const labelStyle = {};
    return (
      <TagInputWrapper
        style={tagInputWrapperStyle}
        href="#"
        ref={tagInputWrapper => (this.tagInputWrapper = tagInputWrapper)}
        data-tag-length={this.props.dataTagLen}
        data-index={this.props.dataIndex}
        onFocus={() => {
          this.setState({
            isFocused: true
          });

          if (!this.state.inputValue) {
            this.setState({
              tagInputWrapperWidth: 200
            });
          }
        }}
        onBlur={() => {
          if (!this.state.inputValue) {
            this.setState({
              tagInputWrapperWidth: 100,
              isFocused: false
            });
          } else {
            this.setState({
              tagInputWrapperWidth: this.widthCalcRef.offsetWidth + widthOffset,
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
            onChange={e => {
              this.setState({
                inputValue: e.target.value
              });
            }}
            ref={inputRef => (this.inputRef = inputRef)}
            onBlur={() => {
              this.setState({
                tagInputWrapperWidth:
                  this.widthCalcRef.offsetWidth + widthOffset
              });
            }}
          />
        </label>
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
        <WidthCalcContentWrapper
          ref={widthCalcRef => (this.widthCalcRef = widthCalcRef)}
        >
          {this.getWidthCalcContent()}
        </WidthCalcContentWrapper>
      </TagInputWrapper>
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

const TagInputWrapper = styled.a`
  text-decoration: none;
  background: #f2f2f2;
  transition: width 0.3s ease;
  display: flex;
  margin-right: 0.3rem;
  height: var(--input-height);
  align-items: center;
  border-radius: var(--form-border-radius);
  min-width: 130px;

  &.is-focused {
    box-shadow: 0 0 4px var(--color-active-muted);
    border: 1px solid var(--color-active-muted);
  }

  & button {
    margin-left: auto;
    margin-right: 0;
    height: var(--input-height);
    width: var(--input-height);
    border-radius: var(--form-border-radius);
    border: 1px solid var(--color-separator);
  }

  & button:focus {
    box-shadow: 0 0 4px var(--color-active-muted);
    border: 1px solid var(--color-active-muted);
  }

  & label {
    display: flex;
    align-items: center;
    transition: width 0.3s ease;
    width: calc(100% - 30px);

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
