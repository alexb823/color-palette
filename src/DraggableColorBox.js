import React from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    width: '20%',
    height: '25%',
    margin: '0 auto',
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer',
    marginBottom: '-3.5px',
  },
}));

const DraggableColorBox = ({ color, name }) => {
  const classes = useStyles();

  return (
    <div className={classes.root} style={{ backgroundColor: color }}>
      {name}
    </div>
  );
};

export default DraggableColorBox;
