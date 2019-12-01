import React, { useEffect } from 'react';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import useInputState from './hooks/useInputState';

const PaletteMetaForm = props => {
  const [
    newPaletteName,
    handlePaletteNameChange,
    resetPaletteName,
  ] = useInputState('');

  const { palettes, colors, history, savePalette, formOpen, hideForm } = props;

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

  useEffect(() => {
    ValidatorForm.addValidationRule('isPaletteNameUnique', () =>
      palettes.every(
        ({ paletteName }) =>
          paletteName.toLowerCase() !== newPaletteName.toLowerCase()
      )
    );
  }, [newPaletteName]);

  return (
    <Dialog
      open={formOpen}
      onClose={hideForm}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
      <ValidatorForm onSubmit={handleSubmit}>
        <DialogContent>
          <DialogContentText>
            Please enter a name for your new palette. Make sure it's unique!
          </DialogContentText>
          <TextValidator
            fullWidth
            margin="normal"
            label="Palette Name"
            value={newPaletteName}
            onChange={handlePaletteNameChange}
            validators={['required', 'isPaletteNameUnique']}
            errorMessages={[
              'This field is required',
              'Palette name must be unique',
            ]}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={hideForm} color="primary">
            Cancel
          </Button>
          <Button variant="contained" color="primary" type="submit">
            Save Palette
          </Button>
        </DialogActions>
      </ValidatorForm>
    </Dialog>
  );
};

export default PaletteMetaForm;
