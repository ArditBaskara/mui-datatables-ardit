import React from 'react';
import Grow from '@mui/material/Grow';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import { withStyles } from 'tss-react/mui';

function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this,
      args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

const defaultStyles = theme => ({
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
});

class _DebounceTableSearch extends React.Component {
  handleTextChangeWrapper = debouncedSearch => {
    return function(event) {
      debouncedSearch(event.target.value);
    };
  };

  componentDidMount() {
    document.addEventListener('keydown', this.onKeyDown, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown, false);
  }

  onKeyDown = event => {
    if (event.keyCode === 27) {
      this.props.onHide();
    }
  };

  render() {
    const { classes, options, onHide, searchText, debounceWait } = this.props;

    const debouncedSearch = debounce(value => {
      this.props.onSearch(value);
    }, debounceWait);

    const clearIconVisibility = options.searchAlwaysOpen ? 'hidden' : 'visible';
    const SearchSvg = ({ className }) => (
      <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        width="24"
        fill="currentColor"
        viewBox="0 0 24 24">
        <path d="M15.5 14h-.79l-.28-.27a6.471 6.471 0 001.48-5.34C15.22 5.01 12.21 2 8.5 2S1.78 5.01 1.78 8.39 4.79 14.78 8.5 14.78c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zM8.5 13C6.01 13 4 10.99 4 8.5S6.01 4 8.5 4 13 6.01 13 8.5 10.99 13 8.5 13z" />
      </svg>
    );

    const ClearSvg = () => (
      <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
      </svg>
    );

    return (
      <Grow appear in={true} timeout={300}>
        <div className={classes.main}>
          <SearchSvg className={classes.searchIcon} />
          <TextField
            variant={'standard'}
            className={classes.searchText}
            autoFocus={true}
            InputProps={{
              'data-test-id': options.textLabels.toolbar.search,
              'aria-label': options.textLabels.toolbar.search,
            }}
            defaultValue={searchText}
            onChange={this.handleTextChangeWrapper(debouncedSearch)}
            fullWidth={true}
            inputRef={el => (this.searchField = el)}
            placeholder={options.searchPlaceholder}
            {...(options.searchProps ? options.searchProps : {})}
          />
          <IconButton className={classes.clearIcon} style={{ visibility: clearIconVisibility }} onClick={onHide}>
            <ClearSvg />
          </IconButton>
        </div>
      </Grow>
    );
  }
}

var DebounceTableSearch = withStyles(_DebounceTableSearch, defaultStyles, { name: 'MUIDataTableSearch' });
export { DebounceTableSearch };

export function debounceSearchRender(debounceWait = 200) {
  return (searchText, handleSearch, hideSearch, options) => {
    return (
      <DebounceTableSearch
        searchText={searchText}
        onSearch={handleSearch}
        onHide={hideSearch}
        options={options}
        debounceWait={debounceWait}
      />
    );
  };
}
