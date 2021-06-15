const express = require('express');
const router = express.Router();
const doQuery = require('../model/doQuery');
const pool = require('../model/connectionPool');

/* GET users listing. */
router.get('/', function(req, res, next) {
  const { memberId } = req.query;
  const now = new Date();
  const year = now.getFullYear();
  const month = ('0' + (now.getMonth() + 1)).slice(-2);
  const day =  ('0' + now.getDate()).slice(-2);
  
  const selectQuery = `
  SELECT AD.memberId, AD.name, morning, youth, afternoon, uniqueness, request
  FROM (
  SELECT *
  FROM attendance
  WHERE DATE_FORMAT(date, '%Y-%m-%d') = '${year}-${month}-${day}'
  AND memberId = ?
  LIMIT 1 ) AS AD
  LEFT JOIN prayerRequest as PR
  ON (AD.memberId = PR.memberId and AD.date = PR.date )
  `

  doQuery(selectQuery, [memberId])
    .then((row) => {
      if(row.result.length !== 0){
        // 가져온 출석 데이터에 대한 전처리 실시
        const { morning, youth, afternoon, request, uniqueness } = row.result[0];
        const checkRequest = (request === null || request === ''); //request가 존재하지 않는경우.
        
        // JSON을 parse하여 전달.

        const data = {
          ...row.result[0],
          morning: Boolean(morning),
          youth: Boolean(youth),
          afternoon: Boolean(afternoon),
          checkRequest,
          request: JSON.parse(request),
          uniqueness: JSON.parse(uniqueness)
        }
        res.send({error : false, data });
      }else {
        // 오류일 경우에
        res.send({error : true});
      }
    })
});

router.get('/list', function(req, res, next) {
  // 셀리더가 memeber를 조회할 때,
  const cellId = req.session.passport.user.cellId;
  const standard = new Date();
  const year = standard.getFullYear();
  const month = ('0' + (standard.getMonth() + 1)).slice(-2);
  const day =  ('0' + standard.getDate()).slice(-2);
  
  //한달전부터의 출석 횟수를 가져온다.
  standard.setMonth(standard.getMonth() - 1);
  const selectQuery = 
  // '2020-02-02'
  `
  SELECT C.memberId, C.name, cellId, birth, attendancy, checked
  FROM (
  SELECT member.memberId, member.name, cellId, birth, attendancy
  FROM member
  LEFT JOIN (
  SELECT COUNT(*) AS attendancy, memberId
  FROM attendance
  WHERE attendance.date > ?
  GROUP BY memberId
  ) AS B
  ON B.memberId = member.memberId
  WHERE member.cellId = ?
  ) AS C 
  LEFT JOIN (
  SELECT count(*) as checked, memberId
  FROM attendance
  WHERE DATE_FORMAT(date, '%Y-%m-%d') = '${year}-${month}-${day}'
  GROUP BY memberId
  ) AS D
  ON C.memberId = D.memberId
  `;

  doQuery(selectQuery, [standard, cellId])
    .then((row) => {
      const birthList = [];
      const checkedList = [];
      row.result.forEach((element)=>{
        const { birth }  = element;
        const memberMonth =('0' + (birth.getMonth() + 1)).slice(-2);
        if(memberMonth === month){
          birthList.push(element);
        }
        checkedList.push(element.checked);
      })
      res.send({ checkedList, birthList, memberList : row.result});
    })
    .catch((errorData) => {
      console.log(errorData);
      res.send(false);
    });
});

// 커넥션을 전달 받아 쿼리문을 수행한다. 트랜잭션을 사용하기 때문에
const doTransacQuery = ({ connection, queryState, params }) => new Promise((resolve, reject) => {
  connection.beginTransaction((err) => {
    if (err) {
      console.log('doTransacQuery err');
      console.log(err);
      reject(err);
    }
    connection.query(queryState, params, (err1, result) => {
      if (err1) {
        console.log('doTransacQuery err1');
        console.log(err1);
        connection.rollback(() => {
          reject(err1);
        });
      } else {
        connection.commit((err2) => {
          if (err2) {
            console.log('doTransacQuery err2');
            console.log(err2);
            connection.rollback(() => {
              reject(err2);
            });
          } else {
            resolve();
          }
        });
      }
    });
  });
});

//모든 데이터를 json화 하여 전달.
router.post('/put',
(req, res) => {
  const { memberId, name, request, uniqueness, morning, youth, afternoon, checked, cellId, checkRequest } = req.body;
  const jsonRequest = JSON.stringify(request);
  const jsonUniqueness = JSON.stringify(uniqueness);
  
  const date = new Date();
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);

  const updateQuery = `
  UPDATE attendance 
  SET morning = ?, 
      youth = ?,
      afternoon = ?, 
      uniqueness = ?
  WHERE date = ?
  AND memberId  = ?
  `;

  const insertQuery = `
  INSERT INTO attendance(date, memberId, name, morning, youth, afternoon, uniqueness, cellId)
  VALUES(?, ?, ?, ?, ?, ?, ?, ?)`;

  const statement = (checked === null) ? insertQuery : updateQuery;
  const params = (checked === null) ? [date, memberId, name, morning, youth, afternoon, jsonUniqueness, cellId] : 
    [morning, youth, afternoon, jsonUniqueness, date, memberId];

  const updateRequestQuery = `
  UPDATE prayerRequest 
  SET request = ?
  WHERE date = ?
  AND memberId  = ?
  `;

  const insertRequestQuery = `
  INSERT INTO prayerRequest(date, memberId, name, cellId, request)
  VALUES(?, ?, ?, ?, ? )`;

  const requestStatement = (checkRequest) ? insertRequestQuery : updateRequestQuery;
  const requestParams = (checkRequest) ? [date, memberId, name, cellId, jsonRequest] : 
    [jsonRequest, date, memberId];

  const promiseList = connection =>{ 
    if(request === '' || request === null){
      return [
        doTransacQuery({ connection, queryState: statement, params })
      ]
    }
    return [
      doTransacQuery({ connection, queryState: statement, params }),
      doTransacQuery({ connection, queryState: requestStatement, params: requestParams })
    ];
  }

  pool.getConnection((err, connection) => {
    if (err) {
      console.log(err);
      res.send(false);
    }
    Promise.all(promiseList(connection))
    .then(() => {
      connection.release();
      res.send(true);
    })
    .catch((errorData) => {
      connection.release();
      console.log(errorData);
      res.send(false);
    });
  })
});


module.exports = router;
