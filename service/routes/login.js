const express = require('express');
const passport = require('passport');
const doQuery = require('../model/doQuery');
const router = express.Router();
//
router.post('/', passport.authenticate('local'),
(req, res) => {
  const { message } = req.session.passport.user;
  if (message) {
    res.send([true, message]);
  }else{
    res.send([false, req.session.passport.user]);
  }
}
);


router.get('/check', (req, res) => {
  if (req.session.passport) {
    const { office } = req.session.passport.user
    res.send({
      error: false, office
    });
  } else {
    res.send({
      error: true,
    });
  }
});


router.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy(() => {
    console.log('로그아웃 되었습니다.');
  });
  res.end();
});


module.exports = router;
