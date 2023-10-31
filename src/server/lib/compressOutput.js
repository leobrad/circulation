import zlib from 'zlib';
import { pipeline, } from 'stream';

const cache = {
  compress: {},
  raw: {},
};

function onError(err) {
  if (err) {
    console.error('An error occurred:', err);
    process.exitCode = 1;
  }
}

function dealCompress(data, path, res) {
  if (cache.compress[path] === undefined) {
    cache.compress[path] = data;
  }
  res.end(cache.compress[path]);
}

function directDeal(data, path, res) {
  if (cache.raw[path] === undefined) {
    cache.compress[path] = data;
  }
  res.end(cache.raw[path]);
}

export default function compressOutput(req, res, buffer, path) {
  res.setHeader('Vary', 'Accept-Encoding');
  let acceptEncoding = req.headers['accept-encoding'];
  if (/gzip/.test(acceptEncoding)) {
    res.writeHead(200, { 'Content-Encoding': 'gzip' });
    dealCompress(zlib.gzipSync(buffer), path, res);
  } else {
    res.writeHead(200, {});
    dealDirect(buffer, path, res);
  }
}
