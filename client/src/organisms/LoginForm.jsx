import React, { useState } from 'react';
import axios from '../utills/axios';
import history from '../history'
import {
  TextField,
  withStyles,
  Grid,
  Paper
} from '@material-ui/core';
import Button from './Button';
import HOST from '../config'

const styles = () => ({
  title: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    fontFamily: 'Noto Sans KR',
    fontWeight: '600'
  },
  button: {
    fontWeight: 800,
    width: '100%',
    fontFamily: 'Noto Sans KR',
  },
  image: {
    width: '50px',
    height: '50px',
    objectFit: 'cover',
    objectPosition: 'top',
    borderRadius: '50%'
  },
  imageSrc: {
    display: 'flex',
    backgroundSize: 'cover',
    backgroundPosition: 'inherit',
    width: '150px',
    height: '120px',
    maxWidth: '160px',
    maxHeight: '130px',
    margin: '0 auto',
  },
});

// TODO: 비밀번호 암호화하여 전달하기.
const LoginForm = (props) => {
  const {setOpen} = props;
  // 데이터가 변경되는 것일 때 state로 처리를 한다.
  const [userid, setUserid] = useState('');

  // 하나의 change로 값을 받을 수 있다.
  const onChange = (event) => {
      setUserid(event.target.value);
  };

  const login = (event) => {
    if (event) {
      event.preventDefault();
    }
    axios.post(`${HOST}/login`, {
      userid : userid,
      phonenum : '010',
    })
      .then((res) => {
        if (res.data[0]) {
          alert(res.data[1]);
        } else {
          setOpen(false);
          setTimeout(() => {
            history.push('/');
          }, 100);
          // 
        }
      })
      .catch((reason) => {
        console.log(reason);
        alert('회원이 아닙니다.');
      });
  };

  return (
    <Paper>
    <Grid container direction="column" spacing={4}>
      <Grid item>
        <TextField
          autoFocus
          label="이름"
          helperText="이름을 입력하세요."
          value={userid}
          onChange={onChange}
          margin="dense"
          name="userid"
          InputLabelProps={{ shrink: true }}
          style={{ width: '90%' }}
        />
      </Grid>
      <Grid>
        <Button
          color="info"
          size="sm"
          onClick={login} 
        >
          로그인
        </Button>
      </Grid>
    </Grid>
  </Paper>
  );
};

export default withStyles(styles)(LoginForm);
