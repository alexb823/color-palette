import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';

import PaletteMetaForm from './PaletteMetaForm';
import useStyles from './styles/PaletteFormNavStyles';

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
            <AddToPhotosIcon />
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
