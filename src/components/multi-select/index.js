import React from "react";
import { removeObjIfDuplicateElseConcat } from "../../utils";
import SelectListUnit from "./select-list-unit";
import styled from "styled-components/macro";
import { KEY } from "../../App";

export default class MultiSelect extends React.Component {
  state = {
    allSelected: this.props.defaultSelected
  };
  componentDidUpdate() {
    const sortedNextPropsDefaultSelected = this.props.defaultSelected.sort(
      (a, b) => a[KEY] - b[KEY]
    );
    const sortedStateAllSelected = this.state.allSelected.sort(
      (a, b) => a[KEY] - b[KEY]
    );

    if (
      JSON.stringify(sortedNextPropsDefaultSelected) !==
      JSON.stringify(sortedStateAllSelected)
    ) {
      this.setState({
        allSelected: sortedNextPropsDefaultSelected
      });
    }
  }
  updateSelection = valueObj => {
    const { allSelected } = this.state;
    const { data } = this.props;
    let updatedAllSelected = [...allSelected];
    const selectedValues = this.state.allSelected.map(item => item[KEY]);
    const allSelectedValues = data.reduce(function(acc, item) {
      return acc.concat({ [KEY]: item[KEY] });
    }, []);
    const allSelectedValuesSortedSansAll = data
      .filter(item => item[KEY] !== "ALL")
      .map(item => item[KEY])
      .sort();

    if (valueObj[KEY] === "ALL") {
      if (selectedValues.indexOf("ALL") === -1) {
        updatedAllSelected = allSelectedValues;
      } else {
        updatedAllSelected = [];
      }
    } else {
      // toggle
      // remove if already selected
      // else add
      updatedAllSelected = removeObjIfDuplicateElseConcat(
        allSelected,
        valueObj,
        [KEY]
      );

      // removed item
      if (updatedAllSelected.length < allSelected.length) {
        // remove "ALL"
        updatedAllSelected = updatedAllSelected.filter(
          item => item[KEY] !== "ALL"
        );
      }

      const updatedAllSelectedValuesSorted = updatedAllSelected
        .map(item => item[KEY])
        .sort();

      // compare if all items(other than "ALL") are selected
      if (
        JSON.stringify(allSelectedValuesSortedSansAll) ===
        JSON.stringify(updatedAllSelectedValuesSorted)
      ) {
        updatedAllSelected = allSelectedValues;
      }
    }

    // sort
    updatedAllSelected = updatedAllSelected.sort((a, b) => {
      if (a[KEY].toString() > b[KEY].toString()) {
        return 1;
      } else {
        return -1;
      }
    });

    this.setState(
      {
        allSelected: updatedAllSelected
      },
      () => {
        this.props.onChangeSelection(this.state.allSelected);
      }
    );
  };
  checkIsSelected = value => {
    const selectedValues = this.state.allSelected.map(item => item[KEY]);
    if (value === "ALL") {
      if (
        selectedValues.length === this.props.data.length - 1 ||
        selectedValues.indexOf(value) > -1
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      if (selectedValues.indexOf(value) > -1) {
        return true;
      } else {
        return false;
      }
    }
  };
  render() {
    const { data } = this.props;
    const { allSelected } = this.state;
    return (
      <MultiSelectWrapper
        role="listbox"
        tabIndex="0"
        aria-label="React Multi-select Widget"
      >
        {data.map((item, index) => {
          return (
            <SelectListUnit
              isSelected={this.checkIsSelected(item[KEY])}
              dataLen={this.props.data.length}
              key={index}
              updateAllSelected={this.updateAllSelected}
              allSelected={allSelected}
              updateSelection={this.updateSelection}
              value={item[KEY]}
              label={item[KEY]}
            />
          );
        })}
      </MultiSelectWrapper>
    );
  }
}

const MultiSelectWrapper = styled.ul`
  padding: 1rem;
  max-width: 320px;
  text-align: left;
  border: 1px dashed #ccc;
  list-style: none;
  margin-bottom: 1rem;

  &:focus {
    box-shadow: 0 0 4px var(--color-active-muted);
    border: 1px solid var(--color-active-muted);
  }
`;
