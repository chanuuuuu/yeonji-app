import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Collapse } from '@material-ui/core';
import LoginForm from '../../organisms/LoginForm';
import Select from './Select';

import './Cover.css'
import { useEffect } from 'react';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    textAlign : 'center',
  },
}));

const Cover = (props) => {
  const classes = useStyles();
  const { isLogin, office } = props;
  const [open, setOpen] = React.useState(true);
 

  useEffect(()=>{
    setOpen(!isLogin);
  },[isLogin])

  return (
    <Container className="target" height="100%">
      <div className={classes.root}>
        <Collapse in={open} timeout={400}>
          <LoginForm setOpen={setOpen}/>
        </Collapse>
        <Collapse in={!open} timeout={400}>
          <Select office={office}/>
        </Collapse>
      </div>
    </Container>
  );
}

export default Cover;
