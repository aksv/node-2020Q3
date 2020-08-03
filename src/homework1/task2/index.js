const csv = require('csvtojson');
const fs = require('fs');

const filePath = `${process.cwd()}/csv/nodejs-hw1-ex2.csv`;

const rs = fs.createReadStream(filePath);
rs.on('error', err => console.log(`File read error: ${err.message}`));

const ws = fs.createWriteStream(`${process.cwd()}/csv/nodejs-hw1-ex2.txt`);
ws.on('error', err => console.log(`File write error: ${err.message}`));

csv({
  ignoreColumns: /amount/,
  headers: ['book', 'author', 'amount', 'price'],
  noheader: false, 
})
  .fromStream(rs)
  .subscribe(json => {
    return new Promise(resolve => {
      resolve(json);
    });
  }, err => {
    console.log(err);
  }).pipe(ws);
