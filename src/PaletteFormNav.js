import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';

import PaletteMetaForm from './PaletteMetaForm';

const drawerWidth = 400;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '64px',
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  navButtons: {
    marginRight: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(0, 1),
  },
}));

const PaletteFormNav = props => {
  const classes = useStyles();
  const [formOpen, setFormOpen] = useState(false);
  const { open, handleDrawerOpen } = props;

  const showForm = () => {
    setFormOpen(true);
  };

  const hideForm = () => {
    setFormOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        color="default"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Create a Palette
          </Typography>
        </Toolbar>
        <div className={classes.navButtons}>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={showForm}
          >
            Save Palette
          </Button>
          <Button
            className={classes.button}
            variant="contained"
            color="secondary"
            component={Link}
            to="/"
          >
            Go Back
          </Button>
        </div>
      </AppBar>
      {formOpen && (
        <PaletteMetaForm {...props} formOpen={formOpen} hideForm={hideForm} />
      )}
    </div>
  );
};

export default PaletteFormNav;
