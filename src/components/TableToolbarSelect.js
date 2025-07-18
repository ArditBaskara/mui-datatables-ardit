import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { withStyles } from 'tss-react/mui';
import MuiTooltip from '@mui/material/Tooltip';

const defaultToolbarSelectStyles = theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    flex: '1 1 100%',
    display: 'flex',
    position: 'relative',
    zIndex: 120,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: typeof theme.spacing === 'function' ? theme.spacing(1) : theme.spacing.unit,
    paddingBottom: typeof theme.spacing === 'function' ? theme.spacing(1) : theme.spacing.unit,
    '@media print': {
      display: 'none',
    },
  },
  title: {
    paddingLeft: '26px',
  },
  iconButton: {
    marginRight: '24px',
  },
  deleteIcon: {},
});

class TableToolbarSelect extends React.Component {
  static propTypes = {
    /** Options used to describe table */
    options: PropTypes.object.isRequired,
    /** Current row selected or not */
    rowSelected: PropTypes.bool,
    /** Callback to trigger selected rows delete */
    onRowsDelete: PropTypes.func,
    /** Extend the style applied to components */
    classes: PropTypes.object,
  };

  /**
   * @param {number[]} selectedRows Array of rows indexes that are selected, e.g. [0, 2] will select first and third rows in table
   */
  handleCustomSelectedRows = selectedRows => {
    if (!Array.isArray(selectedRows)) {
      throw new TypeError(`"selectedRows" must be an "array", but it's "${typeof selectedRows}"`);
    }

    if (selectedRows.some(row => typeof row !== 'number')) {
      throw new TypeError(`Array "selectedRows" must contain only numbers`);
    }

    const { options } = this.props;
    if (selectedRows.length > 1 && options.selectableRows === 'single') {
      throw new Error('Can not select more than one row when "selectableRows" is "single"');
    }
    this.props.selectRowUpdate('custom', selectedRows);
  };

  render() {
    const { classes, onRowsDelete, selectedRows, options, displayData, components = {} } = this.props;
    const textLabels = options.textLabels.selectedRows;
    const Tooltip = components.Tooltip || MuiTooltip;

    return (
      <Paper className={classes.root}>
        <div>
          <Typography variant="subtitle1" className={classes.title}>
            {selectedRows.data.length} {textLabels.text}
          </Typography>
        </div>
        {options.customToolbarSelect ? (
          options.customToolbarSelect(selectedRows, displayData, this.handleCustomSelectedRows)
        ) : (
          <Tooltip title={textLabels.delete}>
            <IconButton className={classes.iconButton} onClick={onRowsDelete} aria-label={textLabels.deleteAria}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={classes.deleteIcon}
                height="24"
                viewBox="0 0 24 24"
                width="24"
                fill="currentColor">
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-4.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z" />
              </svg>
            </IconButton>
          </Tooltip>
        )}
      </Paper>
    );
  }
}

export default withStyles(TableToolbarSelect, defaultToolbarSelectStyles, { name: 'MUIDataTableToolbarSelect' });
