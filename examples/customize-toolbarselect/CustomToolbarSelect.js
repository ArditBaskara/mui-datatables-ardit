import React from "react";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { withStyles } from "tss-react/mui";

const defaultToolbarSelectStyles = {
  iconButton: {
  },
  iconContainer: {
    marginRight: "24px",
  },
  inverseIcon: {
    transform: "rotate(90deg)",
  },
};

class CustomToolbarSelect extends React.Component {
  handleClickInverseSelection = () => {
    const nextSelectedRows = this.props.displayData.reduce((nextSelectedRows, _, index) => {
      if (!this.props.selectedRows.data.find(selectedRow => selectedRow.index === index)) {
        nextSelectedRows.push(index);
      }

      return nextSelectedRows;
    }, []);

    this.props.setSelectedRows(nextSelectedRows);
  };

  handleClickDeselectAll = () => {
    this.props.setSelectedRows([]);
  };

  handleClickBlockSelected = () => {
    console.log(`block users with dataIndexes: ${this.props.selectedRows.data.map(row => row.dataIndex)}`);
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.iconContainer}>
        <Tooltip title={"Deselect ALL"}>
          <IconButton className={classes.iconButton} onClick={this.handleClickDeselectAll}>
            <span className={classes.icon}>🚫</span>
          </IconButton>
        </Tooltip>
        <Tooltip title={"Inverse selection"}>
          <IconButton className={classes.iconButton} onClick={this.handleClickInverseSelection}>
            <span className={`${classes.icon} ${classes.inverseIcon}`}>🔁</span>
          </IconButton>
        </Tooltip>
        <Tooltip title={"Block selected"}>
          <IconButton className={classes.iconButton} onClick={this.handleClickBlockSelected}>
            <span className={classes.icon}>⛔</span>
          </IconButton>
        </Tooltip>
      </div>
    );
  }
}

export default withStyles(CustomToolbarSelect, defaultToolbarSelectStyles, { name: "CustomToolbarSelect" });
