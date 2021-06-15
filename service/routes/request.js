const express = require('express');
const router = express.Router();
const pool = require('../model/connectionPool');

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.send(true);
});


const doConnectionQuery = ({ connection, queryState, params }) => new Promise((resolve, reject) => {
  connection.query(queryState, params, (err, result) => {
    if (err) {
      reject(err);
    } else {
      resolve(result);
    }
  });
});

router.get('/list', function(req, res, next) {
  // const { scope } = req.query;
  const cellId = req.session.passport.user.cellId;
  const memberId = req.session.passport.user.memberId;

  //2주전까지의 기도제목 데이터를 가져온다.
  const standard = new Date();
  standard.setDate(standard.getDate() - 14);
  const year = standard.getFullYear();
  const month = ('0' + (standard.getMonth() + 1)).slice(-2);
  const day =  ('0' + standard.getDate()).slice(-2);
  
  // 각 스코프에 맞는 list를 전달한다.
  const baseQuery = `
  SELECT *, DATE_FORMAT(date, '%Y-%m-%d') as days
  FROM prayerRequest
  WHERE DATE_FORMAT(date, '%Y-%m-%d') > '${year}-${month}-${day}'
  `

  const tailQuery = `
  ORDER BY days DESC
  `;

  const statementList = [
    {
      statement:  `AND memberId = ?`,
      params: [memberId]
    },
    {
      statement: `AND cellId = ?`,
      params: [cellId]  
    },
    {
      statement: ``,
      params: []
    }
  ].map(({statement, params})=>{
    return {
      params,
      statement: baseQuery + statement + tailQuery
    };
  });

  pool.getConnection((err, connection) => {
    if (err) {
      console.log(err);
      res.send(false);
    }
    Promise.all(
      statementList.map(({statement, params})=>{
        return doConnectionQuery({connection, queryState: statement, params })
      })
    )
    .then(([personalList, cellList, youthList]) => {
      connection.release();
      res.send([personalList, cellList, youthList]);
    })
    .catch((errorData) => {
      connection.release();
      console.log(errorData);
      res.send(false);
    });
  })
});


module.exports = router;
