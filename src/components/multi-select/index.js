import React from "react";
import { removeObjIfDuplicateElseConcat } from "./utils";
import SelectListUnit from "./select-list-unit";
import "./style.css";

export default class MultiSelect extends React.Component {
  state = {
    allSelected: this.props.defaultSelected
  };
  componentDidUpdate(prevProps, prevState) {
    const sortedNextPropsDefaultSelected = this.props.defaultSelected.sort(
      (a, b) => a.value - b.value
    );
    const sortedStateAllSelected = this.state.allSelected.sort(
      (a, b) => a.value - b.value
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
    const selectedValues = this.state.allSelected.map(item => item.value);
    const allSelectedValues = data.reduce(function (acc, item) {
      return acc.concat({ value: item.value });
    }, []);
    const allSelectedValuesSansAll = allSelectedValues.filter(item => item.value !== "ALL")
    if (valueObj.value === "ALL") {
      if (selectedValues.indexOf("ALL") === -1 || allSelectedValuesSansAll.length === this.props.data.length - 1) {
        debugger;
        updatedAllSelected = [...allSelectedValues];
      } else {
        updatedAllSelected = [];
      }
    } else {
      if (allSelectedValuesSansAll.length === this.props.data.length - 1) {
        updatedAllSelected = removeObjIfDuplicateElseConcat(
          allSelected,
          valueObj,
          "value"
        );
      } else {
        updatedAllSelected = removeObjIfDuplicateElseConcat(
          allSelected,
          valueObj,
          "value"
        ).filter(item => item.value !== "ALL")
      }

    }
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
    const selectedValues = this.state.allSelected.map(item => item.value);
    if (value === "ALL") {
      // debugger;
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
      <ul
        className="custom-list-box"
        role="listbox"
        tabIndex="0"
        aria-label="React Multi-select Widget"
      >
        {data.map((item, index) => {
          return (
            <SelectListUnit
              isSelected={this.checkIsSelected(item.value)}
              dataLen={this.props.data.length}
              key={index}
              updateAllSelected={this.updateAllSelected}
              allSelected={allSelected}
              updateSelection={this.updateSelection}
              value={item.value}
              label={item.label}
            />
          );
        })}
      </ul>
    );
  }
}
