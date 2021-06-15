const express = require('express');
const doQuery = require('../model/doQuery');
const pool = require('../model/connectionPool');

const router = express.Router();


const doConnectionQuery = ({ connection, queryState, params }) => new Promise((resolve, reject) => {
  connection.query(queryState, params, (err, result) => {
    if (err) {
      reject(err);
    } else {
      resolve(result);
    }
  });
});

router.get('/list', function(req, res) {
  // 셀리더가 memeber를 조회할 때,
  const standard = new Date();
  // 6일전까지의 출석부데이터를 들고온다.
  standard.setDate(standard.getDate() - 6);
  const year = standard.getFullYear();
  const month = ('0' + (standard.getMonth() + 1)).slice(-2);
  const day =  ('0' + standard.getDate()).slice(-2);
  
  //한달전부터의 출석 횟수를 가져온다.
  const selectQuery = 
  `
  SELECT * 
  FROM attendance
  WHERE DATE_FORMAT(date, '%Y-%m-%d') >= '${year}-${month}-${day}'
  AND (youth = 1 OR afternoon = 1)
  `;

  const cellNameQuery = `
  SELECT cellId, name
  FROM cell
  ORDER BY cellId
  `;
  
  pool.getConnection((err, connection) => {
    if (err) {
      console.log(err);
      res.send(false);
    }
    Promise.all([
      doConnectionQuery({connection, queryState: selectQuery, params: [] }),
      doConnectionQuery({connection, queryState: cellNameQuery, params: [] })
    ])
    .then(([attendanceList, cellNameList]) => {
      connection.release();

      const cellList = cellNameList.map((cell)=>{
        return {...cell, members : []}
      })

      attendanceList.forEach((element)=>{
        const { cellId, memberId, name, youth, afternoon }  = element;
        cellList[cellId - 1].members.push({memberId, name, youth, afternoon});
      })

      res.send(cellList);
    })
    .catch((errorData) => {
      connection.release();
      console.log(errorData);
      res.send(false);
    });
  })
});

module.exports = router;
