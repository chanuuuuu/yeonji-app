import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '../../organisms/Appbar';
import { Grid, Typography, CircularProgress, Paper, Divider } from '@material-ui/core';
import Slider from '../../organisms/Silder';
import { Lock } from '@material-ui/icons';
import useLoginValue from '../../utills/useLoginValue';
import useFetchData from '../../utills/useFetchData';
import CardList from './CardList';

const useStyles = makeStyles(theme => ({
  header: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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
  loading:{
    paddingTop : theme.spacing(3),
    paddingBottom : theme.spacing(3),
    width: '100%'
  }
}));

const marks = [
  {
    value: 0,
    label: '🙅‍♂️',
  },
  {
    value: 1,
    label: '👨‍👩‍👧‍👦',
  },
  {
    value: 2,
    label: '⛪️',
  }
];

const Request = () => {
  const classes = useStyles();
  const { isLogin, logout, loading, office } = useLoginValue();
  const [scope, setScope] = React.useState(1);

  const requestData = useFetchData('/request/list');

  const onChange= (event, value) =>{
    if(event){
      event.preventDefault();
    }
    if(!(scope === value)){
      setScope(value);
    }
  }

  return (
    <div>
      <AppBar isLogin={isLogin} logout={logout} loading={loading} office={office}/>
      <Grid container diretion="column" spacing={1} justify="center" style={{width : '100%', margin: '-2px'}}>
        <Grid item xs={12}>
          <Grid container direction="row" justify="center" className={classes.header} spacing={3}>
            <Grid item xs={5}>
              <Grid container direction="row" justify="flex-end">
                <Grid item>
                  <Lock className={classes.icon}/>
                </Grid>
                <Grid item>
                  <Typography align="right" className={classes.title}>범위</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={5}>
              <Slider aria-label="scope slider" className={classes.slider}
                step={1} defaultValue={1} marks={marks} valueLabelDisplay="on" 
                min={0}
                max={2}
                onChange={onChange}
                />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={8}>
          <div  className={classes.header}>
            <Typography style={{ fontSize: 15, fontWeight: 700 }}>기도제목</Typography>
          </div>
          <Divider variant="fullWidth"></Divider>
        </Grid>
        <Grid item xs={12}>
        {requestData.loading && (
        <Paper className={classes.loading}>
          <Typography style={{ fontSize: 15, fontWeight: 700, textAlign: 'center' }}>
          출석부 데이터를 로드 중입니다.
          </Typography>
          <div style={{ textAlign: 'center' }}><CircularProgress /></div>
        </Paper>
        )}
        {!requestData.loading && !requestData.error && (
        <CardList scope={scope} requestData={requestData}/>
        )}
        </Grid>
      </Grid>
    </div>
  );
}

export default Request;
