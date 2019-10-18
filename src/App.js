import React from "react";
import "./App.css";
import TagInput from "./components/tag-input";
import InputContainer from "./components/input-container";
import MultiSelect from "./components/multi-select";
import styled from "styled-components/macro";

const data = [
  {
    value: "ALL",
    label: "ALL"
  },
  {
    value: "ID",
    label: "ID"
  },
  {
    value: "Track",
    label: "Track"
  },
  {
    value: "Artist",
    label: "Artist"
  },
  {
    value: "Author",
    label: "Author"
  }
];

class App extends React.Component {
  state = {
    selectedTags: [data[1]]
  };
  tagSelectorRef = React.createRef();
  nextTabbableRef = React.createRef();
  removeTag = tag => {
    console.log(this.state);
    let updatedSelectedTags = this.state.selectedTags;
    updatedSelectedTags = updatedSelectedTags.filter(
      tagObj => tagObj.value !== tag
    );
    this.setState({
      selectedTags: updatedSelectedTags
    });
    // debugger;
  };
  onChangeTagSelection = selectedTags => {
    this.setState({
      selectedTags
    });
  };
  render() {
    return (
      <div className="App">
        <MultiSelect
          defaultSelected={this.state.selectedTags}
          data={data}
          onChangeSelection={this.onChangeTagSelection}
          ref={this.tagSelectorRef}
        />
        <div className="flex">
          <InputContainer>
            {this.state.selectedTags.map((tag, index) => (
              <TagInput
                tagSelectorRef={this.tagSelectorRef}
                nextTabbableRef={this.nextTabbableRef}
                dataTagLen={this.state.selectedTags.length}
                dataIndex={index}
                key={index}
                label={tag.value}
                removeTag={this.removeTag}
              />
            ))}
          </InputContainer>
          <FetchButton ref={this.nextTabbableRef} className="fetch-button">
            Fetch
          </FetchButton>
        </div>
      </div>
    );
  }
}

const FetchButton = styled.button`
  border: 1px solid #ccc;
  height: 38px;
  padding: 0 2rem;
  border-radius: var(--form-border-radius);
  margin-left: 10px;
  background: var(--color-separator);

  &:focus {
    outline: 1px solid orange;
  }
`;

export default App;
