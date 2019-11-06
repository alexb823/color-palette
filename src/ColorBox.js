import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';
import chroma from 'chroma-js';
import './ColorBox.css';

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
    const { name, backgroundColor, paletteId, id, showLink } = this.props;
    const { copied } = this.state;
    const isDarkColor = chroma(backgroundColor).luminance() <= 0.08;
    const isLightColor = chroma(backgroundColor).luminance() >= 0.8;
    return (
      <CopyToClipboard
        text={this.props.backgroundColor}
        onCopy={this.changeCopyState}
      >
        <div style={{ backgroundColor }} className="ColorBox">
          <div
            style={{ backgroundColor }}
            className={`copy-overlay ${copied && 'show'}`}
          />
          <div className={`copy-msg ${copied && 'show'}`}>
            <h1>copied!</h1>
            <p>{backgroundColor}</p>
          </div>
          <div className="copy-container">
            <div className="box-content">
              <span className={isDarkColor ? "light-text" : ""}>{name} {chroma(backgroundColor).luminance()}</span>
            </div>
            <button className="copy-button">Copy</button>
          </div>
          {showLink && (
            <Link
              to={`/palette/${paletteId}/${id}`}
              onClick={e => e.stopPropagation()}
            >
              <span className="see-more">More</span>
            </Link>
          )}
        </div>
      </CopyToClipboard>
    );
  }
}

export default ColorBox;
