import React from 'react';
import Grow from '@mui/material/Grow';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles({ name: 'MUIDataTableSearch' })(theme => ({
  main: {
    display: 'flex',
    flex: '1 0 auto',
    alignItems: 'center',
  },
  searchIcon: {
    color: theme.palette.text.secondary,
    marginRight: '8px',
  },
  searchText: {
    flex: '0.8 0',
  },
  clearIcon: {
    '&:hover': {
      color: theme.palette.error.main,
    },
  },
}));

const TableSearch = ({ options, searchText, onSearch, onHide }) => {
  const { classes } = useStyles();

  const handleTextChange = event => {
    onSearch(event.target.value);
  };

  const onKeyDown = event => {
    if (event.key === 'Escape') {
      onHide();
    }
  };

  const clearIconVisibility = options.searchAlwaysOpen ? 'hidden' : 'visible';

  return (
    <Grow appear in={true} timeout={300}>
      <div className={classes.main}>
        <span style={{ marginRight: '8px' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
            <path d="M15.5 14h-.79l-.28-.27a6.471 6.471 0 001.48-5.34C15.15 5.59 12.26 3 8.99 3S2.83 5.59 2.83 8.39c0 2.79 2.89 5.38 6.16 5.38a6.48 6.48 0 004.88-2.07l.27.28v.79l4.25 4.25 1.49-1.49L15.5 14zM8.99 13C6.24 13 4 10.76 4 8.39S6.24 3.78 8.99 3.78s4.99 2.24 4.99 4.61S11.74 13 8.99 13z" />
          </svg>
        </span>
        <TextField
          className={classes.searchText}
          autoFocus={true}
          variant={'standard'}
          InputProps={{
            'data-test-id': options.textLabels.toolbar.search,
          }}
          inputProps={{
            'aria-label': options.textLabels.toolbar.search,
          }}
          value={searchText || ''}
          onKeyDown={onKeyDown}
          onChange={handleTextChange}
          fullWidth={true}
          placeholder={options.searchPlaceholder}
          {...(options.searchProps ? options.searchProps : {})}
        />
        <IconButton className={classes.clearIcon} style={{ visibility: clearIconVisibility }} onClick={onHide}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.3 5.71a1 1 0 00-1.42 0L12 10.59 7.11 5.7a1 1 0 10-1.42 1.42L10.59 12l-4.9 4.89a1 1 0 101.42 1.42L12 13.41l4.89 4.9a1 1 0 001.42-1.42L13.41 12l4.9-4.89a1 1 0 000-1.4z" />
          </svg>
        </IconButton>
      </div>
    </Grow>
  );
};

export default TableSearch;
