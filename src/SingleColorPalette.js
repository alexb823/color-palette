import React, { Component } from 'react';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';

class SingleColorPalette extends Component {
  constructor(props) {
    super(props);
    this._shades = this.getShades(this.props.palette, this.props.colorId);
    this.state = { format: 'hex' };
    this.changeFormat = this.changeFormat.bind(this);
  }

  getShades({ colors }, colorId) {
    return Object.keys(colors)
      .map(shade => {
        return colors[shade].find(color => color.id === colorId);
      })
      .slice(1);
  }

  changeFormat(format) {
    this.setState({ format });
  }

  render() {
    const { paletteName, emoji } = this.props.palette;
    const { format } = this.state;
    const colorBoxes = this._shades.map(color => (
      <ColorBox
        name={color.name}
        backgroundColor={color[format]}
        showLink={false}
      />
    ));
    return (
      <div className="SingleColorPalette Palette">
        <Navbar changeFormat={this.changeFormat} showingAllColors={false}/>
        <div className="Palette-colors">
        {colorBoxes}
        <div className="go-back ColorBox" />
        </div>
        <PaletteFooter paletteName={paletteName} emoji={emoji} />
      </div>
    );
  }
}

export default SingleColorPalette;
