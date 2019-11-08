import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';
import styles from './styles/PaletteStyles';


class Palette extends Component {
  constructor(props) {
    super(props);
    this.state = { level: 500, format: 'hex' };
    this.changeLevel = this.changeLevel.bind(this);
    this.changeFormat = this.changeFormat.bind(this);
  }

  changeLevel(level) {
    this.setState({ level });
  }

  changeFormat(format) {
    this.setState({ format });
  }

  render() {
    const { classes } = this.props;
    const { colors, paletteName, id, emoji } = this.props.palette;
    const { level, format } = this.state;
    const colorBoxes = colors[level].map(color => (
      <ColorBox
        backgroundColor={color[format]}
        name={color.name}
        key={color.id}
        id={color.id}
        paletteId={id}
        showingFullPalette
      />
    ));

    return (
      <div className={classes.palette}>
        <Navbar
          level={level}
          changeLevel={this.changeLevel}
          changeFormat = { this.changeFormat }
          showingAllColors
        />
        <div className={classes.colors}>{colorBoxes}</div>
        <PaletteFooter paletteName={paletteName} emoji={emoji} />
      </div>
    );
  }
}

export default withStyles(styles)(Palette);
