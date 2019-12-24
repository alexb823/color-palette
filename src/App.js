import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import Palette from './Palette';
import PaletteList from './PaletteList';
import NewPaletteForm from './NewPaletteForm';
import seedColors from './seedColors';
import generatePalette from './colorHelpers';
import SingleColorPalette from './SingleColorPalette';

function App() {
  const savedPalettes = JSON.parse(window.localStorage.getItem('palettes'));
  const [palettes, setPalettes] = useState(savedPalettes || seedColors);

  useEffect(() => {
    syncLocalStorage();
  }, [palettes])

  const findPalette = id => palettes.find(palette => palette.id === id);

  const savePalette = newPalette => {
    setPalettes([...palettes, newPalette]);
  };

  const syncLocalStorage = () => {
    window.localStorage.setItem('palettes', JSON.stringify(palettes));
  }

  return (
    <Switch>
      <Route
        exact
        path="/palette/new"
        render={routeProps => (
          <NewPaletteForm
            palettes={palettes}
            savePalette={savePalette}
            {...routeProps}
          />
        )}
      />
      <Route
        exact
        path="/"
        render={routeProps => (
          <PaletteList palettes={palettes} {...routeProps} />
        )}
      />
      <Route
        exact
        path="/palette/:id"
        render={({ match }) => (
          <Palette palette={generatePalette(findPalette(match.params.id))} />
        )}
      />
      <Route
        exact
        path="/palette/:paletteId/:colorId"
        render={({ match }) => (
          <SingleColorPalette
            palette={generatePalette(findPalette(match.params.paletteId))}
            colorId={match.params.colorId}
          />
        )}
      />
    </Switch>
  );
}

export default App;
