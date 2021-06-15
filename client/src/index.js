import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Switch, Route } from 'react-router-dom';
import * as serviceWorker from './utills/serviceWorker';

import Attendance from './pages/attendance/Attendance';
import Request from './pages/request/Request';
import Admin from './pages/admin/Admin';
import App from './pages/main/App';
// react-router-dom의 Router를 사용할 때는 각 페이지마다의 hash가 필요하므로 history 라이브러리가 필요하다.
import history from './history';


const router = (
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/request" component={Request} />
      <Route exact path="/attendance" component={Attendance} />
      <Route exact path="/admin" component={Admin} />

    </Switch>
  </Router>
);


ReactDOM.render(router, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
