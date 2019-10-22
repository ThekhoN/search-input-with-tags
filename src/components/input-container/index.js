import React from "react";
import styled from "styled-components/macro";

export default class InputContainer extends React.Component {
  render() {
    return (
      <InputContainerWrapper className="input-tags-container">
        {this.props.children}
      </InputContainerWrapper>
    );
  }
}

const InputContainerWrapper = styled.div`
  display: flex;
  border: 1px solid var(--color-separator);
  padding: 1rem;
  min-width: 980px;
  border-radius: var(--form-border-radius);
  height: 38px;
  align-items: center;
  padding-left: var(--form-border-radius);
`;
