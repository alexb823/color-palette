import React, { useState, useEffect, Fragment } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { ChromePicker } from 'react-color';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import useInputState from './hooks/useInputState';

const ColorPickerForm = props => {
  const { paletteIsFull, colors, setColors } = props;
  const [currentColor, setCurrentColor] = useState('teal');
  const [newClrName, handleClrNameChange, resetClrName] = useInputState('');

  useEffect(() => {
    ValidatorForm.addValidationRule('isColorNameUnique', () =>
      colors.every(
        ({ name }) => name.toLowerCase() !== newClrName.toLowerCase()
      )
    );
    ValidatorForm.addValidationRule('isColorUnique', () =>
      colors.every(({ color }) => color !== currentColor)
    );
  }, [colors, currentColor, newClrName]);

  const updateCurrentColor = newColor => {
    setCurrentColor(newColor.hex);
  };

  const addNewColor = () => {
    const newColor = { color: currentColor, name: newClrName };
    setColors([...colors, newColor]);
    resetClrName();
  };

  return (
    <Fragment>
      <ChromePicker
        color={currentColor}
        onChangeComplete={updateCurrentColor}
      />
      <ValidatorForm onSubmit={addNewColor}>
        <TextValidator
          value={newClrName}
          onChange={handleClrNameChange}
          validators={['required', 'isColorNameUnique', 'isColorUnique']}
          errorMessages={[
            'This field is required',
            'Color Name Must Be Unique',
            'Color Must Be Unique',
          ]}
        />
        <Button
          variant="contained"
          type="submit"
          color="primary"
          disabled={paletteIsFull}
          style={{ backgroundColor: paletteIsFull ? 'grey' : currentColor }}
        >
          {paletteIsFull ? 'Palette Full' : 'Add Color'}
        </Button>
      </ValidatorForm>
    </Fragment>
  );
};

export default ColorPickerForm;
