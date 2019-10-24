import React from "react";
import "./App.css";
import TagInput from "./components/tag-input";
import MultiSelect from "./components/multi-select";
import styled from "styled-components/macro";

export const KEY = "value";
export const DEFAULT_TAG_INPUT_WIDTH = 160;

// 🤷 Shrug ¯\_(ツ)_/¯
const data = [
  {
    value: "ALL"
  },
  {
    value: "Adam ID"
  },
  {
    value: "Track"
  },
  {
    value: "Artist"
  },
  {
    value: "Author/Composer"
  }
];

// const data = [
//   {
//     value: "ALL",
//     label: "ALL"
//   },
//   {
//     value: "Id",
//     label: "Id"
//   },
//   {
//     value: "Title",
//     label: "Title"
//   },
//   {
//     value: "Author",
//     label: "Author"
//   },
//   {
//     value: "Publisher",
//     label: "Publisher"
//   }
// ];

export default class MultiFilterSearchWithInputTags extends React.Component {
  state = {
    selectedTags: [data[1]],
    tagInputValueData: {},
    tagInputWidthData: {}
  };
  tagSelectorRef = React.createRef();
  nextTabbableRef = React.createRef();
  removeTag = tag => {
    let updatedSelectedTags = this.state.selectedTags;
    updatedSelectedTags = updatedSelectedTags
      .filter(tagObj => tagObj[KEY] !== tag)
      .filter(tagObj => tagObj[KEY] !== "ALL");

    // tagInputValue
    let updatedTagInputValueData = this.state.tagInputValueData;
    updatedTagInputValueData[tag] = "";

    // width
    let updatedTagInputWidthData = this.state.tagInputWidthData;
    updatedTagInputWidthData[tag] = DEFAULT_TAG_INPUT_WIDTH;

    this.setState({
      selectedTags: updatedSelectedTags,
      tagInputValueData: updatedTagInputValueData
    });
  };
  onTagInputWidthChange = ({ key, width }) => {
    let updatedTagInputWidthData = this.state.tagInputWidthData;
    updatedTagInputWidthData[key] = width;
    this.setState({
      tagInputWidthData: updatedTagInputWidthData
    });
  };
  onChangeTagSelection = selectedTags => {
    const sortedSelectedTagValues = selectedTags.map(item => item[KEY]).sort();
    const sortedStateSelectedTagValues = this.state.selectedTags
      .map(item => item[KEY])
      .sort();

    // if select/de-select ALL
    // reset both tagInputValueData & tagInputWidthData
    if (sortedSelectedTagValues.length === 0) {
      this.setState({
        tagInputValueData: {},
        tagInputWidthData: {}
      });
    }

    // update tagInputWidth and tagInputValue on de-selection
    if (sortedSelectedTagValues.length < sortedStateSelectedTagValues.length) {
      // difference
      let unselectedTags = sortedStateSelectedTagValues.filter(
        item => !sortedSelectedTagValues.includes(item)
      );

      const unselectedTag = unselectedTags.filter(item => item !== "ALL")[0];

      console.log("unselectedTag: ", unselectedTag);

      // tagInputValue
      let updatedTagInputValueData = this.state.tagInputValueData;
      updatedTagInputValueData[unselectedTag] = "";

      // width
      let updatedTagInputWidthData = this.state.tagInputWidthData;
      updatedTagInputWidthData[unselectedTag] = DEFAULT_TAG_INPUT_WIDTH;

      // update
      this.setState({
        tagInputValueData: updatedTagInputValueData,
        tagInputWidthData: updatedTagInputWidthData
      });
    }

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
  getTagInputWidth = tag => {
    if (!this.state.tagInputWidthData[tag]) {
      return DEFAULT_TAG_INPUT_WIDTH;
    } else {
      return this.state.tagInputWidthData[tag];
    }
  };
  onTagInputValueChange = ({ key, value }) => {
    let updatedTagInputValueData = this.state.tagInputValueData;
    updatedTagInputValueData[key] = value;
    this.setState({
      tagInputValueData: updatedTagInputValueData
    });
  };
  render() {
    const legitSearchTags = this.state.selectedTags.filter(selectedTag => {
      return selectedTag[KEY] !== "ALL";
    });

    return (
      <div className="App">
        <label>
          <LabelContainer>Search by:</LabelContainer>
          <div className="flex" style={{ marginTop: "1rem" }}>
            <MultiSelect
              defaultSelected={this.state.selectedTags}
              data={data}
              onChangeSelection={this.onChangeTagSelection}
              ref={this.tagSelectorRef}
            />
            <InputContainerWrapper>
              {legitSearchTags.map((tag, index) => {
                return (
                  <TagInput
                    onTagInputWidthChange={this.onTagInputWidthChange}
                    tagInputWidthData={this.state.tagInputWidthData}
                    tagInputWidth={this.getTagInputWidth(tag[KEY])}
                    tagInputValue={this.getTagInputValue(tag[KEY])}
                    onTagInputValueChange={this.onTagInputValueChange}
                    tagSelectorRef={this.tagSelectorRef}
                    nextTabbableRef={this.nextTabbableRef}
                    dataTagLen={this.state.selectedTags.length}
                    dataIndex={index}
                    key={index}
                    label={tag[KEY]}
                    removeTag={this.removeTag}
                  />
                );
              })}
            </InputContainerWrapper>
            <FetchButton ref={this.nextTabbableRef} className="fetch-button">
              Search
            </FetchButton>
          </div>
        </label>
      </div>
    );
  }
}

const LabelContainer = styled.span`
  text-align: left;
  display: block;
`;

const FetchButton = styled.button`
  border: 1px solid var(--color-active);
  height: 38px;
  padding: 0 2rem;
  border-radius: var(--form-border-radius);
  margin-left: 10px;
  color: var(--color-active);
  cursor: pointer;

  &:focus,
  &:hover {
    box-shadow: 0 0 4px var(--color-active-muted);
    border: 1px solid var(--color-active-muted);
  }
`;

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
