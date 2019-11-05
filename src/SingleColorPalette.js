import React, { Component } from 'react';
import ColorBox from './ColorBox';

class SingleColorPalette extends Component {
  constructor(props) {
    super(props);
    this._shades = this.getShades(this.props.palette, this.props.colorId);
    console.log(this._shades);
  }

  getShades({ colors }, colorId) {
    return Object.keys(colors)
      .map(shade => {
        return colors[shade].find(color => color.id === colorId);
      })
      .slice(1);
  }

  render() {
    const colorBoxes = this._shades.map(color => (
      <ColorBox
        name={color.name}
        backgroundColor={color.hex}
        showLink={false}
      />
    ));
    return (
      <div>
        <h1>Single Color Palette</h1>
        {colorBoxes}
      </div>
    );
  }
}

export default SingleColorPalette;
