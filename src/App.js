import React from "react";
import "./App.css";
import TagInput from "./components/tag-input";
import InputContainer from "./components/input-container";
import MultiSelect from "./components/multi-select";
import styled from "styled-components/macro";

// 🤷 Shrug ¯\_(ツ)_/¯
// const data = [
//   {
//     value: "ALL",
//     label: "ALL"
//   },
//   {
//     value: "ID",
//     label: "ID"
//   },
//   {
//     value: "Track",
//     label: "Track"
//   },
//   {
//     value: "Artist",
//     label: "Artist"
//   },
//   {
//     value: "Author",
//     label: "Author"
//   }
// ];

const data = [
  {
    value: "ALL",
    label: "ALL"
  },
  {
    value: "Id",
    label: "Id"
  },
  {
    value: "Title",
    label: "Title"
  },
  {
    value: "Author",
    label: "Author"
  },
  {
    value: "Publisher",
    label: "Publisher"
  }
];

class App extends React.Component {
  state = {
    selectedTags: [data[1]],
    tagInputValueData: {}
  };
  tagSelectorRef = React.createRef();
  nextTabbableRef = React.createRef();
  removeTag = tag => {
    let updatedSelectedTags = this.state.selectedTags;
    updatedSelectedTags = updatedSelectedTags
      .filter(tagObj => tagObj.value !== tag)
      .filter(tagObj => tagObj.value !== "ALL");

    // update input values
    let updatedTagInputValueData = {};
    const { tagInputValueData } = this.state;
    for (let key in tagInputValueData) {
      if (key !== tag) {
        updatedTagInputValueData[key] = tagInputValueData[key];
      }
    }

    this.setState({
      selectedTags: updatedSelectedTags,
      tagInputValueData: updatedTagInputValueData
    });
  };
  onChangeTagSelection = selectedTags => {
    this.setState({
      selectedTags
    });
  };
  getTagInputValue = tag => {
    if (!this.state.tagInputValueData[tag]) {
      return "";
    } else {
      return this.state.tagInputValueData[tag];
    }
  };
  onTagInputValueChange = ({ key, value }) => {
    // debugger;
    let updatedTagInputValueData = this.state.tagInputValueData;
    updatedTagInputValueData[key] = value;
    this.setState({
      tagInputValueData: updatedTagInputValueData
    });
  };
  render() {
    const legitSearchTags = this.state.selectedTags.filter(selectedTag => {
      return selectedTag.value !== "ALL";
    });

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
            {legitSearchTags.map((tag, index) => {
              return (
                <TagInput
                  tagInputValue={this.getTagInputValue(tag.value)}
                  onTagInputValueChange={this.onTagInputValueChange}
                  tagSelectorRef={this.tagSelectorRef}
                  nextTabbableRef={this.nextTabbableRef}
                  dataTagLen={this.state.selectedTags.length}
                  dataIndex={index}
                  key={index}
                  label={tag.value}
                  removeTag={this.removeTag}
                />
              );
            })}
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
  border: 1px solid var(--color-active);
  height: 38px;
  padding: 0 2rem;
  border-radius: var(--form-border-radius);
  margin-left: 10px;
  color: var(--color-active);

  &:focus {
    box-shadow: 0 0 4px var(--color-active-muted);
    border: 1px solid var(--color-active-muted);
  }
`;

export default App;
