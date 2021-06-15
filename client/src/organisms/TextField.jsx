import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';

const CssTextField = withStyles({
  root: {
    color: 'rgb(67, 160, 71)',
    borderColor: 'rgb(67, 160, 71)',
    '& .MuiFormLabel-root ': {
      color: 'rgba(0, 0, 0, 0.7)',
      fontSize : '19px',
      fontWeight: 700,
      marginBottom: 0
    },
    '& .MuiInputBase-input' : {
      paddingTop :'3px',
      fontSize : '15px'
    },
    '& .MuiInputBase-input:before': {
      color: 'rgb(67, 160, 71)',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'rgb(67, 160, 71)',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'rgb(67, 160, 71)',
      },
      '&:hover fieldset': {
        borderColor: 'rgb(67, 160, 71)',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'rgb(67, 160, 71)',
      },
    },
  },
})(TextField);

export default CssTextField;
