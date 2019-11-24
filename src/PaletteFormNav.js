import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { arrayMove } from 'react-sortable-hoc';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import useInputState from './hooks/useInputState';

const PaletteFormNav = props => {
  const {
    open,
    handleDrawerOpen,
    classes,
    palettes,
    colors,
    history,
    savePalette,
  } = props;

  const [
    newPaletteName,
    handlePaletteNameChange,
    resetPaletteName,
  ] = useInputState('');

  useEffect(() => {
    ValidatorForm.addValidationRule('isPaletteNameUnique', () =>
      palettes.every(
        ({ paletteName }) =>
          paletteName.toLowerCase() !== newPaletteName.toLowerCase()
      )
    );
  }, [newPaletteName]);

  const handleSubmit = () => {
    const newPalette = {
      paletteName: newPaletteName,
      id: newPaletteName.toLocaleLowerCase().replace(/ /g, '-'),
      colors,
    };
    savePalette(newPalette);
    resetPaletteName();
    history.push('/');
  };

  return (
    <div>
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
            Persistent drawer
          </Typography>

          <ValidatorForm onSubmit={handleSubmit}>
            <TextValidator
              label="Palette Name"
              value={newPaletteName}
              onChange={handlePaletteNameChange}
              validators={['required', 'isPaletteNameUnique']}
              errorMessages={[
                'This field is required',
                'Palette name must be unique',
              ]}
            />
            <Button variant="contained" color="primary" type="submit">
              Save Palette
            </Button>
            <Button
              variant="contained"
              color="secondary"
              component={Link}
              to="/"
            >
              Go Back
            </Button>
          </ValidatorForm>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default PaletteFormNav;
