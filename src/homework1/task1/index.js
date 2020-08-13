import { Transform } from 'stream';

function reverse(str) {
    return str.split('').reverse().join('');
}

class MyTransform extends Transform {
    _transform(chunk, _, callback) {
        try {
            const str = chunk.toString('utf8');
            return callback(null, `${reverse(str.trim())}\n`);
        } catch (err) {
            return callback(err);
        }
    }
}

process.stdin.pipe(new MyTransform()).pipe(process.stdout);
