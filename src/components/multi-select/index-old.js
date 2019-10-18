import React from "react";
import { removeObjIfDuplicateElseConcat } from "./utils";
import SelectListUnit from "./select-list-unit";
import "./style.css";

export default class MultiSelect extends React.Component {
  state = {
    allSelected: [{ value: "2" }]
  };
  updateAllSelected = valueObj => {
    const { data } = this.props;
    const allSelectedValues = data.reduce(function(acc, item) {
      return acc.concat({ value: item.value });
    }, []);
    const { allSelected } = this.state;
    let updatedAllSelected;
    if (valueObj.value === "ALL") {
      if (allSelected.length === data.length) {
        updatedAllSelected = [];
      } else {
        updatedAllSelected = [...allSelectedValues];
      }
    } else {
      updatedAllSelected = removeObjIfDuplicateElseConcat(
        allSelected,
        valueObj,
        "value"
      );
    }
    this.setState({
      allSelected: updatedAllSelected
    });
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
              dataLen={this.props.data.length}
              key={index}
              updateAllSelected={this.updateAllSelected}
              allSelected={allSelected}
              value={item.value}
              label={item.label}
            />
          );
        })}
      </ul>
    );
  }
}
