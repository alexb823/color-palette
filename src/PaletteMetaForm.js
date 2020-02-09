import React, { useState, useEffect, Fragment } from 'react';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';

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

  const [stage, setStage] = useState('form');
  const { palettes, colors, history, savePalette, hideForm } = props;

  const showEmojiPicker = event => {
    event.preventDefault();
    setStage('emoji');
  };

  const saveNewPalette = emoji => {
    const newPalette = {
      paletteName: newPaletteName,
      id: newPaletteName.toLocaleLowerCase().replace(/ /g, '-'),
      colors,
      emoji: emoji.native,
    };
    savePalette(newPalette);
    resetPaletteName();
    setStage('');
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
    <Fragment>
      <Dialog
        open={stage === 'form'}
        onClose={hideForm}
        aria-labelledby="choose-palette-name"
      >
        <DialogTitle id="choose-palette-name">
          Choose a Palette Name
        </DialogTitle>
        <ValidatorForm onSubmit={showEmojiPicker}>
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

      <Dialog
        open={stage === 'emoji'}
        onClose={hideForm}
        aria-labelledby="choose-palette-emoji"
      >
        <DialogTitle id="choose-palette-emoji">
          Choose a Palette Emoji
        </DialogTitle>
        <Picker title="Pick a Palette Emoji" onSelect={saveNewPalette} />
      </Dialog>
    </Fragment>
  );
};

export default PaletteMetaForm;
