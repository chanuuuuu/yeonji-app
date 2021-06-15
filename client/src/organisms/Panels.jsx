import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import Check from '@material-ui/icons/Check';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Divider, Grid  } from '@material-ui/core';
import Success from './Success';
import green from '@material-ui/core/colors/green';
import MemberDataPanel from './MemberDataPanel';
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


const getEmoji = (state) =>{
  switch(state) {
    case null :
      return '';
    case 0 :
      return '';
    case 1 :
      return "❄️";
    case 2 :
      return '☁️'
    case 3 :
      return '☀️' ;
    default :
      return '';
  }
}

const defaultState = {
  morning : false,
  youth : false,
  afternoon : false,
  checkRequest: true
}

// key ,value를 이용하여 state의 값에 접근
const reducer = (state, action) => {
  switch (action.key) {
    case 'morning': {
      return { ...state, morning: !state.morning };
    }
    case 'youth': {
      return { ...state, youth: !state.youth };
    }
    case 'afternoon': {
      return { ...state, afternoon:!state.afternoon };
    }
    case 'reset' : {
      return defaultState;
    }
    case 'set' : {
      return action.value;
    }
    default: {
      return state;
    }
  }
};


const Panels = (props) => {
  const { memberList, checkedList } = props;
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [state, dispatch] = React.useReducer(reducer, defaultState);
  const [checkList, setCheckList] = React.useState(checkedList);
  const [defaultRequest, setRequest] = React.useState('');
  const [defaultUniqueness, setUniqueness] = React.useState('');
  const [exExpaneded, setExExpanded] = React.useState(false);

  const onUpdate = index => () => {
    const newCheckList = checkList.map((item, j) => {
        return (j === index) ? 1 : item;
          // 출석부가 작성되었으므로 1이 된다.
    });
    setCheckList(newCheckList);
  };

  // 오늘 출석부의 데이터 로드. 
  const getAttendanceData = (memberId) => {
    // 여기에 체크가 되지 않은 인원은 요청하지 않는다.
    axios.get(`${HOST}/member`, {
      params: {
        memberId
      }
    })
    .then((res)=>{
      const { error } = res.data;
      if(!error){
        const { data } = res.data;
        const { 
          morning,
          youth,
          afternoon,
          uniqueness,
          request,
          checkRequest
        } = data;
        dispatch({key: 'set', value: { morning, youth, afternoon, checkRequest }})
        setRequest(request);
        setUniqueness(uniqueness);
      }
     })
  }

  // 
  // expansion 열 때 반드시 모든 state 초기화 state는 공유

  // 1. false => true 일때는 리셋되어있으므로 데이터 가져오기를 위한 
  const handleChange = ({memberId, checked}) => (event, isExpanded) => {
    // 닫힐 때 isExpanded가 false이다
    setExExpanded(isExpanded);
    if(isExpanded){
      //열릴 떄 데이터를 로드한다.
      if(checked){
        getAttendanceData(memberId);
      }else{
        dispatch({ key: 'reset' });
      }
      // true => true일 경우,
      if(exExpaneded){
        setRequest('');
        setUniqueness('');
        setExpanded(memberId);
      }else{
        setTimeout(() => {
          setExpanded(memberId);

        }, 100);
      }
    } else {
      setExpanded(false);
      setRequest('');
      setUniqueness('');
    }
  };

  return (
    <div className={classes.root}>
      {memberList.map((member, index)=>{
        return(
          <ExpansionPanel  TransitionProps={{ unmountOnExit: true }} expanded={expanded === member.memberId} 
            onChange={handleChange({ memberId : member.memberId, checked : checkList[index] })} key={member.memberId}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Grid container direction="row" justify="space-between">
                <Grid item>
                  <Grid container direction="row">
                    <Grid item>
                      <Typography className={classes.heading}>{member.name}</Typography>
                    </Grid>
                    <Grid item> 
                      <Divider orientation="vertical" variant="middle" />
                    </Grid>
                    <Grid item>
                      <span role="img" style={{fontSize : '16px'}}>{getEmoji(member.attendancy)}</span>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  {(checkList[index] !== null) &&
                  <Success>
                    <Check />
                  </Success>
                  }
                </Grid>
              </Grid>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <MemberDataPanel member={member} state={state} dispatch={dispatch} 
                setExpanded={setExpanded} onUpdate={onUpdate(index)} checked={checkList[index]}
                defaultRequest={defaultRequest} defaultUniqueness={defaultUniqueness}
              />
            </ExpansionPanelDetails>
          </ExpansionPanel>
        )
      })}
    </div>
  );
}

export default Panels;