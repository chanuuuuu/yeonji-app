import React from 'react';
import {
  withStyles,
  ButtonBase,
  Typography,
} from '@material-ui/core';
import history from '../../history'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  image: {
    position: 'relative',
    [theme.breakpoints.down('xs')]: {
      width: '50% !important', // Overrides inline-style
      height: 100,
    },
    [theme.breakpoints.up('sm')]: {
      height: 300,
    },
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.15,
      },
      '& $imageMarked': {
        opacity: 0,
      },
      '& $imageTitle': {
        border: '4px solid currentColor',
      },
    },
  },
  focusVisible: {},
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 80%',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.38,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(1)}px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
});


const pathByOffice = (scope) => {
  const basePath = [
    {
      url: '/pngs/regist/pray.jfif',
      title: '기도제목',
      width: '50%',
      path: '/request'
    },
  ]
  if(scope === 1){
    basePath.push({
      url: '/pngs/regist/check.jpg',
      title: '출석부',
      width: '50%',
      path: '/attendance'
    })
  }
  else if(scope === 2){
    basePath.push({
      url: '/pngs/regist/check.jpg',
      title: '출석현황',
      width: '50%',
      path: '/admin'
    })
  }
  return basePath;
};

const Select = (props) => {
  // props 는 전달하지 않아도 가능한가?
  const { classes, office } = props;
  
  return (
    <div className={classes.root}>
      {pathByOffice(office).map(image => (
        <ButtonBase
          focusRipple
          key={image.title}
          className={classes.image}
          focusVisibleClassName={classes.focusVisible}
          style={{
            width: image.width,
          }}
          onClick={e => {history.push(image.path)}}
        >
          <span
            className={classes.imageSrc}
            style={{
              backgroundImage: `url(${image.url})`,
            }}
          />
          <span className={classes.imageBackdrop} />
          <span className={classes.imageButton}>
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              className={classes.imageTitle}
            >
              {image.title}
              <span className={classes.imageMarked} />
            </Typography>
          </span>
        </ButtonBase>
      ))}
    </div>
  );
};


export default withStyles(styles)(Select);
