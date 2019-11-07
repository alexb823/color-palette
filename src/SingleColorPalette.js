import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';
import ColorBox from './ColorBox';
import styles from './styles/PaletteStyles';

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
    const { classes } = this.props;
    const { paletteName, emoji, id } = this.props.palette;
    const { format } = this.state;
    const colorBoxes = this._shades.map(color => (
      <ColorBox
        key={color.name}
        name={color.name}
        backgroundColor={color[format]}
        showingFullPalette={false}
      />
    ));
    return (
      <div className={classes.palette}>
        <Navbar changeFormat={this.changeFormat} showingAllColors={false}/>
        <div className={classes.colors}>
          {colorBoxes}
          <div className={classes.goBack}>
            <Link to={`/palette/${id}`}>GO BACK</Link>
          </div>
        </div>
        <PaletteFooter paletteName={paletteName} emoji={emoji} />
      </div>
    );
  }
}

export default withStyles(styles)(SingleColorPalette);
