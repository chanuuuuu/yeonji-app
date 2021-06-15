import React from 'react';
import AppBar from '../../organisms/Appbar';
import useLoginValue from '../../utills/useLoginValue';
import Cover from './Cover';

const App = () => {
  const { isLogin, logout, loading, office } = useLoginValue();
  //각 권한에 대한 경로변경

  return (
    <div>
      <AppBar isLogin={isLogin} logout={logout} office={office}/>
      {!loading && (
       <Cover isLogin={isLogin} office={office}/>
      )}
    </div>
  );
}

export default App;
