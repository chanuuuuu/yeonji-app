import React from 'react';
// nodejs library that concatenates classes
import classNames from 'classnames';
// nodejs library to set properties for components
import PropTypes from 'prop-types';

// material-ui components
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';

const hexToRgb = (paramInput) => {
  let input = paramInput;
  input += '';
  input = input.replace('#', '');
  const hexRegex = /[0-9A-Fa-f]/g;
  if (!hexRegex.test(input) || (input.length !== 3 && input.length !== 6)) {
    throw new Error('input is not a valid hex color.');
  }
  if (input.length === 3) {
    const first = input[0];
    const second = input[1];
    const last = input[2];
    input = first + first + second + second + last + last;
  }
  input = input.toUpperCase(input);
  const first = input[0] + input[1];
  const second = input[2] + input[3];
  const last = input[4] + input[5];
  return (
    `${parseInt(first, 16)
    }, ${
      parseInt(second, 16)
    }, ${
      parseInt(last, 16)}`
  );
};

const primaryColor = ['#9c27b0', '#ab47bc', '#8e24aa', '#af2cc5'];
const warningColor = ['#ff9800', '#ffa726', '#fb8c00', '#ffa21a'];
const dangerColor = ['#f44336', '#ef5350', '#e53935', '#f55a4e'];
const successColor = ['#4caf50', '#66bb6a', '#43a047', '#5cb860'];
const infoColor = ['#00acc1', '#26c6da', '#00acc1', '#00d3ee'];
const roseColor = ['#e91e63', '#ec407a', '#d81b60', '#eb3573'];
const grayColor = [
  '#999', '#777', '#3C4858', '#AAAAAA', '#D2D2D2', '#DDD',
  '#b4b4b4', '#555555', '#333', '#a9afbb', '#eee', '#e7e7e7',
];
const blueGrayColor = [
  '#eceff1', '#cfd8dc', '#b0bec5', '#90a4ae', '#78909c',
  '#607d8b', '#546e7a', '#455a64', '#37474f', '#263238',
];

const blackColor = '#000';
const whiteColor = '#FFF';


const buttonStyle = {
  button: {
    minHeight: 'auto',
    minWidth: 'auto',
    backgroundColor: grayColor[0],
    color: whiteColor,
    boxShadow:
      `0 2px 2px 0 rgba(${
        hexToRgb(grayColor[0])
      }, 0.14), 0 3px 1px -2px rgba(${
        hexToRgb(grayColor[0])
      }, 0.2), 0 1px 5px 0 rgba(${
        hexToRgb(grayColor[0])
      }, 0.12)`,
    border: 'none',
    borderRadius: '1px',
    position: 'relative',
    padding: '12px 30px',
    margin: '.3125rem 1px',
    fontSize: '12px',
    fontWeight: '400',
    textTransform: 'uppercase',
    letterSpacing: '0',
    willChange: 'box-shadow, transform',
    transition:
      'box-shadow 0.2s cubic-bezier(0.4, 0, 1, 1), background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    lineHeight: '1.42857143',
    textAlign: 'center',
    whiteSpace: 'nowrap',
    verticalAlign: 'middle',
    touchAction: 'manipulation',
    cursor: 'pointer',
    '&:hover,&:focus': {
      color: whiteColor,
      backgroundColor: grayColor[0],
      boxShadow:
        `0 14px 26px -12px rgba(${
          hexToRgb(grayColor[0])
        }, 0.42), 0 4px 23px 0px rgba(${
          hexToRgb(blackColor)
        }, 0.12), 0 8px 10px -5px rgba(${
          hexToRgb(grayColor[0])
        }, 0.2)`,
    },
    '& .fab,& .fas,& .far,& .fal, &.material-icons': {
      position: 'relative',
      display: 'inline-block',
      top: '0',
      marginTop: '-1em',
      marginBottom: '-1em',
      fontSize: '1.1rem',
      marginRight: '4px',
      verticalAlign: 'middle',
    },
    '& svg': {
      position: 'relative',
      display: 'inline-block',
      top: '0',
      width: '18px',
      height: '18px',
      marginRight: '4px',
      verticalAlign: 'middle',
    },
    '&$justIcon': {
      '& .fab,& .fas,& .far,& .fal,& .material-icons': {
        marginTop: '0px',
        position: 'absolute',
        width: '100%',
        transform: 'none',
        left: '0px',
        top: '0px',
        height: '100%',
        lineHeight: '41px',
        fontSize: '20px',
      },
    },
  },
  white: {
    '&,&:focus,&:hover': {
      backgroundColor: whiteColor,
      color: grayColor[0],
    },
  },
  rose: {
    backgroundColor: roseColor[0],
    boxShadow:
      `0 2px 2px 0 rgba(${
        hexToRgb(roseColor[0])
      }, 0.14), 0 3px 1px -2px rgba(${
        hexToRgb(roseColor[0])
      }, 0.2), 0 1px 5px 0 rgba(${
        hexToRgb(roseColor[0])
      }, 0.12)`,
    '&:hover,&:focus': {
      backgroundColor: roseColor[0],
      boxShadow:
        `0 14px 26px -12px rgba(${
          hexToRgb(roseColor[0])
        }, 0.42), 0 4px 23px 0px rgba(${
          hexToRgb(blackColor)
        }, 0.12), 0 8px 10px -5px rgba(${
          hexToRgb(roseColor[0])
        }, 0.2)`,
    },
  },
  primary: {
    backgroundColor: primaryColor[0],
    boxShadow:
      `0 2px 2px 0 rgba(${
        hexToRgb(primaryColor[0])
      }, 0.14), 0 3px 1px -2px rgba(${
        hexToRgb(primaryColor[0])
      }, 0.2), 0 1px 5px 0 rgba(${
        hexToRgb(primaryColor[0])
      }, 0.12)`,
    '&:hover,&:focus': {
      backgroundColor: primaryColor[0],
      boxShadow:
        `0 14px 26px -12px rgba(${
          hexToRgb(primaryColor[0])
        }, 0.42), 0 4px 23px 0px rgba(${
          hexToRgb(blackColor)
        }, 0.12), 0 8px 10px -5px rgba(${
          hexToRgb(primaryColor[0])
        }, 0.2)`,
    },
  },
  info: {
    backgroundColor: infoColor[0],
    boxShadow:
      `0 2px 2px 0 rgba(${
        hexToRgb(infoColor[0])
      }, 0.14), 0 3px 1px -2px rgba(${
        hexToRgb(infoColor[0])
      }, 0.2), 0 1px 5px 0 rgba(${
        hexToRgb(infoColor[0])
      }, 0.12)`,
    '&:hover,&:focus': {
      backgroundColor: infoColor[0],
      boxShadow:
        `0 14px 26px -12px rgba(${
          hexToRgb(infoColor[0])
        }, 0.42), 0 4px 23px 0px rgba(${
          hexToRgb(blackColor)
        }, 0.12), 0 8px 10px -5px rgba(${
          hexToRgb(infoColor[0])
        }, 0.2)`,
    },
  },
  success: {
    backgroundColor: successColor[0],
    boxShadow:
      `0 2px 2px 0 rgba(${
        hexToRgb(successColor[0])
      }, 0.14), 0 3px 1px -2px rgba(${
        hexToRgb(successColor[0])
      }, 0.2), 0 1px 5px 0 rgba(${
        hexToRgb(successColor[0])
      }, 0.12)`,
    '&:hover,&:focus': {
      backgroundColor: successColor[0],
      boxShadow:
        `0 14px 26px -12px rgba(${
          hexToRgb(successColor[0])
        }, 0.42), 0 4px 23px 0px rgba(${
          hexToRgb(blackColor)
        }, 0.12), 0 8px 10px -5px rgba(${
          hexToRgb(successColor[0])
        }, 0.2)`,
    },
  },
  warning: {
    backgroundColor: warningColor[0],
    boxShadow:
      `0 2px 2px 0 rgba(${
        hexToRgb(warningColor[0])
      }, 0.14), 0 3px 1px -2px rgba(${
        hexToRgb(warningColor[0])
      }, 0.2), 0 1px 5px 0 rgba(${
        hexToRgb(warningColor[0])
      }, 0.12)`,
    '&:hover,&:focus': {
      backgroundColor: warningColor[0],
      boxShadow:
        `0 14px 26px -12px rgba(${
          hexToRgb(warningColor[0])
        }, 0.42), 0 4px 23px 0px rgba(${
          hexToRgb(blackColor)
        }, 0.12), 0 8px 10px -5px rgba(${
          hexToRgb(warningColor[0])
        }, 0.2)`,
    },
  },
  danger: {
    backgroundColor: dangerColor[0],
    boxShadow:
      `0 2px 2px 0 rgba(${
        hexToRgb(dangerColor[0])
      }, 0.14), 0 3px 1px -2px rgba(${
        hexToRgb(dangerColor[0])
      }, 0.2), 0 1px 5px 0 rgba(${
        hexToRgb(dangerColor[0])
      }, 0.12)`,
    '&:hover,&:focus': {
      backgroundColor: dangerColor[0],
      boxShadow:
        `0 14px 26px -12px rgba(${
          hexToRgb(dangerColor[0])
        }, 0.42), 0 4px 23px 0px rgba(${
          hexToRgb(blackColor)
        }, 0.12), 0 8px 10px -5px rgba(${
          hexToRgb(dangerColor[0])
        }, 0.2)`,
    },
  },
  blueGray: {
    backgroundColor: blueGrayColor[6],
    boxShadow:
      `0 2px 2px 0 rgba(${
        hexToRgb(blueGrayColor[6])
      }, 0.14), 0 3px 1px -2px rgba(${
        hexToRgb(blueGrayColor[6])
      }, 0.2), 0 1px 5px 0 rgba(${
        hexToRgb(blueGrayColor[6])
      }, 0.12)`,
    '&:hover,&:focus': {
      backgroundColor: blueGrayColor[6],
      boxShadow:
        `0 14px 26px -12px rgba(${
          hexToRgb(blueGrayColor[6])
        }, 0.42), 0 4px 23px 0px rgba(${
          hexToRgb(blackColor)
        }, 0.12), 0 8px 10px -5px rgba(${
          hexToRgb(blueGrayColor[6])
        }, 0.2)`,
    },
  },
  simple: {
    '&,&:focus,&:hover': {
      color: whiteColor,
      background: 'transparent',
      boxShadow: 'none',
    },
    '&$rose': {
      '&,&:focus,&:hover,&:visited': {
        color: roseColor[0],
      },
    },
    '&$primary': {
      '&,&:focus,&:hover,&:visited': {
        color: primaryColor[0],
      },
    },
    '&$info': {
      '&,&:focus,&:hover,&:visited': {
        color: infoColor[0],
      },
    },
    '&$success': {
      '&,&:focus,&:hover,&:visited': {
        color: successColor[0],
      },
    },
    '&$warning': {
      '&,&:focus,&:hover,&:visited': {
        color: warningColor[0],
      },
    },
    '&$danger': {
      '&,&:focus,&:hover,&:visited': {
        color: dangerColor[0],
      },
    },
  },
  transparent: {
    '&,&:focus,&:hover': {
      color: 'inherit',
      background: 'transparent',
      boxShadow: 'none',
    },
  },
  disabled: {
    opacity: '0.65',
    pointerEvents: 'none',
  },
  lg: {
    padding: '1.125rem 2.25rem',
    fontSize: '0.875rem',
    lineHeight: '1.333333',
    borderRadius: '0.2rem',
  },
  sm: {
    padding: '0.40625rem 1.25rem',
    fontSize: '0.6875rem',
    lineHeight: '1.5',
    borderRadius: '0.2rem',
  },
  round: {
    borderRadius: '30px',
  },
  block: {
    width: '100% !important',
  },
  link: {
    '&,&:hover,&:focus': {
      backgroundColor: 'transparent',
      color: grayColor[0],
      boxShadow: 'none',
    },
  },
  justIcon: {
    paddingLeft: '12px',
    paddingRight: '12px',
    fontSize: '20px',
    height: '41px',
    minWidth: '20px',
    width: '41px',
    '& .fab,& .fas,& .far,& .fal,& svg,& .material-icons': {
      marginRight: '0px',
    },
    '&$lg': {
      height: '57px',
      minWidth: '57px',
      width: '57px',
      lineHeight: '56px',
      '& .fab,& .fas,& .far,& .fal,& .material-icons': {
        fontSize: '32px',
        lineHeight: '56px',
      },
      '& svg': {
        width: '32px',
        height: '32px',
      },
    },
    '&$sm': {
      height: '30px',
      minWidth: '30px',
      width: '30px',
      '& .fab,& .fas,& .far,& .fal,& .material-icons': {
        fontSize: '17px',
        lineHeight: '29px',
      },
      '& svg': {
        width: '17px',
        height: '17px',
      },
    },
  },
};

function RegularButton({ ...props }) {
  const {
    classes, color, round, children, disabled, simple,
    size, block, link, justIcon, className, muiClasses,
    ...rest
  } = props;

  const btnClasses = classNames({
    [classes.button]: true,
    [classes[size]]: size,
    [classes[color]]: color,
    [classes.round]: round,
    [classes.disabled]: disabled,
    [classes.simple]: simple,
    [classes.block]: block,
    [classes.link]: link,
    [classes.justIcon]: justIcon,
    [className]: className,
  });
  return (
    <Button {...rest} classes={muiClasses} className={btnClasses}>
      {children}
    </Button>
  );
}

RegularButton.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf([
    'primary',
    'info',
    'success',
    'warning',
    'danger',
    'rose',
    'white',
    'blueGray',
    'transparent',
  ]),
  size: PropTypes.oneOf(['sm', 'lg']),
  simple: PropTypes.bool,
  round: PropTypes.bool,
  disabled: PropTypes.bool,
  block: PropTypes.bool,
  link: PropTypes.bool,
  justIcon: PropTypes.bool,
  className: PropTypes.string,
  // use this to pass the classes props from Material-UI
  muiClasses: PropTypes.object,
};

export default withStyles(buttonStyle)(RegularButton);
