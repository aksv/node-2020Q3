
const { Transform } = require('stream');

function reverse(str) {
  return str.split('').reverse().join('');
}

class MyTransform extends Transform {
  _transform(chunk, _, callback) {
    try {
      const str = chunk.toString('utf8');
      callback(null, `${reverse(str.trim())}\n`);
    } catch(err) {
      callback(err);
    }
  }
}

process.stdin.pipe(new MyTransform()).pipe(process.stdout);