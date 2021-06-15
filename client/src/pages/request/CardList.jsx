import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography, Divider, Grow  } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
  header: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom :'12px'
  },
  icon: {
    fontWeight: 700,
    fontSize: '19px'
  },
  slider: {
    width : '100%',
    minWidth: 140,
  },
  margin: {
    height: theme.spacing(3),
  },
  title : {
    fontWeight: 700,
    fontSize: '16px'
  },
  paper: {
    padding: theme.spacing(1),
    width: '100%',
    backgroundColor :'rgb(252, 252, 252)'
  }
}));

const CardList = (props) => {
  const classes = useStyles();
  const { requestData, scope } = props;

  return (
    <div>
      <Grid container direction="column">
        {requestData.payload[scope].map((element, index)=>{
          return(
            <Grid item xs={12} className={classes.header} key={`request_${index}`}>
              <Grow in={true} timeout={1000* index}>
                <Paper elevation={1} className={classes.paper}>
                  <Grid container direction="column">
                    <Grid item xs={3} style={{marginBottom: '5px'}}>
                      <Typography style={{ fontSize: 16, fontWeight: 700 }}>{element.name}</Typography>
                      <Divider></Divider>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container direction="column">
                        {element.request.replace(/"/g,'').split(/\\n/g).map((text, index)=>{
                          return(
                            <Grid item style={{ fontSize: 15, marginLeft: '10px'}} key={`request_${index}`}>
                              {text}
                            </Grid> )
                        })}
                      </Grid>
                    </Grid>
                  </Grid>
                </Paper>
              </Grow>
            </Grid>
          )
         })
        }
      </Grid>
    </div>
  );
}

export default CardList;
