import React from 'react';
import axios from './axios';
import HOST from '../config';
import history from '../history';

const useLoginValue = () => {
  const [isLogin, setisLogin] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [office, setOffice] = React.useState(1);
  // logout function
  const logout = () => {
    axios.get(`${HOST}/login/logout`)
      .then(() => {
        history.push('/');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  React.useLayoutEffect(() => {
    axios.get(`${HOST}/login/check`)
      .then((res) => {
        if (!res.data.error) {
          setOffice(res.data.office);
          setLoading(false);
          setisLogin(true);
        }else{
          setLoading(false);
          setisLogin(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return {
    isLogin, logout, loading, office
  };
};

export default useLoginValue;
