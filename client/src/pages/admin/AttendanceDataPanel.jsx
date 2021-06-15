import React from 'react';
import { makeStyles  } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  item: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  head: {
    fontSize: 16, 
    fontWeight: 700,
  },
  text: {
    fontSize: 23, 
    fontWeight: 700
  },
  text2: {
    lineHeight: 1.1,
    fontSize: 35, 
    fontWeight: 700
  }
}));



const AttendanceDataPanel = (props) => {
  const { members } = props;
  const classes = useStyles();

  const getAttendanceIcon = ({afternoon, youth}) =>{
    const boolYouth = Boolean(youth)
    const boolAfternoon = Boolean(afternoon)
    if(boolYouth && boolAfternoon){
      return (
        <Typography className={classes.text} color="textSecondary">
          ⊠
        </Typography>
      )
    }else if(boolYouth){
      return (
        <Typography className={classes.text2} color="textSecondary">
         ⧅
        </Typography>
      )
    }else if (boolAfternoon){
      return (
        <Typography className={classes.text2} color="textSecondary">
         ⧄
        </Typography>
      )
    }else {
      return ''
    }
  }

  return (
  <Grid container direcion="row" spacing={1}>
    {members.map((member, index)=>{
      return(
        <Grid item xs={6} key={`attend_${index}`}>
          <Grid container direction="row" justify="space-between" className={classes.item}>
            <Grid item xs={6}>
              <Typography align="left" className={classes.head}>
               {member.name}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              {getAttendanceIcon(member)}
            </Grid>  
          </Grid>
        </Grid>
      )  
    })}
  </Grid>
  );
}

export default AttendanceDataPanel;