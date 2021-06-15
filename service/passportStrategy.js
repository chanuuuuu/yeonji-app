const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const doQuery = require('./model/doQuery');

// 암호화 체크 객체 생성
// const doQuery = require('./model/doQuery');

passport.serializeUser((user, done) => {
  console.log('serialize');
  done(null, user);
});

// 로그인이 되었을 때 매 요청시마다 자동으로 수행되는 session에서 인증된 req.user의 영역으로 저장하기.
passport.deserializeUser((user, done) => {
  // db에서 추가로 데이터를 req.user에 저장.
  done(null, user);
});


passport.use(new LocalStrategy(
  {
    usernameField: 'userid',
    passwordField : 'phonenum',
    session       :  true,
    passReqToCallback : false,
  },

  (userid, phonenum, done) => {
    console.log('로그인을 수행합니다.');
    const checkQuery = `
    SELECT memberId, cellId, birth, office, name
    FROM member
    WHERE name = ? `;

    doQuery(checkQuery, [userid])
      .then((row) => {
        if (row.result[0]) {
          const { memberId, cellId, birth, office, name } = row.result[0];
          // 셀리더 및 임원들만 사용가능.
          if(office < 1){
            return done(null, { message: '현재는 이용할 수 없습니다.' });
          }
          const user = {
            memberId, 
            cellId, 
            birth, 
            office, 
            name
          };
          return done(null, user);
        }
        return done(null, { message: '회원이 아닙니다.' });
      })
      .catch(errorData => done(errorData));
  }
));

module.exports = passport;
