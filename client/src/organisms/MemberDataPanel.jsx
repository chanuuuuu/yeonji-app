import React from 'react';
import { makeStyles, useTheme  } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Divider, Grid, Checkbox, } from '@material-ui/core';
import green from '@material-ui/core/colors/green';
import TextField from './TextField';
import SwipeableViews from 'react-swipeable-views';
import Button from './Button';
import axios from '../utills/axios';
import HOST from '../config';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  checked: {},
  checkboxRoot: {
    color: green[600],
    '&$checked': {
      color: green[500],
    },
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
    fontWeight: '700'
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  item: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    backgroundColor: '#f9f9f9'
  }
}));

const MemberDataPanel = (props) => {
  const { member, state, dispatch, setExpanded, onUpdate, 
    checked, defaultUniqueness, defaultRequest } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [page, setPage] = React.useState(0);

  const handleSubmit = member => (event) => {
    event.preventDefault();
    const request = document.getElementById(`request_${member.memberId}`).value || '';
    const uniqueness = document.getElementById(`uniqueness_${member.memberId}`).value || '';
    const { morning, youth, afternoon, checkRequest } = state;
    axios.post(`${HOST}/member/put`, {
      ...member,
      morning,
      youth,
      afternoon,
      request,
      uniqueness,
      checked,
      checkRequest
    })
      .then((res) => {
        if (res.data) {
          alert('입력되었습니다.');
          onUpdate();
        } else {
          alert('오류입니다. 총무에게 문의하세요.');
        }
      })
      .catch((reason) => {
        console.log(reason);
        alert('오류입니다. 총무에게 문의하세요.');
      });
            
    setTimeout(() => {
      setExpanded(false);
    }, 200);
  }

  const handlePage = page => () => {
    setPage(page);
  };


  return (
  <Grid container direcion="column" spacing={2}>
    <Grid item xs={12}>
      <Grid container direction="row">
        <Grid item xs={4}>
          <Grid container direction="column">
            <Grid item className={classes.item}>
              <Typography style={{fontSize : '16px'}}>오전</Typography>
            </Grid>
            <Grid item>
              <Divider variant="middle" />
            </Grid>
            <Grid item className={classes.item}>
              <Checkbox
                onChange={()=>{ dispatch({ key: 'morning' }); }}
                checked={state.morning}
                id={`morning_${member.memberId}`}
                classes={{
                  root: classes.checkboxRoot,
                  checked: classes.checked,
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Grid container direction="column">
            <Grid item className={classes.item}>
              <Typography style={{fontSize : '16px'}}>청년부</Typography>
            </Grid>
            <Grid item>
              <Divider variant="middle" />
            </Grid>
            <Grid item className={classes.item}>
              <Checkbox
                onChange={()=>{ dispatch({ key: 'youth' }); }}
                checked={state.youth}
                id={`youth_${member.memberId}`}
                classes={{
                  root: classes.checkboxRoot,
                  checked: classes.checked,
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Grid container direction="column">
            <Grid item className={classes.item}>
              <Typography style={{fontSize : '16px'}}>오후</Typography>
            </Grid>
            <Grid item>
              <Divider variant="middle" />
            </Grid>
            <Grid item className={classes.item}>
              <Checkbox
                onChange={()=>{ dispatch({ key: 'afternoon' }); }}
                checked={state.afternoon}
                id={`afternoon_${member.memberId}`}
                classes={{
                  root: classes.checkboxRoot,
                  checked: classes.checked,
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
    <Grid item xs={12} className={classes.text}>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={page}
        onChangeIndex={handlePage}
      >
        <div>
          <TextField
            fullWidth
            label="기도제목"
            multiline
            autoFocus
            rows="4"
            defaultValue={(checked) ? defaultRequest : ''}
            id={`request_${member.memberId}`}
            InputLabelProps={{
              shrink: true,
              fontSize: '30px'
            }}
          />
        </div>
        <div>
          <TextField
            fullWidth
            label="특이사항"
            multiline
            autoFocus
            rows="4"
            defaultValue={(checked) ? defaultUniqueness : ''}
            id={`uniqueness_${member.memberId}`}
            InputLabelProps={{
              shrink: true,
              fontSize: '30px'
            }}
          />
        </div>
      </SwipeableViews>
    </Grid>
    <Grid item container direction="row" justify="flex-end">
      <Grid item>
        <Button
          color="info"
          size="sm"
          onClick={
            handleSubmit(member)
          }
        >
          저장
        </Button>
      </Grid>
    </Grid>
  </Grid>
  );
}

export default MemberDataPanel;