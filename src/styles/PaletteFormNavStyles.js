import { makeStyles } from '@material-ui/core/styles';
import { DRAWER_WIDTH } from '../constants';

const drawerWidth = DRAWER_WIDTH;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '64px',
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  navButtons: {
    marginRight: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      marginRight: theme.spacing(0.5),
    },
  },
  button: {
    margin: theme.spacing(0, 1),
    [theme.breakpoints.down('xs')]: {
      margin: theme.spacing(0, 0.2),
      padding: theme.spacing(0.3),
    },
  },
}));

export default useStyles;
