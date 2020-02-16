import chroma from 'chroma-js';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme, props) => ({
  root: {
    width: '20%',
    height: '25%',
    margin: '0 auto',
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer',
    marginBottom: '-5px',
    '&:hover svg': {
      color: 'white',
      transform: 'scale(1.25)',
    },
    [theme.breakpoints.down('md')]: {
      width: '25%',
      height: '20%',
    },
    [theme.breakpoints.down('sm')]: {
      width: '50%',
      height: '10%',
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      height: '5%',
    },
  },
  boxContent: {
    display: 'flex',
    justifyContent: 'space-between',
    position: 'absolute',
    width: '100%',
    left: '0px',
    bottom: '0px',
    padding: '5px',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    fontSize: '12px',
    color: props =>
      chroma(props.color).luminance() <= 0.08
        ? 'rgba(255, 255, 255, 0.8)'
        : 'rgba(0, 0, 0, 0.6)',
  },
  deleteIcon: {
    transition: 'all 0.3s ease-in-out',
  },
}));

export default useStyles;
