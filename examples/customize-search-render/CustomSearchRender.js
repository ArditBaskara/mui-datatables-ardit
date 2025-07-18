import React from 'react';
import Grow from '@mui/material/Grow';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import { withStyles } from "tss-react/mui";

const defaultSearchStyles = theme => ({
  main: {
    display: 'flex',
    flex: '1 0 auto',
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

class CustomSearchRender extends React.Component {
  handleTextChange = event => {
    this.props.onSearch(event.target.value);
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
    const { classes, options, onHide, searchText } = this.props;

    return (
      <Grow appear in={true} timeout={300}>
        <div className={classes.main} ref={el => (this.rootRef = el)}>
          <TextField
            placeholder={'Custom TableSearch without search icon'}
            className={classes.searchText}
            InputProps={{
              'aria-label': options.textLabels.toolbar.search,
            }}
            value={searchText || ''}
            onChange={this.handleTextChange}
            fullWidth={true}
            inputRef={el => (this.searchField = el)}
          />
          <IconButton className={classes.clearIcon} onClick={onHide}>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24"
    viewBox="0 0 24 24"
    width="24"
    fill="currentColor"
  >
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 
             5 17.59 6.41 19 12 13.41 17.59 19 19 
             17.59 13.41 12z" />
  </svg>
</IconButton>

        </div>
      </Grow>
    );
  }
}

export default withStyles(CustomSearchRender, defaultSearchStyles, { name: 'CustomSearchRender' });
