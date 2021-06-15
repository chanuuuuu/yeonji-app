import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Divider, CircularProgress, Paper} from '@material-ui/core';
import Panels from '../../organisms/Panels';
import useFetchData from '../../utills/useFetchData';
import useLoginValue from '../../utills/useLoginValue';
import AppBar from '../../organisms/Appbar';

const useStyles = makeStyles(theme => ({
  header: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: 700
  },
  top: {
    marginTop : theme.spacing(2),
    marginBottom : theme.spacing(1),

  },
  birth : {
    fontWeight: 700, fontSize: 14
  },
  date : {
    fontSize: 13, marginLeft: '3px'
  },
  loading:{
    paddingTop : theme.spacing(3),
    paddingBottom : theme.spacing(3)
  }
}));

//각 패널들이 모든 state를 공유하고 열리는것만 억제할 수 있도록 하자.

const Attendance = () => {
  const { isLogin, logout, loading, office } = useLoginValue();
  const classes = useStyles();
  const memberData = useFetchData('/member/list');
  const now = new Date();
  const month = now.getMonth() + 1;
  const date = now.getDate();

  return (
    <div>
      <AppBar isLogin={isLogin} logout={logout} loading={loading} office={office}/>
      <Grid container diretion="column" spacing={2} justify="center">
        <Grid item xs={12} className={classes.top}>
          <Grid container direction='row' justify="space-evenly">
            <Grid item>
              <Grid container direction='row' spacing={1}>
                <Grid item>
                  <Typography align="left" style={{fontWeight: 700, fontSize: 14}} ><span role="img" aria-label="gift">🎁</span></Typography>
                </Grid>
                  {!memberData.loading && !memberData.error && (
                    memberData.payload.birthList.map((element)=>{
                      return (
                        <Grid item key={element.memberId}>
                          <Grid container diretion="row" className={classes.header}>
                            <Grid item>
                              <Typography className={classes.birth}>{element.name}</Typography>
                            </Grid>
                            {!(memberData.payload.birthList.length > 3) && (
                              <Grid item>
                                <Typography className={classes.date}>{new Date(element.birth).getMonth() +1}.{new Date(element.birth).getDate()}</Typography>
                              </Grid>
                            )}
                          </Grid>
                        </Grid>
                      )
                    })
                  )}
              </Grid>
              <Divider variant="fullWidth"></Divider>
            </Grid>
            <Grid item>
              <Typography align="right" style={{fontWeight: 700, fontSize: 14}}><span role="img" aria-label="calendar">📅</span> {month}월 {date}일</Typography>
              <Divider variant="fullWidth"></Divider>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={8}>
          <div  className={classes.header}>
            <Typography style={{ fontSize: 15, fontWeight: 700 }}>출석부</Typography>
          </div>
          <Divider variant="fullWidth"></Divider>
        </Grid>
        <Grid item xs={12}>
          {memberData.loading && (
            <Paper elevation={1} className={classes.loading}>
              <Typography style={{ fontSize: 15, fontWeight: 700, textAlign: 'center' }}>
              출석부 데이터를 로드 중입니다.
              </Typography>
              <div style={{ textAlign: 'center' }}><CircularProgress /></div>
            </Paper>
          )}
          {!memberData.loading && !memberData.error && (
            <Panels memberList={memberData.payload.memberList} checkedList={memberData.payload.checkedList}/>
          )}
        </Grid>
      </Grid>
    </div>
  );
}

export default Attendance;
