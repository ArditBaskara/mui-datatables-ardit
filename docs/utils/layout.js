import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import GitHub from '../icons/GitHub';
import withRoot from '../utils/withRoot';
import { withStyles } from 'tss-react/mui';
import Menu from './Menu';

/* eslint-disable import/no-webpack-loader-syntax  */
import lightTheme from '!raw-loader!prismjs/themes/prism.css';

const styles = theme => ({
  appBar: {
    backgroundColor: '#23232f',
  },
  toolBar: {
    justifyContent: 'space-between',
  },
  logo: {
    display: 'block',
    height: '56px',
    position: 'relative',
    top: '5px',
  },
  wrapper: {
    flex: '1 0 100%',
  },
  content: {
    flex: '1 0 100%',
    margin: '0 auto',
    padding: '16px 16px 0px 16px',
    marginTop: '64px',
    minHeight: '600px',
    maxWidth: '960px',
  },
  footer: {
    flex: '1 0 100%',
    marginTop: '32px',
  },
});

class Layout extends React.Component {
  state = {
    drawerIsOpen: false,
  };

  componentDidMount() {
    const styleNode = document.createElement('style');
    styleNode.setAttribute('data-prism', 'true');
    if (document.head) {
      document.head.appendChild(styleNode);
    }

    styleNode.textContent = lightTheme;
  }

  toggleDrawer = () => {
    const drawerIsOpen = this.state.drawerIsOpen ? false : true;
    this.setState({ drawerIsOpen });
  };

  render() {
    const { classes, children } = this.props;
    const { drawerIsOpen } = this.state;

    return (
      <div className={classes.wrapper}>
        <Menu isOpen={drawerIsOpen} toggle={this.toggleDrawer} />
        <AppBar classes={{ root: classes.appBar }}>
          <Toolbar classes={{ root: classes.toolBar }}>
            <IconButton onClick={this.toggleDrawer} color="inherit" aria-label="open drawer">
              📂
            </IconButton>
            <a href="/">
              <img className={classes.logo} src="/static/header.png" alt="Home" border="0" />
            </a>
            <Tooltip id="appbar-github" title="Material-UI Datatables repo" enterDelay={300}>
              <IconButton
                component="a"
                color="inherit"
                href="https://github.com/gregnb/mui-datatables"
                aria-labelledby="appbar-github">
                <GitHub />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
        <main id="main-content" className={classes.content}>
          {children}
        </main>
        <footer className={classes.footer} />
      </div>
    );
  }
}

export default withRoot(withStyles(Layout, styles));
