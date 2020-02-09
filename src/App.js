import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Palette from './Palette';
import PaletteList from './PaletteList';
import NewPaletteForm from './NewPaletteForm';
import seedColors from './seedColors';
import generatePalette from './colorHelpers';
import SingleColorPalette from './SingleColorPalette';
import './App.css';

function App() {
  const savedPalettes = JSON.parse(window.localStorage.getItem('palettes'));
  const [palettes, setPalettes] = useState(savedPalettes || seedColors);

  const findPalette = id => palettes.find(palette => palette.id === id);

  const savePalette = newPalette => {
    setPalettes([...palettes, newPalette]);
  };

  const deletePalette = id => {
    setPalettes(palettes.filter(palette => palette.id !== id));
  };

  const syncLocalStorage = () => {
    window.localStorage.setItem('palettes', JSON.stringify(palettes));
  };

  useEffect(() => {
    syncLocalStorage();
  }, [palettes]);

  return (
    <Route
      render={({ location }) => (
        <TransitionGroup>
          <CSSTransition key={location.key} classNames="fade" timeout={500}>
            <Switch location={location}>
              <Route
                exact
                path="/palette/new"
                render={routeProps => (
                  <div className="page">
                    <NewPaletteForm
                      palettes={palettes}
                      savePalette={savePalette}
                      {...routeProps}
                    />
                  </div>
                )}
              />
              <Route
                exact
                path="/"
                render={routeProps => (
                  <div className="page">
                    <PaletteList
                      palettes={palettes}
                      deletePalette={deletePalette}
                      {...routeProps}
                    />
                  </div>
                )}
              />
              <Route
                exact
                path="/palette/:id"
                render={({ match }) => (
                  <div className="page">
                    <Palette
                      palette={generatePalette(findPalette(match.params.id))}
                    />
                  </div>
                )}
              />
              <Route
                exact
                path="/palette/:paletteId/:colorId"
                render={({ match }) => (
                  <div className="page">
                    <SingleColorPalette
                      palette={generatePalette(
                        findPalette(match.params.paletteId)
                      )}
                      colorId={match.params.colorId}
                    />
                  </div>
                )}
              />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      )}
    />
  );
}

export default App;
