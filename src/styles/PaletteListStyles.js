import bg from './bg.svg';

export default theme => ({
  root: {
    backgroundColor: '#294bad',
    backgroundImage: `url(${bg})`,
    /* background by SVGBackgrounds.com */
    height: '100vh',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    overflow: 'scroll',
  },
  container: {
    width: '55%',
    display: 'flex',
    flexDisplay: 'column',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    [theme.breakpoints.down('md')]: {
      width: '80%',
    },
    [theme.breakpoints.down('xs')]: {
      width: '75%',
    },
  },
  nav: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'white',
    '& a': {
      textDecoration: 'none',
      color: 'white',
    },
  },
  palettes: {
    boxSizing: 'border-box',
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 30%)',
    gridGap: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: 'repeat(2, 50%)',
    },
    [theme.breakpoints.down('xs')]: {
      gridTemplateColumns: 'repeat(1, 100%)',
      gridGap: theme.spacing(2),
    },
  },
  heading: {
    fontSize: '2rem',
  }
});
