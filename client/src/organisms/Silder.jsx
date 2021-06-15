import { withStyles } from '@material-ui/core/styles';
import { Slider} from '@material-ui/core';

const iOSBoxShadow =
  '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)';

const IOSSlider = withStyles({
  root: {
    color: '#3880ff',
    height: 2,
    padding: '24px 0',
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    boxShadow: iOSBoxShadow,
    marginTop: -14,
    marginLeft: -14,
    '&:focus,&:hover,&$active': {
      boxShadow: '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        boxShadow: iOSBoxShadow,
      },
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 11px)',
    top: -0,
    '& *': {
      background: 'transparent',
      color: 'transparent',
    },
  },
  track: {
    height: 2,
  },
  rail: {
    height: 2,
    opacity: 0.5,
    backgroundColor: '#bfbfbf',
  },
  mark: {
    backgroundColor: '#bfbfbf',
    height: 8,
    width: 5,
    marginTop: -3,
  },
  markActive: {
    opacity: 1,
    backgroundColor: 'currentColor',
  },
  markLabel: {
    opacity: 0.4,
    fontSize: '19px'
  },
  markLabelActive: {
    opacity: 1,
    fontSize: '19px'
  }
})(Slider);

export default IOSSlider;
