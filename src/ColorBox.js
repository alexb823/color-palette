import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';
import chroma from 'chroma-js';
import { withStyles } from '@material-ui/styles';
import './ColorBox.css';

const styles = {
  colorBox: {
    width: '20%',
    height: ({ showingFullPalette }) => showingFullPalette ? '25%' : '50%',
    margin: '0 auto',
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer',
    marginBottom: '-3.5px',
    '&:hover button': {
      opacity: 1,
    }
  },
  copyText: {
    color: ({ backgroundColor }) => chroma(backgroundColor).luminance() >= 0.7 ? 'black' : 'white'
  },
  colorName: {
    color: ({ backgroundColor }) => chroma(backgroundColor).luminance() <= 0.08 ? 'white' : 'black'
  },
  seeMore: {
    color: ({ backgroundColor }) => chroma(backgroundColor).luminance() >= 0.7 ? 'rgba(0, 0, 0, 0.5)' : 'white',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    position: 'absolute',
    border: 'none',
    right: '0px',
    bottom: '0px',
    width: '60px',
    height: '30px',
    textAlign: 'center',
    lineHeight: '30px',
    textTransform: 'uppercase',
  },
  copyButton: {
    color: ({ backgroundColor }) => chroma(backgroundColor).luminance() >= 0.7 ? 'rgba(0, 0, 0, 0.5)' : 'white',
    width: '100px',
    height: '30px',
    position: 'absolute',
    display: 'inline-block',
    top: '50%',
    left: '50%',
    marginLeft: '-50px',
    marginTop: '-15px',
    textAlign: 'center',
    outline: 'none',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    fontSize: '1rem',
    lineHeight: '30px',
    textTransform: 'uppercase',
    border: 'none',
    textDecoration: 'none',
    opacity: 0,
  }
}

class ColorBox extends Component {
  constructor(props) {
    super(props);
    this.state = { copied: false };
    this.changeCopyState = this.changeCopyState.bind(this);
  }

  changeCopyState() {
    this.setState({ copied: true }, () => {
      setTimeout(() => this.setState({ copied: false }), 1500);
    });
  }
  render() {
    const { name, backgroundColor, paletteId, id, showingFullPalette, classes } = this.props;
    const { copied } = this.state;

    return (
      <CopyToClipboard
        text={this.props.backgroundColor}
        onCopy={this.changeCopyState}
      >
        <div style={{ backgroundColor }} className={classes.colorBox}>
          <div
            style={{ backgroundColor }}
            className={`copy-overlay ${copied && 'show'}`}
          />
          <div className={`copy-msg ${copied && 'show'}`}>
            <h1>copied!</h1>
            <p className={classes.copyText}>{backgroundColor}</p>
          </div><div className="copy-container">
            <div className="box-content">
              <span className={classes.colorName}>{name}</span>
            </div>
            <button className={classes.copyButton}>Copy</button>
          </div>
          {showingFullPalette && (
            <Link
              to={`/palette/${paletteId}/${id}`}
              onClick={e => e.stopPropagation()}
            >
              <span className={classes.seeMore}>MORE</span>
            </Link>
          )}
        </div>
      </CopyToClipboard>
    );
  }
}

export default withStyles(styles)(ColorBox);
