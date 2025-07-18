import React from "react";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { withStyles } from "tss-react/mui";
const defaultToolbarStyles = {
  iconButton: {
  },
};

class CustomToolbar extends React.Component {
  
  handleClick = () => {
    console.log("clicked on icon!");
  }

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Tooltip title={"custom icon"}>
          <IconButton className={classes.iconButton} onClick={this.handleClick}>
            ➕
          </IconButton>
        </Tooltip>
      </React.Fragment>
    );
  }

}

export default withStyles(CustomToolbar, defaultToolbarStyles, { name: "CustomToolbar" });
