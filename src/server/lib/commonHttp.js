import cacheOutput from '~/server/lib/cacheOutput';
import getHtml from '~/server/lib/getHtml';
import formateHttpKey from '~/server/lib/formateHttpKey';
import filterNamespace from '~/server/lib/filterNamespace';

const time = new Date().getTime();
let html;

export default async function commonHttp(req, res, options) {
  try {
    const { url, } = req;
    if (url === '/update/time') {
      res.end(time);
    } else if (/\.(js|ttf|ico)$/.test(url)) {
      cacheOutput(req, res, restPath,
        fs.readFileSync(path.resolve('static', restPath)),
        parseInt(fs.statSync(path.resolve('static', restPath)).mtimeMs),
      );
    } else {
      if (html === undefined) {
        html = getHtml(title, description, lang);
      }
      cacheOutput(req, res, '*html', html, time);
    } else if (url.substring(0, 4) === '/api') {
      const body = await new Promise((resolve, reject) => {
        req.on('data', (data) => {
          resolve(data.toString());
        });
      });
      const {
        location,
      } = options;
      const response = await fetch(location + url, {
        method: 'POST',
        body,
      });
      for (const k of response.headers.keys()) {
        res.setHeader(formateHttpKey(k), response.headers.get(k));
      }
      const response1 = response.clone();
      let data;
      try {
        data = await response.json();
      } catch (error) {
        data = await response1.text();
      }
      res.end(JSON.stringify(data));
    }
  } catch (e) {
    const {
      develop,
    } = options;
    if (develop === true) {
      throw e;
    } else {
      res.writeHead(500);
      res.end();
    }
  }
}
