import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '../../organisms/Appbar';
import { Grid, Typography, CircularProgress, Paper, Divider } from '@material-ui/core';
import useLoginValue from '../../utills/useLoginValue';
import useFetchData from '../../utills/useFetchData';
import CellPanels from './CellPanels';

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

const Request = () => {
  const classes = useStyles();
  const { isLogin, logout, loading } = useLoginValue();

  const cellData = useFetchData('/admin/list');

  return (
    <div>
      <AppBar isLogin={isLogin} logout={logout} loading={loading} office={2}/>
      <Grid container diretion="column" spacing={1} justify="center" style={{width : '100%', margin: '-2px'}}>
        <Grid item xs={8}>
          <div  className={classes.header}>
            <Typography style={{ fontSize: 15, fontWeight: 700 }}>출석현황</Typography>
          </div>
          <Divider variant="fullWidth"></Divider>
        </Grid>
        <Grid item xs={12}>
        {cellData.loading && (
        <Paper className={classes.loading}>
          <Typography style={{ fontSize: 15, fontWeight: 700, textAlign: 'center' }}>
          현황 데이터를 로드 중입니다.
          </Typography>
          <div style={{ textAlign: 'center' }}><CircularProgress /></div>
        </Paper>
        )}
        {!cellData.loading && !cellData.error && (
          <CellPanels cellList={cellData.payload}/>
        )}
        </Grid>
      </Grid>
    </div>
  );
}

export default Request;
