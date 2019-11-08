import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Palette from './Palette';
import PaletteList from './PaletteList';
import NewPaletteForm from './NewPaletteForm';
import seedColors from './seedColors';
import generatePalette from './colorHelpers';
import SingleColorPalette from './SingleColorPalette';

function App() {
  const findPalette = id => seedColors.find(palette => palette.id === id);
  return (
    <Switch>
    <Route exact path="/palette/new" render={() => <NewPaletteForm />} />
      <Route
        exact
        path="/"
        render={routeProps => (
          <PaletteList palettes={seedColors} {...routeProps} />
        )}
      />
      <Route
        exact
        path="/palette/:id"
        render={({ match }) => (
          <Palette
            palette={generatePalette(findPalette(match.params.id))}
            />
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
